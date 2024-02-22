import React, { useEffect, useState } from 'react';
import Leftmenuimage from '../../../assets/Images/leftmenu.png';
import { useLocation } from 'react-router-dom';
import Chat from '../../CustomerDashboard/Chat';
import Selling from './SellingDashboard';
import ProductManagement from './ProductManagement';
import SellingNotifications from '../NotificationPreferences/SellingNotifications';
import BidsNoffers from './BidsNoffers';
import OngoingOrderManagement from '../../OrderManagement/OngoingOrderManagement';
import CompleteOrderManagement from '../../OrderManagement/CompleteOrderManagement';
import RefundManagement from '../../OrderManagement/RefundManagement';
import EditBankDetails from './EditBankDetails';
import EditProfileSetup from './EditProfileSetup';
import SetupSellerAccount from './SetupSellerAccount';
import SellerProductImage2 from "../../../assets/Images/Categorylisting/2.png";
import icon1 from "../../../assets/Images/icons/1.png";
import icon2 from "../../../assets/Images/icons/2.png";
import icon3 from "../../../assets/Images/icons/3.png";
import Backimage from '../../../assets/Images/back-icon.png'
import Location from "../../../assets/Images/map.png";
import ProductServices from "../../../services/API/ProductServices"; //~/services/API/ProductServices
import OrderServices from "../../../services/API/OrderServices"; //~/services/API/OrderServices
import TransactionServices from "../../../services/API/TransactionServices"; //~/services/API/TransactionServices
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import Prdimage1 from '../../../assets/Images/Singleproduct/Product1.png';
import moment from "moment";
import SellerAllTabs from './SellerAllTabs';

