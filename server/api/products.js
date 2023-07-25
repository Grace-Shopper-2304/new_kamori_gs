const router = require('express').Router();
const { Products } = require('../db/models');
const {OrderProducts} = require('../db/models');
module.exports = router;

// Route to get all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// Route to get a single product by ID
router.get('/:id', async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Products.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

//update products table with updated quantities for what the user bought
router.put('/:id/update', async (req, res, next) => {
  
  try {
    //get the quantities for what was ordered
    const productQuantitiesWithProd = await OrderProducts.findAll({
    where: { orderId: req.params.id },
    include: [Products], 
  });
  //go through each product and update the quantity
  for (let i = 0; i < productQuantitiesWithProd.products.length; i++) {
    //the line below should be updating the products table with the quantities of product ordered
    productQuantitiesWithProd.products[i].quantity = productQuantitiesWithProd[i].quantity;
    await productQuantitiesWithProd.products[i].save();
  }
  res.send(productQuantitiesWithProd);
  } catch (err) {
    next(err);
  }

})