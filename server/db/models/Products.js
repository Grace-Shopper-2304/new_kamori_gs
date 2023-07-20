const Sequelize = require('sequelize')
const db = require('../db')

const Products = db.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: 'defaultProduct.png'
  },
  description: Sequelize.TEXT,
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL,
    validate: {
      notEmpty: true,
      min: 1
    }
  },
  stock: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      min: 0
    }
  }
})

module.exports = Products
