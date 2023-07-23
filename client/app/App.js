import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, selectProducts } from "../store/allProductsSlice";
import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';
import  Products from '../features/products/Products';
import { useLocation } from 'react-router-dom';
import { Cart } from '../features/cart/cart';
import SingleProduct from '../features/products/SingleProduct';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const products = useSelector(selectProducts);
  const location = useLocation();
  const isProductsPage = location.pathname === '/products';
  const isCart = location.pathname === '/cart';
  const isSingleProduct = location.pathname === `/products/4`;
  //this location stuff is here because the front end routes arent working yet

  return (
    <div>
      <Navbar />
      <AppRoutes />
      {isProductsPage && (
      <table>
      <tbody>  
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
      </tbody>
      </table>
      )}
      {isCart && (
        <Cart />
      )}
       {isSingleProduct && (
        <SingleProduct />
      )}
    </div>
  );
};

export default App;

// import React, {useEffect} from 'react'
// import {useDispatch, useSelector} from 'react-redux'
// import {Navbar} from './components'
// import Routes from './routes'
// import {Link} from 'react-router-dom'
// //import axios async thunks to get a list of products here
// import {getAllProducts} from '../server/store/allProductsSlice'

// const App = () => {
//   const dispatch = useDispatch()

//   //get the list of products to display using useSelector
//   const products = useSelector(state => state.products.products)

//   //useEffect to dispatch the async thunk that gets all the products

//   useEffect(() => {
//     dispatch(getAllProducts())
//   }, [])

//   return (
//     <div>
//       <h1>Kamori-GS</h1>
//       {
//         //add a link to the cart in the navbar, a route in the routes.js for the cart, and a cart component
//       }
//       <Navbar />
//       <Routes />
//       <tbody>
//         {//this will create a table with the products within the home page
//         products.map(product => {
//           return (
//             //the link will allow users to click on a product to view a single product
//             //make sure to update the routes.js to include the link to value route
//             //make sure to create a product component
//             /*
//               add this to the table later when we have a product component
//               <product
//                   key={product.id}
//                   product={product}/>

//               add this when we  have a route and a single product component
//               <Link to={`/product/${product.id}`} >
//               </Link>
//               */

//             <tr>
//               {product.name}
//               {product.image}
//               {product.description}
//             </tr>
//           )
//         })}
//       </tbody>
//     </div>
//   )
// }

// export default App
