const db = require('../db')
const Users = require('./Users')
const Products = require('./Products')
const Orders = require('./Orders')
const OrderProducts = require('./OrderProducts')

Users.hasMany(Orders)
Orders.belongsTo(Users)

Orders.hasMany(OrderProducts)
OrderProducts.belongsTo(Orders)

Products.hasMany(OrderProducts, {
    foreignKey: 'productId', // Replace 'productId' with the actual foreign key in the OrderProducts table that references the Products table
    sourceKey: 'id', // Replace 'id' with the actual primary key of the Products table
    // Add "price" to the list of fields to include in the association
    targetKey: 'price', // Replace 'price' with the actual column name for the price in the Products table
  });
OrderProducts.belongsTo(Products)

module.exports = {
  db,
  Users,
  Products,
  Orders,
  OrderProducts
}