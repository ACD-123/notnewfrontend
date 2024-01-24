import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Activity from './Activity'
import Chat from './Chat';
import AccountInfo from '../AccountsSetting/AccountInfo';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='main-dasboard-tabs' 
    style={{padding: "30px 0px"}}
    >
        <div className='whatyouthink'>
            <Link to="">Tell us what you Think</Link>
        </div>
      <div className="tab-buttons">
        <button onClick={() => handleTabClick('tab1')} className={activeTab === 'tab1' ? 'active' : ''}>
        Activity
        </button>
        <button onClick={() => handleTabClick('tab2')} className={activeTab === 'tab2' ? 'active' : ''}>
        Messages
        </button>
        <button onClick={() => handleTabClick('tab3')} className={activeTab === 'tab3' ? 'active' : ''}>
        Account
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'tab1' && <div><Activity /></div>}
        {activeTab === 'tab2' && <div><Chat /></div>}
        {activeTab === 'tab3' && <div><AccountInfo /></div>}
      </div>
    </div>
  );
};

export default Tabs;