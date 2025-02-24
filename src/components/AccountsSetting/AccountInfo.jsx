import React, { useEffect, useState } from 'react';
import ProfileInformationTabs from './PersonalInfoAllPages/ProfileInformationTabs';
import SellerAllTabs from './SellerSetup/SellerAllTabs';
import MyProducts from './SellerSetup/MyProducts'
import { useNavigate } from 'react-router-dom';

const AccountInfo = () => {
  const [selectedLink, setSelectedLink] = useState(null);
  const [trustedseller, setTrustedSeller] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate()

  const renderContent = () => {
    switch (selectedLink) {
      case 'PersonalInfo':
        return (
          <div>
            <h3 className='main-tab-title'>Personal Info</h3>
            <ProfileInformationTabs selectedMenuItem={value} />
          </div>
        );
      case 'Selling':
        return (
          <div>
            <SellerAllTabs setSelectedLink={setSelectedLink} />
          </div>
        );
      case 'items':
        return (
          <div>
            <MyProducts />
          </div>
        );
      default:
        return (
          <div className='row'>
            <div className='col-lg-12'>
              <div className='personal-info-links one'>
                <h4><span>Personal Info</span></h4>
                <ul>
                  <li onClick={() => navigate('/personal-info?component=profile-information')}>Personal information</li>
                  <li onClick={() => navigate('/personal-info?component=addresses')}>Addresses</li>
                  <li onClick={() => window.location.href = '/customerdashboard?component=recently-searched-items'}>Search History</li>
                </ul>
              </div>
            </div>
            <div className='col-lg-12'>
              <div className='personal-info-links two'>
                <h4><span>Selling</span></h4>
                <ul>
                  {trustedseller ? (<li onClick={() => navigate('/my-seller-account?tab=dashboard')}>My Seller Account</li>)
                    :
                    (<li onClick={() => navigate('/my-seller-account?tab=dashboard')}>Set Up Seller Account</li>)}
                </ul>
              </div>
            </div>
            <div className='col-lg-12'>
              <div className='personal-info-links three'>
                <h4><span>Notification Preferences</span></h4>
                <ul><li onClick={() => { navigate('/notification-setting') }}>Notification Settings</li></ul>
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
      if (loggedInUsers.isTrustedSeller == true) {
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
