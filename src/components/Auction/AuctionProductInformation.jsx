import React, { useState, useEffect } from "react";
import ReviewBid from "../Elements/ReviewBid";
import PlaceYourBid from "../Elements/PlaceYourBid";
import BidPlacement from "../Elements/BidPlacement";
import ShippingPolicyData from "../Products/Archive/SingleProductElements/ShippingPolicyData";
import Confirmation from "./Confirmation";
import ProductServices from "../../services/API/ProductServices";
import SellerServices from "../../services/API/SellerServices";
import BidsServices from "../../services/API/BidsServices";
import { toast } from "react-toastify";
import { Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/API/UserServices";

const CountdownTimer = ({ initialTimeMicroseconds }) => {
  const [remainingTime, setRemainingTime] = useState(initialTimeMicroseconds);

  useEffect(() => {
    if (remainingTime > 0) {
      const timerId = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [remainingTime]);

  const convertSecondsToTime = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    return `${hours} : ${minutes} : ${seconds}`;
  }

  const timeString = convertSecondsToTime(remainingTime);

  return (
    timeString
  );
}


const AuctionProductInformation = ({ getMoreToLove, setProductId }) => {
  const [refundDetailsVisible, setRefundDetailsVisible] = useState({});
  const [requestSentVisible, setRequestSentVisible] = useState({});
  const [editBidVisible, setEditBidVisible] = useState({});
  const [additionalPopupVisible, setAdditionalPopupVisible] = useState(false);
  const [productData, setProductData] = useState([]);
  const [totalbids, setTotalBids] = useState(0);
  const [productbids, setProductBids] = useState(0);
  const [placedbids, setPlacedBids] = useState(false);
  const [showPlacedbids, setShowPlacedBids] = useState(false);
  const [bestoffer, setBestOffer] = useState(0);
  const [currenttime, setCurrentTime] = useState("");
  const [shippingprice, setShippingPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [customBidPrice, setCustomBidPrice] = useState('');
  const [errors, setErrors] = useState({});
  const [bid, setBids] = useState({});
  const navigate = useNavigate()
  const user_id = localStorage.getItem('user_id');
  const [ProductAttribute, SetproductAttribute] = useState([])
  const { pathname } = window.location;
  const token = localStorage.getItem('access_token');
  const seller_guid = localStorage.getItem('seller_guid');
  const id = pathname.split("/").pop();

  const saveRecentView = () => {
    let data = {
      id: id,
    };
    SellerServices.createRecent(data).then((response) => {
    });
  };

  const handleCallback = (childData) => {
    setTotalBids(childData)
  }
  const handleMaxBids = (e) => {
    setTotalBids(e.target.value);
  }

  const getProduct = () => {
    ProductServices.get(id).then((response) => {
      setProductData(response?.data);
      setShippingPrice(response.shipping_price);
      setProductBids(response.bids);
      getMoreToLove(response?.data?.id)
      setProductId(response?.data?.id)
      const categoryAddons = response?.data?.attributes?.map(attribute => ({
        name: attribute.key,
        selected: null,
        options: attribute.options.map((option, index) => ({
          value: index + 1,
          label: option
        })),
        selectToSend: []
      }));
      SetproductAttribute(categoryAddons);
    })
      .finally(() => {
        setIsLoading(false);
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
          'max_bids': totalbids,
          'shipping_charges': shippingprice,
          'time_bids': currenttime,
          'estimated_total': parseFloat(totalbids) + parseFloat(shippingprice),
          'id': id
        }
        BidsServices.save(data).then((response) => {
          if (response.status) {
            // if(response.status === "prohibited"){
            //   newErrors.bids = response.data;
            // }else{
            setBids(response.data)
            setPlacedBids(true)
            setRequestSentVisible({
              ...requestSentVisible,
              [elementId]: true,
            });
            // handleDropdownItemClick("componentC")
            // }
          }
        })
          .catch((error) => {
            toast.error(error?.response?.data?.message)
          });
        // setRefundDetailsVisible({
        //   ...refundDetailsVisible,
        //   [elementId]: false,
        // });
      }
    }
  };

  const handleCloseAdditionalPopup = () => {
    setAdditionalPopupVisible(false); // Close additional popup
    navigate(`/bidView/${id}`)
  };
  const handleConfirmBidClick = () => {
    let data = {
      'product_id': id
    }
    BidsServices.confirmBids(data)
      .then((response) => {
        if (response.status) {
          setRequestSentVisible({
            ...requestSentVisible,
            element1: false,
          });
          setAdditionalPopupVisible(true);
        }
      }).catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };
  const [inputError, setInputError] = useState(false);
  const [placeABidLoader, setPlaceABidLoader] = useState(false);
  const placeAbid = (e) => {
    e.preventDefault();
    setInputError(true)
    if (customBidPrice != "" && customBidPrice > productData.max_bid
    ) {
      setPlaceABidLoader(true)
      const requestData = {
        product_id: productData?.id,
        bid_value: customBidPrice,
        user_id: user_id,
      };

      UserService.placeABid(requestData)
        .then((response) => {
          setShowPlacedBids(false);
          getProduct()
          setCustomBidPrice('')
          setInputError(false)
          toast.success(response?.message)
          setPlaceABidLoader(false)
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
          setPlaceABidLoader(false)
        });
    }
  };

  useEffect(() => {
    saveRecentView();
    getProduct();
  }, []);


  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <Spinner animation="border" role="status">
          </Spinner>
        </div>
      ) : (
        <div className="p-i">
          <div className="p-i-1">
            <h3 className="p-i-t">{productData.name}</h3>
            <hr />
          </div>
          <div className="p-i-2">
            <div className="p-i-2-w">
              <div className="p-i-2-w-l">Condition</div>
              <div className="p-i-2-w-r">{productData?.condition}</div>
            </div>
            <div className="p-i-2-w">
              <div className="p-i-2-w-l">Brand</div>
              <div className="p-i-2-w-r">{productData?.brand?.name}</div>
            </div>
            <div className="p-i-2-w">
              <div className="p-i-2-w-l">Model</div>
              <div className="p-i-2-w-r">{productData?.model}</div>
            </div>
            <div className="p-i-2-w">
              <div className="p-i-2-w-l">Descriptions</div>
              <div className="p-i-2-w-r">{productData?.description}</div>
            </div>
            <div className="p-i-2-w">
              <div className="p-i-2-w-l">Auction time left</div>
              <div className="p-i-2-w-r"><CountdownTimer initialTimeMicroseconds={productData?.auction_remainig_time} /></div>
            </div>
            <hr />
          </div>
          <div className="p-i-4">
            <div className="p-i-3-w">
              {token === null ? (
                <>
                  <div className="p-p-w">
                    <div className="p-p">
                      <div className="p-p">Starting Bid</div>
                      <div className="p-p">${productData.bids}</div>
                    </div>
                    {productData.bids != productData.max_bid &&
                      <div className="p-p">
                        <div className="p-p">Best Offer</div>
                        <div className="p-p">${productData.max_bid}</div>
                      </div>
                    }
                  </div>
                  <div className="pay-buttons" onClick={() => {
                    navigate(`/signup`);
                    localStorage.setItem('redirectionPage', pathname)
                  }}>
                    <button>Place a Bid</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-p-w">
                    <div className="p-p">
                      <div className="p-p">Starting Bid</div>
                      <div className="p-p">${productData.bids}</div>
                    </div>
                    {productData.bids != productData.max_bid &&
                      <div className="p-p">
                        <div className="p-p">Best Offer</div>
                        <div className="p-p">${productData.max_bid}</div>
                      </div>
                    }
                  </div>
                  {seller_guid != productData?.shop?.guid &&
                    <div className="pay-buttons">
                      <button onClick={() => { setShowPlacedBids(true) }}>Place a Bid</button>
                    </div>
                  }
                </>
              )}
            </div>
            <hr />
          </div>
          <ShippingPolicyData />
        </div>
      )}
      {isLoading ? (
        <div className="loader-container">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : (
        <>
          {productData ? (
            <>
              <div className="row">
                <div>
                  {refundDetailsVisible["element1"] && (
                    <div className="bidplace">
                      <div className="inngerbidplace">
                        <BidPlacement bidsPlaced={placedbids} maxbids={bestoffer} parentCallback={handleCallback} />
                        <div className="yourmax-bid">
                          <h3>Your max bid</h3>
                          <div className="row">
                            <div className="col-lg-9">
                              <input type="number" onChange={handleMaxBids} placeholder="$ 08.50" />
                            </div>
                            <div className="col-lg-3">
                              <button
                                className="plcebid"
                                onClick={() => handleSubmitDetails("element1")}
                              >
                                Place bid
                              </button>
                            </div>
                            {errors.bids && (
                              <p className="error">{errors.bids}</p>
                            )}
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
                          <ReviewBid bids={bid} maxbids={bestoffer} shippingprice={shippingprice} />
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
                        <Confirmation />
                        <button onClick={handleCloseAdditionalPopup}>Close</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      )}
      <Modal
        show={showPlacedbids}
        onHide={setShowPlacedBids}
        className='place-a-bid-modal'
      >
        <div className='c-c-body'>
          <div className="title">Place Your Bid</div>
          <div className="options">
            {+productData.max_bid > 0 ?
              <ul>
                <li onClick={() => { setCustomBidPrice((+productData.max_bid + (+productData.max_bid * 0.10)).toFixed(0)) }}>
                  <div className="s-b-p">10%</div>
                  <div className="s-b-pp">${(+productData.max_bid + (+productData.max_bid * 0.10)).toFixed(0)}</div>
                </li>
                <li onClick={() => { setCustomBidPrice((+productData.max_bid + (+productData.max_bid * 0.25)).toFixed(2)) }}>
                  <div className="s-b-p">25%</div>
                  <div className="s-b-pp">${(+productData.max_bid + (+productData.max_bid * 0.25)).toFixed(0)}</div>
                </li>
                <li onClick={() => { setCustomBidPrice((+productData.max_bid + (+productData.max_bid * 0.5)).toFixed(0)) }}>
                  <div className="s-b-p">50%</div>
                  <div className="s-b-pp">${(+productData.max_bid + (+productData.max_bid * 0.5)).toFixed(0)}</div>
                </li>
                <li onClick={() => { setCustomBidPrice((+productData.max_bid + (+productData.max_bid * 1)).toFixed(0)) }}>
                  <div className="s-b-p">100%</div>
                  <div className="s-b-pp">${(+productData.max_bid + (+productData.max_bid * 1)).toFixed(0)}</div>
                </li>
              </ul>
              :
              <ul>
                <li onClick={() => { setCustomBidPrice((+productData.bids + (+productData.bids * 0.10)).toFixed(0)) }}>
                  <div className="s-b-p">10%</div>
                  <div className="s-b-pp">${(+productData.bids + (+productData.bids * 0.10)).toFixed(0)}</div>
                </li>
                <li onClick={() => { setCustomBidPrice(+productData.bids + (+productData.bids * 0.25)) }}>
                  <div className="s-b-p">25%</div>
                  <div className="s-b-pp">${(+productData.bids + (+productData.bids * 0.25)).toFixed(0)}</div>
                </li>
                <li onClick={() => { setCustomBidPrice(+productData.bids + (+productData.bids * 0.5)) }}>
                  <div className="s-b-p">50%</div>
                  <div className="s-b-pp">${(+productData.bids + (+productData.bids * 0.5)).toFixed(0)}</div>
                </li>
                <li onClick={() => { setCustomBidPrice(+productData.bids + (+productData.bids * 1)) }}>
                  <div className="s-b-p">100%</div>
                  <div className="s-b-pp">${(+productData.bids + (+productData.bids * 1)).toFixed(0)}</div>
                </li>
              </ul>

            }
          </div>
          <form onSubmit={placeAbid}>
            <div className="input">
              <input type="number" value={customBidPrice} placeholder="Enter custom bid price" onChange={(e) => { setCustomBidPrice(e.target.value) }} />
              {productData.max_bid > customBidPrice && inputError &&
                <div className="error-input">Your bid price must be greater then {productData.max_bid}</div>
              }
            </div>
            <p>By bidding, you are Afree to pay the seller price if you win</p>
            <div className="button">
              <button type='submit' disable={placeABidLoader}>{placeABidLoader ? "Loading..." : 'Place A Bid'}</button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AuctionProductInformation;
