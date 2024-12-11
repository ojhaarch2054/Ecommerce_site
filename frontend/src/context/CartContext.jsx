import React, { createContext, useState } from 'react';

//create a context for the cart
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //initialize cartItems state
  const [cartItems, setCartItems] = useState([]);

  return (
    //provide cartItems and setCartItems to the rest of the app
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};