import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css/cart.css"

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    //fetch cart items from the backend when the component mounts
    axios
      .get("http://localhost:3000/products/cart")
      .then((response) => {
        console.log("promise fulfilled");
        console.log("response data:", response.data);
        if (Array.isArray(response.data)) {
          setCartItems(response.data);
        } else {
          console.error("API response is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [setCartItems]);

  //to delete cart items
  const deleteBtn = async (itemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      //API call to delete the item from the backend
      await axios.delete(`http://localhost:3000/products/cart/${itemId}`);

      //update the cartItems state
      setCartItems((prevItems) =>
        //filter out the item with the matching id
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  //variable to accumulate the subtotal
  let subTotal = 0;

  //forEach loop to iterate over cartItems and calculate the subtotal
  cartItems.forEach((item) => {
    subTotal = subTotal + (item.price * item.quantity);
  });

  //for shipping fee
  let shippingFee = 10;
  if (subTotal >= 100) {
    shippingFee = 0;
  } else {
    shippingFee = 10;
  }

  //for tax
  let taxAmt = 0
  if(subTotal >= 50){
    taxAmt = subTotal * (0.10)
  }else {
    taxAmt = 0;
  }

  //total amount
  let total = subTotal + shippingFee + taxAmt

  return (
    <div className="container mt-4">
  <div className="d-flex justify-content-between align-items-center mb-2 text-white">
    <h3 className="fw-bold mb-0 ">Shopping Cart</h3>
    <h6 className="mb-0 ">{cartItems.length} items</h6>
  </div>
  <div className="row">
    <div className="col-lg-8">
      {cartItems.map((item) => (
        <div key={item.id} className="col-12 mb-3">
          <div
            className="card card-registration card-registration-2"
            style={{ borderRadius: "15px" }}
          >
            <div className="card-body p-0">
              <div className="row g-0">
                <div className="col-lg-8">
                  <div className="p-3">
                    <div className="row mb-4 d-flex justify-content-between align-items-center">
                      <div className="col-md-2 col-lg-2 col-xl-2">
                        <img
                          src={item.thumbnail}
                          className="img-fluid rounded-3"
                          alt={item.title}
                        />
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-3">
                        <h6 className="text-muted">{item.category}</h6>
                        <h6 className="mb-0">{item.title}</h6>
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button className="btn btn-link px-2">
                          <i className="fas fa-minus"></i>
                        </button>
                        <input
                          id="form1"
                          min="0"
                          name="quantity"
                          value={item.quantity}
                          type="number"
                          className="form-control form-control-sm"
                          readOnly
                        />
                        <button className="btn btn-link px-2">
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h6 className="mb-0">${item.price}</h6>
                      </div>
                      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                        <button
                          className="btn btn-link text-muted"
                          onClick={() => deleteBtn(item.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="col-lg-4 mt-4">
      <div className="card cart-summary">
        <div className="card-body">
          <h5 className="card-title mb-4">Order Summary</h5>
          <div className="d-flex justify-content-between mb-3">
            <span>Subtotal</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>
          {subTotal >= 100 ? (
            <small className="shippingFee1">
              Shipping fee is free for orders over $100!
            </small>
          ) : (
            <small className="shippingFee2">
              Shipping fee is $10 for orders under $100.
            </small>
          )}
          <div className="d-flex justify-content-between mb-3">
            <span>Shipping</span>
            <span>${shippingFee}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Tax</span>
            <span>${taxAmt.toFixed(2)}</span>
          </div>
          {subTotal >= 50 ? (
            <small className="shippingFee1">
              Tax fee is 10%!
            </small>
          ) : (
            <small className="shippingFee2">
              No tax fee for orders under $50.
            </small>
          )}
          <hr />
          <div className="d-flex justify-content-between mb-4">
            <strong>Total</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button className="btn btn-success w-100">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Cart;
