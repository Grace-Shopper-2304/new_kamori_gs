const router = require('express').Router()
const {Orders, Users, OrderProducts, Products} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
      const orders = await Orders.findAll({
        include: [Users],
      });
      res.json(orders);
    } catch (err) {
    console.log(err);
    }
  });

router.post("/", async (req, res, next) => {
    try {
      res.send(await Orders.create(req.body));
    } catch (error) {
      next(error);
    }
  });

// this route shows just order completed boolean and user info
router.get("/:id", async (req, res, next) => {
    try {
      const order = await Orders.findByPk(req.params.id, {
        include: [Users, OrderProducts]});
      res.json(order);
    } catch (error) {
      next(error);
    }
  });

// this route shows us all products in a certain order
  router.get("/:id/orderProducts", async (req, res, next) => {
    try {
      const products = await OrderProducts.findAll({
        where: { orderId: req.params.id },
        include: [Products, Orders], 
      });
      res.json(products);
    } catch (error) {
      next(error);
    }
  });

  //gets all orders for a specific user
  router.get("/user/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      
      const orders = await Orders.findAll({
     where: { userId: id },
        include: [Users, OrderProducts],
      });
      res.json(orders);
    } catch (error) {
      next(error);
    }
  });

  router.get('/user/:id/incomplete', async (req, res, next) => {
    try {
      const { id } = req.params;
      const incompleteOrders = await Orders.findAll({
        where: { userId: id, completed: false }
      });
      res.json(incompleteOrders);
    } catch (error) {
      next(error);
    }
  });

