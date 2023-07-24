import React from "react";
import { Link } from "react-router-dom";

const Products = ({ product, onDeleteProducts }) => {
  return (
    <section>
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} />
        <div>{product.name}</div>
        <div> ${product.price}</div>
      </Link>
    </section>
  );
};

export default Products;