const DetailedProductInfo = ({ order }) => {
  console.log('order', order)
  const [orderitems, setOrderItems] = useState({});
  const [estDelivery, setEstDelivery] = useState('');
  const [orderstatus, setOrderStatus] = useState('');
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const handleEstDelivery = (event) => {
    setEstDelivery(event.target.value);
  };
  const handleOrderStatus = (e) =>{
    e.preventDefault();
    setOrderStatus(e.target.value);
  }
  const getOrderItems = () => {
    if (order) {
      setOrderItems(JSON.parse(JSON.parse(order.orderItems)));
    }
  };
  // Modify this component to display detailed product information as per your needs
  return (
    <>
      {order ? (
        <>
          <div className="detailed-product-info">
            <h3>Order Details</h3>
            <h4>Order #: {order.orderid}</h4>
            <div className="row">
              <div className="col-lg-8">
                <div className="location">
                  <img style={{ width: "100%" }} src={Location} />
                </div>
              </div>
              <div
                className="col-lg-4"
                style={{
                  border: "2.15px solid #E9E9E9",
                  background: "#FCFCFC",
                }}
              >
                <div className="order-seller-details">
                  <p>
                    <img src={icon1} /> {order.billing_address}
                  </p>
                  <p>
                    <img src={icon2} /> {order.phone}
                  </p>
                  <p>
                    <img src={icon3} /> {order.buyer.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="row align-items-center deliverystatus">
              <div className="col-lg-6">
                <div className="deliverystatustime">
                  <h3>Delivery Status</h3>
                  <p>
                    <input
                      type="text"
                      placeholder="Enter Estimated Delivery..."
                      value={order.estimateDelivery }
                      onChange={handleEstDelivery}
                      style={{
                        border: "1px solid",
                        padding: "0 15px",
                        borderRadius: "7px",
                        marginLeft: "10px",
                      }}
                    />
                    <span></span>
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <select onChange={handleOrderStatus}>
                  <option>Pending</option>
                  <option>Delivered</option>
                  <option>Refund</option>
                </select>
              </div>
            </div>
            {orderitems.length > 0 ? (
              <>
                {orderitems.map((items) => {
                  let attributes = JSON.parse(items.attributes);
                  return (
                    <>
                      <div className="row align-items-center">
                        <h3>Order Items</h3>
                        <div className="col-lg-9">
                          <div className="product-image">
                            <div className="image">
                              <img src={SellerProductImage2} />
                            </div>
                            <div className="prd-details">
                              <h5>{items.name}</h5>
                              <p>${items.price}</p>
                              {attributes.length > 0 ? (
                                <>
                                  {attributes?.map((attribute) => {
                                    return (
                                      <>
                                        <p className="size-color">
                                          <span>Size:</span>
                                          {attribute.size} <span>Color:</span>{" "}
                                          <div
                                            style={{
                                              width: "40px",
                                              background: "red",
                                            }}
                                          >
                                            &nbsp;
                                          </div>{" "}
                                        </p>
                                      </>
                                    );
                                  })}
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          {attributes.length > 0 ? (
                            <>
                              {attributes?.map((attribute) => {
                                return (
                                  <>
                                    <h5 className="qunty">
                                      Quantity :
                                      <span>{attribute.quantity}</span>
                                    </h5>
                                  </>
                                );
                              })}
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              ""
            )}
            <div className="order-price-detail">
              <p className="order-price-detail-list">
                <div>Subtotal ( {orderitems.length} )</div>
                <div>$ {order.subtotal_cost}</div>
              </p>
              <p className="order-price-detail-list">
                <div>Shipping</div>
                <div>$ <input type="text"  value={order.shipping_cost} style={{ border: '1px solid', padding: '0 5px', borderRadius: '7px', marginLeft: '10px'}} placeholder="Enter Shipping Price.." /></div>
              </p>
              <p className="order-price-detail-list">
                <div>Discount</div>
                <div>$ <input type="text"  value={order.discountcode}  style={{ border: '1px solid', padding: '0 5px', borderRadius: '7px', marginLeft: '10px'}} placeholder="Enter Discount.." /></div>
              </p>
              <p className="order-price-detail-list ordertotal">
                <div>Order Total</div>
                <div>$ {order.order_total}</div>
              </p>
            </div>
            <div className="not-order-detail">
              <h3>Note</h3>
              <div >
                <textarea className="ord-note" style={{ width: '700px'}}>{order.admin_notes}</textarea>
              </div>
            </div>
            <Link style={{ textDecoration: "unset" }}>
              <button className="updteordr">Updated Order</button>
            </Link>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};
const StripeTransactions = () => {
  const [selectedLink, setSelectedLink] = useState(null);
  const [transactions, setTransactions] = useState({});
  const [trans, setTrans] = useState(false);
  const [orderid, setOrderID] = useState("");
  const [order, setOrder] = useState("");
  const getStripeTransactions = () =>{
    TransactionServices.getStripeTransactions()
    .then((response) => {
      setTransactions(response);
    });
  }
  const getOrders =(trans) =>{
    setTrans(true);
    OrderServices.getbyid(trans.payment_resource_id)
    .then((response) => {
      setOrder(response);
    });
    setOrderID(trans.payment_resource_id);
  }
  useEffect(() => {
    getStripeTransactions();
  }, []);
  return (
    <>
    {trans ? (<>
      <DetailedProductInfo order={order} />
    </>):(
      <>
      <section id='activity-main-dashboard'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className="main-content">
            <section id='searchhistory'>
                <div className='row'>
                  <div className='title-buton'>
                    <div>
                      <h3>Transactions</h3>
                    </div>
                  </div>
                </div>
                <br />
                <div className='row'>
                   {transactions.length > 0 ?(<>
                    {transactions.map((item, index) => {
                      return(
                        <>
                          <div className='historylist' key={index}>
                            <div className='list-inline'>  
                            <table style={{ width: "100%"}}>
                            <thead>
                                <tr>
                                  <th>
                                    Account ID
                                  </th>
                                  <th>
                                    Amount
                                  </th>
                                  <th>
                                    Bank
                                  </th>
                                  <th>
                                    Transaction ID
                                  </th>
                                  <th>
                                    Transaction Type
                                  </th>
                                  <th>
                                    User
                                  </th>
                                  <th>
                                  Created At
                                  </th>
                                  <th>
                                    Payment Source
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    {item.account_id}
                                  </td>
                                  <td>
                                    $ {item.amount}
                                  </td>
                                  <td>
                                    {item.bank.fullname}
                                  </td>
                                  <td>
                                    {item.transaction_id}
                                  </td>
                                  <td>
                                    {item.transaction_type}
                                  </td>
                                  <td>
                                    {item.user.name}
                                  </td>
                                  <td>
                                    {item.created_at}
                                  </td>
                                  <td>
                                  {(() => {
                                      if (item.payment_source === "order_create") {
                                         return (
                                          <>
                                           <div>
                                              Order
                                              <br />
                                              <a href='#'  onClick={() =>
                                                  getOrders(item)
                                              }>Details..</a>
                                           </div>
                                           </>
                                         )
                                       } 
                                       else {
                                        return (
                                          <div>&nbsp;</div>
                                        )
                                      }
                                    })()}
  
                                  </td>
                                  </tr>
                              </tbody>
                            </table>
                            </div>
                          </div>
                        </>
                      )
                    })}
                   </>):('No transactions')}
                </div>
              </section>
            <button className='backbutton-account' onClick={() => window.history.back()}><img src={Backimage} /> Back</button>
            </div>
          </div>
        </div>
      </section>
      </>
    )}
    </>
  );
};

export default StripeTransactions;
