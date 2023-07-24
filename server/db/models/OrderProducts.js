const Sequelize = require('sequelize')
const db = require('../db')

//this table tells us which products are in which orders
const OrderProducts = db.define('orderProducts', {
  // if Products already have a price on them, could you calculate the price instead by multiplying the Product price and the OrderProduct quantity?
  price: {
    type: Sequelize.DECIMAL,
    validate: {
      notEmpty: true,
      min: 1
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      min: 0
    }
  }
})

module.exports = OrderProducts
