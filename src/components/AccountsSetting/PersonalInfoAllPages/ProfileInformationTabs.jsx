import React, { useEffect, useState } from 'react';
import Leftmenuimage from '../../../assets/Images/leftmenu.png'
import { useLocation, useNavigate } from 'react-router-dom';
import PersonalInfo from './PersonalInfo';
import SignSecurity from './SignSecurity';
import Addresses from './Addresses';

const ProfileInformationTabs = (props) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('component1');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    if (props.selectedMenuItem) {
      setSelectedMenuItem(props.selectedMenuItem)
    }
    const searchParams = new URLSearchParams(location.search);
    const componentName = searchParams.get('component1');
    if (componentName) {
      setSelectedMenuItem(componentName);
    }
  }, [location.search]);
  const handleMenuItemClick = (menu) => {
    setSelectedMenuItem(menu);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderComponent = () => {
    switch (selectedMenuItem) {
      case 'component1':
        return <PersonalInfo />;
      case 'component2':
        return <SignSecurity />;
      case 'component3':
        return <Addresses />;
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
              <ul>
                <li className={selectedMenuItem === 'component1' ? 'active' : ''} onClick={() => handleMenuItemClick('component1')}>
                  Profile information
                </li>
                <li className={selectedMenuItem === 'component3' ? 'active' : ''} onClick={() => handleMenuItemClick('component3')}>
                  Addresses
                </li>
                <li className={selectedMenuItem === 'component5' ? 'active' : ''} onClick={() => handleMenuItemClick('component5')}>
                  Search History
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

export default ProfileInformationTabs;
