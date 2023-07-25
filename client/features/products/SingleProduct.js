import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct, updateProduct } from "../../store/singleProductSlice";
import { useParams } from "react-router-dom";
import { addToCart } from "../../store/orderProductsSlice";
import { getOrders } from "../../store/ordersSlice";
import { getOrderProducts } from "../../store/orderProductsSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const orders = useSelector((state) => state.orders.orders);

  
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

const handleAddToCart = (productId, productPrice) => {
  if (userId && orders.length > 0) {
    const orderId = orders[0].id;
    dispatch(addToCart({ userId, productId, price: productPrice, orderId, quantity: 1 }));
  } else {
    // For unregistered users, use local storage to add products
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const existingProduct = storedProducts.find((p) => p.id === productId);

    if (existingProduct) {
      // If the product is already in the cart, update the quantity
      existingProduct.quantity++;
    } else {
      // Otherwise, add the product to the cart
      storedProducts.push({ id: productId, name: product.name, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('products', JSON.stringify(storedProducts));
  }
};

  return (
    <div className="product-details">
      {product ? (
         <>
        <div>
          <h2>Product Details</h2>
          <p>Name: {product.name}</p>
          <img src={`${product.image}`} className="product-img" />
          <p>Description: {product.description}</p>
          <p>Price: ${product.price}</p>
    
          <p><button className="add-to-cart-button" onClick={() => handleAddToCart(product.id, product.price)}>Add to Cart</button></p> 
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
        </>
      ) : (
        <p className="loading-text">Loading product...</p>
      )}
 </div>
  );
};

export default SingleProduct;
