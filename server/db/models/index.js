const db = require('../db')
const Users = require('./Users')
const Products = require('./Products')
const Orders = require('./Orders')
const OrderProducts = require('./OrderProducts')

Users.hasMany(Orders)
Orders.belongsTo(Users, { foreignKey: 'userId' });

Orders.hasMany(OrderProducts)
OrderProducts.belongsTo(Products, { foreignKey: 'productId' });

Products.hasMany(OrderProducts)
OrderProducts.belongsTo(Orders, { foreignKey: 'orderId' });

Users.addHook('afterCreate', async (user) => {
  try {
    await Orders.create({
      userId: user.id,
    });
  } catch (err) {
    console.error('Error creating order for user..', err);
  }
});

module.exports = {
  db,
  Users,
  Products,
  Orders,
  OrderProducts
}