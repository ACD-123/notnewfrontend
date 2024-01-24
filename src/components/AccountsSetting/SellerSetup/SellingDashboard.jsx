import React, { useState } from 'react';
import SellerImage from '../../../assets/Images/Seller/sellerimage.png';
import SetupSellerAccount from './SetupSellerAccount';


const Selling = () => {
  const [showComponentTwo, setShowComponentTwo] = useState(false);

  const handleGetStartedClick = () => {
    // Toggle the state to switch between components
    setShowComponentTwo(true);
  };

  return (
    <div className='selling-activity'>
      {showComponentTwo ? (
        <SetupSellerAccount />
      ) : (
        <div>
          <div className='row'>
            <div className='col-lg-9'>
              <h2>Welcome to NotNew Seller HUB</h2>
              <p>
                This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of
                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              </p>
            </div>
            <div className='col-lg-3'>
              {/* Call handleGetStartedClick when the button is clicked */}
              <button onClick={handleGetStartedClick}>Let’s Get Started</button>
            </div>
          </div>
          <div className='row'>
            <img style={{ margin: '0px auto', width: 'auto' }} src={SellerImage} alt="Seller" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Selling;
