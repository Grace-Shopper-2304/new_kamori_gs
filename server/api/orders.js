const router = require('express').Router()
const {Orders, Users, OrderProducts, Products} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
      const { userId } = req.query; // Extract userId from the query param
   // If userId is provided, filter orders based on it, else return all orders
      const filterOptions = userId ? { where: { userId } } : {};
  
      const orders = await Orders.findAll({
        ...filterOptions,
        include: [Users],
      });
      
      res.json(orders);
    } catch (err) {
      next(err);
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

/*   // this route shows us all products in a certain order
  router.get("/:id", async (req, res, next) => {
    try {
      const products = await Orders.findAll({
        where: { userId: req.params.id },
        include: [Products, Orders], 
      });
      res.json(products);
    } catch (error) {
      next(error);
    }
  }); */

