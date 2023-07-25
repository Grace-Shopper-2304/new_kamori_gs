/* import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, selectProducts } from "../../../client/store/allProductsSlice"; // Make sure to import the selectProducts function
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
              </NavLink>
              <div className="all-product-details">
                <p>{product.description}</p>
                <img src={product.image} alt={product.name} />
                <p>Category: {product.category}</p>
                <p>Price: {product.price}</p>
                <p>Stock: {product.stock}</p>
              </div>
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
 */