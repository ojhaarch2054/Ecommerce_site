
const express = require('express');
const router = express.Router();

const { getProduct } = require('../controllers/productController');

//routes
router.get('/', getProduct);

module.exports = router;
