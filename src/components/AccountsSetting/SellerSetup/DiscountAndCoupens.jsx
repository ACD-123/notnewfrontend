import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import UserServices from "../../../services/API/UserServices";
import { isLoggedin, setUserDetails, setUserId } from '../../../services/Auth';
import LoadingComponents from '../../Shared/LoadingComponents';
import NoDataFound from '../../Shared/NoDataFound';
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { toast } from 'react-toastify';

const DiscountAndCoupens = () => {
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
                setUserId(response?.id)
                setUser(response);
                localStorage.setItem('user_details', JSON.parse(response));
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
                setIsLoading(false);
            });
    };

    const getSellerBid = () => {
        if (user && user.id) {
            const currentDate = new Date().toISOString().split('T')[0];
            UserServices.couponsDiscount(user.id, currentDate)
                .then((response) => {
                    setIsLoading(false);
                    if (response) {
                        setCopons(response.data);
                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                    toast.error(error?.response?.data?.message)
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
                    setInputError(false)
                    setCouponData({
                        title: "",
                        code: "",
                        discount: "",
                        min_order: "",
                        start_date: "",
                        end_date: "",
                        seller_guid: ""
                    })
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.message)
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
                    getSellerBid();
                    setInputError(false)
                    setCouponData({
                        title: "",
                        code: "",
                        discount: "",
                        min_order: "",
                        start_date: "",
                        end_date: "",
                        seller_guid: ""
                    })
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.message)
                });
        }
    };

    const deleteCoupons = (id) => {
        UserServices.deleteCoupons({ id: id })
            .then((response) => {
                getSellerBid()
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
            });
    };
    
    const getCouponsById = (id) => {
        UserServices.getCouponsById(id)
            .then((response) => {
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
                toast.error(error?.response?.data?.message)
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
                    <div className="title">Discounts & Coupons</div>
                    <div className="seller-new-transaction-one" style={{ minWidth: 'auto', flexWrap: 'wrap' }}>
                        <div className="s-n-d-o-o">
                            <p>{copons.active_count}</p>
                            <h4>Active Coupons</h4>
                        </div>
                        <div className="s-n-d-o-t">
                            <p>{copons.expired_count}</p>
                            <h4>Expired Coupons</h4>
                            <div className="d-d"></div>
                        </div>
                    </div>
                    <div className="seller-new-transaction-three">
                        <button onClick={() => { toggleAddCouponPopup() }}>Add new coupon</button>
                    </div>
                    <div className="seller-new-transaction-four">
                        <div className="s-n-t-f-tabs">
                            <ul>
                                <li onClick={() => { setTab(0) }} className={`${tab === 0 ? 'active' : ''}`}>Active Coupons</li>
                                <li onClick={() => { setTab(1) }} className={`${tab === 1 ? 'active' : ''}`}>Inactive Coupons</li>
                            </ul>
                        </div>
                    </div>
                    {tab === 0 ?
                        <div className="seller-new-transaction-two">
                            <div className="s-n-t-t-transaction-listing-wrap">
                                <div className="s-n-t-t-transaction-listing">
                                    <div className="s-n-t-t-titles">
                                        <ul>
                                            <li>S.no</li>
                                            <li>Coupons code</li>
                                            <li>Discounts</li>
                                            <li>Valid Till</li>
                                            <li>Action</li>
                                        </ul>
                                    </div>
                                    <div className="s-n-t-t-listing">
                                        <div className="s-n-t-t-listing-wrap">
                                            {copons?.active_coupons?.length > 0 ?
                                                copons?.active_coupons?.map((data, index) => {
                                                    return (
                                                        <ul key={index}>
                                                            <li>{index + 1}</li>
                                                            <li>{data?.code}</li>
                                                            <li>{data?.discount}</li>
                                                            <li>{data?.end_date?.slice(0, 10)}</li>
                                                            <li className='edit-delete'><span onClick={() => { deleteCoupons(data?.id) }}><MdDelete /></span> <span onClick={() => { getCouponsById(data?.id) }}><FaPencilAlt /></span></li>
                                                        </ul>
                                                    )
                                                })
                                                :
                                                <NoDataFound title={'No data Found'} />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="seller-new-transaction-two">
                            <div className="s-n-t-t-transaction-listing-wrap">
                                <div className="s-n-t-t-transaction-listing">
                                    <div className="s-n-t-t-titles">
                                        <ul>
                                            <li>S.no</li>
                                            <li>Coupons code</li>
                                            <li>Discounts</li>
                                            <li>Valid Till</li>
                                        </ul>
                                    </div>
                                    <div className="s-n-t-t-listing">
                                        <div className="s-n-t-t-listing-wrap">
                                            {copons?.expired_coupons?.length > 0 ?
                                                copons?.expired_coupons?.map((data, index) => {
                                                    return (
                                                        <ul key={index}>
                                                            <li>{index + 1}</li>
                                                            <li>{data?.code}</li>
                                                            <li>{data?.discount}</li>
                                                            <li>{data?.end_date?.slice(0, 10)}</li>
                                                        </ul>
                                                    )
                                                })
                                                :
                                                <NoDataFound title={'No data Found'} />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    }
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
                            <input className='form-control' type="text" name="code" value={couponData.code} onChange={handleInputChange} placeholder="Coupon Code" />
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

export default DiscountAndCoupens;
