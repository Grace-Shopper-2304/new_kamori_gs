import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, selectProducts } from "../store/allProductsSlice";
import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const products = useSelector(selectProducts);

  return (
    <div>
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
