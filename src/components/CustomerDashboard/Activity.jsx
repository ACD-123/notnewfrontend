import React, { useEffect, useState } from 'react';
import Header from '../Header';
import SavedSellers from './SavedSellers'
import RecentlyViewed from './RecentlyViewed'
import Leftmenuimage from '../../assets/Images/leftmenu.png'
import MainPurchase from '../PurchaseHistory/MainPurchase'
import SavedSearches from './SavedSearches'
import { useLocation } from 'react-router-dom';
import Wishlist from './Wishlist';
import Watchlist from './Watchlist';
import Dashboard from './Dashboard'
import BuyAgain from './BuyAgain';
import BidsOffer from './BidsOffer';
import NotFound_ from '../../pages/NotFound_'
import { useNavigate } from 'react-router-dom';

import Chat from './Chat';
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
      case 'dashboard':
        return <Dashboard />;
      case 'recently-viewed':
        // return <RecentlyViewed />;
        return <NotFound_/>
      case 'bids-offers':
        // return <BidsOffer /> ;
        return <NotFound_/>
      case 'wishlist':
        // return <Wishlist /> ;
        return <NotFound_/>
      case 'order-track':
        return <MainPurchase />;
        // return <NotFound_/>
      case 'buy-again':
        // return <BuyAgain />;
        return <NotFound_/>
      case 'selling':
        return <NotFound_/>;
      case 'saved-searches':
        // return <SavedSearches />;
        return <NotFound_/>
      case 'saved-sellers':
        return <SavedSellers />;
        // return <NotFound_ />
      case 'messages':
        // return <Chat />;
        return<NotFound_/>
      case 'watchlist':
        return <Watchlist/>
        // return <NotFound_/>
      default:
        return ; // Default to Test component if no matching menu item is found
    }
  };

  return (
    <>
      <section id='activity-main-dashboard'>
        {/* Toggle button for mobile menu */}
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <img src={Leftmenuimage} />
        </button>
        <div className='row'>
        <div className='col-lg-3'>
        {/* Left Menu (including toggle for mobile view) */}
        <div className={`left-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li className={selectedMenuItem === 'dashboard' ? 'active' : ''} onClick={() => handleMenuItemClick('dashboard')}>
              Dashboard
            </li>
            <li className={selectedMenuItem === 'recently-viewed' ? 'active' : ''} onClick={() => handleMenuItemClick('recently-viewed')}>
              Recently viewed
            </li>
            <li className={selectedMenuItem === 'bids-offers' ? 'active' : ''} onClick={() => handleMenuItemClick('bids-offers')}>
            bids/Offers
            </li>
            <li className={selectedMenuItem === 'wishlist' ? 'active' : ''} onClick={() => handleMenuItemClick('wishlist')}>
            Wishlist
            </li>
            <li className={selectedMenuItem === 'watchlist' ? 'active' : ''} onClick={() => handleMenuItemClick('watchlist')}>
            Watchlist
            </li>
            <li className={selectedMenuItem === 'order-track' ? 'active' : ''} onClick={() => handleMenuItemClick('order-track')}>
            Order Track
            </li>
            <li className={selectedMenuItem === 'buy-again' ? 'active' : ''} onClick={() => handleMenuItemClick('buy-again')}>
            buy again
            </li>
            <li className={selectedMenuItem === 'selling' ? 'active' : ''} onClick={() => handleMenuItemClick('selling')}>
            selling
            </li>
            <li className={selectedMenuItem === 'saved-searches' ? 'active' : ''} onClick={() => handleMenuItemClick('saved-searches')}>
            saved searches
            </li>
            <li className={selectedMenuItem === 'saved-sellers' ? 'active' : ''} onClick={() => handleMenuItemClick('saved-sellers')}>
            saved sellers
            </li>
            <li className={selectedMenuItem === 'messages' ? 'active' : ''} onClick={() => handleMenuItemClick('messages')}>
            messages
            </li>
          </ul>
        </div>
        </div>
        <div className='col-lg-9'>
        {/* Render the selected component */}
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
