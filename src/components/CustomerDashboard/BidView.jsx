import React, { useState, useEffect } from "react";
import ProductCard from "../Elements/ProductCard";
import Header from "../Header";
import Footer from "../Footer";
import { Link, useNavigate } from "react-router-dom";
import WinningBidProduct from "../WinnigBidProduct";
import BidPlacement from "../Elements/BidPlacement";
import ReviewBid from "../Elements/ReviewBid";
import PlaceYourBid from "../Elements/PlaceYourBid";
import Checkimg from "../../assets/Images/Auction/check.png";
import BidsServices from "../../services/API/BidsServices";
import UserServices from "../../services/API/UserServices";
import ProductServices from "../../services/API/ProductServices";
import moment from "moment";
import { toast } from "react-toastify";

const BidView = ({cartFullResponse , notificationCount}) => {
  const [refundDetailsVisible, setRefundDetailsVisible] = useState({});
  const [requestSentVisible, setRequestSentVisible] = useState({});
  const [editBidVisible, setEditBidVisible] = useState({});
  const [additionalPopupVisible, setAdditionalPopupVisible] = useState(false);
  const [totalbid, setTotalBid] = useState(0);
  const [totalbids, setTotalBids] = useState(0);
  const [bidata, setBidData] = useState({});
  const [media, setMedia] = useState("");
  const [product, setProduct] = useState({});
  const [categoryproduct, setCategoryProduct] = useState({});
  const [bids, setBids] = useState(false);
  const [placedbids, setPlacedBids] = useState(false);
  const [bestoffer, setBestOffer] = useState(0);
  const [errors, setErrors] = useState({});
  const [shippingprice, setShippingPrice] = useState(0);
  const [productbids, setProductBids] = useState(0);
  const [currenttime, setCurrentTime] = useState("");
  const [productData, setProductData] = useState([]);
  const [hour, setHour] = useState("");
  const [minutes, setMinutes] = useState("");
  const navigate = useNavigate()
  const { pathname } = window.location;
  const id = pathname.split("/").pop();

  const getProduct = () => {
    ProductServices.get(id).then((response) => {
      setProductData(response);
      setShippingPrice(response.shipping_price);
      setProductBids(response.bids);
      var date = new Date();
      var date1 = moment(date, "MM/DD/YYYY");
      var date2 = moment(
        moment(response.auction_listing).toDate(),
        "MM/DD/YYYY"
      );
      var duration = moment.duration(date2.diff(date1));
      var hours = duration.asHours();
      var minutes = hours.toFixed(2);
      setHour(hours.toString().split(".")[0]);
      setMinutes(minutes.toString().split(".")[1]);
      const currDate = new Date();
      setCurrentTime(moment(currDate).format("hh:mm A"));
      ProductServices.getbycategory(response.category?.id).then((response) => {
        setCategoryProduct(response);
      });
    });

  };
  const getProductTotalBids = () => {
    BidsServices.getProductBids(id).then((response) => {
    });
  };

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
    const newErrors = {};
    if (!totalbids) {
      newErrors.bids = "Place a higher bid";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      if (totalbids < productbids) {
        newErrors.bids = "Max Bids must be Greater the Product Bids!";
      } else if (bestoffer > totalbids) {
        newErrors.bids = "Your Bid is less then Maximun Bid!";
      } else {
        let data = {
          max_bids: totalbids,
          shipping_charges: shippingprice,
          time_bids: currenttime,
          estimated_total: parseFloat(totalbids) + parseFloat(shippingprice),
          id: id,
        };
        BidsServices.save(data)
          .then((response) => {
            if (response.status) {
              setBids(response.data);
              setPlacedBids(true);
              setRefundDetailsVisible({
                ...refundDetailsVisible,
                [elementId]: false,
              });
              setRequestSentVisible({
                ...requestSentVisible,
                [elementId]: true,
              });
            }
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message)
          });
      }
    }
  };

  const handleCloseAdditionalPopup = () => {
    setAdditionalPopupVisible(false);
  };
  const handleConfirmBidClick = () => {
  };

  const getUserProductBids = () => {
    UserServices.getBid(id).then((response) => {
      if (response.status) {
        setMedia(response.data.product.media[0].name);
        setBidData(response.data.max_bids);
        if (totalbid > bidata) {
          setBids(true);
        }
      }
    });
  };
  const handleCallback = (childData) => {
    setTotalBids(childData);
  };
  const getBestOffer = () => {
    BidsServices.getMaxBids(id).then((response) => {
      setBestOffer(response);
    });
  };
  const handleMaxBids = (e) => {
    setTotalBids(e.target.value);
  };
  useEffect(() => {
    getProductTotalBids();
    getUserProductBids();
    getBestOffer();
    getProduct();
  }, []);
  return (
    <>
      <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount}/>
      <section id="product-recents-viewed">
        <div className="container">
          {bids ? (
            <>
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
            </>
          ) : (
            ""
          )}
          <div className="row">
            <WinningBidProduct totalbid={totalbid} img={media} />
          </div>
          <div className="row">
            <div className="headings">
              <h3>
                {product.category?.name}{" "}
                <span>
                  <Link to="/category">View More</Link>
                </span>
              </h3>
            </div>
          </div>
          <div className="row">
            <div>
              {refundDetailsVisible["element1"] && (
                <div className="bidplace">
                  <div className="inngerbidplace">
                    <BidPlacement
                      bidsPlaced={placedbids}
                      maxbids={bestoffer}
                      parentCallback={handleCallback}
                    />
                    <div className="yourmax-bid">
                      <h3>Your max bid</h3>
                      <div className="row">
                        <div className="col-lg-9">
                          <input
                            type="text"
                            onChange={handleMaxBids}
                            placeholder="$ 08.50"
                          />
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
                    <PlaceYourBid parentCallback={handleCallback} />
                    <div className="row">
                      <div className="col-lg-9">
                        <input type="text" placeholder="$" />
                      </div>
                      <div className="col-lg-3">
                        <button onClick={() => handleCloseEditBid("element1")}>
                          Place bid
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {requestSentVisible["element1"] &&
                !editBidVisible["element1"] && (
                  <div className="review-bids-c">
                    <div className="reviewinner">
                      <ReviewBid />
                      <div className="biddnbtns">
                        <button onClick={() => handleEditBidClick("element1")}>
                          Edit bid
                        </button>
                        <button onClick={handleConfirmBidClick}>
                          Confirm Bid
                        </button>
                      </div>
                      <p
                        style={{
                          color: "#767676",
                          fontSize: "12px",
                          lineHeight: "22px",
                          margin: "20px 0px",
                        }}
                      >
                        When you place your bid, it means you're committing to
                        buy this item if you're the winning bidder. It also
                        means you've read and agreed to the Global Shipping
                        Program Buyer Terms & Conditions Opens in new window or
                        tab.. The import charges shown may change based on your
                        winning bid
                      </p>
                    </div>
                  </div>
                )}
              {additionalPopupVisible && (
                <div className="additional-popup">
                  <div className="confirmmm" style={{ textAlign: "center" }}>
                    <div className="cnfm">
                      <img src={Checkimg} />
                      <h2>
                        Your Bid has been
                        <br /> Successfully submitted
                      </h2>
                    </div>
                    <button onClick={handleCloseAdditionalPopup}>Close</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {categoryproduct ? (
          <>
            <ProductCard products={categoryproduct} />
          </>
        ) : (
          ""
        )}
      </section>
      <Footer />
    </>
  );
};

export default BidView;
