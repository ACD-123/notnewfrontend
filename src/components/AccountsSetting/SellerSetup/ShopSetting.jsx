import React, { useState, useEffect } from 'react';
import UserServices from "../../../services/API/UserServices";
import { isLoggedin, setUserDetails } from '../../../services/Auth';
import LoadingComponents from '../../Shared/LoadingComponents';
import EditProfileSetup from './EditProfileSetup';
import EditBankDetails from './EditBankDetails';
import SellingNotifications from '../NotificationPreferences/SellingNotifications';
import SellerServices from '../../../services/API/SellerServices';
import { BASE_URL } from "../../../services/Constant"
import { toast } from 'react-toastify';

const ShopSetting = () => {
    const [shopDetails, setShopDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [copons, setCopons] = useState([]);
    const seller_guid = localStorage.getItem('seller_guid')
    const [tab, setTab] = useState(0);

    const getShopDetaill = () => {
        SellerServices.getShopDetail()
            .then((response) => {
                setIsLoading(false);
                setShopDetails(response?.data)
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
                setIsLoading(false);
            });
    };

    useEffect(() => {
            getShopDetaill();
    }, []);

    return (
        <>
            {isLoading ?
                <LoadingComponents />
                :
                <div className="seller-new-transaction">
                    <div className="title">Shop Settings</div>
                    <div className="seller-new-transaction-ten">
                        <div className="s-n-t-t-l">
                            <img src={`${BASE_URL}/${shopDetails?.cover_image}`} alt="" />
                        </div>
                        <div className="s-n-t-t-r">
                            <h2>{shopDetails?.fullname}</h2>
                            <h3>{shopDetails?.email}</h3>
                            <p>Joined since : {shopDetails?.created_at?.slice(0,4)}</p>
                        </div>
                    </div>
                    <div className="seller-new-transaction-four">
                        <div className="s-n-t-f-tabs">
                            <ul>
                                <li onClick={() => { setTab(0) }} className={`${tab === 0 ? 'active' : ''}`}>Business Profile Setting</li>
                                <li onClick={() => { setTab(1) }} className={`${tab === 1 ? 'active' : ''}`}>Bank account</li>
                                {/* <li onClick={() => { setTab(2) }} className={`${tab === 2 ? 'active' : ''}`}>Notifications Settings</li> */}
                            </ul>
                        </div>
                    </div>
                    {tab === 0 && <EditProfileSetup getShopDetaill={getShopDetaill}/>}
                    {tab === 1 && <EditBankDetails />}
                    {/* {tab === 2 && <SellingNotifications />} */}
                </div>
            }
        </>
    );
};

export default ShopSetting;
