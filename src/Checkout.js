import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useSelector } from "react-redux";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
  const basket = useSelector((state) => state.item.basket);
  const user = useSelector((state) => state.user.userdata);
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div>
          <h3>Hello, {user?._delegate.email}</h3>
          <h2 className="checkout_title">Your shopping basket</h2>
          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="checkout_right">
        <Subtotal />
        <h2>The subtotal</h2>
      </div>
    </div>
  );
}

export default Checkout;
