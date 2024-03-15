import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Prdimage from "../../assets/Images/Singleproduct/prdimage.png";
import Prdimage1 from "../../assets/Images/Singleproduct/Product1.png";
import Prdimage2 from "../../assets/Images/Singleproduct/Product2.png";
import Checkpay from "../../assets/Images/check-pay.png";
import blank from "../../assets/Images/Productcard/blank.jpg";
import UserServices from "../../services/API/UserServices"; //~/services/API/UserServices
import { toast } from "react-toastify";
import moment from "moment";
import { BASE_URL } from '../../services/Constant'

const BidsOffer = () => {
  const [refundDetailsVisible, setRefundDetailsVisible] = useState({});
  const [requestSentVisible, setRequestSentVisible] = useState({});
  
  const renderOrderBlock = (orderData, index) => {
    console.log('custimer bids', orderData)
    const { orderNumber, productNames, imagess, bid, max_bids, result } = "";
    const productName = orderData.product.name;
    const productGuid = orderData.product.guid;

    let images = [];
    if(orderData.product.media.length > 0){
      orderData.product.media.forEach((item) => {
        images.push(item.name)
      })
    }
    const handleRefundClick = (orderIndex) => {
      setRefundDetailsVisible({
        ...refundDetailsVisible,
        [orderIndex]: true,
      });
    };

    const handleSubmitDetails = (orderIndex) => {
      setRefundDetailsVisible({
        ...refundDetailsVisible,
        [orderIndex]: false,
      });
      setRequestSentVisible({
        ...requestSentVisible,
        [orderIndex]: true,
      });
    };

    const handleCloseRequestSent = (orderIndex) => {
      setRequestSentVisible({
        ...requestSentVisible,
        [orderIndex]: false,
      });
    };

    return (
      <div className="row bid-product align-items-center" key={orderNumber}>
        <div className="col-lg-6">
          <div className="product-image">
            <div className="image">
              {images.length > 0 ? (
                <>
                {images.map((image, index) => {
                      if(index == 0){
                        return(
                          <>
                          <img key={index} src={`https://notnewbackend.testingwebsitelink.com/image/product/${image}`} alt={image} />
                          </>
                        )                  
                      }
                  })}
                </>
              ):(
                <>
                  <img key={index} src={blank} alt="blank" />
                </>
              )}
            </div>
            <div className="prd-details">
              <h5>
                {/* Order # : <b>{orderNumber}</b> */}
              </h5>
              <h3><a href={`/auctionproduct/${productGuid}`} target="_blank">{productName}</a></h3>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="bidding-results">
            <div className="your-bid">
                <h4>
                <strong> Your Bid</strong> <br />
                $ {orderData.max_bids}
                </h4>
            </div>
            <div className="your-bid1">
                <h4>
                <strong>Max Bid</strong> <br />
                $ {orderData.product.bids}
                </h4>
            </div>
            <div className="your-bid2">
                <h4 style={{color:"#EF0D0D"}}>
                Ends in <br />12:45:56
                </h4>
            </div>
            <div className="your-bid3">
            <h4>
            <strong>Results</strong> <br /> 
              {orderData.status}
            </h4>
            </div>
          </div>
        </div>
        <div className="col-lg-2">
        <div className='refund-reorder'>
        {orderData.status === 'accepted' || orderData.status === 'rejected' ? (
          <>
          {orderData.status === 'accepted' ? (
            <>
              <Link to={`/bidWin/${orderData.product.guid}`}>
                <button>View</button>
              </Link>
            </>
          ):(
            <>
              <Link to={`/bidView/${orderData.product.guid}`}>
                <button>View</button>
              </Link>
            </>
          )}
          </>
        ):(
          <> 
             <Link to='/bidView/'>
                <button className='refund'>
                Increase Bid
                </button>
              </Link>
              <Link to={`/bidView/${orderData.product.guid}`}>
                <button>View</button>
              </Link>
          </>
        )}

          </div>
        </div>
      </div>
    );
  };

  const ordersData = [
    {
      orderNumber: "15s5d8e1",
      productName:
        "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394",
      images: [Prdimage],
      bid: "17.00",
      maxBid: "20.30",
      result: "hold",
    },
    {
      orderNumber: "15s5d8e2",
      productName:
        "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394",
      images: [Prdimage1],
      bid: "16.22",
      maxBid: "34.223",
      result: "processed",
    },
    {
      orderNumber: "15s5d8e2",
      productName:
        "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394",
      images: [
        Prdimage2, 
    ],
    bid: "23.00",
    maxBid: "40.22",
    result: "pending",
    },
  ];
  const [bids, setBids] = useState([]);

  const getBids = () =>{
    UserServices.getUserBid()
      .then((response) => {
        if(response.status){
          setBids(response.data)
        }
    })
  }
  useEffect(() => {
    getBids();
  }, []);

  return (
    <>
      <h3>Bids Offer</h3>
      <div className="ongoing">
        {/* {bids.length} */}
        {/* {ordersData.map((order, index) => ( */}
        {bids.length > 0 ?(
          <>
            {bids.map((order, index) => (
                <React.Fragment key={index}>
                  {renderOrderBlock(order, index)}
                  {/* {index !== ordersData.length - 1 && <hr />} */}
                </React.Fragment>
              ))}
          </>
        ):(
          <>Loading...</>
        )}
      </div>
    </>
  );
};

export default BidsOffer;
