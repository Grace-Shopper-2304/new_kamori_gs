const router = require('express').Router()
const {Orders, Users, OrderProducts, Products} = require('../db/models')
module.exports = router



router.put('/:id/increase', async (req, res, next) => {
    try {  
      const product = await OrderProducts.findByPk(req.params.id);
      product.quantity += 1;
      await product.save();
      res.send(product);
    } catch (error) {
      next(error);
    }
  });
  
  router.put('/:id/decrease', async (req, res, next) => {
    try {
      const product = await OrderProducts.findByPk(req.params.id);
      product.quantity -= 1;
      await product.save();
      res.send(product);
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const product = await OrderProducts.findByPk(req.params.id);
      await product.destroy();
      res.send(product);
    } catch (error) {
      next(error);
    }
  });