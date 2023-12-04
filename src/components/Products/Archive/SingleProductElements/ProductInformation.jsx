import React from 'react'
import Attribute from './Attributes'
import ShippingPolicyData from "./ShippingPolicyData"
import { Link } from 'react-router-dom'
const ProductInformation = () => {
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
            <Link><button>Add to Watchlist</button></Link>
        </div>
        <ShippingPolicyData />
    </div>
    </>
  )
}

export default ProductInformation