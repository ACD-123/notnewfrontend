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
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import Form from "react-bootstrap/Form";
import LoadingComponents from "../../components/Shared/LoadingComponents";

const stripePromise = loadStripe('pk_test_51HiCo6EHLDkHxi1YwwTc185yQTBuRIZktAiqLEus7vFq1kKxsrir4UlAUVCP6rRokopLAFCYY1DKowhrjZuLhyv200gfW8PqZc');

const PaymentForm = ({ butItNowData, shipping, getCartCount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [cardError, setCardError] = useState('');
  const [loading, setLoading] = useState(false);
  const userId = sessionStorage.getItem("userId");
  const [formData, setFormData] = useState({
    name: "",
    companey_name: "",
    street_address: "",
    aparment: "",
    town: "",
    // state: "",
    phone_number: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setLoading(true);

    const cardElement = elements.getElement(CardElement);
    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: { email },
    });



    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    console.log(paymentMethod.id, 'paymentMethod.id');
    const token = sessionStorage.getItem("userToken");

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
      secondaddress: "",
      pm_card_Id: paymentMethod.id
    }
    try {
      const response = await CheckoutServices.checkoutButItNow(formData);
      navigate('/')
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
    setLoading(false);
  };

  const handleCardChange = (event) => {
    if (event.error) {
      setCardError(event.error.message)
      console.log("Card validation error:", event.error.message);
    } else {
      setCardError('')
    }
  };

  return (

    <Form onSubmit={handleSubmit}>
      <div className="card-element-container">
        <CardElement className="card-element" options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#000',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
          hidePostalCode: true,
        }}
          onChange={handleCardChange}
        />
        <p className="input-error-show">{cardError}</p>
      </div>
      <div className="cart-button-btn-cpn cart-button-btn-div  cart-button-btn-div01">
        <button className='proceedCheckout3 mt-2' type="submit" disabled={!stripe || loading}>
          {loading ? 'Loading...' : 'Confirm & Pay'}
        </button>
      </div>
    </Form>
  );
};

const CheckoutBuyNow = ({ cartFullResponse, notificationCount }) => {
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
  const user_id = localStorage.getItem('user_id');
  const [inputError, setInputError] = useState(false);
  const { pathname } = window.location;
  const id = pathname.split("/").pop();
  const [shippingLoader, setShippingLoader] = useState(false)
  const navigate = useNavigate();

  const getBuyItNowData = async () => {
    try {
      const response = await CheckoutServices.getBuyItNowData();
      console.log(response?.data?.[0]?.products?.[0], 'getBuyItNowData');

      setButItNowData(response)
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  const getShippingData = async () => {
    setInputError(true)
    if (shippingData.postalCode != "" && shippingData.country != null) {
      setShippingLoader(true)
      try {
        const response = await CheckoutServices.getShippingData(shippingData.country.label, shippingData.postalCode, butItNowData?.weight, '3');
        setShipping(response?.data)
        setShippingLoader(false)
      } catch (error) {
        setShippingLoader(false)
        toast.error(error?.response?.data?.message)
      }
    }
  }

  useEffect(() => {
    if (shippingData.postalCode.length > 2 && shippingData.country != null && !shippingLoader) {
      getShippingData()
    }
  }, [shippingData.postalCode, shippingData.country])

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
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
      getBuyItNowData();
    } else {
      navigate('/')
    }
  }, [])

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
          user_id: user_id,
          date: `${year}-${month}-${day}`
        };
        const res = await ProductServices.addCouponeCode(data);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <>
      {shippingLoader &&
        <div className="full-screen-loader">
          <LoadingComponents />
        </div>
      }
      <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount} />
      <section id="cart-details">
        <div className="container">
          <h2 className="page-title">Buy Now Checkout</h2>
          <div className="row">
            <div className="col-lg-8">
              <div className="order-details" id="sectionToRemove">
                <div><h3 id="storetitle">Seller Shop : {butItNowData?.data?.[0]?.storename}</h3></div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="product-detail">
                      <div className="product-image">
                        <>

                          {butItNowData?.data?.[0]?.products?.[0]?.underage === 0 && <span className="plus21">21 +</span>}
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
              {/* <div className="order-details" id="border-order-details">
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
              </div> */}
              {/* <div className="order-details" id="border-order-details">
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
              </div> */}
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
                        onChange={(e) => { setShippingData({ ...shippingData, postalCode: e.target.value }) }} 
                        placeholder="Enter postal code" />
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
                {/* <div className="b-w-p-w">
                  <div className="b-w-p-w-l"></div>
                  <div className="b-w-p-w-r" onClick={() => { getShippingData() }}>Shipping</div>
                </div> */}
              </div>
              {shipping?.shipping_amount?.amount ?
                <div className="stripe-payment-card">
                  <div className="stripe-title">Card Info</div>
                  <Elements stripe={stripePromise}>
                    <PaymentForm butItNowData={butItNowData} shipping={shipping} />
                  </Elements>
                </div>
                :
                null
              }

            </div>
            <div className="col-lg-4">
              <div className="order-details" id="totalordervalue">
                <h3>Order Total</h3>
                <table style={{ width: "100%" }}>
                  <tr>
                    <th className="boldthtotal">Subtotal ( 1 item )</th>
                    <td className="boldthtotal">${butItNowData?.data?.[0]?.products?.[0]?.buynowprice}</td>
                  </tr>
                  {shipping?.shipping_amount?.amount ?
                    <tr>
                      <th className="boldthtotal">Shipping</th>
                      <td className="boldthtotal">${shipping?.shipping_amount?.amount}</td>
                    </tr>
                    :
                    null
                  }
                  <tr>
                    <th className="totalthtextbold">Order Total</th>
                    {shipping?.shipping_amount?.amount ?
                      <td className="totalthtextbold">${(+butItNowData.total) + (+shipping?.shipping_amount?.amount)}</td>
                      :
                      <td className="totalthtextbold">${butItNowData.total}</td>
                    }

                  </tr>
                </table>
                <div className="imgtoop">
                  <img src={Payment} alt="" />
                  {/* <button className="btn btn-info btn-lg gradientbtncolor" type="button" onClick={() => { checkoutButItNow() }}>
                    Confirm & Pay
                  </button> */}
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