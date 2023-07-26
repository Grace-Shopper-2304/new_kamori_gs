import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../store/singleProductSlice";
import { useParams } from "react-router-dom";
import { addToCart } from "../../store/orderProductsSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const orders = useSelector((state) => state.orders.orders);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getSingleProduct(id));
    }
  }, [dispatch, id]);

  const product = useSelector((state) => state.singleProduct.singleProduct);

  const handleAddToCart = (productId, productPrice) => {
    if (userId && orders.length > 0) {
      const orderId = orders[0].id;
      dispatch(
        addToCart({
          userId,
          productId,
          price: productPrice,
          orderId,
          quantity: 1,
        })
      );
    } else {
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const existingProduct = storedProducts.find((p) => p.id === productId);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        storedProducts.push({
          id: productId,
          name: product.name,
          price: productPrice,
          quantity: 1,
        });
      }

      localStorage.setItem("products", JSON.stringify(storedProducts));
    }
  };

  return (
    <div className="product-details">
      {product ? (
        <>
          <div>
            <h2>Product Details</h2>
            <p>Name: {product.name}</p>
            <img src={`${product.image}`} className="product-img" />
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>

            <p>
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product.id, product.price)}
              >
                Add to Cart
              </button>
            </p>
          </div>
        </>
      ) : (
        <p className="loading-text">Loading product...</p>
      )}
    </div>
  );
};

export default SingleProduct;
