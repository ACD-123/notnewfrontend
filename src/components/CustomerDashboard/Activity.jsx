import React, { useEffect, useState } from 'react';
import Header from '../Header';
import SavedSellers from './SavedSellers'
import RecentlyViewed from './RecentlyViewed'
import Leftmenuimage from '../../assets/Images/leftmenu.png'
import MainPurchase from '../PurchaseHistory/MainPurchase'
import SavedSearches from './SavedSearches'
import { useLocation } from 'react-router-dom';
import Dashboard from './Dashboard'
import BuyAgain from './BuyAgain';
import BidsOffer from './BidsOffer';
import NotFound_ from '../../pages/NotFound_'
import { useNavigate } from 'react-router-dom';

import Chat from './Chat';
import MyFavCustomer from './MyFavCustomer';
import HelpAndSupport from './HelpAndSupport';
import MyBidsAndOffers from './MyBidsAndOffers';
import RecentlySearchedItems from './RecentlySearchedItems';
import CustomerFaqs from './CustomerFaqs';
import PrivacyPolicy from './PrivacyPolicy';
import EditProfileSetup from '../AccountsSetting/SellerSetup/EditProfileSetup';
import ChangePassword from './ChangePassword';
const Activity = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard'); // Initial menu selection
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the component name from the query parameter or state passed from the Header component
    const searchParams = new URLSearchParams(location.search);
    const componentName = searchParams.get('component');

    if (componentName) {
      setSelectedMenuItem(componentName);
    }
  }, [location.search]);
  // Function to handle menu item clicks
  const handleMenuItemClick = (menu) => {
    navigate(`/customerdashboard?component=${menu}`);
    setSelectedMenuItem(menu);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Render the component based on the selected menu item
  const renderComponent = () => {
    switch (selectedMenuItem) {
      case 'my-orders':
        return <Dashboard />;
      case 'my-bids-and-offers':
        return <MyBidsAndOffers />;
      case 'recently-searched-items':
        return <RecentlySearchedItems />;
      case 'my-favourites':
        return <MyFavCustomer />;
      // case 'edit-profile':
      //   return <EditProfileSetup />;
      case 'change-password':
        return <ChangePassword />;
      case 'help-and-support':
        return <HelpAndSupport />;
      case 'faq':
        return <CustomerFaqs />;
      case 'privacy-policy':
        return <PrivacyPolicy />;
      default:
        return;
    }
  };

  return (
    <>
      <section id='activity-main-dashboard'>
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <img src={Leftmenuimage} />
        </button>
        <div className='row'>
          <div className='col-lg-3'>
            <div className={`left-menu ${isMenuOpen ? 'open' : ''}`}>
              <div className="title-customer-side">Shopping</div>
              <ul>
                <li className={selectedMenuItem === 'my-orders' ? 'active' : ''} onClick={() => handleMenuItemClick('my-orders')}>
                  My Orders
                </li>
                <li className={selectedMenuItem === 'my-bids-and-offers' ? 'active' : ''} onClick={() => handleMenuItemClick('my-bids-and-offers')}>
                  My Bids And Offers
                </li>
                <li className={selectedMenuItem === 'my-favourites' ? 'active' : ''} onClick={() => handleMenuItemClick('my-favourites')}>
                  My Favourites
                </li>
                <li className={selectedMenuItem === 'recently-searched-items' ? 'active' : ''} onClick={() => handleMenuItemClick('recently-searched-items')}>
                  Recently Searched Items
                </li>
              </ul>
              <div className="title-customer-side-2">Account</div>
              <ul>
                {/* <li className={selectedMenuItem === 'edit-profile' ? 'active' : ''} onClick={() => handleMenuItemClick('edit-profile')}>
                Edit Profile
                </li> */}
                <li className={selectedMenuItem === 'change-password' ? 'active' : ''} onClick={() => handleMenuItemClick('change-password')}>
                Change Password
                </li>
                <li className={selectedMenuItem === 'help-and-support' ? 'active' : ''} onClick={() => handleMenuItemClick('help-and-support')}>
                  Help And Support
                </li>
                <li className={selectedMenuItem === 'faq' ? 'active' : ''} onClick={() => handleMenuItemClick('faq')}>
                  FAQs
                </li>
                <li className={selectedMenuItem === 'privacy-policy' ? 'active' : ''} onClick={() => handleMenuItemClick('privacy-policy')}>
                  Privacy Policy
                </li>
              </ul>
            </div>
          </div>
          <div className='col-lg-9'>
            <div className="main-content">
              {renderComponent()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Activity;
