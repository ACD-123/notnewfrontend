import React, { useEffect, useState } from 'react';
import Leftmenuimage from '../assets/Images/leftmenu.png';
import { useLocation, useNavigate } from 'react-router-dom';
import Backimage from '../assets/Images/back-icon.png'
import OngoingOrderManagement from '../components/OrderManagement/OngoingOrderManagement';
import PendingOrderManagement from '../components/OrderManagement/PendingOrderManagement';
import SellerFeedback from '../components/Seller/SellerFeedback';
import DiscountAndCoupens from '../components/AccountsSetting/SellerSetup/DiscountAndCoupens';
import MyTransactions from '../components/AccountsSetting/SellerSetup/MyTransactions';
import SetupSellerAccount from '../components/AccountsSetting/SellerSetup/SetupSellerAccount';
import EditBankDetails from '../components/AccountsSetting/SellerSetup/EditBankDetails';
import EditProfileSetup from '../components/AccountsSetting/SellerSetup/EditProfileSetup';
import RefundManagement from '../components/OrderManagement/RefundManagement';
import Selling from '../components/AccountsSetting/SellerSetup/SellingDashboard';
import CompleteOrderManagement from '../components/OrderManagement/CompleteOrderManagement';
import BidsNoffers from '../components/AccountsSetting/SellerSetup/BidsNoffers';
import SellingNotifications from '../components/AccountsSetting/NotificationPreferences/SellingNotifications';
import ProductManagement from '../components/AccountsSetting/SellerSetup/ProductManagement';
import Chat from '../components/CustomerDashboard/Chat';
import Header from '../components/Header';
import OderManagments from '../components/AccountsSetting/SellerSetup/OderManagments';
import ShopSetting from '../components/AccountsSetting/SellerSetup/ShopSetting';

