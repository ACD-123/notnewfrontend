import React, { useState, useEffect } from 'react'
import OngoingOrders from '../PurchaseHistory/OngoingOrders'
import OrderServices from "../../services/API/OrderServices"; //~/services/API/OrderServices
import { toast } from "react-toastify";

const Dashboard = () => {
    const [customerordercompcount, setCustOrderCompCount] = useState(0);
    const [customerorderpendcount, setCustomerOrderPendCount] = useState(0);
    const [customerorderrefcount, setCustomerOrderRefCount] = useState(0);

    const customerCompleteOrder = () =>{
        OrderServices.customerCompCount()
         .then((response) => {
            setCustOrderCompCount(response);
          }).catch((e) => {
            toast.error(e.message);
          });
    }
    const customerPendingOrder = () =>{
        OrderServices.customerPendCount()
         .then((response) => {
            setCustomerOrderPendCount(response);
          }).catch((e) => {
            toast.error(e.message);
          });
    }
    const customerRefundOrder = () =>{
        OrderServices.customerRefundCount()
         .then((response) => {
            setCustomerOrderRefCount(response);
          }).catch((e) => {
            toast.error(e.message);
          });
    }
useEffect(() => {
    customerCompleteOrder();
    customerPendingOrder();
    customerRefundOrder();
}, []);
  return (
   <>
   <section id='dashboard-panel'>
    <div className='row firstrow'>
        <h3>Hi, Customers</h3>
        <div className='col-lg-4 col-sm-4'>
            <div className='dashboard-result'>
            <h2>{customerordercompcount}</h2>
            <p>Order Completed</p>
            </div>
        </div>
        <div className='col-lg-4 col-sm-4'>
        <div className='dashboard-result'>
            <h2>{customerorderpendcount}</h2>
            <p>Order Pending</p>
            </div>
        </div>
        <div className='col-lg-4 col-sm-4'>
        <div className='dashboard-result'>
            <h2>{customerorderrefcount}</h2>
            <p>Order Refund</p>
            </div>
        </div>

    </div>
    <div className='row' style={{paddingTop: "20px"}}>
    <OngoingOrders />
    </div>
   </section>
   </>
  )
}

export default Dashboard