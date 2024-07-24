import React, { useEffect, useState } from 'react';
import Leftmenuimage from '../assets/Images/leftmenu.png'
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PersonalInfo from '../components/AccountsSetting/PersonalInfoAllPages/PersonalInfo';
import SignSecurity from '../components/AccountsSetting/PersonalInfoAllPages/SignSecurity';
import Addresses from '../components/AccountsSetting/PersonalInfoAllPages/Addresses';
import NotFound_ from './NotFound_';
import Header from '../components/Header';

const PersonalInformation = ({cartFullResponse}) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    const renderComponent = () => {
        switch (selectedMenuItem) {
            case 'profile-information':
                return <PersonalInfo />;
            case 'sign-in-and-security':
                return <SignSecurity />;
            case 'addresses':
                return <Addresses />;
            case 'save-images':
                return <NotFound_ />
            // return <SavedImages />;
            case 'search-history':
                // return <SearchHistory />;
                return <NotFound_ />
            default:
                return;
        }
    };

    return (
        <>
            <Header cartFullResponse={cartFullResponse}/>
            <section id="main-dashboard">
                <div class="container">
                    <div class="row">
                        <div class="main-dasboard-tabs">
                            <div className="tab-buttons">
                                <div className="t-b-b">
                                    <button onClick={() => { navigate('/customerdashboard?tab=activity&component=my-orders') }}>Activity</button>
                                    <button onClick={() => { navigate('/customerdashboard?tab=messages') }}>Messages</button>
                                    <button class="active" onClick={() => { navigate('/customerdashboard?tab=account') }}>Account</button>
                                </div>
                                <div className='t-b-w'>
                                    <Link to="">Tell us what you Think</Link>
                                </div>
                            </div>
                            <div class="tab-content">
                                <div class="account-dashboard">
                                    <div class="row">
                                        <div>
                                            <section id='activity-main-dashboard'>
                                                <button className="mobile-menu-toggle" onClick={toggleMenu}>
                                                    <img src={Leftmenuimage} />
                                                </button>
                                                <div className='row'>
                                                    <div className='col-lg-3'>
                                                        <div className={`left-menu ${isMenuOpen ? 'open' : ''}`}>
                                                            <div className="title-customer-side">Profile Info</div>
                                                            <ul>
                                                                <li className={selectedMenuItem === 'profile-information' ? 'active' : ''} onClick={() => handleMenuItemClick('profile-information')}>
                                                                    Profile information
                                                                </li>
                                                                <li className={selectedMenuItem === 'sign-in-and-security' ? 'active' : ''} onClick={() => handleMenuItemClick('sign-in-and-security')}>
                                                                    Sign in and security            </li>
                                                                <li className={selectedMenuItem === 'addresses' ? 'active' : ''} onClick={() => handleMenuItemClick('addresses')}>
                                                                    Addresses
                                                                </li>
                                                                <li className={selectedMenuItem === 'save-images' ? 'active' : ''} onClick={() => handleMenuItemClick('save-images')}>
                                                                    Save images
                                                                </li>
                                                                <li className={selectedMenuItem === 'search-history' ? 'active' : ''} onClick={() => handleMenuItemClick('search-history')}>
                                                                    Search History
                                                                </li>
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

export default PersonalInformation;
