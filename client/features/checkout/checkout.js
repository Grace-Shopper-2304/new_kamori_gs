import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Checkout = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  let total = 0; //might want this to be in currency format
  //write the handleDeleteProduct, handleIncrementProduct, handleDecrementProduct, handleCompleteCheckout functions here
  return (
    <div>
      <h1>
        Checkout
      </h1>
      
      <table>
        <tbody>
          {
            /*
          
          isLoggedIn ? (loggedInProducts):(localUserProducts).map((product) => {
            total += product.price
            return (
              //the link will allow users to click on a product to view a single product
              //make sure to update the routes.js to include the link to value route
              <Link to={`/product/${product.id}`}>
              <tr>
                //make sure to create a product component
                <product
                  key={product.id}
                  product={product}/>
                  <p>Quantity to order: {product.howManyTheUserAddedToCart}</p>
                  //these methods depend on whether its in local storage or in a table for the loggedin user
                  <button onClick={() => handleDeleteProduct(product)}>X</button>
                  <button onClick={() => handleIncrementProduct(product)}>Increment</button>
                  <button onClick={() => handleDecrementProduct(product)}>Decrement</button>
              </tr>
              </Link>
            )
          })
          */
          }
        </tbody>
      </table>
      <div>
        <p>Total: {total}</p>
      </div>
      {
        //this button should empty the user's cart (loggedInProducts or localUserProducts) and take user back to main page
        //should also decrement the products table by how much the user bought
      }
      <button onClick={() => handleCompleteCheckout}>Complete Checkout</button>
    </div>
  )
}

export default Checkout;