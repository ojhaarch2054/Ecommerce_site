
const express = require('express');
const router = express.Router();

const { getProduct, postProduct, addToCart, getCart } = require('../controllers/productController');

//routes
router.get('/', getProduct);
router.post('/', postProduct);
router.post('/cart', addToCart);
router.get('/cart', getCart)

module.exports = router;
