import React from 'react'
import Sellerprofile from '../../assets/Images/Seller/profileimage.png'
import { Link } from 'react-router-dom'
import ReviewSection from './ReviewSection'
import PopularProductSearch from './PopularProductSearch'
import SellerFeedback from './SellerFeedback'
import { useState, useEffect } from 'react'
import Home from "../../services/API/Home"; //~/services/API/Home
import ProductServices from "../../services/API/ProductServices"; //~/services/API/ProductServices
import { toast } from "react-toastify";
import { BASE_URL } from "../../services/Constant";

const SellerDetails = () => {
    const [shopData, setShopData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [trendingProduct, setTrendingProduct] = useState(0);
    const { pathname } = window.location;
    const id = pathname.split("/").pop();
    const handleDropdownItemClick = (componentName) => {
        // Here, you can navigate to the 'Activity' component and pass the selected component name as a query parameter or state
        // For example, using query parameter
        window.location.href = `/customerdashboard?component=${componentName}`;
      };
      const getProduct = () => {
        ProductServices.get(id).then((res) => {
          setProductData(res);
          Home.getshopData(res?.shop_id)
            .then((response) => {
                if(response.status){
                    console.log('response', response.data)
                    setShopData(response.data)
                }
            }).catch((e) => {
                console.log(e)
            }); 
        //   setShopData(res.shop_id);
        });
      };
    const getItemSold = () => {
        ProductServices.getTrendingProduct(id).then((response) => {
            setTrendingProduct(response)
        });
    };
useEffect(() => {
    getProduct();
    // getItemSold();
}, []);
  return (
    <div className='sellerdetails' style={{padding: "50px 0px"}}>
        {shopData ? (
            <>
                 <div className='container'>
                        <div className='row align-items-center'>
                            <div className='col-lg-9'>
                                <div className='profile-details-seller'>
                                    <div className='image'>
                                        <img src={`${BASE_URL}/${shopData.cover_image}`}  width="100" height="100" />
                                    </div>
                                    <div className='profile-record'>
                                        <h4>{shopData.fullname}</h4>
                                        <ul>
                                            <li>90% Positive feedbackss</li>
                                            <li>125k Followers</li>
                                            <li>{trendingProduct} Items Sold</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3'>
                                <div className='seller-callto-actions'>
                                    <Link to="/sellershop"><button>Visit Seller Shop</button></Link>
                                    <Link><button onClick={() => handleDropdownItemClick('componentH')} className='saveseller'>Save this seller</button></Link>
                                    <Link><button onClick={() => handleDropdownItemClick('componentI')} className='messageseller'>Message seller</button></Link>
                                </div>
                            </div>
                        </div>
                        {/* SECOND ROW */}
                        <div className='row'
                        style={{padding: "40px 0px"}}
                        >
                            <div className='col-lg-6 review'>
                                <h2>Detailed Seller Ratings</h2>
                                <p className='monthtext'>Last 12 months</p>
                            <ReviewSection />
                            <PopularProductSearch shopId={shopData.id} />
                            </div>
                            <div className='col-lg-6'>
                            <SellerFeedback />
                            </div>
                        </div>
                        {/* SECOND ROW */}
                    </div>
            </>
        ):(<></>)}
                   
    </div>
  )
}

export default SellerDetails