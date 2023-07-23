import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import allProductsSlice from './allProductsSlice';
import singleProductSlice from './singleProductSlice';
import ordersSlice from './ordersSlice';
import orderProductsSlice from './orderProductsSlice';

const store = configureStore({
  reducer: {  auth: authReducer ,
   products: allProductsSlice ,
 singleProduct: singleProductSlice,
 orders: ordersSlice,
 orderProducts: orderProductsSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
export * from '../features/auth/authSlice';

