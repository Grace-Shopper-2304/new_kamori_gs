
               {/*
            //if logged in get items for that user

            // return orders where userId, include [orderProducts]

            //(most likely using async thunk to the orderProducts? table)
            //otherwise show table of products from local storage
            //how are we getting the user's products array from local storage
            //put a table with all the user products in here
            //each product will also have the option to change quantity
            //also the user can remove the product all together from the cart
   
           
          
          isLoggedIn ? (loggedInProducts):(localUserProducts).map((product) => {
            return (
              //the link will allow users to click on a product to view a single product
              //make sure to update the routes.js to include the link to value route
              <Link to={`/product/${product.id}`}>
              <tr>
                //make sure to create a product component
                <product
                  key={product.id}
                  product={product}/>
                  //these methods depend on whether its in local storage or in a table for the loggedin user
                  <button onClick={() => handleDeleteProduct(product)}>X</button>
                  <button onClick={() => handleIncrementProduct(product)}>Increment</button>
                  <button onClick={() => handleDecremntProduct(product)}>Decrement</button>
              </tr>
              </Link>
            )
          })
          */}
           

         

          {
            //at the end of the page add a checkout button
            //checkout button should take you to a checkout component on a different page
          }
    
      
        
    
    /* const mapState = state => {
      return {
        isLoggedIn: !!state.user.id
      }
    }
    
    export default connect(mapState)(Cart)
    
    Cart.propTypes = {
      isLoggedIn: PropTypes.bool.isRequired
    } */