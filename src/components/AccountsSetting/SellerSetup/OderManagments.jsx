import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import UserServices from "../../../services/API/UserServices";
import { isLoggedin, setUserDetails } from '../../../services/Auth';
import LoadingComponents from '../../Shared/LoadingComponents';
import NoDataFound from '../../Shared/NoDataFound';
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import PendingOrderManagement from '../../OrderManagement/PendingOrderManagement';
import OngoingOrderManagement from '../../OrderManagement/OngoingOrderManagement';
import CompleteOrderManagement from '../../OrderManagement/CompleteOrderManagement';
import RefundManagement from '../../OrderManagement/RefundManagement';
import RejectedOrderManagement from '../../OrderManagement/RejectedOrderManagement';

const OderManagments = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [inputError, setInputError] = useState(false);
    const [copons, setCopons] = useState([]);
    const [showAddCouponPopup, setShowAddCouponPopup] = useState(false);
    const seller_guid = localStorage.getItem('seller_guid')
    const [tab, setTab] = useState(0);
    const [editCoupon, setEditCoupon] = useState(false);


    const getUser = () => {
        UserServices.detail()
            .then((response) => {
                setIsLoading(false);
                setUserDetails(response);
                setUser(response);
                localStorage.setItem('user_details', JSON.parse(response));
            })
            .catch((e) => {
                setIsLoading(false);
            });
    };

    const getSellerBid = () => {
        if (user && user.id) {
            const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
            UserServices.couponsDiscount(user.id, currentDate) // Pass user.id and current date to the function
                .then((response) => {
                    setIsLoading(false);
                    if (response) {
                        console.log('data Coupons', response.data);
                        setCopons(response.data);
                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.error('Error fetching coupons:', error);
                });
        }
    };

    const [couponData, setCouponData] = useState({
        title: "",
        code: "",
        discount: "",
        min_order: "",
        start_date: "",
        end_date: "",
        seller_guid: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCouponData({
            ...couponData,
            [name]: value
        });
    };

    const toggleAddCouponPopup = () => {
        setShowAddCouponPopup(!showAddCouponPopup);
    };

    const postCoupons = (e) => {
        e.preventDefault();
        setInputError(true)
        if (couponData.code === "",
            couponData.discount === "",
            couponData.min_order === "",
            couponData.start_date === "",
            couponData.end_date === ""
        ) {
            return
        }

        if (editCoupon) {
            UserServices.updateCoupon(couponData)
                .then((response) => {
                    setShowAddCouponPopup(false);
                    getSellerBid()
                    setEditCoupon(false)
                })
                .catch((error) => {
                    console.error('Error adding coupon:', error);
                });
        } else {

            const requestData = {
                ...couponData,
                discount: parseFloat(couponData.discount),
                min_order: parseInt(couponData.min_order),
                seller_guid: seller_guid
            };

            UserServices.addCoupons(requestData)
                .then((response) => {
                    setShowAddCouponPopup(false);
                    getSellerBid()
                })
                .catch((error) => {
                    console.error('Error adding coupon:', error);
                });
        }
    };

    const deleteCoupons = (id) => {
        UserServices.deleteCoupons({ id: id })
            .then((response) => {
                getSellerBid()
            })
            .catch((error) => {
                console.error('Error adding coupon:', error);
            });
    };
    const getCouponsById = (id) => {
        UserServices.getCouponsById(id)
            .then((response) => {
                console.log(response?.data, 'getCouponsById');
                setCouponData({
                    title: response?.data?.title,
                    code: response?.data?.code,
                    discount: response?.data?.discount,
                    min_order: response?.data?.min_order,
                    start_date: response?.data?.start_date,
                    end_date: response?.data?.end_date,
                    seller_guid: response?.data?.seller_guid,
                    id: response?.data?.id,
                })
                setEditCoupon(true)
                toggleAddCouponPopup()

            })
            .catch((error) => {
                console.error('Error adding coupon:', error);
            });
    };

    useEffect(() => {
        if (isLoggedin()) {
            getUser();
        }
    }, []);

    useEffect(() => {
        if (user && user.id) {
            getSellerBid();
        }
    }, [user]);

    return (
        <>
            {isLoading ?
                <LoadingComponents />
                :
                <div className="seller-new-transaction">
                    <div className="title">Order Management</div>
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
                    {tab === 0 && <PendingOrderManagement/>}
                    {tab === 1 && <OngoingOrderManagement/>}
                    {tab === 2 && <CompleteOrderManagement/>}
                    {tab === 3 && <RejectedOrderManagement/>}
                    {tab === 4 && <RefundManagement/>}
                </div>
            }
            <Modal
                show={showAddCouponPopup}
                onHide={toggleAddCouponPopup}
                className='create-coupon-modal'
            >
                <div className='c-c-body'>
                    <form onSubmit={postCoupons}>
                        <div className="coupon-title">{editCoupon ? 'Edit Coupon' : 'Add Coupon'}</div>
                        <div>
                            <input className='form-control' type="text" name="title" value={couponData.title} onChange={handleInputChange} placeholder="Coupon Name" />
                            {couponData.title === "" && inputError && <div className="error-input">Coupon name is required</div>}
                        </div>
                        <div>
                            <input className='form-control' type="number" name="code" value={couponData.code} onChange={handleInputChange} placeholder="Coupon Code" />
                            {couponData.code === "" && inputError && <div className="error-input">Coupon code is required</div>}
                        </div>
                        <div className='end-date'>
                            <input className='form-control' type="date" name='start_date' value={couponData.start_date} onChange={handleInputChange} placeholder="Start Date" />
                            {couponData.start_date === "" && inputError && <div className="error-input">Start date is required</div>}
                        </div>
                        <div className='end-date'>
                            <input className='form-control' type="date" name='end_date' value={couponData.end_date} onChange={handleInputChange} placeholder="End Date" />
                            {couponData.end_date === "" && inputError && <div className="error-input">End date is required</div>}
                        </div>
                        <div>
                            <input className='form-control' type="text" name='min_order' value={couponData.min_order} onChange={handleInputChange} placeholder="Min Order" />
                            {couponData.min_order === "" && inputError && <div className="error-input">Min order is required</div>}
                        </div>
                        <div>
                            <input className='form-control' type="number" name='discount' value={couponData.discount} onChange={handleInputChange} placeholder="Coupon Discount" />
                            {couponData.discount === "" && inputError && <div className="error-input">Coupon discount is required</div>}
                        </div>
                        <div className="c-c-button">
                            <button type='submit'>Save Coupon</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default OderManagments;
