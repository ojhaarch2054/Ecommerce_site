
const express = require('express');
const router = express.Router();

const { getProduct, postProduct, addToCart, getCart, deleteCartItems } = require('../controllers/productController');

//routes
router.get('/', getProduct);
router.post('/', postProduct);
router.post('/cart', addToCart);
router.get('/cart', getCart)
router.delete('/cart/:id', deleteCartItems);


module.exports = router;
