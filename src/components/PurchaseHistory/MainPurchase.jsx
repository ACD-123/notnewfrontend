import React, { useState } from 'react';
import OngoingOrders from './OngoingOrders'
import CompleteOrders from './CompleteOrders'
import Refunds from './Refund'
const MainPurchase = () => {
  const [activeTab, setActiveTab] = useState('history1');
  const [ isLoading,  setIsLoading ] = useState(true)

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <section id='purchasehistory'>
        <div className='row'>
          <h3>Order Track </h3>
          <div>
            <div className="tab-buttons">
              <button onClick={() => handleTabClick('history1')} className={activeTab === 'history1' ? 'active' : ''}>
                Ongoing
              </button>
              <button onClick={() => handleTabClick('history2')} className={activeTab === 'history2' ? 'active' : ''}>
                Completed
              </button>
              <button onClick={() => handleTabClick('history3')} className={activeTab === 'history3' ? 'active' : ''}>
                Refunds
              </button>
            </div>
            <div className="tab-content">
              {activeTab === 'history1' && <div><OngoingOrders setIsLoading={setIsLoading} isLoading={isLoading}/></div>}
              {activeTab === 'history2' && <div><CompleteOrders setIsLoading={setIsLoading} isLoading={isLoading}/></div>}
              {activeTab === 'history3' && <div><Refunds setIsLoading={setIsLoading} isLoading={isLoading}/></div>}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MainPurchase