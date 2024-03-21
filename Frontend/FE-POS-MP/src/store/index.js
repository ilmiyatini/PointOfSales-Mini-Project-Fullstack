import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./reducers/orderSlice";

const store = configureStore({
  reducer: {
    order: orderSlice,
  },
});

export default store;
