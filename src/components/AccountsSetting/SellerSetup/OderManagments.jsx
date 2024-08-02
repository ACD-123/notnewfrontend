import React, { useState, useEffect } from 'react';
import UserServices from "../../../services/API/UserServices";
import { isLoggedin, setUserDetails } from '../../../services/Auth';
import LoadingComponents from '../../Shared/LoadingComponents';
import PendingOrderManagement from '../../OrderManagement/PendingOrderManagement';
import OngoingOrderManagement from '../../OrderManagement/OngoingOrderManagement';
import CompleteOrderManagement from '../../OrderManagement/CompleteOrderManagement';
import RefundManagement from '../../OrderManagement/RefundManagement';
import RejectedOrderManagement from '../../OrderManagement/RejectedOrderManagement';
import ProductServices from '../../../services/API/ProductServices';
import { toast } from 'react-toastify';

const OderManagments = () => {
    const [oderManagment, setOderManagment] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [detail, setDetail] = useState(false);
    const [tab, setTab] = useState(0);


    const getProductManagmentOderCount = () => {
        ProductServices.getProductManagmentOderCount()
            .then((response) => {
                setIsLoading(false);
                setOderManagment(response?.data)
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getProductManagmentOderCount()
    }, []);



    return (
        <>
            {isLoading ?
                <LoadingComponents />
                :
                <div className="seller-new-transaction">
                    {!detail ?
                        <>
                            <div className="title">Order Management</div>
                            <div className="seller-new-transaction-one" style={{ marginBottom: '20px' }}>
                                <div className="s-n-d-o-o">
                                    <p>{oderManagment?.pending}</p>
                                    <h4>New Orders</h4>
                                </div>
                                <div className="s-n-d-o-t">
                                    <p>{oderManagment?.active}</p>
                                    <h4>Active Orders</h4>
                                </div>
                                <div className="s-n-d-o-t">
                                    <p>{oderManagment?.completed}</p>
                                    <h4>Completed Orders</h4>
                                </div>
                                <div className="s-n-d-o-t">
                                    <p>{oderManagment?.rejected}</p>
                                    <h4>Rejected Orders</h4>
                                </div>
                                <div className="s-n-d-o-t">
                                    <p>{oderManagment?.refunded}</p>
                                    <h4>Refunded Orders</h4>
                                </div>
                            </div>
                            <div className="seller-new-transaction-four">
                                <div className="s-n-t-f-tabs">
                                    <ul>
                                        <li onClick={() => { setTab(0) }} className={`${tab === 0 ? 'active' : ''}`}>Pending</li>
                                        <li onClick={() => { setTab(1) }} className={`${tab === 1 ? 'active' : ''}`}>Active</li>
                                        <li onClick={() => { setTab(2) }} className={`${tab === 2 ? 'active' : ''}`}>Completed</li>
                                        <li onClick={() => { setTab(3) }} className={`${tab === 3 ? 'active' : ''}`}>Rejected</li>
                                        <li onClick={() => { setTab(4) }} className={`${tab === 4 ? 'active' : ''}`}>Refunds</li>
                                    </ul>
                                </div>
                            </div>
                        </>
                        :
                        null
                    }
                    {tab === 0 && <PendingOrderManagement detail={detail} setDetail={setDetail} getProductManagmentOderCount={getProductManagmentOderCount}/>}
                    {tab === 1 && <OngoingOrderManagement detail={detail} setDetail={setDetail} getProductManagmentOderCount={getProductManagmentOderCount}/>}
                    {tab === 2 && <CompleteOrderManagement detail={detail} setDetail={setDetail} getProductManagmentOderCount={getProductManagmentOderCount}/>}
                    {tab === 3 && <RejectedOrderManagement detail={detail} setDetail={setDetail} getProductManagmentOderCount={getProductManagmentOderCount}/>}
                    {tab === 4 && <RefundManagement detail={detail} setDetail={setDetail} getProductManagmentOderCount={getProductManagmentOderCount}/>}
                </div>
            }
        </>
    );
};

export default OderManagments;
