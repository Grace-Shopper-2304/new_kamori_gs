import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct, updateProduct } from "../../store/singleProductSlice";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const dispatch = useDispatch();
  
 /*  const [updatedProduct, setUpdatedProduct] = useState({
    // Initialize with empty values or default values
    name: "",
    image: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
  }); */
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getSingleProduct(id));
    }
  }, [dispatch, id]);

  const product = useSelector((state) => state.singleProduct.singleProduct);

/*   useEffect(() => {
    if (product) {
      // Update state with the fetched product details
      setUpdatedProduct({
        name: product.name,
        image: product.image,
        description: product.description,
        category: product.category,
        price: product.price,
        stock: product.stock,
      });
    }
  }, [product]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      // Dispatch the updateProduct action with the updatedProduct details
      await dispatch(updateProduct({ id, ...updatedProduct }));

      // Refetch the product data to display the updated details
      dispatch(getSingleProduct(id));
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
*/
  return (
    <>
      {product ? (
        <div>
          <h2>Product Details</h2>
          <p>Name: {product.name}</p>
          <img src={`${product.image}`} className="product-img" />
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>
    
          
         {/*  <h2>Update Product</h2>
          <form onSubmit={handleUpdateProduct}>
            <div>
              <label htmlFor="name">Name:</label> 
              <input
                type="text"
                id="name"
                name="name"
                value={updatedProduct.name}
                onChange={handleChange}
              /> 
            </div>
            <div>
              <label htmlFor="image">Image:</label> 
              <input
                type="text"
                id="image"
                name="image"
                value={updatedProduct.image}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label> 
              <input
                type="text"
                id="description"
                name="description"
                value={updatedProduct.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                value={updatedProduct.category}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="stock">Stock:</label> 
              <input
                type="number"
                id="stock"
                name="stock"
                value={updatedProduct.stock}
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
