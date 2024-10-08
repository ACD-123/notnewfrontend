import React, { useEffect, useState } from 'react';

import ProfileInformationTabs from './PersonalInfoAllPages/ProfileInformationTabs';
import Backimage from '../../assets/Images/back-icon.png'
import NotificationPreferencesTabs from './NotificationPreferences/NotificationPreferencesTabs';
import SellerAllTabs from './SellerSetup/SellerAllTabs';
import MyProducts from './SellerSetup/MyProducts'
import MyTransactions from './SellerSetup/MyTransactions';
import StripeTransactions from './SellerSetup/StripeTransactions';
import InStock from './SellerSetup/InStock';
import OutStock from './SellerSetup/OutStock';
import NotFound_ from '../../pages/NotFound_'
import { useNavigate } from 'react-router-dom';

const AccountInfo = () => {
  const [selectedLink, setSelectedLink] = useState(null);
  const [trustedseller, setTrustedSeller] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate()

  const handleLinkClick = (link, val) => {
    setSelectedLink(link);
    setValue(val);
  };
 
  // Function to handle selection of General Notifications
  const handleGeneralNotifications = () => {
    setSelectedLink('NotificationPreferences'); // Set the selected link to NotificationPreferences
  };
  const renderContent = () => {
    // Based on the selectedLink value, render the corresponding content
    switch (selectedLink) {
      case 'PersonalInfo':
        return (
          <div>
            {/* Content for Personal Information */}
            <h3 className='main-tab-title'>Personal Info</h3>
            <ProfileInformationTabs selectedMenuItem={value} />
            {/* <button className='backbutton-account' onClick={() => setSelectedLink(null)}><img src={Backimage} /> Back</button> */}
          </div>
        );
      case 'Selling':
        return (
          <div>
            <SellerAllTabs setSelectedLink={setSelectedLink}/>
          </div>
        );
      case 'items':
        return (
          <div>
            <MyProducts />
          </div>
        );
      case 'stripe':
        return (
          <NotFound_ />
          // <div>
          //   <StripeTransactions />
          // </div>
        );
        case 'instock':
          return (
            <div>
              {/* <InStock /> */}
              <NotFound_ />
            </div>
          );
          case 'outstock':
            return (
              <div>
                {/* <OutStock /> */}
                <NotFound_ />
              </div>
            );
      case 'PaymentInformation':
        return (
          <>
          <NotFound_ />
          {/*<div>
             Content for Payment Information */}
            {/* <h3>Payment Informationss</h3> */}
            {/* Add your Payment Information content here */}
            {/* <button className='backbutton-account' onClick={() => setSelectedLink(null)}><img src={Backimage} /> Back</button> */}
          {/* </div> */}
          </>
        );
      case 'NotificationPreferences':
        return (
          // <NotFound_ />
          <div>
            {/* Content for Notification Preferences */}
            <h3>Notification Preferences</h3>
            <NotificationPreferencesTabs handleGeneralNotifications={handleGeneralNotifications} />
            <button className='backbutton-account' onClick={() => setSelectedLink(null)}>
            <img src={Backimage} alt="Back" /> Back
          </button>
          </div>
        );
        case 'transactions':
        return (
          <div>
            {/* <MyTransactions /> */}
            <NotFound_ />
          </div>
        );
      default:
        return (
            <div className='row'>
          <div className='col-lg-2'>
            <div className='personal-info-links'>
              <h4><span>Personal Info</span></h4>
              <ul>
                <li onClick={() => navigate('/personal-info?component=profile-information')}>Personal information</li>
                <li onClick={() => navigate('/personal-info?component=addresses')}>Addresses</li>
                {/* <li onClick={() => navigate('/personal-info?component=save-images')}>Save images</li> */}
                <li onClick={() => window.location.href='/customerdashboard?component=recently-searched-items'}>Search History</li>
              </ul>
            </div>
          </div>
          <div className='col-lg-2'>
            <div className='personal-info-links'>
              <h4><span>Selling</span></h4>
              <ul>
              {trustedseller ? (
                <li onClick={() => navigate('/my-seller-account?tab=dashboard')}>My Seller Account</li>
                // <li onClick={() => handleLinkClick('Selling')}>Set Up Seller Account</li>
              ):(
                <li onClick={() => handleLinkClick('Selling')}>Set Up Seller Account</li>
              )}
                {/* <li onClick={() => handleLinkClick('items')}>List an Item</li> */}
              </ul>
            </div>
          </div>
          <div className='col-lg-2'>
            <div className='personal-info-links'>
              <h4><span>Watching</span></h4>
              <ul>
                <li onClick={() => handleLinkClick('instock')}>In Stock</li>
                <li onClick={() => handleLinkClick('outstock')}>Out Stock</li>
              </ul>
            </div>
          </div>
          <div className='col-lg-3'>
            <div className='personal-info-links'>
              <h4><span>Payment Information</span></h4>
              <ul>
                <li onClick={() => handleLinkClick('transactions')}>Payments</li>
                <li onClick={() => handleLinkClick('stripe')}>Stripe Account</li>
              </ul>
            </div>
          </div>
          <div className='col-lg-3'>
            <div className='personal-info-links'>
              <h4><span>Notification Preferences</span></h4>
              <ul>
                <li onClick={() => {navigate('/notification-setting')}}>Notification Settings</li>
                {/* <li onClick={() => handleLinkClick('NotificationPreferences')}>General Notifications</li>
                <li onClick={() => handleLinkClick('NotificationPreferences')}>Seller account Notification settings</li> */}
              </ul>
            </div>
          </div>
          </div>
        );
    }
  };
  useEffect(() => {
    let loggedInUser = localStorage.getItem("user_details");
    if (loggedInUser) {
        const loggedInUsers = JSON.parse(loggedInUser);
        if(loggedInUsers.isTrustedSeller == true){
          setTrustedSeller(true)
        }
    }
  }, []);
  return (
    <>
      <div className='account-dashboard'>
        <div className='row'>
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
