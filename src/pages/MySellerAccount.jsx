import React, { useEffect, useState } from 'react';
import Leftmenuimage from '../assets/Images/leftmenu.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SellerFeedback from '../components/Seller/SellerFeedback';
import DiscountAndCoupens from '../components/AccountsSetting/SellerSetup/DiscountAndCoupens';
import MyTransactions from '../components/AccountsSetting/SellerSetup/MyTransactions';
import Selling from '../components/AccountsSetting/SellerSetup/SellingDashboard';
import BidsNoffers from '../components/AccountsSetting/SellerSetup/BidsNoffers';
import ProductManagement from '../components/AccountsSetting/SellerSetup/ProductManagement';
import Chat from '../components/CustomerDashboard/Chat';
import Header from '../components/Header';
import OderManagments from '../components/AccountsSetting/SellerSetup/OderManagments';
import ShopSetting from '../components/AccountsSetting/SellerSetup/ShopSetting';

const MySellerAccount = ({props , cartFullResponse}) => {
// const MySellerAccount = (props) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCallbacks = (value) => {
        setSelectedMenuItem(value);
    }
    const [submitted, setSubmitted] = useState(false);
    const [productId, setProductId] = useState('');

    const renderComponent = () => {
        switch (selectedMenuItem) {
            case 'dashboard':
                return <Selling parentCallback={handleCallbacks} />;
            case 'product-management':
                return <ProductManagement setSubmitted={setSubmitted} submitted={submitted} productId={productId} setProductId={setProductId} />;
            case 'order-management':
                return <OderManagments setSubmitted={setSubmitted} submitted={submitted} productId={productId} setProductId={setProductId} />;
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
            default:
                return null;
        }
    };

    return (
        <>
            <Header cartFullResponse={cartFullResponse}/>
            <section id="main-dashboard">
                <div className="container">
                    <div className="row">
                        <div className="main-dasboard-tabs">
                            <div className="tab-buttons">
                                <div className="t-b-b">
                                    <button onClick={() => { navigate('/customerdashboard?tab=activity&component=my-orders') }}>Activity</button>
                                    <button onClick={() => { navigate('/customerdashboard?tab=messages') }}>Messages</button>
                                    <button className="active" onClick={() => { navigate('/customerdashboard?tab=account') }}>Account</button>
                                </div>
                                <div className='t-b-w'>
                                    <Link to="">Tell us what you Think</Link>
                                </div>
                            </div>
                            <div className="tab-content">
                                <div className="account-dashboard">
                                    <div className="row">
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
