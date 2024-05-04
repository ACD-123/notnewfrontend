import React from 'react';
import { Link } from 'react-router-dom';
import RightArrow from '../../assets/Images/rightarrow.png';
import Prdimage from '../../assets/Images/Singleproduct/prdimage.png';
import Prdimage1 from '../../assets/Images/Singleproduct/Product1.png';
import Prdimage2 from '../../assets/Images/Singleproduct/Product2.png';

const Refunds = () => {
    // ... (existing code)
  
    const renderOrderBlock = (orderData) => {
      const { orderNumber, productName, images, refundStatus } = orderData;
  
      // Function to determine the CSS class based on refund status
      const getRefundStatusClass = () => {
        if (refundStatus === 'In Process') {
          return 'inprocess'; // CSS class for approved status (green)
        } else if (refundStatus === 'Refunded') {
          return 'refunded'; // CSS class for rejected status (red)
        } else {
          return 'hold'; // CSS class for other statuses (default color)
        }
      };
  
      return (
        <div className={`row align-items-center ${getRefundStatusClass()}`} key={orderNumber}>
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
          {/* <div className='delivery-bttn'>
            <Link to=''>Delivery in Process</Link>
          </div> */}
        </div>
          <div className='col-lg-2'>
            <div className='refund-approval'>
              <h4>Refund Approval</h4>
              <h6 className={`refundstatus ${getRefundStatusClass()}`}>{refundStatus}</h6>
            </div>
          </div>
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
          refundStatus: 'In Process',
        },
        {
            orderNumber: '15s5d8e2',
            productName: "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394",
            images: [
              Prdimage1,
            ],
            refundStatus: 'Refunded',
        },
        {
            orderNumber: '15s5d8e2',
            productName: "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394",
            images: [
              Prdimage2, // Add more image URLs here for the first order
              // Add more image URLs for the first order as needed
            ],
            refundStatus: 'Hold',
        },
    
      ];
    
      return (
        <>
          <div className='ongoing'>
            {ordersData.map((order, index) => (
              <React.Fragment key={index}>
                {renderOrderBlock(order)}
                {index !== ordersData.length - 1 && <hr />}
              </React.Fragment>
            ))}
          </div>
        </>
      );
  };
export default Refunds;