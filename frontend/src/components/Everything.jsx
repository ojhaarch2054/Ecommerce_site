import { useEffect, useState, useContext } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import "../style.css/everything.css";
import { CartContext } from "../context/CartContext.jsx";

const Everything = () => {
  //to save the list of products
  const [lists, setLists] = useState([]);
  //to save items in cart when clicking on addcart btn
  const { cartItems, setCartItems } = useContext(CartContext);

  //useEffect hook to fetch data when the component mounts
  useEffect(() => {
    console.log("effect");
    //fetch products from the API
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        console.log("promise fulfilled");
        console.log("response data:", response.data);
        //check if the response data is an array of products
        if (Array.isArray(response.data.products)) {
          //update the state with the fetched products
          setLists(response.data.products);
        } else {
          console.error("API response is not an array");
          //set an empty array if the response is not as expected
          setLists([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        //set an empty array if there is an error fetching data
        setLists([]);
      });
  }, []); //effect runs once when the component mounts

  const addProduct = ( product) => {
    //post request to add the product to the products table
    axios
      .post("http://localhost:3000/products", product)
      .then((response) => {
        const addedProduct = response.data;
        //update the lists and cartItems state with the newly added product
        setLists([...lists, addedProduct]);
        setCartItems([...cartItems, addedProduct]);

        //cart item object to add to the cart table
        const cartItem = {
          session_id: "123",
          product_id: addedProduct.id,
          quantity: 1,
          title: addedProduct.title,
          description: addedProduct.description,
          price: addedProduct.price,
          discountPercentage: addedProduct.discountPercentage,
          rating: addedProduct.rating,
          stock: addedProduct.stock,
          brand: addedProduct.brand,
          thumbnail: addedProduct.thumbnail,
        };
        //send a POST request to add the product to the cart table
        return axios.post("http://localhost:3000/products/cart", cartItem);
      })
      .then((response) => {
        console.log("Product added to cart:", response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error adding product:", error.response.data);
        } else {
          console.error("Error adding product:", error.message);
        }
      });
  };

  //map over the list of products to create list items
  const listItems = lists.map((list) => (
    <div key={list.id || list.title} className="card cardList">
      {/*check if the product has images and display the first one */}
      {list.images && list.images.length > 0 && (
        <img src={list.images[0]} alt={list.title} className="card-img-top" />
      )}
      <div className="card-body">
        <h5 className="card-title">{list.title}</h5>
        <p className="card-text">{list.description}</p>
        <button className="btn btn-primary" onClick={() => addProduct(list)}>
          Add to cart
        </button>
      </div>
    </div>
  ));

  return (
    <div>
      <h1>Everything</h1>
      <div className="listItems">{listItems}</div>
    </div>
  );
};

export default Everything;
