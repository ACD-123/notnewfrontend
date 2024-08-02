import React, { useState, useEffect } from "react";
import ProductServices from "../../services/API/ProductServices"; //~/services/API/ProductServices
import CheckoutServices from "../../services/API/CheckoutServices"; //~/services/API/CheckoutServices
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Payment from "../../assets/Images/Shoppingcart/payment.png"
import blank from "../../assets/Images/Productcard/blank.jpg";
import applyPay from "../../assets/Images/paymentCard/apply-pay.png"
import Visa from "../../assets/Images/paymentCard/Visa.png"
import Mastercard from "../../assets/Images/paymentCard/Mastercard.png"
import Arrowright from "../../assets/Images/Shoppingcart/arrowright.png";
import Select from 'react-select';

const CheckoutBuyNow = ({ cartFullResponse , notificationCount }) => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(null);
  const [butItNowData, setButItNowData] = useState([]);
  const [shippingData, setShippingData] = useState({ postalCode: "", country: null });
  const [shipping, setShipping] = useState([]);
  const [country, setCountry] = useState(null);
  const countrys = [{ value: 1, label: 'US' }]
  const [paymentMethod, setPaymentMethod] = useState(0);
  const [couponeCode, setCouponeCode] = useState('');
  const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
  const [inputError, setInputError] = useState(false);
  const { pathname } = window.location;
  const id = pathname.split("/").pop();
  const navigate = useNavigate();

  const getBuyItNowData = async () => {
    try {
      const response = await CheckoutServices.getBuyItNowData();
      setButItNowData(response)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  const getShippingData = async () => {
    setInputError(true)
    if (shippingData.postalCode != "" && shippingData.country != null) {
      try {
        const response = await CheckoutServices.getShippingData(shippingData.country.label, shippingData.postalCode, butItNowData?.weight, '3');
        setShipping(response?.data)
      } catch (error) {
        toast.error(error?.response?.data?.message)
      }
    }
  }

  const checkoutButItNow = async () => {

    const orderItems = {
      product_id: butItNowData?.data?.[0]?.products?.[0]?.id,
      price: butItNowData?.data?.[0]?.products?.[0]?.buynowprice,
      quantity: butItNowData?.data?.[0]?.products?.[0]?.buynowquantity,
      attributes: JSON.stringify(butItNowData?.data?.[0]?.products?.[0]?.attributes),
    }
    const formData = {
      payment_type: "Card",
      discountcode: "discount",
      subtotal_cost: "10",
      service_code: shipping.service_code,
      weight: butItNowData?.weight,
      shipping_cost: shipping.shipping_amount?.amount,
      order_total: butItNowData.total,
      payment_intents: "pi_3Oj5IqBL2ne1CK3D0hkRy72C",
      Currency: "2",
      order_type: "BuyNow",
      orderItems: JSON.stringify([orderItems]),
      other_address: "false",
      secondaddress: ""
    }
    try {
      const response = await CheckoutServices.checkoutButItNow(formData);
      navigate('/')
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  const [showDiscountField, setShowDiscountField] = useState(false);

  const toggleDiscountField = () => {
    setShowDiscountField(!showDiscountField);
  };

  useEffect(() => {
    getBuyItNowData();
  }, []);

  const handleDiscountSubmit = async (e) => {
    e.preventDefault();
    setInputError(true)
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    if (couponeCode != "") {
      try {
        const data = {
          coupon_code: couponeCode,
          user_id: loggedInUser?.id,
          date: `${year}-${month}-${day}`
        };
        const res = await ProductServices.addCouponeCode(data);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  };



  useEffect(() => {
  }, []);
  return (
    <>
      <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount}/>
      <section id="cart-details">
        <div className="container">
          <h2 className="page-title">Buy Now Checkout</h2>
          <div className="row">
            <div className="col-lg-8">
              <div className="order-details" id="sectionToRemove">
                <div><h3 id="storetitle">Seller Shop : {butItNowData?.[0]?.storename}</h3></div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="product-detail">
                      <div className="product-image">
                        <>
                          {butItNowData?.data?.[0]?.products?.[0]?.media?.length > 0 ? (
                            <img src={butItNowData?.data?.[0]?.products?.[0]?.media?.[0]?.name} />
                          ) : (
                            <img src={blank} alt="blank" />
                          )}
                        </>
                      </div>
                      <div className="product-order-details">
                        <div className="name">Name: <span>{butItNowData?.data?.[0]?.products?.[0]?.name}</span></div>
                        <div className="attribute">Attributes: <span>
                          <ul>
                            {butItNowData?.data?.[0]?.products?.[0]?.attributes.map((attribute, index) => {
                              return (
                                <li key={index}>{attribute.key}: <span>{attribute.value}</span>{butItNowData?.data?.[0]?.products?.[0]?.attributes?.length - 1 !== index ? ',' : ''}</li>
                              )
                            })}
                          </ul>
                        </span>
                        </div>
                        <div className="price">Price: <span>${butItNowData?.data?.[0]?.products?.[0]?.buynowprice}</span></div>
                        <div className="price">Quantity available: <span>{butItNowData?.data?.[0]?.products?.[0]?.buynowquantity}</span></div>
                        <div className="price">Shipping Weight: <span>{butItNowData?.weight}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-details" id="border-order-details">
                <div><h3 id="storetitle">Pay with</h3></div>
                <div className="b-w-p-w">
                  <div className="b-w-p-w-l">SELECT A PAYMENT OPTION</div>
                  <div className="b-w-p-w-r">ADD NEW CARD</div>
                </div>
                <div className="b-w-c-o">
                  <ul>
                    <li>
                      <div className="b-w-c-o-l" onClick={() => { setPaymentMethod(0) }}>
                        <div className={`b-w-c-o-l-c ${paymentMethod === 0 ? 'active' : ''}`}></div>
                      </div>
                      <div className="b-w-c-o-r">
                        <div className="b-w-c-o-r-l">
                          <img src={applyPay} alt="" />
                        </div>
                        <div className="b-w-c-o-r-r">APPLE PAY</div>
                      </div>
                    </li>
                    <li>
                      <div className="b-w-c-o-l" onClick={() => { setPaymentMethod(1) }}>
                        <div className={`b-w-c-o-l-c ${paymentMethod === 1 ? 'active' : ''}`}></div>
                      </div>
                      <div className="b-w-c-o-r">
                        <div className="b-w-c-o-r-l">
                          <img src={Visa} alt="" />
                        </div>
                        <div className="b-w-c-o-r-r">VISE PREMIUM</div>
                      </div>
                    </li>
                    <li>
                      <div className="b-w-c-o-l" onClick={() => { setPaymentMethod(2) }}>
                        <div className={`b-w-c-o-l-c ${paymentMethod === 2 ? 'active' : ''}`}></div>
                      </div>
                      <div className="b-w-c-o-r">
                        <div className="b-w-c-o-r-l">
                          <img src={Mastercard} alt="" />
                        </div>
                        <div className="b-w-c-o-r-r">MASTER CARD</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="order-details" id="border-order-details">
                <h5 onClick={toggleDiscountField}>
                  Coupons, Vouchers, Discount Codes
                  <div id="iconrightaligin">
                    <img src={Arrowright} />
                  </div>
                </h5>
                {showDiscountField && (
                  <div className="discountfields">
                    <input
                      type="text"
                      placeholder="Enter discount code"
                      value={couponeCode}
                      onChange={(e) => setCouponeCode(e.target.value)}
                    />
                    <button onClick={handleDiscountSubmit}>Apply</button>
                  </div>
                )}
              </div>
              <div className="order-details" id="border-order-details">
                <div><h3 id="storetitle">Shipping</h3></div>
                <div className="b-w-s-i-f">
                  <div className="two-field">

                    <div className="two-field-left">
                      <label>Postal code</label>
                      <input
                        type="number"
                        name="postalCode"
                        value={shippingData.postalCode}
                        onChange={(e) => { setShippingData({ ...shippingData, postalCode: e.target.value }) }} placeholder="Enter quantity" />
                      {shippingData.postalCode === "" && inputError &&
                        <div className="error-input">Postal code is required</div>
                      }
                    </div>
                    <div className="two-field-left">
                      <label>To Country</label>
                      <Select
                        value={shippingData.country}
                        onChange={(e) => { setShippingData({ ...shippingData, country: e }) }}
                        options={countrys}
                        placeholder={'Select country'}
                      />
                      {shippingData.country === null && inputError &&
                        <div className="error-input">Country is required</div>
                      }
                    </div>
                  </div>
                </div>
                <div className="b-w-p-w">
                  <div className="b-w-p-w-l"></div>
                  <div className="b-w-p-w-r" onClick={() => { getShippingData() }}>Shipping</div>
                </div>
              </div>

            </div>
            <div className="col-lg-4">
              <div className="order-details" id="totalordervalue">
                <h3>Order Total</h3>
                <table style={{ width: "100%" }}>
                  <tr>
                    <th className="boldthtotal">Subtotal ( 1 item )</th>
                    <td className="boldthtotal">${butItNowData?.data?.[0]?.products?.[0]?.buynowprice}</td>
                  </tr>
                  <tr>
                    <th className="boldthtotal">Shipping</th>
                    <td className="boldthtotal">${shipping?.shipping_amount?.amount ? shipping?.shipping_amount?.amount : 0}</td>
                  </tr>
                  <tr>
                    <th className="totalthtextbold">Order Total</th>
                    <td className="totalthtextbold">${butItNowData.total}</td>
                  </tr>
                </table>
                <div className="imgtoop">
                  <img src={Payment} alt="" />
                  <button className="btn btn-info btn-lg gradientbtncolor" type="button" onClick={() =>{checkoutButItNow()}}>
                    Confirm & Pay
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>
      <Footer />
    </>
  )
}

export default CheckoutBuyNow