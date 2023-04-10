import React, { createContext, useContext, useReducer } from "react";

//Prepare the datalayer

export const StateContext = createContext();

//Wrap the
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//Pull Information form the data layer
export const useStateValue = () => useContext(StateContext);
