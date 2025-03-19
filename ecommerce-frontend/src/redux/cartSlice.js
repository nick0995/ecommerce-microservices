import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [] },
  reducers: {
    addItem: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.productId !== action.payload);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
