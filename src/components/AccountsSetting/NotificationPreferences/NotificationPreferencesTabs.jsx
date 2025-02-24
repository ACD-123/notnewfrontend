import React, { useEffect, useState } from 'react';
import Leftmenuimage from '../../../assets/Images/leftmenu.png'
import { useLocation } from 'react-router-dom';
import GeneralNotifications from './GeneralNotifications';
import SellingNotifications from './SellingNotifications';


const NotificationPreferencesTabs = ({ handleGeneralNotifications }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('notification1');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const componentName = searchParams.get('notification1');

    if (componentName) {
      setSelectedMenuItem(componentName);
    }
  }, [location.search]);
  const handleMenuItemClick = (menu) => {
    setSelectedMenuItem(menu);
    setIsMenuOpen(false);
    switch (menu) {
      case 'notification1':
        handleGeneralNotifications();
        break;
      case 'notification2':
        setSelectedMenuItem(menu);
        break;
      default:
        break;
    }
  
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderComponent = () => {
    switch (selectedMenuItem) {
      case 'notification1':
        return <GeneralNotifications />;
      case 'notification2':
        return <SellingNotifications />;
      default:
        return ;
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
