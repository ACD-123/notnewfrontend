import React from 'react'
import Attribute from './Attributes'
import ShippingPolicyData from "./ShippingPolicyData"
import { Link } from 'react-router-dom'
const ProductInformation = () => {

  const handleDropdownItemClick = (componentName) => {
    // Here, you can navigate to the 'Activity' component and pass the selected component name as a query parameter or state
    // For example, using query parameter
    window.location.href = `/customerdashboard?component=${componentName}`;
  };
  return (
    <>
    <div className='product-info'>
        <h3>adidas Adizero SL Running Shoes Men's</h3>
        <p>Free Shipping and Returns</p>
        <Attribute />
        <hr />
        <div className='price-product'>
            <h5>Price: <span>$ 38.99</span></h5>
        </div>
        <div className='pay-buttons'>
            <Link to="/checkout"><button>Buy It Now</button></Link>
            <Link to="/shoppingcart"><button>Add to Cart</button></Link>
            <Link onClick={() => handleDropdownItemClick('componentC')}><button>Add to Watchlist</button></Link>
        </div>
        <ShippingPolicyData />
    </div>
    </>
  )
}

export default ProductInformation

