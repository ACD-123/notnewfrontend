import React, { useEffect, useState } from 'react';
import Leftmenuimage from '../../../assets/Images/leftmenu.png'
import { useLocation } from 'react-router-dom';
import Chat from '../../CustomerDashboard/Chat'
import Selling from './SellingDashboard';
import ProductManagement from './ProductManagement';
import SellingNotifications from '../NotificationPreferences/SellingNotifications'

const SellerAllTabs = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('selling1'); // Initial menu selection
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility
  const location = useLocation();

  useEffect(() => {
    // Extract the component name from the query parameter or state passed from the Header component
    const searchParams = new URLSearchParams(location.search);
    const componentName = searchParams.get('selling1');

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
      case 'selling1':
        return <Selling />;
      case 'selling2':
        return <ProductManagement />;
        case 'selling3':
        return ;
        case 'selling4':
        return ;
        case 'selling5':
        return <Chat /> ;
        case 'selling6':
        return ;
        case 'selling7':
        return ;
        case 'selling8':
        return ;
        case 'selling9':
        return <SellingNotifications /> ;
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
            <li className={selectedMenuItem === 'selling1' ? 'active' : ''} onClick={() => handleMenuItemClick('selling1')}>
            Dashboard
            </li>
            <li className={selectedMenuItem === 'selling2' ? 'active' : ''} onClick={() => handleMenuItemClick('selling2')}>
            Product Management           </li>
            <li className={selectedMenuItem === 'selling3' ? 'active' : ''} onClick={() => handleMenuItemClick('selling3')}>
            Order Management
            </li>
            <li className={selectedMenuItem === 'selling4' ? 'active' : ''} onClick={() => handleMenuItemClick('selling4')}>
            Bids & Offers
            </li>
            <li className={selectedMenuItem === 'selling5' ? 'active' : ''} onClick={() => handleMenuItemClick('selling5')}>
            Chats
            </li>
            <li className={selectedMenuItem === 'selling6' ? 'active' : ''} onClick={() => handleMenuItemClick('selling6')}>
            Feedbacks
            </li>
            <li className={selectedMenuItem === 'selling7' ? 'active' : ''} onClick={() => handleMenuItemClick('selling7')}>
            Discounts & coupons
            </li>
            <li className={selectedMenuItem === 'selling8' ? 'active' : ''} onClick={() => handleMenuItemClick('selling8')}>
            Transactions
            </li>
            <li className={selectedMenuItem === 'selling9' ? 'active' : ''} onClick={() => handleMenuItemClick('selling9')}>
            Shop Settings
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

export default SellerAllTabs;
