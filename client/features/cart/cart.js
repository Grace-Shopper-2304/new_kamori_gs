import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getIncompleteOrders } from '../../store/ordersSlice';
import { me } from '../auth/authSlice';
import { getOrderProducts } from '../../store/orderProductsSlice';
import { incrementProduct, decrementProduct, removeFromCart } from '../../store/orderProductsSlice';

export const Cart = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);
  const orders = useSelector((state) => state.orders.orders);
  const orderProducts = useSelector((state) => state.orderProducts.orderProducts || []);

  const storedProducts = JSON.parse(localStorage.getItem('products'));
  const [products, setProducts] = useState(storedProducts);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(getIncompleteOrders(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (orders?.length > 0) {
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

  if (!userId || !orderProducts || orders?.length === 0) {
    return null;
  }

// Return form for users that are NOT signed in
if (!userId) {
  return (
    <div>
      <h1>Your Cart</h1>
      {storedProducts && storedProducts.length > 0 ? (
        <>
          {storedProducts.map((storedProduct) => (
            <div key={storedProduct.id}>
              <p>Product: {storedProduct.name}</p>
              <p>Price: {storedProduct.price}</p>
              <p>
                Quantity: {storedProduct.quantity}
                <button onClick={() => handleIncrement(orderProduct.id)}>
                  +
                </button>
                <button onClick={() => handleDecrement(orderProduct.id)}>
                  -
                </button>
              </p>
              <p>
                <button onClick={() => handleRemove(orderProduct.id)}>
                  Remove Item
                </button>
              </p>
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
  );
}

// Return form for Users that are logged in
return (
  <div>
    <h1>Your Cart</h1>
    {userId && orders.length > 0 ? (
      <>
        {orders.map((order) => (
          <div key={order.id}>
            {orderProducts.length > 0 ? (
              orderProducts.map((orderProduct) => (
                <div key={orderProduct.id}>
                  {orderProduct.product ? (
                    <>
                      <p>Product: {orderProduct.product.name}</p>
                      <p>
                        Price: {orderProduct.product.price}(
                        {orderProduct.quantity}) = $
                        {orderProduct.product.price * orderProduct.quantity}
                      </p>
                      <p>
                        Quantity: {orderProduct.quantity}{" "}
                        <button
                          onClick={() => handleIncrement(orderProduct.id)}
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleDecrement(orderProduct.id)}
                        >
                          -
                        </button>
                      </p>
                      <p>
                        <button onClick={() => handleRemove(orderProduct.id)}>
                          Remove Item
                        </button>
                      </p>
                    </>
                  ) : (
                    <p>Product data not available...</p>
                  )}
                </div>
              ))
            ) : (
              <p>Your cart is empty!</p>
            )}
            <h2>
              Your total is $
              {orderProducts.reduce(
                (total, orderProduct) =>
                  total + orderProduct.product.price * orderProduct.quantity,
                0
              )}
            </h2>
          </div>
        ))}
      </>
    ) : (
      <div>Not logged in stuff here</div>
    )}
    {orderProducts.length > 0 ? (
      <>
        <button type="button">Checkout</button>
      </>
    ) : null}
  </div>
);
    }