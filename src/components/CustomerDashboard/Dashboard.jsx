import React, { useState } from 'react';
import CustomerPendingOrder from '../CustomerOrders/CustomerPendingOrder';
import CustomerCompleteOrder from '../CustomerOrders/CustomerCompleteOrder';
import CustomerRefundOrder from '../CustomerOrders/CustomerRefundOrder';
import CustomerActiveOrder from '../CustomerOrders/CustomerActiveOrder';

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
                  <li onClick={() => { setTab(0) }} className={`${tab === 0 ? 'active' : ''}`}>Pending Orders</li>
                  <li onClick={() => { setTab(1) }} className={`${tab === 1 ? 'active' : ''}`}>Active Orders</li>
                  <li onClick={() => { setTab(2) }} className={`${tab === 2 ? 'active' : ''}`}>Completed Orders</li>
                  <li onClick={() => { setTab(3) }} className={`${tab === 3 ? 'active' : ''}`}>RefundsOrders</li>
                </ul>
              </div>
            </div>
          </>
          :
          null
        }
        {tab === 0 && <CustomerPendingOrder detail={detail} setDetail={setDetail} />}
        {tab === 1 && <CustomerActiveOrder detail={detail} setDetail={setDetail} />}
        {tab === 2 && <CustomerCompleteOrder detail={detail} setDetail={setDetail} />}
        {tab === 3 && <CustomerRefundOrder detail={detail} setDetail={setDetail} />}
      </div>
    </>
  );
};

export default Dashboard;
