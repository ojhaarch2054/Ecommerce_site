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

//function to delete cart items
const deleteCartItems = async (req, res) => {
  //extract id from the request parameters
  const { id } = req.params;
  try {
    //SQL query to delete the item from the cart table where the id matches
    const result = await pool.query('DELETE FROM cart WHERE id = $1 RETURNING *;', [id]);
    
    //check if any rows were affected
    if (result.rowCount === 0) {
      //if no rows were affected, return a 404 status with an error message
      return res.status(404).json({ error: 'Item not found' });
    }
    
    //if the item was deleted, return a 200 status with the deleted item
    res.status(200).json(result.rows[0]);
  } catch (error) {
    //errors that occur during the process
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//to get one product
const getOneItems = async (req, res) => {
  //extract id from the request parameters
  const { id } = req.params;
  try {
    //get request to fetch API data for a specific product
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    //the JSON response data with an indentation of 2 spaces
    const formattedData = JSON.stringify(response.data, null, 2);
    //set the response header to indicate that the content type is JSON
    res.setHeader("Content-Type", "application/json");
    //send the formatted JSON data as the response
    res.send(formattedData);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send("Error fetching product");
  }
};

const updateQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity, price } = req.body;

  try {
    // Validate quantity
    if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    // Update the quantity and price in the cart database
    const updateQuery = `
      UPDATE cart
      SET quantity = $1, price = $2
      WHERE product_id = $3
      RETURNING *;
    `;
    const values = [quantity, price, id];
    const result = await pool.query(updateQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    const updatedCartItem = result.rows[0];
    res.json(updatedCartItem);
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).send("Error updating quantity");
  }
};

module.exports = {
  getProduct,
  postProduct,
  addToCart,
  getCart,
  deleteCartItems,
  getOneItems,
  updateQuantity,
};
