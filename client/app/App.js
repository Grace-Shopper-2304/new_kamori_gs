import React from 'react';

import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';
import { Route, Routes } from "react-router-dom";
import { AllProducts } from '../features/products/AllProducts';

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <Routes>
        <Route path="/products" element={<AllProducts />} />
      </Routes>
    </div>
  );
};

export default App;
