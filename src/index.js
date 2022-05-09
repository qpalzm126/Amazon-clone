import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./Reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import itemReducer from "./items";

const store = configureStore({
  reducer: {
    item: itemReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <StateProvider initialState={initialState} reducer={reducer}> */}
    <Provider store={store}>
      <App />
      {/* </StateProvider> */}
    </Provider>
  </React.StrictMode>
);
