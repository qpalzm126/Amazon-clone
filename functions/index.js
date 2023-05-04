const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51KysEDJDBONpV4vLIckaQ8A7MC9orYuNeTtJ5inWcsNmfKxmVq7ISrrnydlmx5CaHjpawYtPe5bu8AqE7ulQ80XN005iTrlqhH"
);

// API

// APP config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes

app.post("/payments/create", async (req, res) => {
  console.log("start /payment/create", req);
  const total = req.query.total;
  console.log("Payment received form this amount >>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });
  console.log(paymentIntent.client_secret);
  // OK - created
  res.status(201).send({ clientSecret: paymentIntent.client_secret });
});

// Listen command
exports.api = functions.https.onRequest(app);
