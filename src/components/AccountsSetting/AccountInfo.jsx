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

const AccountInfo = () => {
  const [selectedLink, setSelectedLink] = useState(null);
  const [trustedseller, setTrustedSeller] = useState(false);
  const [value, setValue] = useState("");

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
            <h3>Personal Info</h3>
            <ProfileInformationTabs selectedMenuItem={value} />
            <button className='backbutton-account' onClick={() => setSelectedLink(null)}><img src={Backimage} /> Back</button>
          </div>
        );
      case 'Selling':
        return (
          <div>
            {/* Content for Selling */}
            <h3>Selling Hub</h3>
            <SellerAllTabs />
            <button className='backbutton-account' onClick={() => setSelectedLink(null)}><img src={Backimage} /> Back</button>
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
          <NotFound_ />
          // <div>
          //   {/* Content for Notification Preferences */}
          //   <h3>Notification Preferences</h3>
          //   <NotificationPreferencesTabs handleGeneralNotifications={handleGeneralNotifications} />
          //   <button className='backbutton-account' onClick={() => setSelectedLink(null)}>
          //   <img src={Backimage} alt="Back" /> Back
          // </button>
          // </div>
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
          <div className='col-lg-4'>
            <div className='personal-info-links'>
              <h4>Personal Info</h4>
              <hr style={{ width: '50%' }} />
              <ul>
                <li onClick={() => handleLinkClick('PersonalInfo','component1')}>Personal information</li>
                <li onClick={() => handleLinkClick('PersonalInfo','component2')}>Sign in and security</li>
                <li onClick={() => handleLinkClick('PersonalInfo','component3')}>Addresses</li>
                <li onClick={() => handleLinkClick('PersonalInfo','component4')}>Save images</li>
                <li onClick={() => handleLinkClick('PersonalInfo','component5')}>Search History</li>
              </ul>
            </div>
            {/* Add other sections with their respective links */}
            <div className='personal-info-links'>
              <h4>Selling</h4>
              <hr style={{ width: '50%' }} />
              <ul>
              {trustedseller ? (
                <li onClick={() => handleLinkClick('Selling')}>My Seller Account</li>
              ):(
                <li onClick={() => handleLinkClick('Selling')}>Set Up Seller Account</li>
              )}
                {/* <li onClick={() => handleLinkClick('items')}>List an Item</li> */}
              </ul>
            </div>
            <div className='personal-info-links'>
              <h4>Watching</h4>
              <hr style={{ width: '50%' }} />
              <ul>
                <li onClick={() => handleLinkClick('instock')}>In Stock</li>
                <li onClick={() => handleLinkClick('outstock')}>Out Stock</li>
              </ul>
            </div>
          </div>
          <div className='col-lg-4'>
            {/* Add other sections with their respective links */}
            <div className='personal-info-links'>
              <h4>Payment Information</h4>
              <hr style={{ width: '50%' }} />
              <ul>
                <li onClick={() => handleLinkClick('transactions')}>Payments</li>
                <li onClick={() => handleLinkClick('stripe')}>Stripe Account</li>
              </ul>
            </div>
            {/* Add other sections with their respective links */}
            <div className='personal-info-links'>
              <h4>Notification Preferences</h4>
              <hr style={{ width: '50%' }} />
              <ul>
                <li onClick={() => handleLinkClick('NotificationPreferences')}>Notification Settings</li>
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
