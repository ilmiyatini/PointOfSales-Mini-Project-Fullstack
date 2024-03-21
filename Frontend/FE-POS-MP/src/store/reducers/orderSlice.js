import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    dataOrder: [],
  },
  reducers: {
    addToOrder: (state, action) => {
      state.dataOrder = [...state.dataOrder, action.payload];
    },
    removeFromOrder: (state, action) => {
      state.dataOrder = state.dataOrder.filter(
        (product) => product.product_id !== action.payload
      );
    },
    updateOrder: (state, action) => {
      state.dataOrder = state.dataOrder.map((product) =>
        parseInt(product.product_id) === action.payload.product_id
          ? { ...product, quantity: action.payload.quantity }
          : product
      );
    },
    incrementQuantity: (state, action) => {
      state.dataOrder = state.dataOrder.map((item) =>
        item.product_id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    },
    decrementQuantity: (state, action) => {
      state.dataOrder = state.dataOrder.map((item) =>
        item.product_id === action.payload
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      );
    },
    clearOrder: (state) => {
      state.dataOrder = [];
    },
  },
});

export const {
  addToOrder,
  removeFromOrder,
  updateOrder,
  incrementQuantity,
  decrementQuantity,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
