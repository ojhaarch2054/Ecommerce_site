import React from 'react';
import shoppingImage from "../assets/shopping.jpg";
import "../style.css/mainPicture.css"

const MainPicture = () => {
  return (
    <div>
      <img src={shoppingImage} className="img-fluid main_picture shadow-lg p-3 mb-5 rounded" alt="Shopping image" />
    </div>
  );
};

export default MainPicture;