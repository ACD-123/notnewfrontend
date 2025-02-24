import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PersonalInfo from '../components/AccountsSetting/PersonalInfoAllPages/PersonalInfo';
import SignSecurity from '../components/AccountsSetting/PersonalInfoAllPages/SignSecurity';
import Addresses from '../components/AccountsSetting/PersonalInfoAllPages/Addresses';
import NotFound from './NotFound';
import Header from '../components/Header';
import { GiHamburgerMenu } from "react-icons/gi";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { RxCross2 } from "react-icons/rx";

const PersonalInformation = ({ cartFullResponse, notificationCount }) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const access_token = localStorage.getItem('access_token')
        if (access_token) {
        } else {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const componentName = searchParams.get('component');
        if (componentName) {
            setSelectedMenuItem(componentName);
        }
    }, [location.search]);

    const handleMenuItemClick = (menu) => {
        navigate(`/personal-info?component=${menu}`);
        setSelectedMenuItem(menu);
        setIsMenuOpen(false);
    };

    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }


    const renderComponent = () => {
        switch (selectedMenuItem) {
            case 'profile-information':
                return <PersonalInfo />;
            case 'sign-in-and-security':
                return <SignSecurity />;
            case 'addresses':
                return <Addresses />;
            case 'save-images':
                return <NotFound />
            case 'search-history':
                return <NotFound />
            default:
                return;
        }
    };

    return (
        <>
            <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount} />
            <section id="main-dashboard">
                <div className="container">
                    <div className="row">
                        <div className="main-dasboard-tabs">
                            <div className="tab-buttons" >
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
                                                    <div className='col-lg-3' id="hide-on-mobile-991">
                                                        <div className={`left-menu ${isMenuOpen ? 'open' : ''}`}>
                                                            <div className="title-customer-side">Profile Info</div>
                                                            <div className='personal-info'>
                                                                <ul>
                                                                    <li className={selectedMenuItem === 'profile-information' ? 'active' : ''} onClick={() => handleMenuItemClick('profile-information')}>
                                                                        Profile information
                                                                    </li>
                                                                    <li className={selectedMenuItem === 'addresses' ? 'active' : ''} onClick={() => handleMenuItemClick('addresses')}>
                                                                        Addresses
                                                                    </li>
                                                                    <li onClick={() => window.location.href = '/customerdashboard?component=recently-searched-items'}>
                                                                        Search History
                                                                    </li>
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
                    <div className="title-selling-hub">Profile Info<span onClick={toggleDrawer}><RxCross2 /></span></div>
                    <div className="personal-info">
                        <ul>
                            <li 
                            className={selectedMenuItem === 'profile-information' ? 'active' : ''} 
                            onClick={() => {handleMenuItemClick('profile-information'); toggleDrawer();}}>
                                Profile information
                            </li>
                            <li 
                            className={selectedMenuItem === 'addresses' ? 'active' : ''} 
                            onClick={() => {handleMenuItemClick('addresses'); toggleDrawer();}}>
                                Addresses
                            </li>
                            <li 
                            onClick={() => window.location.href = '/customerdashboard?component=recently-searched-items'}>
                                Search History
                            </li>
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

export default PersonalInformation;
