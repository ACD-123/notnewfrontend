import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReviewBid from "../Elements/ReviewBid";
import PlaceYourBid from "../Elements/PlaceYourBid";
import BidPlacement from "../Elements/BidPlacement";
import ShippingPolicyData from "../Products/Archive/SingleProductElements/ShippingPolicyData"; //'./components/Products/Archive/SingleProductElements/ShippingPolicyData'
import Confirmation from "./Confirmation";
import ProductServices from "../../services/API/ProductServices"; //~/services/API/ProductServices
import BidsServices from "../../services/API/BidsServices"; //~/services/API/BidsServices
import WatchListServices from "../../services/API/WatchListServices"; //~/services/API/WatchListServices
import { toast } from "react-toastify";
import moment from "moment";


const AuctionProductInformation = () => {
  const [refundDetailsVisible, setRefundDetailsVisible] = useState({});
  const [requestSentVisible, setRequestSentVisible] = useState({});
  const [editBidVisible, setEditBidVisible] = useState({});
  const [confirmBidVisible, setConfirmBidVisible] = useState(false);
  const [additionalPopupVisible, setAdditionalPopupVisible] = useState(false);
  const [productData, setProductData] = useState([]);
  const [totalbids, setTotalBids] = useState(0);
  const [totalproductbids, setTotalProductBids] = useState(0);
  const [productbids, setProductBids] = useState(0);
  const [placedbids, setPlacedBids] = useState(false);
  const [hour, setHour] = useState("");
  const [minutes, setMinutes] = useState("");
  const [bestoffer, setBestOffer] = useState(0);
  const [currenttime, setCurrentTime] = useState("");
  const [shippingprice, setShippingPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [totalBid, setTotalBid] = useState(0); // State to hold the total bid value
  const [errors, setErrors] = useState({});
  const [bid, setBids] = useState({});

  const { pathname } = window.location;
  const id = pathname.split("/").pop();
  const saveRecentView = () => {
    let data = {
      id: id,
    };
    ProductServices.createRecent(data).then((response) => {
      console.log("response", response);
    });
  };
  const getBestOffer = () =>{
    BidsServices.getMaxBids(id).then((response) => {
      setBestOffer(response);
    });
  }
  const getTotalBids = () =>{
    BidsServices.getProductBids(id).then((response) => {
      console.log('s', response)
      // setTotalProductBids(response)
    });
  }
  const  handleCallback = (childData) => {
    setTotalBids(childData)
  }
  const handleMaxBids = (e) =>{
    setTotalBids(e.target.value);
  }
  const addWatchList = () =>{
    let token = localStorage.getItem('access_token');
    if(token == "" || token == null){
        window.location.href = "/signin";
    }else{
      let data={
        "product_id" : id 
      }
      WatchListServices.save(data).then((response) => {
        toast.success(response);
        // handleDropdownItemClick("componentC")
      })
      .catch((e) => {
        console.log('error', e)
      });
    }
  }
  const getProduct = () => {
    ProductServices.get(id).then((response) => {
      console.log('product data', response)
      setProductData(response);
      setShippingPrice(response.shipping_price);
      setProductBids(response.bids);
      var date = new Date();
      var date1 = moment(date).format('MM/DD/YYYY');
      var date2 = moment(response.auction_listing).format('MM/DD/YYYY');//moment(moment(response.auction_listing).toDate(), 'MM/DD/YYYY'); 
      if(date1 === date2){
        console.log('auction_listing', response.auction_listing)
        console.log('auction_End_listing', response.auction_End_listing)
        //for date difference
        // console.log('diff', moment(response.auction_listing).diff(response.auction_End_listing, 'days'))
        // var startTime1 = moment('12:16:59 am', 'HH:mm:ss a');
        // var endTime1 = moment('06:12:07 pm', 'HH:mm:ss a');
        var startTime = moment(response.auction_listing).format("hh:mm:ss a");
        var endTime =  moment(response.auction_End_listing).format("hh:mm:ss a");
        var startTime1 = moment(startTime, 'HH:mm:ss a');
        var endTime1 = moment(endTime, 'HH:mm:ss a');
        console.log('startTime', startTime)
        console.log('endTime', endTime)
        console.log('startTime1', startTime1)
        console.log('endTime1', endTime1)
        // calculate total duration
        var duration = moment.duration(endTime1.diff(startTime1));
        // duration in hours
        var hours = parseInt(duration.asHours());

        // duration in minutes
        var minutes = parseInt(duration.asMinutes()) % 60;

        console.log(hours + ' hour and ' + minutes + ' minutes.');      
      }
      // console.log('aucrtioned Product', moment(response.auction_listing).format('MM/DD/YYYY'))
      // console.log('date', moment(date).format('MM/DD/YYYY'))
      
      // var duration = moment.duration(date2.diff(date1));
      // var hours = duration.asHours(); 
      // // var minutes = duration.asMinutes(); 
      // // console.log('minutes', remianing.toString().split(".")[1]) 
      // var minutes = hours.toFixed(2);
      // setHour(hours.toString().split(".")[0]);
      setHour(hours);
      // setMinutes(minutes.toString().split(".")[1]);
      setMinutes(minutes);
      const currDate = new Date();//.toLocaleTimeString;
      setCurrentTime(moment(currDate).format('hh:mm A'))
    });
  };

  const handleRefundClick = (elementId) => {
    let token = localStorage.getItem('access_token');
    if(token == "" || token == null){
        window.location.href = "/signin";
    }else{
      setRefundDetailsVisible({
        ...refundDetailsVisible,
        [elementId]: true,
      });
    }
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
      if(totalbids < productbids){
        newErrors.bids = "Max Bids must be Greater the Product Bids!";
      }else if(bestoffer > totalbids){
        newErrors.bids = "Your Bid is less then Maximun Bid!";
      }else{
        let data ={
          'max_bids': totalbids,
          'shipping_charges': shippingprice,
          'time_bids': currenttime,
          'estimated_total': parseFloat(totalbids) + parseFloat(shippingprice),
          'id':id
        }
        BidsServices.save(data).then((response) => {
          if(response.status){
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
        .catch((e) => {
          console.log('error', e)
        });
        // setRefundDetailsVisible({
        //   ...refundDetailsVisible,
        //   [elementId]: false,
        // });
      }
    }
  };

  const handleCloseRequestSent = (elementId) => {
    setRequestSentVisible({
      ...requestSentVisible,
      [elementId]: false,
    });
  };

  const handleCloseAdditionalPopup = () => {
    setAdditionalPopupVisible(false); // Close additional popup
    window.location.href = `/bidView/${id}`; // Redirect to '/bidView' when the button is clicked
  };
  const handleConfirmBidClick = () => {
    let data={
      'product_id': id
    }
    BidsServices.confirmBids(data)
    .then((response) => {
      if(response.status){
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
      }).catch((e) => {
        console.log(e);
      });
  };
  const handleDropdownItemClick = (componentName) => {
    // Here, you can navigate to the 'Activity' component and pass the selected component name as a query parameter or state
    // For example, using query parameter
    window.location.href = `/customerdashboard?component=${componentName}`;
  };
  useEffect(() => {
    saveRecentView();
    getProduct();
    // getTotalBids(); 
    getBestOffer();
  }, []);
  return (
    <>
      {productData ? (
        <>
          <div className="product-info">
            <h3>{productData.name}</h3>
            {productData.shipping_price > 0 ? (
              <><b>Shipping Price: $ {productData.shipping_price}</b></>
            ):(<p>Free Shipping</p>)}
            <br />
            {productData.return_shipping_price > 0 ? (<>
              <b>Shiping Return: $ {productData.return_shipping_price}</b>
            </>):(
              <p>Free Shipping Returns</p>
            )}
            <hr />
            <div className="auction-time">
              <ul>
                <li>
                  <span>Condition</span> <em>{productData.condition}</em>
                </li>
                <li>
                  <span>Auction time left</span>{" "}
                  <em style={{ color: "red" }}>{hour}h {minutes}m | Today {currenttime}</em>
                  {/* 05:43 AM */}
                  {/* {moment(productData.auction_listing).format("HH:mm")} */}
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
                  {bestoffer > 0 ?(
                    <>
                      <hr />
                      <h5>
                        <span>Best Offer</span>
                        <br />$ {bestoffer} 
                        {totalbids > 0?(
                          <>
                            <em>{totalbids} bids</em>
                          </>
                        ):('')}
                        
                      </h5>
                    </>
                  ):('')}
                  
                </div>
              </div>
              <div className="col-lg-5">
                <div className="pay-buttons">
                  <Link>
                    <button onClick={() => handleRefundClick("element1")}>
                      Place a Bid
                    </button>
                  </Link>
                  <Link onClick={() => addWatchList()}>
                    <button>Add to Watchlist</button>
                  </Link>
                </div>
              </div>
            </div>
            <h3>Description</h3>
            {productData.description}
            <ShippingPolicyData />
          </div>

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
                      <ReviewBid bids={bid} maxbids={bestoffer} shippingprice={shippingprice}  />
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
  );
};

export default AuctionProductInformation;
