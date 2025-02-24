import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { GiHamburgerMenu } from "react-icons/gi";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { RxCross2 } from "react-icons/rx";

const MySellerAccount = ({ cartFullResponse, notificationCount }) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const componentName = searchParams.get('tab');
        if (componentName) {
            setSelectedMenuItem(componentName);
        }
    }, [location.search]);

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

    const handleCallbacks = (value) => {
        setSelectedMenuItem(value);
    }
    const [submitted, setSubmitted] = useState(false);
    const [productId, setProductId] = useState('');

    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

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
            <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount} />
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
                                </div>
                            </div>
                            <div className="tab-content">
                                <div className="account-dashboard">
                                    <div className="row">
                                        <div>
                                            <section id='activity-main-dashboard'>
                                                <div id="hide-on-desktop-991" onClick={toggleDrawer}>
                                                    <GiHamburgerMenu />
                                                </div>
                                                <div className='row'>
                                                    <div className='col-lg-3' id='hide-on-mobile-991'>
                                                        <div className='left-menu'>
                                                            <div className="title-selling-hub">Selling Hub</div>
                                                            <div className="personal-info">
                                                                <ul>
                                                                    <li className={selectedMenuItem === 'dashboard' ? 'active' : ''} onClick={() => { handleMenuItemClick('dashboard'); setProductId('') }}>
                                                                        Dashboard
                                                                    </li>
                                                                    {/* {user?.isTrustedSeller === 0 ?
                                                                        null
                                                                        : */}
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
                                                                                Feedback
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
                                                                    {/* // } */}
                                                                </ul>
                                                                <div className="button">
                                                                    <button onClick={() => { navigate('/customerdashboard?tab=account') }}>Go Back</button>
                                                                </div>
                                                            </div>
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
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                className='mobile-product-filter'
                size={'90%'}
            >

                <div className='left-menu'>
                    <div className="title-selling-hub">Selling Hub <span onClick={toggleDrawer}><RxCross2 /></span></div>
                    <div className="personal-info">
                        <ul>
                            <li className={selectedMenuItem === 'dashboard' ? 'active' : ''} onClick={() => { handleMenuItemClick('dashboard'); setProductId(''); toggleDrawer() }}>
                                Dashboard
                            </li>
                            {/* {user?.isTrustedSeller === 0 ?
                                null
                                : */}
                                <>
                                    <li
                                        className={selectedMenuItem === 'product-management' ? 'active' : ''}
                                        onClick={() => {
                                            handleMenuItemClick('product-management');
                                            setSubmitted(false);
                                            setProductId('');
                                            toggleDrawer();
                                        }}>
                                        Product Management
                                    </li>
                                    <li
                                        className={selectedMenuItem === 'order-management' ? 'active' : ''}
                                        onClick={() => {
                                            handleMenuItemClick('order-management');
                                            setSubmitted(false);
                                            setProductId('');
                                            toggleDrawer();
                                        }}>
                                        Order Management
                                    </li>
                                    <li className={selectedMenuItem === 'bids-offers' ? 'active' : ''}
                                        onClick={() => {
                                            handleMenuItemClick('bids-offers');
                                            setSubmitted(false);
                                            setProductId('');
                                            toggleDrawer();
                                        }}>
                                        Bids & Offers
                                    </li>
                                    <li className={selectedMenuItem === 'chat' ? 'active' : ''}
                                        onClick={() => {
                                            handleMenuItemClick('chat');
                                            setSubmitted(false);
                                            setProductId('');
                                            toggleDrawer();
                                        }}>
                                        Chats
                                    </li>
                                    <li className={selectedMenuItem === 'seller-feedback' ? 'active' : ''}
                                        onClick={() => {
                                            handleMenuItemClick('seller-feedback');
                                            setSubmitted(false);
                                            setProductId('');
                                            toggleDrawer();
                                        }}>
                                        Feedback
                                    </li>
                                    <li className={selectedMenuItem === 'discount-coupens' ? 'active' : ''}
                                        onClick={() => {
                                            handleMenuItemClick('discount-coupens');
                                            setSubmitted(false);
                                            setProductId('');
                                            toggleDrawer();

                                        }}>
                                        Discounts & coupons
                                    </li>
                                    <li className={selectedMenuItem === 'm-transactions' ? 'active' : ''}
                                        onClick={() => {
                                            handleMenuItemClick('m-transactions');
                                            setSubmitted(false);
                                            setProductId('');
                                            toggleDrawer();

                                        }}>
                                        Transactions
                                    </li>
                                    <li className={selectedMenuItem === 'shop-settings' ? 'active' : ''}
                                        onClick={() => {
                                            handleMenuItemClick('shop-settings');
                                            setSubmitted(false);
                                            setProductId('');
                                            toggleDrawer();

                                        }}>
                                        Shop Settings
                                    </li>
                                </>
                            {/* } */}
                        </ul>
                        <div className="button">
                            <button onClick={() => { navigate('/customerdashboard?tab=account'); toggleDrawer() }}>Go Back</button>
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default MySellerAccount;
