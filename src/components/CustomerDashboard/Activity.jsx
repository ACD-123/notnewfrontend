import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from './Dashboard'
import { useNavigate } from 'react-router-dom';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";

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
  const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const componentName = searchParams.get('component');

    if (componentName) {
      setSelectedMenuItem(componentName);
    }
  }, [location.search]);
  const handleMenuItemClick = (menu) => {
    navigate(`/customerdashboard?component=${menu}`);
    setSelectedMenuItem(menu);
    setIsMenuOpen(false);
  };

  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

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
        <div id="hide-on-desktop-991" onClick={toggleDrawer}>
          <GiHamburgerMenu />
        </div>
        <div className='row'>
          <div className='col-lg-3' id='hide-on-mobile-991'>
            <div className={`left-menu`}>
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
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='left'
        className='mobile-product-filter'
        size={'90%'}
      >
        <div className={`left-menu`}>
          <div className="title-customer-side">Shopping <span onClick={toggleDrawer}><RxCross2 /></span></div>
          <ul>
            <li className={selectedMenuItem === 'my-orders' ? 'active' : ''} onClick={() => {handleMenuItemClick('my-orders'); toggleDrawer()}}>
              My Orders
            </li>
            <li className={selectedMenuItem === 'my-bids-and-offers' ? 'active' : ''} onClick={() => {handleMenuItemClick('my-bids-and-offers'); toggleDrawer()}}>
              My Bids And Offers
            </li>
            <li className={selectedMenuItem === 'my-favourites' ? 'active' : ''} onClick={() => {handleMenuItemClick('my-favourites'); toggleDrawer()}}>
              My Favourites
            </li>
            <li className={selectedMenuItem === 'recently-searched-items' ? 'active' : ''} onClick={() => {handleMenuItemClick('recently-searched-items'); toggleDrawer()}}>
              Recently Searched Items
            </li>
          </ul>
          <div className="title-customer-side-2">Account</div>
          <ul>
            <li className={selectedMenuItem === 'change-password' ? 'active' : ''} onClick={() => {handleMenuItemClick('change-password'); toggleDrawer()}}>
              Change Password
            </li>
            <li className={selectedMenuItem === 'help-and-support' ? 'active' : ''} onClick={() => {handleMenuItemClick('help-and-support'); toggleDrawer()}}>
              Help And Support
            </li>
            <li className={selectedMenuItem === 'faq' ? 'active' : ''} onClick={() => {handleMenuItemClick('faq'); toggleDrawer()}}>
              FAQs
            </li>
            <li className={selectedMenuItem === 'privacy-policy' ? 'active' : ''} onClick={() => {handleMenuItemClick('privacy-policy'); toggleDrawer()}}>
              Privacy Policy
            </li>
          </ul>
        </div>
      </Drawer>
    </>
  );
};

export default Activity;
