import React,{useState, useEffect} from 'react'
import Attribute from './Attributes'
import ShippingPolicyData from "./ShippingPolicyData"
import { Link } from 'react-router-dom'
import ProductServices from '../../../../services/API/ProductServices'; //~/services/API/ProductServices

const ProductInformation = () => {
  const [productData, setProductData] = useState([]);
  const { pathname } = window.location;
  const id = pathname.split("/").pop();
  const saveRecentView = () => {
    let data ={
      'id': id
    }
    ProductServices.createRecent(data)
      .then((response) => {
        console.log('response',response)
      }) 
  };
  const getProduct =() =>{
    ProductServices.get(id)
      .then((response) => {
        setProductData(response)
      }) 
  }
  
  const handleDropdownItemClick = (componentName) => {
    // Here, you can navigate to the 'Activity' component and pass the selected component name as a query parameter or state
    // For example, using query parameter
    window.location.href = `/customerdashboard?component=${componentName}`;
  };
  useEffect(() => {
    saveRecentView();
    getProduct();
  }, []);
  return (
    <>
    <div className='product-info'>
      {/* {productData.length > 0 ?(
        <> */}
          <h3>{productData.name}</h3>
          {(() => {
            if (productData.shipping_price !== 0) {
              return (
                <p>Free Shipping and Returns</p>
              )
            } else {
              return (
                <div>&nbsp;</div>
              )
            }
          })()}
          <Attribute />
          <hr />
          <div className='price-product'>
              <h5>Price: <span>$ {productData.price}</span></h5>
          </div>
          <div className='pay-buttons'>
              <Link to="/checkout"><button>Buy It Now</button></Link>
              <Link to="/shoppingcart"><button>Add to Cart</button></Link>
              <Link onClick={() => handleDropdownItemClick('componentC')}><button>Add to Watchlist</button></Link>
          </div>
          <ShippingPolicyData />
        {/* </>
      ):('')} */}
        
    </div>
    </>
  )
}

export default ProductInformation

