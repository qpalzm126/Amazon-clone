import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
  name: "item",
  initialState: {
    basket: [],
    // value: { id: "", title: "", price: 0, rating: 0, image: "" },
  },
  reducers: {
    add_to_basket: (state, action) => {
      state.basket.push(action.payload);
    },
    remove_from_basket: (state, action) => {
      const index = state.basket.findIndex((item) => {
        return item.id === action.payload;
      });
      console.log(index);
      if (index >= 0) {
        state.basket.splice(index, 1);
      } else {
        console.log("No item");
      }
    },
    EMPTY_BASKET: (state, action) => {
      state.basket = action.payload;
    },
  },
});

export const { add_to_basket, remove_from_basket, EMPTY_BASKET } =
  itemSlice.actions;

export default itemSlice.reducer;
