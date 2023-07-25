import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
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

  // Initialize the storedProducts state with the products from local storage or an empty array
  const [storedProducts, setStoredProducts] = useState(
    JSON.parse(localStorage.getItem('products')) || []
  );

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(storedProducts));
  }, [storedProducts]);

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(getIncompleteOrders(userId));
      // If the user is authorized, initialize storedProducts state with orderProducts from redux store
      setStoredProducts(orderProducts);
    }
  }, [dispatch, userId, orderProducts]);

  useEffect(() => {
    if (orders?.length > 0) {
      const currentCart = orders[0];
      dispatch(getOrderProducts(currentCart.id));
    }
  }, [dispatch, orders]);

  const handleIncrement = (orderProductId) => {
    dispatch(incrementProduct(orderProductId));

    // Update the storedProducts state after incrementing the product quantity
    setStoredProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === orderProductId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const handleDecrement = (orderProductId) => {
    dispatch(decrementProduct(orderProductId));

    // Update the storedProducts state after decrementing the product quantity
    setStoredProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === orderProductId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const handleRemove = (orderProductId) => {
    dispatch(removeFromCart(orderProductId));

    // Update the storedProducts state after removing the product
    setStoredProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== orderProductId)
    );
  };

  // Return form for users that are NOT signed in
  if (!userId) {
    return (
      <div className="cart-container">
        <h1>Your Cart</h1>
        {storedProducts && storedProducts.length > 0 ? (
          <>
            {storedProducts.map((storedProduct) => (
              <div className="product-item" key={storedProduct.id}>
                {/* Display product details for unauthorized users */}
                <p className="product-name">Product: {storedProduct.name}</p>
                <p className="product-price">Price: {storedProduct.price}</p>
                <div className="product-quantity">
                  Quantity: {storedProduct.quantity}
                  <button onClick={() => handleIncrement(storedProduct.id)}>
                    +
                  </button>
                  <button onClick={() => handleDecrement(storedProduct.id)}>
                    -
                  </button>
                </div>
                <p>
                  <button onClick={() => handleRemove(storedProduct.id)}>
                    Remove Item
                  </button>
                </p>
              </div>
            ))}
          </>
        ) : (
          <p className="empty-cart">Your cart is empty!</p>
        )}
        {orderProducts.length > 0 ? (
          <h2>
            Your total is ${orderProducts.reduce(
              (total, orderProduct) =>
                total + orderProduct.product.price * orderProduct.quantity,
              0
            )}
          </h2>
        ) : null}
      </div>
    );
  }


// Return form for Users that are logged in
return (
  <div className="cart-container">
    <h1>Your Cart</h1>
    {userId && orders.length > 0 ? (
      <>
        {orders.map((order) => (
          <div className="product-item" key={order.id}>
            {orderProducts.length > 0 ? (
              orderProducts.map((orderProduct) => (
                <div key={orderProduct.id}>
                  {orderProduct.product ? (
                    <>
                      <p className="product-name">Product: {orderProduct.product.name}</p>
                      <p className="product-price">
                        Price: {orderProduct.product.price}(
                        {orderProduct.quantity}) = $
                        {orderProduct.product.price * orderProduct.quantity}
                      </p>
                      <div className="product-quantity">
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
                      </div>
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
              <p className="empty-cart">Your cart is empty!</p>
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
        <button className="checkout-button" type="button">Checkout</button>
      </>
    ) : null}
  </div>
);
}