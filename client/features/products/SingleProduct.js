import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct, updateProduct } from "../../store/singleProductSlice";
import { Link, useParams } from "react-router-dom";

const SingleProduct = () => {
  const dispatch = useDispatch();
/*   const [updateProduct, setUpdatedProduct] = useState({
    // Insert Product Details for Use State
  }); */
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getSingleProduct(id));
    }
  }, [dispatch, id]);

  const product = useSelector((state) => state.singleProduct.singleProduct);

   /* useEffect(() => {
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
  }; */

  return (
    <>
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <img src={`${product.image}`} className="product-img" />
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>

          
          {/*  <h2>Update Product</h2>
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
          </form> */}
        </div>
      ) : (
        <p>Loading product...</p>
      )}
    </>
  );
};

export default SingleProduct;
