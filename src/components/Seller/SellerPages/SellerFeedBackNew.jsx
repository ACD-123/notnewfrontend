import React from 'react'
import SellerFeedback from '../SellerFeedback'
import CustomerReviews from '../../Elements/SellerElements/CustomerReviews'
import ReviewSection from '../ReviewSection'


const SellerFeedbackNew = () => {
  return (
   <>
   <div className='reviw-seller-page'>
   <div className='row'
   style={{padding: "30px 0px"}}
   >
    <div className='col-lg-6'>
      <h3>Customer Feedback Stats</h3>
      <p>Last 12 months</p>
    <CustomerReviews />
    </div>
    <div className='col-lg-6'>
    <h3>Detailed Seller Ratings</h3>
      <p>Last 12 months</p>
      <ReviewSection />
    </div>
   </div>
   <SellerFeedback />
   </div>
   </>
  )
}

export default SellerFeedbackNew