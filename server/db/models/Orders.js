const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
},
{
  freezeTableName: true,
  tableName: "orders"
})

module.exports = Orders