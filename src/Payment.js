import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useSelector, useDispatch } from "react-redux";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";
import { EMPTY_BASKET } from "./items";
import { db } from "./firebase";

function Payment() {
  const user = useSelector((state) => state.user.userdata);
  const basket = useSelector((state) => state.item.basket);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    console.log("before getClientSecret");
    //generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      console.log("getClientSecret", basket);
      if (basket.length === 0) return;
      const response = await axios({
        method: "post",
        //stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("The secret is >>>", clientSecret);
  const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => amount + item.price, 0);

  const handleSubmit = async (e) => {
    console.log("press submit", processing);
    e.preventDefault();
    setProcessing(true);
    console.log("before confirmCardPayment");
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((result) => {
        //paymentIntent = payment confirmation
        console.log("This is result >", result);
        db.collection("users")
          .doc(user._delegate?.uid)
          .collection("orders")
          .doc(result.paymentIntent.id)
          .set({
            basket: basket,
            amount: result.paymentIntent.amount,
            created: result.paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch(EMPTY_BASKET([]));
        navigate("/orders", { replace: true });
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout(<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className=" payment_address">
            <p>{user._delegate.email}</p>
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment_items">
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
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment_priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  value={getBasketTotal(basket)}
                  decimalScale={2}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
