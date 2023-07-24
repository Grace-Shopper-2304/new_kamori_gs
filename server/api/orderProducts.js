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
      // I think the way this is written you'd be able to have 0 or negative quantities. Maybe before decrementing the quantity, you could check to see if the quantity is 1 -- and if it is, then delete the product instead of decrementing the quantity.
      // I guess you might also be deciding, on the front end, whether to send a PUT to decrement or a DELETE to remove. That's fine too!
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
