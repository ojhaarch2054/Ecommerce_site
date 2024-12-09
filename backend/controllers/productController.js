const axios = require("axios");

const getProduct = async (req, res) => {
  try {
    //get rqst to fetch api data
    const response = await axios.get("https://dummyjson.com/products");
    //format the json response data with an identification of 2 spaces
    const formattedData = JSON.stringify(response.data, null, 2);
    //set the response header to indicate that the content type is JSON

    res.setHeader("Content-Type", "application/json");
    //send the formatted JSON data as the response

    res.send(formattedData);
  } catch (error) {
    res.status(500).send("Error fetching products");
  }
};

module.exports = {
  getProduct,
};
