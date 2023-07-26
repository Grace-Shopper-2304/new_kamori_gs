const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 5;

const Users = db.define("users", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    validate: {
      isPhoneNumber(value) {
        const phoneRegex = /^\+1\s[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        if (!phoneRegex.test(value)) {
          throw new Error("Invalid phone number");
        }
      },
    },
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    get() {
      return this.getDataValue("password");
    },
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return this.getDataValue("salt");
    },
  },
});

module.exports = Users;

/**
 * instanceMethods
 */
Users.prototype.correctPassword = function (candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

Users.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
Users.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

Users.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = await Users.findByPk(id, {
      attributes: { include: ["password", "salt"] },
    });

    if (!user) {
      throw "nooo";
    }

    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  if (user.changed("password")) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    user.password = await bcrypt.hash(user.password, salt);
    user.salt = salt;
  }
};

Users.beforeCreate(hashPassword);
Users.beforeUpdate(hashPassword);
Users.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
