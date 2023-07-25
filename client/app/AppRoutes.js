import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import { me } from '../store/store';
import {AllProducts} from "../features/products/AllProducts"
import SingleProduct from '../features/products/SingleProduct';
import {Cart} from '../features/cart/cart';
import Checkout from '../features/checkout/checkout';
import Landing from '../features/home/Landing';

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;

