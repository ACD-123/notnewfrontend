import React, { useState } from "react";
import ProductCard from "../Elements/ProductCard";
import Header from "../Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import WinningBidProduct from "../WinnigBidProduct";
import BidPlacement from "../Elements/BidPlacement";
import ReviewBid from "../Elements/ReviewBid";
import PlaceYourBid from "../Elements/PlaceYourBid";

const BidView = () => {
  const [refundDetailsVisible, setRefundDetailsVisible] = useState({});
  const [requestSentVisible, setRequestSentVisible] = useState({});
  const [editBidVisible, setEditBidVisible] = useState({}); // New state for edit bid popup

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
  return (
    <>
      {/* Header */}
      <Header />
      <section id="product-recents-viewed">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-10">
              <div className="message-alert-biddings">
                <p>Your currently losing the Bid</p>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="increase-bid-button">
                <button onClick={() => handleRefundClick("element1")}>
                  Increase Bid
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <WinningBidProduct />
          </div>
          <div className="row">
            <div className="headings">
              <h3>
                Antique Auctions{" "}
                <span>
                  <Link to="/singlecategory">View More</Link>
                </span>
              </h3>
            </div>
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
              <button onClick={() => handleCloseRequestSent("element1")}>Confirm Bid</button>
            </div>
            <p style={{ color: "#767676", fontSize: "12px", lineHeight: "22px", margin: "20px 0px" }}>
            When you place your bid, it means you're committing to buy this item if you're the winning bidder. 
              It also means you've read and agreed to the Global Shipping Program Buyer Terms & Conditions Opens in 
              new window or tab.. The import charges shown may change based on your winning bid
            </p>
          </div>
        </div>
      )}
             
            </div>
          </div>
          {/* BIDDING POPUP END */}
        </div>
        <ProductCard />
      </section>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default BidView;
