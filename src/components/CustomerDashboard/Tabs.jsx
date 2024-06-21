import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Activity from './Activity'
import Chat from './Chat';
import AccountInfo from '../AccountsSetting/AccountInfo';
import NotFound_ from '../../pages/NotFound_'
const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='main-dasboard-tabs'
      style={{ padding: "30px 0px" }}
    >
      <div className='whatyouthink'>
        <Link to="">Tell us what you Think</Link>
      </div>
      <div className="tab-buttons">
        <button onClick={() => handleTabClick(0)} className={activeTab === 0 ? 'active' : ''}>
          Activity
        </button>
        <button onClick={() => handleTabClick(1)} className={activeTab === 1 ? 'active' : ''}>
          Messages
        </button>
        <button onClick={() => handleTabClick(2)} className={activeTab === 2 ? 'active' : ''}>
          Account
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 0 && <div><Activity /></div>}
        {activeTab === 1 && <div><NotFound_ /></div>}
        {activeTab === 2 && <div><AccountInfo /></div>}
      </div>
    </div>
  );
};

export default Tabs;