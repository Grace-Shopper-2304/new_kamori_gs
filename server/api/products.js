const router = require("express").Router();
const { Products } = require("../db/models");
module.exports = router;

// Route to get all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// Route to get a single product by ID
router.get("/:id", async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Products.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});
