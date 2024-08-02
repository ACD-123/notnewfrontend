import React, { useState, useEffect } from "react";
import ProductCard from "../Elements/ProductCard";
import Header from "../Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import WinningBidProduct from "../WinnigBidProduct";
import BidPlacement from "../Elements/BidPlacement";
import ReviewBid from "../Elements/ReviewBid";
import PlaceYourBid from "../Elements/PlaceYourBid";
import Checkimg from '../../assets/Images/Auction/check.png'
import BidsServices from "../../services/API/BidsServices"; //~/services/API/BidsServices
import UserServices from "../../services/API/UserServices"; //~/services/API/UserServices
import ProductServices from "../../services/API/ProductServices"; //~/services/API/ProductServices
import moment from "moment";

const BidWin = ({cartFullResponse , notificationCount}) => {
  const [totalbid, setTotalBid] = useState(0);
  const [media, setMedia] = useState("");
  const [product, setProduct] = useState({});
  const [bidata, setBidData] = useState({});
  const [bids, setBids] = useState(false);

  const { pathname } = window.location;
  const id = pathname.split("/").pop();
  const getUserProductBids = () => {
    UserServices.getBid(id).then((response) => {
      if (response.status) {
        setMedia(response.data.product.media[0].name);
        setProduct(response.data.product);
        localStorage.setItem('bid_product', JSON.stringify(response.data.product));
        setBidData(response.data.max_bids);
        if (totalbid > bidata) {
          setBids(true);
        }
      }
    });
  };
  useEffect(() => {
    getUserProductBids();
  }, []);
  return (
    <>
      {/* Header */}
      <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount}/>
      <section id="product-recents-viewed">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="message-alert-biddings">
                <p><em>Congrats you’ve won the Auction of product {product.name}</em><br />
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
              <Link to="/cart">
                <button>
                Go Back To Shopping
                </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <WinningBidProduct totalbid={totalbid} img={media} />
          </div>
          <div className="row">
            <div className="headings">
              <h3>
                Antique Auctions
                <span>
                  <Link to="/category">View More</Link>
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
