const express = require('express');
const dotenv = require('dotenv');
const db = require('./models/db');
const cors = require('cors');
//include route files
const productRoute = require('./routes/product')

//load .env file
dotenv.config();

const app = express()

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());

//define routes
app.get('/', (req,res) => {
    res.send('Hello, This is root!')
})

//use routes
app.use('/products', productRoute)


const port = process.env.PORT || 3000; 

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})