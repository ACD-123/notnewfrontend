// import React, { useState, useEffect } from 'react'
// import OngoingOrders from '../PurchaseHistory/OngoingOrders'
// import OrderServices from "../../services/API/OrderServices"; //~/services/API/OrderServices
// import { toast } from "react-toastify";
// import { Spinner } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import RightArrow from '../../assets/Images/rightarrow.png';
// import Prdimage from '../../assets/Images/Singleproduct/prdimage.png';
// import NoDataFound from '../../assets/Images/do-data-found.png';

// const Dashboard = () => {
//   const [customerordercompcount, setCustOrderCompCount] = useState(0);
//   const [customerorderpendcount, setCustomerOrderPendCount] = useState(0);
//   const [customerorderrefcount, setCustomerOrderRefCount] = useState(0);
//   const [customerOrders, setCustomerOrders] = useState([]);
//   const loggedInUser = localStorage.getItem("user_details");
//   const [isLoading, setIsLoading] = useState(true);

//   const loggedInUsers = JSON.parse(loggedInUser);
//   const customerCompleteOrder = () => {
//     OrderServices.customerCompCount()
//       .then((response) => {
//         setCustOrderCompCount(response);
//         customerPendingOrder()
//       }).catch((error) => {
//         toast.error(error.message);
//       });
//   }
//   const customerPendingOrder = () => {
//     OrderServices.customerPendCount()
//       .then((response) => {
//         setCustomerOrderPendCount(response);
//         customerRefundOrder()
//       }).catch((e) => {
//         toast.error(e.message);
//       });
//   }
//   const customerRefundOrder = () => {
//     OrderServices.customerRefundCount()
//       .then((response) => {
//         setCustomerOrderRefCount(response);
//         getCustomerOrder()
//       }).catch((e) => {
//         toast.error(e.message);
//       });
//   }
//   const getCustomerOrder = () => {
//     OrderServices.customerOngoingOrders()
//       .then((response) => {
//         console.log(response.data , 'customerOngoingOrders');
//         setCustomerOrders(response.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         setIsLoading(false);
//       });
//   };

//   useEffect(() => {
//     customerCompleteOrder();
//   }, []);
//   return (
//     <>
//       {isLoading ?
//         <div className="loader-container text-center">
//           <Spinner animation="border" role="status"></Spinner>
//         </div>
//         :
//         <section id='dashboard-panel'>
//           <div className='row firstrow'>
//             <h3>Hi, {loggedInUsers.name}</h3>
//             <div className='col-lg-4 col-sm-4'>
//               <div className='dashboard-result'>
//                 <h2>{customerordercompcount !== null ? customerordercompcount : 0}</h2>
//                 <p>Order Completed</p>
//               </div>
//             </div>
//             <div className='col-lg-4 col-sm-4'>
//               <div className='dashboard-result'>
//                 <h2>{customerorderpendcount !== null ? customerorderpendcount : 0}</h2>
//                 <p>Order Pending</p>
//               </div>
//             </div>
//             <div className='col-lg-4 col-sm-4'>
//               <div className='dashboard-result'>
//                 <h2>{customerorderrefcount !== null ? customerorderrefcount : 0}</h2>
//                 <p>Order Refund</p>
//               </div>
//             </div>

//           </div>
//           <div className='row' style={{ paddingTop: "20px" }}>
//             <div className='ongoing'>
//               {customerOrders?.length === 0 ? (
//                 <div className='no-data-found'>
//                   <img src={NoDataFound} alt="" />
//                   <p>Orders Not  Found</p>
//                 </div>
//               ) : (
//                 <>
//                   {customerOrders.map((order, index) => (
//                     <>
//                       <div className='row align-items-center' key={order?.id}>
//                         <div className='col-lg-8'>
//                           <div className='product-image'>
//                             <div className='image'>
//                               <img src={Prdimage} alt={`Product`} />
//                             </div>
//                             <div className='prd-details'>
//                               <h5>Order # : <b>{order?.orderid}</b></h5>
//                               <h3>{order?.fullname}</h3>
//                             </div>
//                           </div>
//                         </div>

//                         <div className='col-lg-2'>
//                           <div className='delivery-bttn'>
//                             <Link to=''>Delivery in Process</Link>
//                           </div>
//                         </div>
//                         <div className='col-lg-2'>
//                           <div className='rightarrow'>
//                             <img src={RightArrow} alt='Right Arrow' />
//                           </div>
//                         </div>
//                       </div>
//                       {index !== customerOrders?.length - 1 && <hr />}
//                     </>
//                   ))}
//                 </>
//               )}
//             </div>
//           </div>
//         </section>
//       }
//     </>
//   )
// }

// export default Dashboard

import React, { useState, useEffect } from 'react';
import ProductServices from '../../services/API/ProductServices';
import LoadingComponents from '../Shared/LoadingComponents';
import CustomerPendingOrder from '../CustomerOrders/CustomerPendingOrder';
import CustomerCompleteOrder from '../CustomerOrders/CustomerCompleteOrder';
import CustomerRefundOrder from '../CustomerOrders/CustomerRefundOrder';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
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
                  <li onClick={() => { setTab(4) }} className={`${tab === 2 ? 'active' : ''}`}>RefundsOrders</li>
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
