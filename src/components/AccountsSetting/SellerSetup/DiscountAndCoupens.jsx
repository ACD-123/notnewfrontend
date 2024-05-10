import React, { useState, useEffect } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import UserServices from "../../../services/API/UserServices";
import SellerServices from '../../../services/API/SellerServices';
import { isLoggedin, setUserDetails } from '../../../services/Auth';

const DiscountAndCoupens = () => {
    const [activeTab, setActiveTab] = useState('rr1');
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [expiredCoupons, setExpiredCoupons] = useState([]);
    const [activeCoupons, setActiveCoupons] = useState([]);
    const [countCopons, setCountCopons] = useState([]);
    const [showAddCouponPopup, setShowAddCouponPopup] = useState(false);
    const [sellerGuid, setSellerGuid] = useState(null);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

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
            UserServices.couponsDiscount(user.id)
                .then((response) => {
                    setIsLoading(false);
                    if (response) {
                        console.log('data Coupons', response.data);
                        setActiveCoupons(response.data.active_coupons);
                        setExpiredCoupons(response.data.expired_coupons);
                        setCountCopons(response.data);
                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.error('Error fetching coupons:', error);
                });
        }
    };

    const getSellerGuid = () => {
        SellerServices.getShopDetails()
            .then((response) => {
                if (response.status) {
                    setSellerGuid(response.data.guid);
                    console.log('seller guid', response.data.guid);
                }
            })
            .catch((e) => {
                console.log(e.message);
            });
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

    const postCoupons = () => {
        const requestData = {
            ...couponData,
            discount: parseFloat(couponData.discount),
        min_order: parseInt(couponData.min_order),
        seller_guid: sellerGuid // Use the sellerGuid state here
        };

        UserServices.addCoupons(requestData)
            .then((response) => {
                setShowAddCouponPopup(false);
                console.log('Coupon added successfully:', response);
                // You may want to update state or trigger a reload of coupon data here
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
        getSellerGuid();
    }, []);

    useEffect(() => {
        if (user && user.id) {
            getSellerBid();
        }
    }, [user]);

    return (
        <>
            <h3>Discounts & Coupons</h3>
            <div className="row minndabb">
                <div className="col-lg-4 col">
                    <div className="dabbCoupons">
                        <h4>Active Coupons</h4>
                        <h1>{countCopons.active_count}</h1>
                    </div>
                </div>
                <div className="col-lg-4 col">
                    <div className="dabbCoupons">
                        <h4>Expired Coupons</h4>
                        <h1>{countCopons.expired_count}</h1>
                    </div>
                </div>
            </div>
            <div className='bid-offer-tabs'
                style={{ padding: "30px 0px" }}
            >
                <button className='AddCoupon' onClick={toggleAddCouponPopup}>Add Coupon</button>
                <Modal show={showAddCouponPopup} onHide={toggleAddCouponPopup}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Coupon</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <>
                            <div className="mb-3" controlId="formBasicCouponName">
                                <input className='form-control' type="text" name="title" value={couponData.title} onChange={handleInputChange} placeholder="Coupon Name" />
                            </div>
                            <div className="mb-3" controlId="formBasicCouponCode">
                                <input className='form-control' type="number" name="code" value={couponData.code} onChange={handleInputChange}  placeholder="Coupon Code" />
                            </div>
                            <div className="mb-3" controlId="formBasicCouponDiscount">
                                <input className='form-control' type="number" name='discount' value={couponData.discount} onChange={handleInputChange}  placeholder="Coupon Discount" />
                            </div>
                            <div className="mb-3" controlId="formBasicCouponMin_order">
                                <input className='form-control' type="text" name='min_order' value={couponData.min_order} onChange={handleInputChange}  placeholder="min_order" />
                            </div>
                            <div className="mb-3" controlId="formBasicCouponStart_date">
                                <input className='form-control' type="date" name='start_date' value={couponData.start_date} onChange={handleInputChange}  placeholder="Start Date" />
                            </div>
                            <div className="mb-3" controlId="formBasicCouponEnd_date">
                                <input className='form-control' type="date" name='end_date' value={couponData.end_date} onChange={handleInputChange}  placeholder="End Date" />
                            </div>
                            <div className="mb-3" controlId="formBasicCouponGuid">
                                <input className='form-control' name='End Date' type="hidden" value={couponData.seller_guid} onChange={handleInputChange} placeholder="End Date" />
                            </div>
                        </>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleAddCouponPopup}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={postCoupons}>
                            Save Coupon
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="tab-buttons">
                    <button onClick={() => handleTabClick('rr1')} className={activeTab === 'rr1' ? 'active' : ''}>
                        Active Coupons
                    </button>
                    <button onClick={() => handleTabClick('rr2')} className={activeTab === 'rr2' ? 'active' : ''}>
                        Expired Coupons
                    </button>
                </div>
                {isLoading ? (
                    <div className="loader-container text-center">
                        <Spinner animation="border" role="status" />
                    </div>
                ) : (
                    <div className="tab-content">
                        {activeTab === 'rr1' && (
                            <div>
                                <div className='ongoing ordmangemnt'>
                                {activeCoupons.length === 0 ? ( // Check if customerOrders array is empty
            <div>No orders available</div>
          ) : (
            <>
                                    {activeCoupons.map((order, index) => (
                                        <div className='row align-items-center' key={index}>
                                            <div className='col-lg-8'>
                                                <div className='product-image'>
                                                    <div className='prd-details'>
                                                        <h3>{order.title}</h3>
                                                        <h6 style={{ fontWeight: "Bold", color: "#000" }}>{order.discount}</h6>
                                                        <div className='bids-prd'>
                                                            <div style={{ color: "red" }}>{order.min_order}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-lg-4'>
                                                <div className='rightarrow viedeails'>
                                                    <button>View Details</button>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    ))}
                                    </>
          )}
                                </div>
                            </div>
                        )}
                        {activeTab === 'rr2' && (
                            <div>
                                <div className='ongoing ordmangemnt'>
                                {expiredCoupons.length === 0 ? ( // Check if customerOrders array is empty
            <div>No orders available</div>
          ) : (
            <>
                                    {expiredCoupons.map((order, index) => (
                                        <div className='row align-items-center' key={index}>
                                            <div className='col-lg-8'>
                                                <div className='product-image'>
                                                    <div className='prd-details'>
                                                        <h3>{order.title}</h3>
                                                        <h6 style={{ fontWeight: "Bold", color: "#000" }}>{order.discount}</h6>
                                                        <div className='bids-prd'>
                                                            <div style={{ color: "red" }}>{order.min_order}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    ))}
                                    </>
          )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default DiscountAndCoupens;
