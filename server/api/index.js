const router = require('express').Router()
module.exports = router

//Route for Users
router.use('/users', require('./users'))

//Route to Get Products
router.use('/products', require('./products'))

//Error Logging
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
