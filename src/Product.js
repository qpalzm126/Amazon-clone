import React from "react";
import "./Product.css";
import { useDispatch } from "react-redux";
import { add_to_basket } from "./items";

function Product({ id, title, image, price, rating }) {
  const dispatch = useDispatch();
  const addtobasket = () => {
    console.log("add");
    dispatch(
      add_to_basket({
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      })
    );
  };

  // const addToBasket = () => {
  //   //dispatch the item into the data layer
  // //   dispatch({
  // //     type: "ADD_TO_BASKET",
  // //     items: {
  // //       id: id,
  // //       title: title,
  // //       image: image,
  // //       price: price,
  //       rating: rating,
  // //     },
  // //   });
  // // };

  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addtobasket}>Add to basket</button>
    </div>
  );
}

export default Product;
