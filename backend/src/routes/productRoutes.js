const express = require('express');
const router = express.Router();
const { getAllProducts, getProductBySlug, getProductVariants } = require('../controllers/productController');

// GET /api/products
router.get('/', getAllProducts);

// GET /api/products/:slug
router.get('/:slug', getProductBySlug);

// GET /api/products/:slug/variants
router.get('/:slug/variants', getProductVariants);

module.exports = router;
