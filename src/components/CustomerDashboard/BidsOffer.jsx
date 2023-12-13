import React, { useState } from "react";
import { Link } from "react-router-dom";
import Prdimage from "../../assets/Images/Singleproduct/prdimage.png";
import Prdimage1 from "../../assets/Images/Singleproduct/Product1.png";
import Prdimage2 from "../../assets/Images/Singleproduct/Product2.png";
import Checkpay from "../../assets/Images/check-pay.png";

const BidsOffer = () => {
  const [refundDetailsVisible, setRefundDetailsVisible] = useState({});
  const [requestSentVisible, setRequestSentVisible] = useState({});

  const renderOrderBlock = (orderData, index) => {
    const { orderNumber, productName, images, bid, maxBid, result } = orderData;

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
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Product ${index + 1}`} />
              ))}
            </div>
            <div className="prd-details">
              <h5>
                Order # : <b>{orderNumber}</b>
              </h5>
              <h3>{productName}</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="bidding-results">
            <div className="your-bid">
                <h4>
                <strong> Your Bid</strong> <br />
                $ {bid}
                </h4>
            </div>
            <div className="your-bid1">
                <h4>
                <strong>Max Bid</strong> <br />
                $ {maxBid}
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
               {result} </h4>
            </div>
          </div>
        </div>
        <div className="col-lg-2">
        <div className='refund-reorder'>
        <Link to='/bidView'>
            <button className='refund'>
            Increase Bid
            </button>
            </Link>
            <Link to='/singleproduct'>
              <button>View</button>
            </Link>
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

  return (
    <>
      <h3>Bids Offer</h3>
      <div className="ongoing">
        {ordersData.map((order, index) => (
          <React.Fragment key={index}>
            {renderOrderBlock(order, index)}
            {/* {index !== ordersData.length - 1 && <hr />} */}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default BidsOffer;
