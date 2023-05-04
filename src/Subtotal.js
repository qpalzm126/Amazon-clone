import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Subtotal() {
  const navigate = useNavigate();
  const basket = useSelector((state) => state.item.basket);
  const user = useSelector((state) => state.user.userdata);

  const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => amount + item.price, 0);
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items):<strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        value={getBasketTotal(basket)}
        decimalScale={2}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button
        onClick={(e) => {
          console.log(user);
          if (user) navigate("/payment");
          else {
            window.alert("Please sign in first!");
            navigate("/login");
          }
        }}
      >
        Proceed to check
      </button>
    </div>
  );
}

export default Subtotal;
