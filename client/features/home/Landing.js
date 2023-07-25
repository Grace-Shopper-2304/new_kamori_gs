import React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../store/allProductsSlice';
import { NavLink } from 'react-router-dom';

/**
 * COMPONENT
 */
const Landing = (props) => {
  const products = useSelector(selectProducts);

  return (
    <div>
      <h3>Recommended for you</h3>
      <div className="all-products-container">
  {products ? (
    products.slice(12, 15).map((product) => (
      <div className="product-container" key={product.id}>
        <NavLink to={`/products/${product.id}`}>
          <p id="product-name">{product.name}</p>
        </NavLink>
        <div className="all-product-details">
          <img src={product.image} alt={product.name} />
        </div>
      </div>
    ))
  ) : (
    <p>No products found.</p>
  )}
</div>
    </div>
  );
};

export default Landing;
