import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, selectProducts } from "../../../client/store/allProductsSlice";
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
        {products.map((product) => {
          return (
            <div className="product-container">
              <NavLink to={`/products/${product.id}`} key={`All products: ${product.id}`}>
                <p id="product-name">{product.name}</p>
              </NavLink>
              <div className="all-product-details">
                <p> {product.description}</p>
                <p> {product.imageUrl}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AllProducts;
