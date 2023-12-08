import React from 'react';
import { Link } from 'react-router-dom';
import RightArrow from '../../assets/Images/rightarrow.png';
import Prdimage from '../../assets/Images/Singleproduct/prdimage.png';
import Prdimage1 from '../../assets/Images/Singleproduct/Product1.png';
import Prdimage2 from '../../assets/Images/Singleproduct/Product2.png';

const OngoingOrders = () => {
  const renderOrderBlock = (orderData) => {
    const { orderNumber, productName, images } = orderData;

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
          <div className='delivery-bttn'>
            <Link to=''>Delivery in Process</Link>
          </div>
        </div>
        <div className='col-lg-2'>
          <div className='rightarrow'>
            <Link to='/singleproduct'>
              <img src={RightArrow} alt='Right Arrow' />
            </Link>
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
            {renderOrderBlock(order)}
            {index !== ordersData.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default OngoingOrders;
