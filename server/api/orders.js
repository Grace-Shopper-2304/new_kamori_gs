const router = require('express').Router()
const {Orders} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Orders.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
    try {
      res.send(await Orders.create(req.body));
    } catch (error) {
      next(error);
    }
  });

router.get("/:id", async (req, res, next) => {
    try {
      const order = await Orders.findByPk(req.params.id);
      res.json(task);
    } catch (error) {
      next(error);
    }
  });

