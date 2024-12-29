const axios = require("axios");
const pool = require("../models/db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//function to add user to the database
const postUser = async (req, res) => {
    try {
      const { firstname, lastname, email, password } = req.body;
  
      //insert users into the database
      const result = await pool.query(
        'INSERT INTO Users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [firstname, lastname, email, password]
        );
  
      console.log('Database insert result:', result);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).send("Error adding user");
    }
  };

 //to log in user
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      //find user by email
      const result = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
      const user = result.rows[0];
  
      if (!user) {
        console.log('user not found');
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      //compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      //generate JWT token
      const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
  
      res.json({ token, user: { id: user.id, email: user.email } });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send("Error logging in");
    }
  };
  
  module.exports = { postUser, loginUser };