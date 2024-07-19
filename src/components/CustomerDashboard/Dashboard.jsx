import React, { useState } from 'react';
import CustomerPendingOrder from '../CustomerOrders/CustomerPendingOrder';
import CustomerCompleteOrder from '../CustomerOrders/CustomerCompleteOrder';
import CustomerRefundOrder from '../CustomerOrders/CustomerRefundOrder';

const Dashboard = () => {
  const [detail, setDetail] = useState(false);
  const [tab, setTab] = useState(0);

  return (
    <>
      <div className="seller-new-transaction">
        {!detail ?
          <>
            <div className="title">My Orders</div>
            <div className="seller-new-transaction-four">
              <div className="s-n-t-f-tabs">
                <ul>
                  <li onClick={() => { setTab(0) }} className={`${tab === 0 ? 'active' : ''}`}>Active Orders</li>
                  <li onClick={() => { setTab(1) }} className={`${tab === 1 ? 'active' : ''}`}>Completed Orders</li>
                  <li onClick={() => { setTab(2) }} className={`${tab === 2 ? 'active' : ''}`}>RefundsOrders</li>
                </ul>
              </div>
            </div>
          </>
          :
          null
        }
        {tab === 0 && <CustomerPendingOrder detail={detail} setDetail={setDetail} />}
        {tab === 1 && <CustomerCompleteOrder detail={detail} setDetail={setDetail} />}
        {tab === 2 && <CustomerRefundOrder detail={detail} setDetail={setDetail} />}
      </div>
    </>
  );
};

export default Dashboard;
