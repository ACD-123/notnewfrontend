import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RightArrow from '../../assets/Images/rightarrow.png';
import Prdimage from '../../assets/Images/Singleproduct/prdimage.png';
import Prdimage1 from '../../assets/Images/Singleproduct/Product1.png';
import Prdimage2 from '../../assets/Images/Singleproduct/Product2.png';
import Search from '../Elements/FilterAttributes/Search';

const BuyAgain = () => {
  const [refundDetailsVisible, setRefundDetailsVisible] = useState({});
  const [requestSentVisible, setRequestSentVisible] = useState({});

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

  const renderOrderBlock = (orderData, index) => {
    const { orderNumber, productName, images } = orderData;

    return (
      <div className='row align-items-center' key={orderNumber}>
        <div className='col-lg-8'>
          <div className='product-image'>
            <div className='image'>
              {images.map((image, idx) => (
                <img key={idx} src={image} alt={`Product ${idx + 1}`} />
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
    <div className='buyagin-buttons'>
        <Link to="/checkout"><button>Buy Again</button></Link>
        <Link to=""><button className='offer'>Make Best Offer</button></Link>
        <select className='offer'>
            <option>
            More actions
            </option>
            <option>
           View Similar Item
            </option>
            <option>
            Contact Seller
            </option>
        </select>
    </div>
        </div>
      </div>
    );
  };


  const ordersData = [
    {
      orderNumber: '15s5d8e1',
      productName: "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394",
      images: [Prdimage],
    },
    {
      orderNumber: '15s5d8e2',
      productName: "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394",
      images: [Prdimage1],
    },
    {
      orderNumber: '15s5d8e2',
      productName: "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394",
      images: [Prdimage2],
    },
  ];

  const purchaseDate = new Date('20-july-2023'); // Replace this with your actual purchase date

  return (
    <div>
      <section id='buyagain'>
        <h3>Buy Again</h3>
        <div className='row align-items-center first-row'>
          <div className='col-lg-7'>
            <div class="keyword-filter-list buyagain-filterbuttons">
              <ul>
                <li> <a href="/categorykeyword">All Listings</a></li>
                <li> <a href="/categorykeyword">Auctions</a></li>
                <li> <a href="/categorykeyword">Buy it now</a></li>
                <li> <a href="/categorykeyword">Local seller</a></li>
              </ul>
            </div>
          </div>
          <div className='col-lg-5'>
            <Search />
          </div>
        </div>
        <hr />
      </section>

      <div className='ongoing'>
        {ordersData.map((order, idx) => (
          <React.Fragment key={idx}>
            {renderOrderBlock(order, idx)}
            {idx !== ordersData.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>
      <section id='purchaseDate'>
        <h3>{purchaseDate.toDateString()}</h3>
        <hr />
        <div className='ongoing'>
        {ordersData.map((order, idx) => (
          <React.Fragment key={idx}>
            {renderOrderBlock(order, idx)}
            {idx !== ordersData.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>
      </section>
    </div>
  );
};

export default BuyAgain;
