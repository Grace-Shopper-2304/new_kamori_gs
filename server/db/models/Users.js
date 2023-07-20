const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;

const Users = db.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    validate: {
      isPhoneNumber(value) {
        const phoneRegex = /^\+1\s[0-9]{3}-[0-9]{3}-[0-9]{4}$/ // assuming all orders are from the US
        // we should add some autoformatting when a user inputs their phone so that it matches +1 xxx-xxx-xxxx
        if (!phoneRegex.test(value)) {
          throw new Error('Invalid phone number')
        }
      }
    }
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  password: {
    //pw & salt are boilerplate, leaving them in case we need them later
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  }
})

module.exports = Users;

/**
 * instanceMethods
 */
Users.prototype.correctPassword = function(candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
}

Users.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}

/**
 * classMethods
 */
Users.authenticate = async function({ username, password }){
    const user = await this.findOne({where: { username }})
    if (!user || !(await user.correctPassword(password))) {
      const error = Error('Incorrect username/password');
      error.status = 401;
      throw error;
    }
    return user.generateToken();
};

Users.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = User.findByPk(id)
    if (!user) {
      throw 'nooo'
    }
    return user
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

/**
 * hooks
 */
const hashPassword = async(user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

Users.beforeCreate(hashPassword)
Users.beforeUpdate(hashPassword)
Users.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))
