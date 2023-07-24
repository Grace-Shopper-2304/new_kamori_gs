import React from 'react';
import {connect, useDispatch, useSelector} from 'react-redux'
import { getIncompleteOrders } from '../../store/ordersSlice'
import { me } from '../auth/authSlice'
import { getOrderProducts } from '../../store/orderProductsSlice'
import { incrementProduct, decrementProduct, removeFromCart, deleteAllCart, updateProductQuantities } from '../../store/orderProductsSlice'

const Checkout = () => {
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

const handleCompleteCheckout = () => {
  dispatch(updateProductQuantities(orders[0].id));
  dispatch(deleteAllCart());
  
}

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
           <h2>Your total is ${orderProducts.reduce((total, orderProduct) => total + orderProduct.product.price * orderProduct.quantity, 0)}</h2>
        </div>
      ))}
    </>
  ) : (
    <div>
      Not logged in stuff here
    </div>
  )}
  <div>
      {
        //this button should empty the user's cart (loggedInProducts or localUserProducts) and take user back to main page
        //should also decrement the products table by how much the user bought
        //add a link to the main page here on the button
      }
      <button onClick={() => handleCompleteCheckout()}>Complete Checkout</button>
    </div>

  </div>
  )
  
}

export default Checkout;