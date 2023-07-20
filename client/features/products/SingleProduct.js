import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct, updateProduct } from "../../store/singleProductSlice";
import { Link, useParams } from "react-router-dom";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks.singleProduct);
  const [updateProduct, setUpdatedProduct] = useState({
    // Insert Product Details for Use State
  });
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOneProduct(id));
  }, []);

  useEffect(() => {
    if (product) {
      setUpdatedProduct({
        description: product.description,
        category: product.category,
        difficulty: product.difficulty,
      });
    }
  }, [product]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      await dispatch(editProductAsync({ id, ...updatedProduct }));

      dispatch(getOneProduct(id));
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleChange = (e) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {product ? (
        <div>
          <h2>Product Details</h2>
          <p>Description: {product.description}</p>
          <p>Category: {product.category}</p>
          <p>Difficulty: {product.difficulty}</p>
          <p>Status: {product.complete ? "Complete" : "Not Complete"}</p>
          <p>
            Assigned User:{" "}
            {product.User ? (
              <Link
                to={`/users/${product.User.id}`}
              >{`${product.User.firstName} ${product.User.lastName}`}</Link>
            ) : (
              "No assigned user"
            )}
          </p>
          
          <h2>Update Product</h2>
          <form onSubmit={handleUpdateProduct}>
            <div>
              <label htmlFor="description">Description:</label> 
              <input
                type="text" //Update all of this andbelow with product details
                id="description"
                name="description"
                value={updateProduct.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                value={updateProduct.category}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="difficulty">Difficulty:</label>
              <input
                type="number"
                id="difficulty"
                name="difficulty"
                value={updatedTask.difficulty}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      ) : (
        <p>Loading product...</p>
      )}
    </>
  );
};

export default SingleProduct;
