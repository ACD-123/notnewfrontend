import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RightArrow from '../../assets/Images/rightarrow.png';
import Prdimage from '../../assets/Images/Singleproduct/prdimage.png';
import Prdimage1 from '../../assets/Images/Singleproduct/Product1.png';
import Prdimage2 from '../../assets/Images/Singleproduct/Product2.png';
import Checkpay from '../../assets/Images/check-pay.png'
import RefundPopup from './RedundPopup'

const CompleteOrders = () => {
  const [refundDetailsVisible, setRefundDetailsVisible] = useState({});
  const [requestSentVisible, setRequestSentVisible] = useState({});

  const renderOrderBlock = (orderData, index) => {
    const { orderNumber, productName, images } = orderData;

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
      <div className='row align-items-center' key={orderNumber}>
        <div className='col-lg-8'>
          <div className='product-image'>
            <div className='image'>
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Product ${index + 1}`} />
              ))}
            </div>
            <div className='prd-details'>
              <h5>Order # : <b>{orderNumber}</b></h5>
              <h3>{productName}</h3>
            </div>
          </div>
        </div>
        <div className='col-lg-2'>
          <div className='orderdeliver-bttn'>
            <Link to=''>Order Delivered</Link>
          </div>
        </div>
        <div className='col-lg-2'>
          <div className='refund-reorder'>
            <button className='refund' onClick={() => handleRefundClick(index)}>
              Want Refund
            </button>
            <Link to='/shoppingcart'>
              <button>Re order</button>
            </Link>
          </div>
        </div>
        {refundDetailsVisible[index] && (
          <div className='refund-popup'>
            <div className='refund-popup-inner'>
            {/* Refund Details Popup */}
            <div className='refunddetailss'>
              <RefundPopup />
            </div>
            {/* Your form elements and submit button */}
            <button className='sendrefunddetails' onClick={() => handleSubmitDetails(index)}>Send</button>
            </div>
          </div>
        )}
        {requestSentVisible[index] && (
          <div className='request-sent-popup'>
            <div className='request-sent-inner'>
            {/* Request Sent Popup */}
            <img src={Checkpay} />
            <h2>Request Sent</h2>
            <p>Your Refund request send sucessfully</p>
            <button onClick={() => handleCloseRequestSent(index)}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ordersData = [
    {
      orderNumber: '15s5d8e1',
      productName: "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394",
      images: [
        Prdimage,
      ],
    },
    {
        orderNumber: '15s5d8e2',
        productName: "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394",
        images: [
          Prdimage1,
        ],
    },
    {
        orderNumber: '15s5d8e2',
        productName: "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394",
        images: [
          Prdimage2, // Add more image URLs here for the first order
          // Add more image URLs for the first order as needed
        ],
    },

  ];

  return (
    <>
      <div className='ongoing'>
        {ordersData.map((order, index) => (
          <React.Fragment key={index}>
            {renderOrderBlock(order, index)}
            {index !== ordersData.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default CompleteOrders;
