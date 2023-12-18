import React, { useState } from "react";
import ProductCard from "../Elements/ProductCard";
import Header from "../Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import WinningBidProduct from "../WinnigBidProduct";
import BidPlacement from "../Elements/BidPlacement";
import ReviewBid from "../Elements/ReviewBid";
import PlaceYourBid from "../Elements/PlaceYourBid";
import Checkimg from '../../assets/Images/Auction/check.png'
const BidWin = () => {
 
  return (
    <>
      {/* Header */}
      <Header />
      <section id="product-recents-viewed">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="message-alert-biddings">
                <p><em>Congrats you’ve won the Auction of product#c6d4e64cd</em><br />
                    <span>You Got 48 hours To Pay For this Auction Product</span>
                </p>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="increase-bid-button">
                <Link to="/checkout">
                <button>
                Pay Now
                </button>
                </Link>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="increase-bid-button">
              <Link to="/shoppingcart">
                <button>
                Go Back To Shopping
                </button>
                </Link>
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
          
        </div>
        <ProductCard />
      </section>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default BidWin;
