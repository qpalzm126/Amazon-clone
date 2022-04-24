import React from "react";
import "./Product.css";

function Product() {
  return (
    <div className="product">
      <div className="product_info">
        <p>The lean startup</p>
        <p className="product_price">
          <small>$</small>
          <strong>19.99</strong>
        </p>
        <div className="product_rating">
          <p>🌟</p>
          <p>🌟</p>
          <p>🌟</p>
        </div>
      </div>
      <img src="https://m.media-amazon.com/images/P/0307887898.01._SCLZZZZZZZ_SX500_.jpg" />
    </div>
  );
}

export default Product;
