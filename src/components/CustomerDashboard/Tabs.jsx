import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Activity from './Activity'
// import Chat from './Chat';
import AccountInfo from '../AccountsSetting/AccountInfo';
import NotFound_ from '../../pages/NotFound_'
import UserChat from '../UserChat';
const Tabs = () => {
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


  const renderComponent = () => {
    switch (selectedTab) {
      case 'activity':
        return <Activity />;
      case 'messages':
        // return <RecentlyViewed />;
        return <UserChat/>
      case 'account':
        // return <BidsOffer /> ;
        return <AccountInfo />
      default:
        return;
    }
  };

  const handleMenuItemClick = (tab) => {
    if (tab === 'activity') {
      navigate(`/customerdashboard?tab=${tab}&component=my-orders`);
      setSelectedTab(tab);
    } else {
      navigate(`/customerdashboard?tab=${tab}`);
      setSelectedTab(tab);
    }
  };

  return (
    <div className='main-dasboard-tabs'>
      <div className="tab-buttons">
        <div className="t-b-b">
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
        <div className='t-b-w'>
          <Link to="">Tell us what you Think</Link>
        </div>
      </div>
      <div className="tab-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Tabs;