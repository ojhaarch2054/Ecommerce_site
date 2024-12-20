
const express = require('express');
const router = express.Router();

const { getProduct, postProduct, addToCart, getCart, deleteCartItems, getOneItems, updateQuantity } = require('../controllers/productController.js');

//routes
router.get('/', getProduct);
router.post('/', postProduct);
router.post('/cart', addToCart);
router.get('/cart', getCart)
router.delete('/cart/:id', deleteCartItems);
router.get('/:id', getOneItems)
router.put('/cart/quantity/:id', updateQuantity);



module.exports = router;
