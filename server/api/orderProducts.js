const router = require('express').Router()
const {Orders, Users, OrderProducts, Products} = require('../db/models')
module.exports = router

router.post("/", async (req, res, next) => {
  try {
    console.log('req body', req.body)
    const newOrderProduct = await OrderProducts.create(req.body)
    console.log('req body2', req.body)
    res.send(newOrderProduct)
  } catch (error) {
    next(error);
  }
});

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

  //deletes all entries in orderProducts when user checks out
  router.delete('/destroy', async (req, res, next) => {
    try {
      const products = await OrderProducts.findAll();
      for (let i = 0; i < products.length; i++) {
        await products[i].destroy();
      }
      res.send(products);
    } catch (error) {
      next(error);
    }
  })
