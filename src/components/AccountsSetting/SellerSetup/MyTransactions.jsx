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
import Backimage from '../../../assets/Images/back-icon.png'
import ProductServices from "../../../services/API/ProductServices"; //~/services/API/OrderServices
import TransactionServices from "../../../services/API/TransactionServices"; //~/services/API/TransactionServices
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import Prdimage1 from '../../../assets/Images/Singleproduct/Product1.png';
import moment from "moment";
import SellerAllTabs from '../SellerSetup/SellerAllTabs';
const MyTransactions = () => {
  const [selectedLink, setSelectedLink] = useState(null);
  const [transactions, setTransactions] = useState({});
  const [trans, setTrans] = useState(false);
  const [orderid, setOrderID] = useState("");
  const getTransactions =() =>{
    TransactionServices.gettransactions()
    .then((response) => {
      setTransactions(response);
    });
  }
  const getOrders =(id) =>{
    setTrans(true);
    setOrderID(id);
  }
  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <>
    {trans ? (<>
      <SellerAllTabs orderid={orderid} />
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
                      let createdAt = moment(item.created_at).format("YYYY-MM-DD")
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
                                    {createdAt}
                                  </td>
                                  <td>
                                  {(() => {
                                      if (item.payment_source === "order_create") {
                                        return (
                                          <div><a href='#' onClick={getOrders(item.payment_resource_id)}>order Details</a></div>
                                        )
                                      } 
                                      // else if (otherCase) {
                                      //   return (
                                      //     <div>otherCase</div>
                                      //   )
                                      // }
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
                  </>):('No Transactions')}
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

export default MyTransactions;
