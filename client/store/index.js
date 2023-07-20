import {configureStore} from '@reduxjs/toolkit'
import allProductsSlice from './allProductsSlice'
import singleProductSlice from './singleProductSlice'

const store = configureStore({
  reducer: {
    products: allProductsSlice,
    singleProduct: singleProductSlice
  }
})

export default store



/* below is from old boilerplate

import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'

const reducer = combineReducers({user})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user' */