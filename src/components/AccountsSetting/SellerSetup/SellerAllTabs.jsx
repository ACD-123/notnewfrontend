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
import MyTransactions from '../SellerSetup/MyTransactions';
import NotFound from "../../../pages/NotFound_"
import DiscountAndCoupens from './DiscountAndCoupens';
import SellerFeedback from '../../Seller/SellerFeedback';
import PendingOrderManagement from '../../OrderManagement/PendingOrderManagement';
import Backimage from '../../../assets/Images/back-icon.png'

const SellerAllTabs = (props) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('selling1');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOrderManagementOpen, setIsOrderManagementOpen] = useState(false);
  const [isOrderManagementOpens, setIsOrderManagementOpens] = useState(false);
  const [trustedseller, setTrustedseller] = useState(false);
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showMessage, setShowMessage] = useState(0);

  const togglePositionOfMessage = (number) => {
    if (number === showMessage) {
      setShowMessage(0);
    } else {
      setShowMessage(number)
      setTimeout(() => {
        setShowMessage(0)
      }, 5000);
    }

  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user_details');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const componentName = searchParams.get('selling1');

    if (componentName) {
      setSelectedMenuItem(componentName);
    }
  }, [location.search]);

  const handleMenuItemClick = (menu) => {
    setSelectedMenuItem(menu);
    setIsOrderManagementOpen(false); // Close order management dropdown on menu change
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleOrderManagement = () => {
    setIsOrderManagementOpen(!isOrderManagementOpen);
  };
  const toggleOrderManagements = () => {
    setIsOrderManagementOpens(!isOrderManagementOpens);
  };
  const handleCallbacks = (value) => {
    setSelectedMenuItem(value);
  }
  const [submitted, setSubmitted] = useState(false);
  const [productId, setProductId] = useState('');
  const renderComponent = () => {
    // setProductId('')
    switch (selectedMenuItem) {
      case 'selling1':
        return <Selling orderid={props.orderid} parentCallback={handleCallbacks} />;
      case 'selling2':
        return <ProductManagement setSubmitted={setSubmitted} submitted={submitted} productId={productId} setProductId={setProductId}/>;
      case 'selling3':
        return null;
      case 'pending':
        return <PendingOrderManagement />;
      case 'sellings1':
        // return <OngoingOrderManagement />;
        return <OngoingOrderManagement />
      case 'sellings2':
        return <CompleteOrderManagement />
      // return <CompleteOrderManagement />;
      case 'sellings3':
        return <RefundManagement />;
      // return <NotFound/> 
      case 'selling4':
        return <BidsNoffers />;
      // return <NotFound/> 
      case 'selling5':
        return <Chat />;
        // return <NotFound />
      case 'selling6':
        return <SellerFeedback />  // You can add the component for Feedbacks here
      case 'selling7':
        return <DiscountAndCoupens /> // You can add the component for Discounts & coupons here
      case 'selling8':
        return <MyTransactions/>; // You can add the component for Transactions here
        // return <NotFound />
      case 'sellingss1':
        return <EditProfileSetup />;
      case 'sellingss1b':
        return <SetupSellerAccount />;
      case 'sellingss2':
        return <EditBankDetails />;
      case 'sellingss3':
        return <NotFound />
        // return <SellingNotifications />;
        return <SellingNotifications />;
      default:
        return null;
    }
  };

  useEffect(() => {
    let loggedInUser = localStorage.getItem("user_details");
    if (loggedInUser) {
      const loggedInUsers = JSON.parse(loggedInUser);
      if (loggedInUsers.isTrustedSeller == 1) {
        setTrustedseller(true)
      }
    }
  }, []);
  return (
    <>
      <section id='activity-main-dashboard'>
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <img src={Leftmenuimage} alt="Menu" />
        </button>
        <div className='row'>
          <div className='col-lg-3'>
            <div className={`left-menu ${isMenuOpen ? 'open' : ''}`}>
              <div className="title-selling-hub">Selling Hub</div>
              <ul>
                <li className={selectedMenuItem === 'selling1' ? 'active' : ''} onClick={() => {handleMenuItemClick('selling1'); setProductId('')}}>
                  Dashboard
                </li>
                {user?.isTrustedSeller === 0 ?
                  <>
                    <li onClick={() => { togglePositionOfMessage(1) }}>
                      Product Management
                    </li>
                    {showMessage === 1 &&
                      <li className='no-access-for-nonseller'>
                        To Access this Feature Create seller account from dashboard
                      </li>
                    }
                    <li onClick={() => { togglePositionOfMessage(2) }}>
                      Order Management
                    </li>
                    {showMessage === 2 &&
                      <li className='no-access-for-nonseller'>
                        To Access this Feature Create seller account from dashboard
                      </li>
                    }
                    <li onClick={() => { togglePositionOfMessage(3) }}>
                      Bids & Offers
                    </li>
                    {showMessage === 3 &&
                      <li className='no-access-for-nonseller'>
                        To Access this Feature Create seller account from dashboard
                      </li>
                    }
                    <li onClick={() => { togglePositionOfMessage(4) }}>
                      Chats
                    </li>
                    {showMessage === 4 &&
                      <li className='no-access-for-nonseller'>
                        To Access this Feature Create seller account from dashboard
                      </li>
                    }
                    <li onClick={() => { togglePositionOfMessage(5) }}>
                      Feedbacks
                    </li>
                    {showMessage === 5 &&
                      <li className='no-access-for-nonseller'>
                        To Access this Feature Create seller account from dashboard
                      </li>
                    }
                    <li onClick={() => { togglePositionOfMessage(6) }}>
                      Discounts & coupons
                    </li>
                    {showMessage === 6 &&
                      <li className='no-access-for-nonseller'>
                        To Access this Feature Create seller account from dashboard
                      </li>
                    }
                    <li onClick={() => { togglePositionOfMessage(7) }}>
                      Transactions
                    </li>
                    {showMessage === 7 &&
                      <li className='no-access-for-nonseller'>
                        To Access this Feature Create seller account from dashboard
                      </li>
                    }
                    <li onClick={() => { togglePositionOfMessage(8) }}>
                      Shop Settings
                    </li>
                    {showMessage === 8 &&
                      <li className='no-access-for-nonseller'>
                        To Access this Feature Create seller account from dashboard
                      </li>
                    }
                  </>
                  :
                  <>
                    <li className={selectedMenuItem === 'selling2' ? 'active' : ''} onClick={() => {handleMenuItemClick('selling2') ; setSubmitted(false); setProductId('')}}>
                      Product Management
                    </li>
                    <li className='ordaw' onClick={toggleOrderManagement}>
                      Order Management
                      {isOrderManagementOpen && (
                        <div className='dropp'>
                          <ul>
                            <li className={selectedMenuItem === 'pending' ? 'active' : ''} onClick={() => {handleMenuItemClick('pending'); setProductId('')}}>
                              Pending Orders
                            </li>
                            <li className={selectedMenuItem === 'sellings1' ? 'active' : ''} onClick={() => {handleMenuItemClick('sellings1'); setProductId('')}}>
                              Ongoing Orders
                            </li>
                            <li className={selectedMenuItem === 'sellings2' ? 'active' : ''} onClick={() => {handleMenuItemClick('sellings2'); setProductId('')}}>
                              Completed Orders
                            </li>
                            <li className={selectedMenuItem === 'sellings3' ? 'active' : ''} onClick={() => {handleMenuItemClick('sellings3'); setProductId('')}}>
                              Refund Orders
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                    <li className={selectedMenuItem === 'selling4' ? 'active' : ''} onClick={() => {handleMenuItemClick('selling4'); setProductId('')}}>
                      Bids & Offers
                    </li>
                    <li className={selectedMenuItem === 'selling5' ? 'active' : ''} onClick={() => {handleMenuItemClick('selling5'); setProductId('')}}>
                      Chats
                    </li>
                    <li className={selectedMenuItem === 'selling6' ? 'active' : ''} onClick={() => {handleMenuItemClick('selling6'); setProductId('')}}>
                      Feedbacks
                    </li>
                    <li className={selectedMenuItem === 'selling7' ? 'active' : ''} onClick={() => {handleMenuItemClick('selling7'); setProductId('')}}>
                      Discounts & coupons
                    </li>
                    <li className={selectedMenuItem === 'selling8' ? 'active' : ''} onClick={() => {handleMenuItemClick('selling8'); setProductId('')}}>
                      Transactions
                    </li>
                    <li className='ordaw' onClick={toggleOrderManagements}>
                      Shop Settings
                      {isOrderManagementOpens && (
                        <div className='dropp'>
                          <ul>
                            {trustedseller ? (
                              <>
                                <li className={selectedMenuItem === 'sellingss1' ? 'active' : ''} onClick={() => {handleMenuItemClick('sellingss1'); setProductId('')}}>
                                  Business Profile Setting
                                </li>
                              </>
                            ) : (
                              <>
                                <li className={selectedMenuItem === 'sellingss1b' ? 'active' : ''} onClick={() => {handleMenuItemClick('sellingss1b'); setProductId('')}}>
                                  Business Profile Setting
                                </li>
                              </>
                            )}
                            <li className={selectedMenuItem === 'sellingss2' ? 'active' : ''} onClick={() => {handleMenuItemClick('sellingss2'); setProductId('')}}>
                              Bank account
                            </li>
                            <li className={selectedMenuItem === 'sellingss3' ? 'active' : ''} onClick={() => {handleMenuItemClick('sellingss3'); setProductId('')}}>
                              Notifications Settings
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                  </>
                }
              </ul>
              <button className='backbutton-account' onClick={() => {props?.setSelectedLink(null); setProductId('')}}><img src={Backimage} /> Back</button>
            </div>
          </div>
          <div className='col-lg-9'>
            <div className="main-content">
              {renderComponent()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SellerAllTabs;
