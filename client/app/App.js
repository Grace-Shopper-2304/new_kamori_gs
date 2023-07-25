import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, selectProducts } from "../store/allProductsSlice";
import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';
import  Products from '../features/products/Products';
import { useLocation } from 'react-router-dom';
import { Cart } from '../features/cart/cart';
import Landing from '../features/home/Landing';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const products = useSelector(selectProducts);
  const location = useLocation();
  const isProductsPage = location.pathname === '/products';
  const isCart = location.pathname === '/cart';
  const isHome = location.pathname === '/home';

  return (
    <div>
      <Navbar />
      <AppRoutes />
      {isProductsPage && (
          <div className="all-products-container">
          {products.map(product => {
            return (
              <div className="product-container">
              <tr>
                <Products
                product={product}/>
              </tr>
              </div>
            )
          })
        }
        </div>
      )}
      {isCart && (
        <Cart />
      )}
      {isHome && (
        <Landing />
      )}
    </div>
  );
};

export default App;