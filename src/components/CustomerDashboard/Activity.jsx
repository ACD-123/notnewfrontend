import React, { useEffect, useState } from 'react';
import Header from '../Header';
import SavedSellers from './SavedSellers'
import RecentlyViewed from './RecentlyViewed'
import Leftmenuimage from '../../assets/Images/leftmenu.png'
import MainPurchase from '../PurchaseHistory/MainPurchase'
import SavedSearches from './SavedSearches'
import { useLocation } from 'react-router-dom';
import Wishlist from './Wishlist';
import Dashboard from './Dashboard'
import BuyAgain from './BuyAgain';
import BidsOffer from './BidsOffer';
import Chat from './Chat';
const Activity = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('component'); // Initial menu selection
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility
  const location = useLocation();

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
    setSelectedMenuItem(menu);
    // Close the menu after selecting an item (for mobile view)
    setIsMenuOpen(false);
  };

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Render the component based on the selected menu item
  const renderComponent = () => {
    switch (selectedMenuItem) {
      case 'component':
        return <Dashboard />;
      case 'componentA':
        return <RecentlyViewed />;
      case 'componentB':
        return <BidsOffer /> ;
      case 'componentC':
        return <Wishlist /> ;
      case 'componentD':
        return <MainPurchase />;
      case 'componentE':
        return <BuyAgain />;
      case 'componentF':
        return ;
      case 'componentG':
        return <SavedSearches />;
      case 'componentH':
        return <SavedSellers />;
      case 'componentI':
        return <Chat />;
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
            <li className={selectedMenuItem === 'component' ? 'active' : ''} onClick={() => handleMenuItemClick('component')}>
              Dashboard
            </li>
            <li className={selectedMenuItem === 'componentA' ? 'active' : ''} onClick={() => handleMenuItemClick('componentA')}>
              Recently viewed
            </li>
            <li className={selectedMenuItem === 'componentB' ? 'active' : ''} onClick={() => handleMenuItemClick('componentB')}>
            bids/Offers
            </li>
            <li className={selectedMenuItem === 'componentC' ? 'active' : ''} onClick={() => handleMenuItemClick('componentC')}>
            Wishlist
            </li>
            <li className={selectedMenuItem === 'componentD' ? 'active' : ''} onClick={() => handleMenuItemClick('componentD')}>
            purchase history
            </li>
            <li className={selectedMenuItem === 'componentE' ? 'active' : ''} onClick={() => handleMenuItemClick('componentE')}>
            buy again
            </li>
            <li className={selectedMenuItem === 'componentF' ? 'active' : ''} onClick={() => handleMenuItemClick('componentF')}>
            selling
            </li>
            <li className={selectedMenuItem === 'componentG' ? 'active' : ''} onClick={() => handleMenuItemClick('componentG')}>
            saved searches
            </li>
            <li className={selectedMenuItem === 'componentH' ? 'active' : ''} onClick={() => handleMenuItemClick('componentH')}>
            saved sellers
            </li>
            <li className={selectedMenuItem === 'componentI' ? 'active' : ''} onClick={() => handleMenuItemClick('componentI')}>
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
