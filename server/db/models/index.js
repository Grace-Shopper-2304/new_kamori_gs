const db = require('../db')
const Users = require('./Users')
const Products = require('./Products')
const Orders = require('./Orders')
const OrderProducts = require('./OrderProducts')

Users.hasMany(Orders)
Orders.belongsTo(Users)

Orders.hasMany(OrderProducts)
OrderProducts.belongsTo(Orders)

Products.hasMany(OrderProducts)
OrderProducts.belongsTo(Products)

module.exports = {
  db,
  Users,
  Products,
  Orders,
  OrderProducts
}