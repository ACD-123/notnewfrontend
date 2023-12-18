import React, { useState } from "react";
import { Link } from 'react-router-dom';
import ShippingPolicyData from '../Products/Archive/SingleProductElements/ShippingPolicyData';
import ReviewBid from '../Elements/ReviewBid';
import PlaceYourBid from '../Elements/PlaceYourBid';
import BidPlacement from '../Elements/BidPlacement';
import Confirmation from "./Confirmation";
const AuctionProductInformation = () => {
  const [refundDetailsVisible, setRefundDetailsVisible] = useState({});
  const [requestSentVisible, setRequestSentVisible] = useState({});
  const [editBidVisible, setEditBidVisible] = useState({});
  const [confirmBidVisible, setConfirmBidVisible] = useState(false);
  const [additionalPopupVisible, setAdditionalPopupVisible] = useState(false);
  const handleRefundClick = (elementId) => {
    setRefundDetailsVisible({
      ...refundDetailsVisible,
      [elementId]: true,
    });
  };
  const handleEditBidClick = (elementId) => {
    setEditBidVisible({
      ...editBidVisible,
      [elementId]: true,
    });
    setRequestSentVisible({
      ...requestSentVisible,
      [elementId]: false,
    });
  };

  const handleCloseEditBid = (elementId) => {
    setEditBidVisible({
      ...editBidVisible,
      [elementId]: false,
    });
  };
  const handleSubmitDetails = (elementId) => {
    setRefundDetailsVisible({
      ...refundDetailsVisible,
      [elementId]: false,
    });
    setRequestSentVisible({
      ...requestSentVisible,
      [elementId]: true,
    });
  };

  const handleCloseRequestSent = (elementId) => {
    setRequestSentVisible({
      ...requestSentVisible,
      [elementId]: false,
    });
  };
 

  const handleCloseAdditionalPopup = () => {
    setAdditionalPopupVisible(false); // Close additional popup
    window.location.href = '/bidView'; // Redirect to '/bidView' when the button is clicked
  };
  const handleConfirmBidClick = () => {
    setRequestSentVisible({
      ...requestSentVisible,
      element1: false, // Close the requestSentVisible popup for element1
    });
    setAdditionalPopupVisible(true); // Show the additionalPopupVisible popup
  };
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
        <hr />
        <div className='auction-time'>
          <ul>
            <li><span>Condition</span> <em>New with box</em></li>
            <li><span>Auction time left</span> <em style={{color: "red"}}>3h 45m | Today 05:43 AM</em></li>
          </ul>
        </div>
        <hr />
        <div className='row auction-info align-items-center'>
          <div className='col-lg-7'>
            <div className='price-detail'>
              <h5><span>Starting Bid</span><br />$ 38.99</h5>
              <hr />
              <h5><span>Best Offer</span><br />$ 38.99 <em>5 bids</em></h5>
            </div>
          </div>
          <div className='col-lg-5'>
          <div className='pay-buttons'>
            <Link><button onClick={() => handleRefundClick("element1")}>Place a Bid</button></Link>
            <Link onClick={() => handleDropdownItemClick('componentC')}><button>Add to Watchlist</button></Link>
        </div>
          </div>
        </div>
        <ShippingPolicyData />
    </div>

    {/* BIDDING POPUP START */}
    <div className="row">
            <div>
              {refundDetailsVisible["element1"] && (
                <div className="bidplace">
                  <div className="inngerbidplace">
                    <BidPlacement />
                    <div className="yourmax-bid">
                      <h3>Your max bid</h3>
                      <div className="row">
                        <div className="col-lg-9">
                          <input type="text" placeholder="$ 08.50" />
                        </div>
                        <div className="col-lg-3">
                          <button
                            className="plcebid"
                            onClick={() => handleSubmitDetails("element1")}
                          >
                            Place bid
                          </button>
                        </div>
                        <p style={{ color: "#DE0023" }}>Place a higher bid</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {editBidVisible["element1"] && (
        <div className="edit-bid-popup">
          <div className="innreditpopup">
          <PlaceYourBid />
          <div className="row">
          <div className="col-lg-9">
          <input type="text" placeholder="$"/>
          </div>
          <div className="col-lg-3">
          <button onClick={() => handleCloseEditBid("element1")}>Place bid</button>
          </div>
          </div>
          </div>
        </div>
      )}
      {requestSentVisible["element1"] && !editBidVisible["element1"] && (
        <div className="review-bids-c">
          <div className="reviewinner">
            <ReviewBid />
            <div className="biddnbtns">
              <button onClick={() => handleEditBidClick("element1")}>Edit bid</button>
              <button onClick={handleConfirmBidClick}>Confirm Bid</button>
            </div>
            <p style={{ color: "#767676", fontSize: "12px", lineHeight: "22px", margin: "20px 0px" }}>
            When you place your bid, it means you're committing to buy this item if you're the winning bidder. 
              It also means you've read and agreed to the Global Shipping Program Buyer Terms & Conditions Opens in 
              new window or tab.. The import charges shown may change based on your winning bid
            </p>
          </div>
        </div>
      )}
      {additionalPopupVisible && (
        <div className="additional-popup">
          <div className='confirmmm'
    style={{textAlign: "center"}}
    >
          <Confirmation />
          <button onClick={handleCloseAdditionalPopup}>Close</button>
        </div>
        </div>
      )}
            </div>
          </div>
          {/* BIDDING POPUP END */}
    </>
  )
}

export default AuctionProductInformation