const MySellerAccount = (props) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOrderManagementOpen, setIsOrderManagementOpen] = useState(false);
    const [isOrderManagementOpens, setIsOrderManagementOpens] = useState(false);
    const [trustedseller, setTrustedseller] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showMessage, setShowMessage] = useState(0);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const componentName = searchParams.get('tab');

        if (componentName) {
            setSelectedMenuItem(componentName);
        }
    }, [location.search]);

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
    }, []);


    const handleMenuItemClick = (menu) => {
        setSelectedMenuItem(menu);
        navigate(`/my-seller-account?tab=${menu}`)
        // setIsOrderManagementOpen(false);
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
            case 'dashboard':
                return <Selling orderid={props.orderid} parentCallback={handleCallbacks} />;
            case 'product-management':
                return <ProductManagement setSubmitted={setSubmitted} submitted={submitted} productId={productId} setProductId={setProductId} />;
            case 'order-management':
                return <OderManagments setSubmitted={setSubmitted} submitted={submitted} productId={productId} setProductId={setProductId} />;
            // case 'pending':
            //     return <PendingOrderManagement />;
            // case 'sellings1':
            //     return <OngoingOrderManagement />
            // case 'sellings2':
            //     return <CompleteOrderManagement />
            // case 'sellings3':
            //     return <RefundManagement />;
            case 'bids-offers':
                return <BidsNoffers />;
            case 'chat':
                return <Chat />;
            case 'seller-feedback':
                return <SellerFeedback />
            case 'discount-coupens':
                return <DiscountAndCoupens />
            case 'm-transactions':
                return <MyTransactions />
            case 'shop-settings':
                return <ShopSetting />
            // case 'sellingss1':
            //     return <EditProfileSetup />;
            // case 'sellingss1b':
            //     return <SetupSellerAccount />;
            // case 'sellingss2':
            //     return <EditBankDetails />;
            // case 'sellingss3':
            //     return <SellingNotifications />;
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
            <Header />
            <section id="main-dashboard">
                <div class="container">
                    <div class="row">
                        <div class="main-dasboard-tabs">
                            <div class="whatyouthink">
                                <a href="/customerdashboard">Tell us what you Think</a>
                            </div>
                            <div class="tab-buttons">
                                <button onClick={() => { navigate('/customerdashboard?tab=activity&component=dashboard') }}>Activity</button>
                                <button onClick={() => { navigate('/customerdashboard?tab=messages') }}>Messages</button>
                                <button class="active" onClick={() => { navigate('/customerdashboard?tab=account') }}>Account</button>
                            </div>
                            <div class="tab-content">
                                <div class="account-dashboard">
                                    <div class="row">
                                        <div>
                                            <section id='activity-main-dashboard'>
                                                <button className="mobile-menu-toggle" onClick={toggleMenu}>
                                                    <img src={Leftmenuimage} alt="Menu" />
                                                </button>
                                                <div className='row'>
                                                    <div className='col-lg-3'>
                                                        <div className={`left-menu ${isMenuOpen ? 'open' : ''}`}>
                                                            <div className="title-selling-hub">Selling Hub</div>
                                                            <ul>
                                                                <li className={selectedMenuItem === 'dashboard' ? 'active' : ''} onClick={() => { handleMenuItemClick('dashboard'); setProductId('') }}>
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
                                                                        <li
                                                                            className={selectedMenuItem === 'product-management' ? 'active' : ''}
                                                                            onClick={() => {
                                                                                handleMenuItemClick('product-management');
                                                                                setSubmitted(false);
                                                                                setProductId('')
                                                                            }}>
                                                                            Product Management
                                                                        </li>
                                                                        <li 
                                                                        className={selectedMenuItem === 'order-management' ? 'active' : ''} 
                                                                        onClick={() => {
                                                                            handleMenuItemClick('order-management');
                                                                            setSubmitted(false);
                                                                            setProductId('')
                                                                        }}>
                                                                            Order Management
                                                                            {/* {isOrderManagementOpen && (
                                                                                <div className='dropp'>
                                                                                    <ul>
                                                                                        <li className={selectedMenuItem === 'pending' ? 'active' : ''} onClick={() => { handleMenuItemClick('pending'); setProductId('') }}>
                                                                                            Pending Orders
                                                                                        </li>
                                                                                        <li className={selectedMenuItem === 'sellings1' ? 'active' : ''} onClick={() => { handleMenuItemClick('sellings1'); setProductId('') }}>
                                                                                            Ongoing Orders
                                                                                        </li>
                                                                                        <li className={selectedMenuItem === 'sellings2' ? 'active' : ''} onClick={() => { handleMenuItemClick('sellings2'); setProductId('') }}>
                                                                                            Completed Orders
                                                                                        </li>
                                                                                        <li className={selectedMenuItem === 'sellings3' ? 'active' : ''} onClick={() => { handleMenuItemClick('sellings3'); setProductId('') }}>
                                                                                            Refund Orders
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            )} */}
                                                                        </li>
                                                                        <li className={selectedMenuItem === 'bids-offers' ? 'active' : ''} 
                                                                        onClick={() => {
                                                                            handleMenuItemClick('bids-offers');
                                                                            setSubmitted(false);
                                                                            setProductId('')
                                                                        }}>
                                                                            Bids & Offers
                                                                        </li>
                                                                        <li className={selectedMenuItem === 'chat' ? 'active' : ''} 
                                                                        onClick={() => {
                                                                            handleMenuItemClick('chat');
                                                                            setSubmitted(false);
                                                                            setProductId('')
                                                                        }}>
                                                                            Chats
                                                                        </li>
                                                                        <li className={selectedMenuItem === 'seller-feedback' ? 'active' : ''} 
                                                                        onClick={() => {
                                                                            handleMenuItemClick('seller-feedback');
                                                                            setSubmitted(false);
                                                                            setProductId('')
                                                                        }}>
                                                                            Feedbacks
                                                                        </li>
                                                                        <li className={selectedMenuItem === 'discount-coupens' ? 'active' : ''} 
                                                                        onClick={() => {
                                                                            handleMenuItemClick('discount-coupens');
                                                                            setSubmitted(false);
                                                                            setProductId('')
                                                                        }}>
                                                                            Discounts & coupons
                                                                        </li>
                                                                        <li className={selectedMenuItem === 'm-transactions' ? 'active' : ''} 
                                                                        onClick={() => {
                                                                            handleMenuItemClick('m-transactions');
                                                                            setSubmitted(false);
                                                                            setProductId('')
                                                                        }}>
                                                                            Transactions
                                                                        </li>
                                                                        <li className={selectedMenuItem === 'shop-settings' ? 'active' : ''} 
                                                                        onClick={() => {
                                                                            handleMenuItemClick('shop-settings');
                                                                            setSubmitted(false);
                                                                            setProductId('')
                                                                        }}>
                                                                            Shop Settings
                                                                            {/* {isOrderManagementOpens && (
                                                                                <div className='dropp'>
                                                                                    <ul>
                                                                                        {trustedseller ? (
                                                                                            <>
                                                                                                <li className={selectedMenuItem === 'sellingss1' ? 'active' : ''} onClick={() => { handleMenuItemClick('sellingss1'); setProductId('') }}>
                                                                                                    Business Profile Setting
                                                                                                </li>
                                                                                            </>
                                                                                        ) : (
                                                                                            <>
                                                                                                <li className={selectedMenuItem === 'sellingss1b' ? 'active' : ''} onClick={() => { handleMenuItemClick('sellingss1b'); setProductId('') }}>
                                                                                                    Business Profile Setting
                                                                                                </li>
                                                                                            </>
                                                                                        )}
                                                                                        <li className={selectedMenuItem === 'sellingss2' ? 'active' : ''} onClick={() => { handleMenuItemClick('sellingss2'); setProductId('') }}>
                                                                                            Bank account
                                                                                        </li>
                                                                                        <li className={selectedMenuItem === 'sellingss3' ? 'active' : ''} onClick={() => { handleMenuItemClick('sellingss3'); setProductId('') }}>
                                                                                            Notifications Settings
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            )} */}
                                                                        </li>
                                                                    </>
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className='col-lg-9'>
                                                        <div className="main-content">
                                                            {renderComponent()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default MySellerAccount;
