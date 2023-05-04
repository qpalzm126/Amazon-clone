import React, { useState, useEffect } from "react";
import "./Orders.css";
import { db } from "./firebase";
import { useSelector } from "react-redux";
import Order from "./Order";

function Orders() {
  const user = useSelector((state) => state.user.userdata);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      console.log("orders before collect order data >>", orders);
      db.collection("users")
        .doc(user._delegate?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
      console.log("orders after collect order data >>", orders);
    } else {
      setOrders([]);
    }
  }, [user, orders]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders_order">
        {orders.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
