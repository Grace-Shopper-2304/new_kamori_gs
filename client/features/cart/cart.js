import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect, useDispatch, useSelector} from 'react-redux'
import { getIncompleteOrders } from '../../store/ordersSlice'
import { me } from '../auth/authSlice'
import { getOrderProducts } from '../../store/orderProductsSlice'
import { incrementProduct, decrementProduct, removeFromCart } from '../../store/orderProductsSlice'
//import async thunk to get products for logged in user

export const Cart = () => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.auth.me.id);
  const username = useSelector(state => state.auth.me.username);
  const orders = useSelector((state) => state.orders.orders);
  const orderProducts = useSelector((state) => state.orderProducts.orderProducts);

useEffect(() => {
  dispatch(me());
}, [dispatch]);

useEffect(() => {
  if (userId) {
    dispatch(getIncompleteOrders(userId));
  }
}, [dispatch, userId]);

useEffect(() => {
  if (orders.length > 0) {
    const currentCart = orders[0];
    dispatch(getOrderProducts(currentCart.id));
  }
}, [dispatch, orders]);

const handleIncrement = (orderProductId) => {
  dispatch(incrementProduct(orderProductId));
};

const handleDecrement = (orderProductId) => {
  dispatch(decrementProduct(orderProductId));
};

const handleRemove = (orderProductId) => {
  dispatch(removeFromCart(orderProductId));
};

if (!userId || orders.length === 0 || !orderProducts) {
  return null;
}

  return (
    <div>
      <h1>Your Cart</h1>
      { userId && orders.length > 0 ? (
        <>
       {orders.map((order) => (
        <div key={order.id}>
          {orderProducts.length > 0 ? (
          orderProducts.map((orderProduct) => (
            <div key={orderProduct.id}>
               {orderProduct.product ? ( 
                <>
              <p>Product: {orderProduct.product.name}</p>
              <p>Price: {orderProduct.product.price}({orderProduct.quantity}) =  ${orderProduct.product.price * orderProduct.quantity}</p>
              <p>Quantity: {orderProduct.quantity} <button onClick={() => handleIncrement(orderProduct.id)}>+</button>
              <button onClick={() => handleDecrement(orderProduct.id)}>-</button></p>
                 <p><button onClick={() => handleRemove(orderProduct.id)}>Remove Item</button></p> 
              </>
               ) : (
                <p>Product data not available...</p> 
               )}
            </div>
          ))
          ) : (
            <p>Your cart is empty!</p>
          )}
         { orderProducts.length > 0 ?
           <h2>Your total is ${orderProducts.reduce((total, orderProduct) => total + orderProduct.product.price * orderProduct.quantity, 0)}</h2>
          : null }
        </div>
      ))}
    </>
  ) : (
    <div>
      Not logged in stuff here
    </div>
  )}  
  { orderProducts.length > 0 ? (
    <>
   {/*  <h2>Your total is ${orderProducts.reduce((total, orderProduct) => total + orderProduct.product.price * orderProduct.quantity, 0)}</h2> */}
  <button type="button">Checkout</button> 
  </>) : ( null ) }

               {/*
            //if logged in get items for that user

            // return orders where userId, include [orderProducts]

            //(most likely using async thunk to the orderProducts? table)
            //otherwise show table of products from local storage
            //how are we getting the user's products array from local storage
            //put a table with all the user products in here
            //each product will also have the option to change quantity
            //also the user can remove the product all together from the cart
   
           
          
          isLoggedIn ? (loggedInProducts):(localUserProducts).map((product) => {
            return (
              //the link will allow users to click on a product to view a single product
              //make sure to update the routes.js to include the link to value route
              <Link to={`/product/${product.id}`}>
              <tr>
                //make sure to create a product component
                <product
                  key={product.id}
                  product={product}/>
                  //these methods depend on whether its in local storage or in a table for the loggedin user
                  <button onClick={() => handleDeleteProduct(product)}>X</button>
                  <button onClick={() => handleIncrementProduct(product)}>Increment</button>
                  <button onClick={() => handleDecremntProduct(product)}>Decrement</button>
              </tr>
              </Link>
            )
          })
          */}
           

         

        </div>
  )
      {
        //at the end of the page add a checkout button
        //checkout button should take you to a checkout component on a different page
      }

  
    }

/* const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(Cart)

Cart.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
} */