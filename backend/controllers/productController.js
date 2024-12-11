const axios = require("axios");
const pool = require("../models/db");

//function to fetch products from an external API
const getProduct = async (req, res) => {
  try {
    //get request to fetch API data
    const response = await axios.get("https://dummyjson.com/products");
    //the JSON response data with an indentation of 2 spaces
    const formattedData = JSON.stringify(response.data, null, 2);
    //set the response header to indicate that the content type is JSON
    res.setHeader("Content-Type", "application/json");
    //send the formatted JSON data as the response
    res.send(formattedData);
  } catch (error) {
    res.status(500).send("Error fetching products");
  }
};

//function to add a new product to the database
const postProduct = async (req, res) => {
  try {
    const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail } = req.body;

    //insert the product into the database
    const result = await pool.query(
      'INSERT INTO products (title, description, price, discountPercentage, rating, stock, brand, category, thumbnail) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [title, description, price, discountPercentage, rating, stock, brand, category, thumbnail]
    );

    console.log('Database insert result:', result);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send("Error adding product");
  }
};

//function to save a cart item to the database
const saveCartItem = async (cartItem) => {
  const query = `
    INSERT INTO cart (session_id, product_id, quantity, title, description, price, discountPercentage, rating, stock, brand, thumbnail)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
  `;
  const values = [
    cartItem.session_id,
    cartItem.product_id,
    cartItem.quantity,
    cartItem.title,
    cartItem.description,
    cartItem.price,
    cartItem.discountPercentage,
    cartItem.rating,
    cartItem.stock,
    cartItem.brand,
    cartItem.thumbnail,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

//function to add an item to the shopping cart
const addToCart = async (req, res) => {
  try {
    const product = req.body; //product data is coming from the request body
    if (!product) {
      return res.status(400).json({ error: "Product data is required" });
    }

    //logic to add the product to the cart
    const cartItem = {
      session_id: product.session_id,
      product_id: product.product_id,
      quantity: product.quantity,
      title: product.title,
      description: product.description,
      price: product.price,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
      thumbnail: product.thumbnail,
    };

    //save cartItem to the database
    const savedCartItem = await saveCartItem(cartItem);

    res.status(201).json(savedCartItem);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//function to get cart items
const getCart = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cart');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getProduct,
  postProduct,
  addToCart,
  getCart
};