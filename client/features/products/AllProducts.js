import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllProducts,
  selectProducts,
} from "../../../client/store/allProductsSlice";
import { NavLink } from "react-router-dom";

export function AllProducts() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const products = useSelector(selectProducts);

  return (
    <>
      <div className="all-products-container">
        {products ? (
          products.map((product) => (
            <div className="product-container" key={product.id}>
              <NavLink to={`/products/${product.id}`}>
                <p id="product-name">{product.name}</p>

                <div className="all-product-details">
                  <img src={product.image} alt={product.name} />
                  <p>Price: {product.price}</p>
                </div>
              </NavLink>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </>
  );
}

export default AllProducts;
