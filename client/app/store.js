import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: { auth: authReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';

//David's edits are below. need to integrate into this store.js file/new repo
// import {configureStore} from '@reduxjs/toolkit'
// import allProductsSlice from './allProductsSlice'
// import singleProductSlice from './singleProductSlice'
// const store = configureStore({
//   reducer: {
//     products: allProductsSlice,
//     singleProduct: singleProductSlice
//   }
// })

// export default store
