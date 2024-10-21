import React, { useState, useEffect } from 'react';
import SellerImage from '../../../assets/Images/Seller/sellerimage.png';
import SetupSellerAccount from './SetupSellerAccount';
import SellingDetailsDashBoard from './SellingDetailsDashBoard';

const Selling = () => {
  const [showComponentTwo, setShowComponentTwo] = useState(false);
  const [trustedseller, setTrustedseller] = useState(false);
  const handleGetStartedClick = () => {
    setShowComponentTwo(true);
  };

  useEffect(() => {
    let loggedInUser = localStorage.getItem("user_details");
    if (loggedInUser) {
      const loggedInUsers = JSON.parse(loggedInUser);
      if (loggedInUsers.isTrustedSeller) {
        setTrustedseller(true)
      }
    }
  }, []);
  return (
    <div className='selling-activity'>
      {trustedseller ? (
        <SellingDetailsDashBoard />
      ) : (
        <>
          {showComponentTwo ? (
            <SetupSellerAccount />
          ) : (
            <div className="seller-not-created">
              <div className="seller-not-created-wrap">
                <div className="seller-not-created-wrap-l">
                  <h2>Welcome to NotNew Seller HUB</h2>
                  <p>
                    This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of
                    Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                  </p>
                </div>
                <div className="seller-not-created-wrap-r">
                  <button onClick={handleGetStartedClick}>Let's Get Started</button>
                </div>
              </div>
              <div className='row'>
                <img style={{ margin: '0px auto', width: 'auto' }} src={SellerImage} alt="Seller" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Selling;
