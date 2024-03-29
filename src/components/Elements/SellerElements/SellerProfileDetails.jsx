import React, { useState, useEffect } from "react";
import ProfileDb from '../../../assets/Images/SellerShop/profiledb.png'
import Icon1 from '../../../assets/Images/SellerShop/icon1.png'
import Icon2 from '../../../assets/Images/SellerShop/icon2.png'
import Icon3 from '../../../assets/Images/SellerShop/icon3.png'
import SellerServices from "../../../services/API/SellerServices"; //~/services/API/SellerServices

const SellerProfileDetails = (props) => {
    let shopData = props.shopdata;
    const getFeedback = () =>{
        SellerServices.getFeedBack()
        .then((response) => {
            console.log('feedback', response)
        
            // setSaveSeller(response);
        });
    }
    useEffect(() => {
        getFeedback();
      }, []);
  return (
    <>
    {shopData? (
        <>
            <div className='sellerdetails'>
                <div className='row align-items-end'>
                    <div className='col-lg-7'>
                        <div className='profile-seller-shop'>
                            <div className='image'>
                                <img src={ProfileDb} />
                            </div>
                            <div className='details-seller'>
                                <h2>{shopData.fullname}</h2>
                                <ul>
                                    <li>90% Positive feedback</li>
                                    <li>125k Followers</li>
                                    <li>6.7M Items Sold</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-5'>
                        <div className='seller-mesge'>
                            <ul>
                                <li><img src={Icon3} />Share</li>
                                <li><img src={Icon2} />Message Seller</li>
                                <li><img src={Icon1} />Save this Seller</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ):("")}
    </>
  )
}

export default SellerProfileDetails