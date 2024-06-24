import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Activity from './Activity'
import Chat from './Chat';
import AccountInfo from '../AccountsSetting/AccountInfo';
import NotFound_ from '../../pages/NotFound_'
const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTab, setSelectedTab] = useState('activity');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const componentName = searchParams.get('tab');

    if (componentName) {
      setSelectedTab(componentName);
    }
  }, [location.search]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderComponent = () => {
    switch (selectedTab) {
      case 'activity':
        return <Activity />;
      case 'messages':
        // return <RecentlyViewed />;
        return <NotFound_/>
      case 'account':
        // return <BidsOffer /> ;
        return <AccountInfo/>
      default:
        return ; // Default to Test component if no matching menu item is found
    }
  };

  const handleMenuItemClick = (tab) => {
    if(tab === 'activity'){
      navigate(`/customerdashboard?tab=${tab}&component=dashboard`);
      setSelectedTab(tab);
    }else{
      navigate(`/customerdashboard?tab=${tab}`);
      setSelectedTab(tab);
    }
  };

  return (
    <div className='main-dasboard-tabs'>
      <div className='whatyouthink'>
        <Link to="">Tell us what you Think</Link>
      </div>
      <div className="tab-buttons">
        <button onClick={() => handleMenuItemClick('activity')} className={selectedTab === 'activity' ? 'active' : ''}>
          Activity
        </button>
        <button onClick={() => handleMenuItemClick('messages')} className={selectedTab === 'messages' ? 'active' : ''}>
          Messages
        </button>
        <button onClick={() => handleMenuItemClick('account')} className={selectedTab === 'account' ? 'active' : ''}>
          Account
        </button>
      </div>
      <div className="tab-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Tabs;