import React from "react";
import { Link } from "react-router-dom";

const Products = ({ product, onDeleteProducts }) => {
  return (
    <section>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} />
        <div className="product-name">{product.name}</div>
        <div className="product-price">${product.price}</div>
      </Link>
    </section>
  );
};

export default Products;
