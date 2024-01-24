import React, { useEffect, useState } from 'react';
import Leftmenuimage from '../../../assets/Images/leftmenu.png'
import { useLocation } from 'react-router-dom';
import GeneralNotifications from './GeneralNotifications';
import SellingNotifications from './SellingNotifications';


const NotificationPreferencesTabs = ({ handleGeneralNotifications }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('notification1'); // Initial menu selection
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility
  const location = useLocation();

  useEffect(() => {
    // Extract the component name from the query parameter or state passed from the Header component
    const searchParams = new URLSearchParams(location.search);
    const componentName = searchParams.get('notification1');

    if (componentName) {
      setSelectedMenuItem(componentName);
    }
  }, [location.search]);
  // Function to handle menu item clicks
  const handleMenuItemClick = (menu) => {
    setSelectedMenuItem(menu);
    // Close the menu after selecting an item (for mobile view)
    setIsMenuOpen(false);
    // Check if the selected menu item is for General Notifications
    // Check which menu item is clicked
    switch (menu) {
      case 'notification1': // General Notifications
        handleGeneralNotifications();
        break;
      case 'notification2': // Seller account Notification settings
        setSelectedMenuItem(menu);
        break;
      default:
        break;
    }
  
  };
 

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Render the component based on the selected menu item
  const renderComponent = () => {
    switch (selectedMenuItem) {
      case 'notification1':
        return <GeneralNotifications />;
      case 'notification2':
        return <SellingNotifications />;
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
            <li className={selectedMenuItem === 'notification1' ? 'active' : ''} onClick={() => handleMenuItemClick('notification1')}>
            General Notifications
            </li>
            <li className={selectedMenuItem === 'notification2' ? 'active' : ''} onClick={() => handleMenuItemClick('notification2')}>
            Selling Notification settings            </li>
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

export default NotificationPreferencesTabs;
