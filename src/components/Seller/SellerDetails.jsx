import React from 'react'
import Sellerprofile from '../../assets/Images/Seller/profileimage.png'
import { Link } from 'react-router-dom'
import ReviewSection from './ReviewSection'
import PopularProductSearch from './PopularProductSearch'
import SellerFeedback from './SellerFeedback'
const SellerDetails = () => {
  return (
    <div className='sellerdetails' style={{padding: "50px 0px"}}>
        <div className='container'>
            <div className='row align-items-center'>
                <div className='col-lg-9'>
                    <div className='profile-details-seller'>
                        <div className='image'>
                            <img src={Sellerprofile} />
                        </div>
                        <div className='profile-record'>
                            <h4>NotNew_Official Store</h4>
                            <ul>
                                <li>90% Positive feedback</li>
                                <li>125k Followers</li>
                                <li>6.7M Items Sold</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div className='seller-callto-actions'>
                        <Link to="#"><button>Visit Seller Shop</button></Link>
                        <Link to="#"><button className='saveseller'>Save this seller</button></Link>
                        <Link to="#"><button className='messageseller'>Message seller</button></Link>
                    </div>
                </div>
            </div>
            {/* SECOND ROW */}
            <div className='row'
            style={{padding: "40px 0px"}}
            >
                <div className='col-lg-6 review'>
                    <h1>Detailed Seller Ratings</h1>
                    <p className='monthtext'>Last 12 months</p>
                <ReviewSection />
                <PopularProductSearch />
                </div>
                <div className='col-lg-6'>
                <SellerFeedback />
                </div>
            </div>
            {/* SECOND ROW */}
        </div>
    </div>
  )
}

export default SellerDetails