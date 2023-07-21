import React from "react";
import { Link } from "react-router-dom";

const Products = ({ product, onDeleteProducts }) => {
  return (
    <section>
      <Link to={`/products/${product.id}`}>
        <div>{product.name}</div>
        <div>{product.image}</div>
        <div>{product.description}</div>
        <div> {product.category}</div>
        <div> {product.price}</div>
        <div> {product.stock}</div>
      </Link>
    </section>
  );
};

export default Products;
