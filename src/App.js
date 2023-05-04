import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import Payment from "./Payment";
import Orders from "./Orders";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { SET_USER } from "./user";

function App() {
  const promise = loadStripe(
    "pk_test_51KysEDJDBONpV4vLvG60bvycZcTOSHLZAl2D6MUwKiJ2n0Ckt4VMNVeQs5pm0DKcd0Z6TCJPbtVDgnS0z8iHKdBE00TqrL0NMz"
  );
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(SET_USER(authUser));
      } else {
        dispatch(SET_USER(null));
      }
      console.log("The user is ", authUser?._delegate.email);
    });
  });

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/orders" element={[<Header />, <Orders />]} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={[<Header />, <Checkout />]} />
          <Route
            path="/payment"
            element={[
              <Header />,
              <Elements stripe={promise}>
                <Payment />
              </Elements>,
            ]}
          />
          <Route path="/" element={[<Header />, <Home />]} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
