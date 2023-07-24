import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import { me } from '../store/store';
import {AllProducts} from "../features/products/AllProducts"
import SingleProduct from '../features/products/SingleProduct';
import {Cart} from '../features/cart/cart';

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  {/* if you find the ternary structure below to be a bit hard to work with, consider creating variables above the return like `const loggedInRoutes = <Routes>...</Routes>` and then your ternary below can be simplifed to `isLoggedIn ? loggedInRoutes : guestRoutes` */}
  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route to="/products" element={<AllProducts />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route to="/cart" element={<Cart />} />
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
          <Route to="/products" element={<AllProducts />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route to="/cart" element={<Cart />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
