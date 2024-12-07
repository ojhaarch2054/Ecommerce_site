const axios = require('axios');

const getProduct = async (req, res) => {
    try {
        const response = await axios.get('https://dummyjson.com/products');
        res.json(response.data); //send API response to the client
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
};

module.exports = {
    getProduct
};
