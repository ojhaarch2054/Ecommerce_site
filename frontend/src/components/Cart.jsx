import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
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
                                


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 className="fw-bold mb-0">Shopping Cart</h3>
        <h6 className="mb-0 text-muted">{cartItems.length} items</h6>
      </div>
      <div className="row flex-column flex-nowrap overflow-auto">
        {cartItems.map((item, index) => (
          <div key={index} className="col-12">
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
                          <button
                            className="btn btn-link px-2"
                          >
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
                          <button
                            className="btn btn-link px-2"
                          >
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
    </div>
  );
};

export default Cart;
