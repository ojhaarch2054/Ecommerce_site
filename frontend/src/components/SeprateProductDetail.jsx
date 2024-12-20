import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    axios
      .get(`http://localhost:3000/products/${id}`)
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

  //function to render star icon based on rating
  const renderStars = (rating) => {
    //to hold the star icons
    const stars = [];
    //Loop through numbers 1 to 5
    for (let i = 1; i <= 5; i++) {
      //if the current index is less than or equal to the rating, add a filled star icon
      if (i <= rating) {
        stars.push(<i key={i} className="fas fa-star text-warning"></i>);
        // Otherwise, add an empty star icon
      } else {
        stars.push(<i key={i} className="far fa-star text-warning"></i>);
      }
    }
    //return the array of star icons
    return stars;
  };

  return (
    <div className="container mt-5 w-50">
      <div className="card">
        {product.images && product.images.length > 0 && (
          <img
            src={product.images[0]}
            alt={product.title}
            className="card-img-top w-50"
          />
        )}
        <div className="card-body">
          <h1 className="card-title">{product.title}</h1>
          <p className="card-text">{product.description}</p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Discount:</strong> {product.discountPercentage}%
          </p>
          <p>
            <strong>Rating:</strong> {product.rating}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p>
            <strong>SKU:</strong> {product.sku}
          </p>
          <p>
            <strong>Weight:</strong> {product.weight}g
          </p>
          <p>
            <strong>Dimensions:</strong> {product.dimensions.width} x{" "}
            {product.dimensions.height} x {product.dimensions.depth} cm
          </p>
          <p>
            <strong>Warranty:</strong> {product.warrantyInformation}
          </p>
          <p>
            <strong>Shipping:</strong> {product.shippingInformation}
          </p>
          <p>
            <strong>Availability:</strong> {product.availabilityStatus}
          </p>
          <p>
            <strong>Return Policy:</strong> {product.returnPolicy}
          </p>
          <p>
            <strong>Minimum Order Quantity:</strong>{" "}
            {product.minimumOrderQuantity}
          </p>
          <div className="container mt-5">
            <div className="card"></div>
            <h3>Reviews:</h3>
            {product.reviews &&
              product.reviews.map((review, index) => (
                <div key={index} className="mb-3">
                  <p>
                    <strong>Reviewer:</strong> {review.reviewerName} (
                    {review.reviewerEmail})
                  </p>
                  <p>
                    <strong>Comment:</strong> {review.comment}
                  </p>
                  <p>
                    <strong>Rating:</strong> {renderStars(review.rating)}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                  <br />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the ProductDetail component as default
export default ProductDetail;
