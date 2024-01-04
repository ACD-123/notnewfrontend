import React from 'react'
import OngoingOrders from '../PurchaseHistory/OngoingOrders'
const Dashboard = () => {
  return (
   <>
   <section id='dashboard-panel'>
    <div className='row firstrow'>
        <h3>Hi, Customer</h3>
        <div className='col-lg-4 col-sm-4'>
            <div className='dashboard-result'>
            <h2>20</h2>
            <p>Order Completed</p>
            </div>
        </div>
        <div className='col-lg-4 col-sm-4'>
        <div className='dashboard-result'>
            <h2>20</h2>
            <p>Order Completed</p>
            </div>
        </div>
        <div className='col-lg-4 col-sm-4'>
        <div className='dashboard-result'>
            <h2>20</h2>
            <p>Order Completed</p>
            </div>
        </div>

    </div>
    <div className='row' style={{paddingTop: "20px"}}>
        <h3>Recent Orders</h3>
    <OngoingOrders />
    </div>
   </section>
   </>
  )
}

export default Dashboard