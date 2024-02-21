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
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import Prdimage1 from '../../../assets/Images/Singleproduct/Product1.png';

const MyProducts = () => {
  const [selectedLink, setSelectedLink] = useState(null);
  const [products, setProducts] = useState({});
  const [trustedseller, setTrustedSeller] = useState(0);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user_details'));
    if(user.isTrustedSeller)
    {
      setTrustedSeller(1);
    }
    ProductServices.self()
    .then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <>
    {trustedseller ? (<>
      <section id='activity-main-dashboard'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className="main-content">
            <section id='searchhistory'>
                <div className='row'>
                  <div className='title-buton'>
                    <div>
                      <h3>Items Listing</h3>
                    </div>
                  </div>
                </div>
                <br />
                <div className='row'>
                  {products.length > 0 ?(
                    <>
                      {products.map((item, index) => {
                        const attributes = JSON.parse(item.attributes);
                        console.log('attr', attributes)
                    return(
                      <>
                      <div className='historylist' key={index}>
                        <div className='list-inline'>
                          <div>
                            <img src={Prdimage1} width="150" height="150" alt='Search Icon' />
                          </div>
                          <div  className="detaildashbritemdetail">
                          <h4>Name: {item.name}</h4>
                              {/* <Link to='/category'>
                            </Link> */}
                          <p>Price: $ {item.price}</p>
                          <br />
                          <h4>Attributes:</h4>
                            {attributes.length > 0 ? (
                              <>
                              
                                {attributes.map((attribute) => {
                                  return(
                                    <>
                                      <ul>
                                        <li>Size: {attribute.size}</li>
                                        <li>Color Available: {attribute.color}</li>
                                        <li>Quantity Available: {attribute.quantity}</li>
                                      </ul>
                                    </>
                                  )
                                })}
                              </>
                            ):('')}
                          </div>
                          <div className="dropdown">
                              <a
                                href={`singleproduct/${item.guid}`}
                                target='_blank'
                              >
                                {/* <Link to={`/completedorder/${summary.order.orderid}`}> */}
                                View Detail
                              </a>
                              {/* </Link> */}
                            </div>
                        </div>
                        <hr />
                      </div>

                      </>
                    )
                  })} 
                    </>
                  ):('No items')}
                </div>
              </section>
            <button className='backbutton-account' onClick={() => setSelectedLink(null)}><img src={Backimage} /> Back</button>
            </div>
          </div>
        </div>
      </section>
    </>):(
      <>
        <p>Your Store has not yet Been Registered!</p>
      </>
    )}
    </>
  );
};

export default MyProducts;
