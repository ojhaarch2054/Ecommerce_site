import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const ProductDetail = () => {
  //extract the 'id' parameter from the URL
  const { id } = useParams();
  //to hold the product data
  const [product, setProduct] = useState(null);
  //to manage loading state
  const [loading, setLoading] = useState(true);
  //to manage error state
  const [error, setError] = useState(null);
  

  useEffect(() => {
    //API call to fetch product details
    axios.get(`http://localhost:3000/products/${id}`)
      .then((response) => {
        //set the product data from the response
        setProduct(response.data);
        //false as data is fetched
        setLoading(false);
      })
      .catch((error) => {

        setError(error);
        setLoading(false);
      });
  }, [id]);

  //render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  //render error state
  if (error) {
    return <div>Error loading product details</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        {product.images && product.images.length > 0 && (
          <img src={product.images[0]} alt={product.title} className="card-img-top" />
        )}
        <div className="card-body">
          <h1 className="card-title">{product.title}</h1>
          <p className="card-text">{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Discount:</strong> {product.discountPercentage}%</p>
          <p><strong>Rating:</strong> {product.rating}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Weight:</strong> {product.weight}g</p>
          <p><strong>Dimensions:</strong> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</p>
          <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
          <p><strong>Shipping:</strong> {product.shippingInformation}</p>
          <p><strong>Availability:</strong> {product.availabilityStatus}</p>
          <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
          <p><strong>Minimum Order Quantity:</strong> {product.minimumOrderQuantity}</p>
          <h3>Reviews:</h3>
          {product.reviews && product.reviews.map((review, index) => (
            <div key={index} className="mb-3">
              <p><strong>Rating:</strong> {review.rating}</p>
              <p><strong>Comment:</strong> {review.comment}</p>
              <p><strong>Reviewer:</strong> {review.reviewerName} ({review.reviewerEmail})</p>
              <p><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
            </div>
          ))}
         
        </div>
      </div>
    </div>
  );
};

// Export the ProductDetail component as default
export default ProductDetail;