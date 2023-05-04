import React from "react";
import "./CheckoutProduct.css";
import { Button } from "react-bootstrap";
import { remove_from_basket } from "./items";
import { useDispatch } from "react-redux";

function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
  const dispatch = useDispatch();

  const removeFromBasket = () => {
    dispatch(remove_from_basket(id));
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct_image" src={image} alt="" />
      <div className="checkProduct_info">
        <p className="checkProduct_title">{title}</p>
        <p className="checkProduct_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
        {!hideButton && (
          <Button className="button" onClick={removeFromBasket}>
            Remove from basket
          </Button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
