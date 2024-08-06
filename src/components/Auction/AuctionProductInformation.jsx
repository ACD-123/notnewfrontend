import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReviewBid from "../Elements/ReviewBid";
import PlaceYourBid from "../Elements/PlaceYourBid";
import BidPlacement from "../Elements/BidPlacement";
import ShippingPolicyData from "../Products/Archive/SingleProductElements/ShippingPolicyData"; //'./components/Products/Archive/SingleProductElements/ShippingPolicyData'
import Confirmation from "./Confirmation";
import ProductServices from "../../services/API/ProductServices"; //~/services/API/ProductServices
import SellerServices from "../../services/API/SellerServices"; //~/services/API/SellerServices
import BidsServices from "../../services/API/BidsServices"; //~/services/API/BidsServices
import WatchListServices from "../../services/API/WatchListServices"; //~/services/API/WatchListServices
import { toast } from "react-toastify";
import moment from "moment";
import { Modal, Spinner, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
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
  const id = pathname.split("/").pop();


  const handelAddonsChange = (e, data, index) => {
    const updatedArray = [...ProductAttribute];

    updatedArray[index] = {
      name: data.name,
      selected: e,
      options: data?.options,
      selectToSend: e.label
    };

    SetproductAttribute(updatedArray);
  }

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
          // toast.success(response.data);
          setRequestSentVisible({
            ...requestSentVisible,
            element1: false, // Close the requestSentVisible popup for element1
          });
          setAdditionalPopupVisible(true); // Show the additionalPopupVisible popup
          // setTimeout(() => {
          //   handleDropdownItemClick
          // }, 4000);
        }
      }).catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };
  const [inputError, setInputError] = useState(false);
  const placeAbid = (e) => {
    e.preventDefault();
    setInputError(true)
    if (customBidPrice != "" && customBidPrice > productData.max_bid
    ) {
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
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message)
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

            {ProductAttribute.map((data, index) => {
              return (
                <div className="p-i-2-w" key={index}>
                  <div className="p-i-2-w-l">{data?.name}</div>
                  <div className="p-i-2-w-r">
                    <Select
                      value={data?.selected}
                      onChange={(e) => { handelAddonsChange(e, data, index) }}
                      options={ProductAttribute?.[index]?.options}
                      placeholder={`Select ${data?.name}`}
                    />
                  </div>
                </div>

              )
            })}
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
                  <div className="pay-buttons">
                    <button onClick={() => { setShowPlacedBids(true) }}>Place a Bid</button>
                  </div>
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
              {/* <div className="product-info">
                <h3>{productData.name}</h3>
                <hr />
                <div className="auction-time">
                  <ul>
                    <li>
                      <span>Condition</span> <em>{productData.condition}</em>
                    </li>
                    <li>
                      <span>Auction time left</span>{" "}
                      <em style={{ color: "red" }}>{hour}h {minutes}m | Today {currenttime}</em>
                    </li>
                  </ul>
                </div>
                <hr />
                <div className="row auction-info align-items-center">
                  <div className="col-lg-7">
                    <div className="price-detail">
                      <h5>
                        <span>Starting Bid</span>
                        <br />$ {productData.bids}
                      </h5>
                      {bestoffer > 0 ? (
                        <>
                          <hr />
                          <h5>
                            <span>Best Offer</span>
                            <br />$ {bestoffer}
                            {totalbids > 0 ? (
                              <>
                                <em>{totalbids} bids</em>
                              </>
                            ) : ('')}

                          </h5>
                        </>
                      ) : ('')}

                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="pay-buttons">
                      <Link>
                        <button onClick={() => handleRefundClick("element1")}>
                          Place a Bid
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <h3>Description</h3>
                {productData.description}
                <ShippingPolicyData />
              </div> */}

              {/* BIDDING POPUP START */}
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
                            {/* <p style={{ color: "#DE0023" }}></p> */}
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
              {/* BIDDING POPUP END */}
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
                <li onClick={() => { setCustomBidPrice(+productData.max_bid + 100) }}>${+productData.max_bid + 100}</li>
                <li onClick={() => { setCustomBidPrice(+productData.max_bid + 200) }}>${+productData.max_bid + 200}</li>
                <li onClick={() => { setCustomBidPrice(+productData.max_bid + 300) }}>${+productData.max_bid + 300}</li>
              </ul>
              :
              <ul>
                <li onClick={() => { setCustomBidPrice(+productData.bids + 100) }}>${+productData.bids + 100}</li>
                <li onClick={() => { setCustomBidPrice(+productData.bids + 200) }}>${+productData.bids + 200}</li>
                <li onClick={() => { setCustomBidPrice(+productData.bids + 300) }}>${+productData.bids + 300}</li>
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
              <button type='submit'>Place A Bid</button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AuctionProductInformation;
