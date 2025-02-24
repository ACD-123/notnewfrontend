import React, { useState, useEffect } from 'react';
import LoadingComponents from '../../Shared/LoadingComponents';
import EditProfileSetup from './EditProfileSetup';
import EditBankDetails from './EditBankDetails';
import SellerServices from '../../../services/API/SellerServices';
import { BASE_URL } from "../../../services/Constant"
import { toast } from 'react-toastify';
import blankUser from "../../../assets/Images/User/blankuser.jpg"

const ShopSetting = () => {
    const [shopDetails, setShopDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
                            {shopDetails?.cover_image ?
                            <img src={`${BASE_URL}/${shopDetails?.cover_image}`} alt="" />
                            :
                            <img src={blankUser} alt="" />
                        }
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
                            </ul>
                        </div>
                    </div>
                    {tab === 0 && <EditProfileSetup getShopDetaill={getShopDetaill} setIsLoading={setIsLoading} isLoading={isLoading}/>}
                    {tab === 1 && <EditBankDetails />}
                </div>
            }
        </>
    );
};

export default ShopSetting;
