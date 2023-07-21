import React from 'react';

import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';
import { Route, Routes } from "react-router-dom";
import { AllProducts } from '../features/products/AllProducts';
import SingleProduct from "../features/products/SingleProduct";

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <Routes>
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:id" element={<SingleProduct />} />
      </Routes>
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
