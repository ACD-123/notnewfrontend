import React, { useEffect, useState } from 'react';
import Leftmenuimage from '../../../assets/Images/leftmenu.png'

import { useLocation } from 'react-router-dom';
import PersonalInfo from './PersonalInfo';
import SignSecurity from './SignSecurity';
import Addresses from './Addresses';
import SavedImages from './SavedImages';
import SearchHistory from './SearchHistory';

const ProfileInformationTabs = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('component1'); // Initial menu selection
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility
  const location = useLocation();

  useEffect(() => {
    // Extract the component name from the query parameter or state passed from the Header component
    const searchParams = new URLSearchParams(location.search);
    const componentName = searchParams.get('component1');

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
      case 'component1':
        return <PersonalInfo /> ;
      case 'component2':
        return <SignSecurity />;
      case 'component3':
        return  <Addresses />;
      case 'component4':
        return <SavedImages />;
        case 'component5':
          return <SearchHistory />;
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
            <li className={selectedMenuItem === 'component1' ? 'active' : ''} onClick={() => handleMenuItemClick('component1')}>
            Profile information
            </li>
            <li className={selectedMenuItem === 'component2' ? 'active' : ''} onClick={() => handleMenuItemClick('component2')}>
            Sign in and security            </li>
            <li className={selectedMenuItem === 'component3' ? 'active' : ''} onClick={() => handleMenuItemClick('component3')}>
            Addresses
            </li>
            <li className={selectedMenuItem === 'component4' ? 'active' : ''} onClick={() => handleMenuItemClick('component4')}>
            Save images
            </li>
            <li className={selectedMenuItem === 'component5' ? 'active' : ''} onClick={() => handleMenuItemClick('component5')}>
            Search History
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

export default ProfileInformationTabs;
