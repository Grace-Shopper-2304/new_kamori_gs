import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import allProductsSlice from "./allProductsSlice";
import singleProductSlice from "./singleProductSlice";
import ordersSlice from "./ordersSlice";
import orderProductsSlice from "./orderProductsSlice";
import allUsersSlice from "./allUsersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: allProductsSlice,
    singleProduct: singleProductSlice,
    orders: ordersSlice,
    orderProducts: orderProductsSlice,
    users: allUsersSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
