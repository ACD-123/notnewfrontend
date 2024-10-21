import React, { useState, useEffect } from "react";
import ProductServices from "../../services/API/ProductServices";
import CheckoutServices from "../../services/API/CheckoutServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Payment from "../../assets/Images/Shoppingcart/payment.png"
import blank from "../../assets/Images/Productcard/blank.jpg";
import Select from 'react-select';
import Form from "react-bootstrap/Form";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Modal } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
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
    setLoading(true);

    const cardElement = elements.getElement(CardElement);

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

    let orders = [];
    for (let i = 0; i < butItNowData.data.length; i++) {
      for (let j = 0; j < butItNowData.data[i].products.length; j++) {
        orders.push({
          product_id: butItNowData.data[i].products[j]?.id,
          price: butItNowData.data[i].products[j]?.cartprice,
          quantity: butItNowData.data[i].products[j]?.cartquantity,
          attributes: JSON.stringify(butItNowData.data[i].products[j]?.attributes),
        })
      }

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
      order_type: "Cart",
      orderItems: JSON.stringify(orders),
      other_address: "false",
      secondaddress: "",
      pm_card_Id: paymentMethod.id
    }
    try {
      const response = await CheckoutServices.checkout(formData);
      getCartCount()
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

const Checkout = ({ cartFullResponse, getCartCount, notificationCount }) => {
  const [butItNowData, setButItNowData] = useState([]);
  const [shippingData, setShippingData] = useState({ postalCode: "", country: null });
  const [shipping, setShipping] = useState([]);
  const countrys = [{ value: 1, label: 'US' }]
  const [couponeCode, setCouponeCode] = useState('');
  const user_id = localStorage.getItem('user_id');
  const [inputError, setInputError] = useState(false);
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState('')
  const [couponError, setCouponError] = useState(false)
  const [shippingLoader, setShippingLoader] = useState(false)

  const getBuyItNowData = async () => {
    try {
      const response = await CheckoutServices.getCheckoutData();
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
        setShipping([])
        toast.error(error?.response?.data?.message)
      }
    }
  }

  useEffect(() => {
    if (shippingData.postalCode.length > 2 && shippingData.country != null && !shippingLoader) {
      getShippingData()
    }
  }, [shippingData.postalCode, shippingData.country])

  const checkout = async () => {
    let orders = [];
    for (let i = 0; i < butItNowData.data.length; i++) {
      for (let j = 0; j < butItNowData.data[i].products.length; j++) {
        orders.push({
          product_id: butItNowData.data[i].products[j]?.id,
          price: butItNowData.data[i].products[j]?.cartprice,
          quantity: butItNowData.data[i].products[j]?.cartquantity,
          attributes: JSON.stringify(butItNowData.data[i].products[j]?.attributes),
        })
      }

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
      order_type: "Cart",
      orderItems: JSON.stringify(orders),
      other_address: "false",
      secondaddress: ""
    }
    try {
      const response = await CheckoutServices.checkout(formData);
      getCartCount()
      navigate('/')
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  const [showDiscountPopup, setShowDiscountPopup] = useState(false);

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
      getBuyItNowData();
    } else {
      navigate('/')
    }
  }, [])

  const addCouponCode = async (e) => {
    console.log(selectedData);
    e.preventDefault();
    setCouponError(true)
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    if (couponeCode != "") {
      try {
        const data = {
          store_id: selectedData?.storeid,
          coupon_code: couponeCode,
          user_id: user_id,
          date: `${year}-${month}-${day}`
        };
        const res = await ProductServices.addCouponeCode(data);
        toast.success(res?.message)
        setShowDiscountPopup(false)
        setCouponeCode('')
        setCouponError(false)
        getBuyItNowData()
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  }

  const deleteCouponeCode = async (e, dataa) => {
    e.preventDefault();
    try {
      const data = {
        store_id: dataa?.storeid,
        coupon_code: dataa?.coupon_code,
        user_id: user_id,
      };
      const res = await ProductServices.deleteCouponeCode(data);
      toast.success(res?.message)
      getBuyItNowData()
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

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
          <h2 className="page-title">Checkout</h2>
          <div className="row">
            <div className="col-lg-8">
              {butItNowData?.data?.map((data, index) => {
                return (
                  <div className="order-details" id="sectionToRemove" key={index}>
                    <div className="heading-code">
                      <h3 id="storetitle">Seller Shop : {data?.storename}</h3>
                      {data?.coupon_code ?
                        <div className="couple-added">
                          <p>{data?.coupon_code}</p>
                          <span className="edit" onClick={() => { setShowDiscountPopup(true); setSelectedData(data); setCouponeCode(data?.coupon_code) }}><MdEdit /></span>
                          <span className="delete" onClick={(e) => { deleteCouponeCode(e, data) }}><MdDelete /></span>
                        </div>
                        :
                        <button onClick={() => { setShowDiscountPopup(true); setSelectedData(data) }}>Apply coupon</button>
                      }
                    </div>
                    <div className="c-o-s-p">
                      {data?.products?.map((product, i) => {
                        return (
                          <div className="c-o-s-p" key={i}>
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="product-detail">
                                  <div className="product-image">
                                    <>
                                      {product?.media?.length > 0 ?
                                        (<img src={product?.media?.[0]?.name} />) :
                                        (<img src={blank} alt="blank" />)}
                                    </>
                                  </div>
                                  <div className="product-order-details">
                                    <div className="name">Name: <span>{product?.name}</span></div>
                                    <div className="attribute">Attributes: <span>
                                      <ul>
                                        {product?.attributes.map((attribute, index) => {
                                          return (
                                            <li key={index}>{attribute.key}: <span>{attribute.value}</span>{product?.attributes?.length - 1 !== index ? ',' : ''}</li>
                                          )
                                        })}
                                      </ul>
                                    </span>
                                    </div>
                                    <div className="price">Price: <span>${product?.cartprice}</span></div>
                                    <div className="price">Quantity: <span>{product?.cartquantity}</span></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
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
                    <PaymentForm butItNowData={butItNowData} shipping={shipping} getCartCount={getCartCount} />
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
                    <th className="boldthtotal">Subtotal ( {butItNowData?.data?.length} item )</th>
                    <td className="boldthtotal">${butItNowData?.sub_total}</td>
                  </tr>
                  {+butItNowData?.discount > 0 ?
                    <tr>
                      <th className="boldthtotal">Discount</th>
                      <td className="boldthtotal">${butItNowData?.discount}</td>
                    </tr>
                    :
                    null
                  }
                  {shipping?.shipping_amount?.amount &&
                    <tr>
                      <th className="boldthtotal">Shipping</th>
                      <td className="boldthtotal">${shipping?.shipping_amount?.amount ? shipping?.shipping_amount?.amount : 0}</td>
                    </tr>
                  }
                  <tr>
                    <th className="totalthtextbold">Order Total</th>
                    {shipping?.shipping_amount?.amount ?
                      <td className="totalthtextbold">${(+butItNowData?.total) + (+shipping?.shipping_amount?.amount)}</td>
                      :
                      <td className="totalthtextbold">${(+butItNowData?.total)}</td>
                    }
                  </tr>
                </table>
                <div className="imgtoop">
                  <img src={Payment} alt="" />
                  {/* <button className="btn btn-info btn-lg gradientbtncolor" type="button" onClick={() => { checkout() }}>
                    Confirm & Pay
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Modal show={showDiscountPopup} onHide={setShowDiscountPopup} className='place-a-bid-modal'>
        <div className='c-c-body'>
          <div className="cross" onClick={() =>{setShowDiscountPopup(false)}}>X</div>
          <div className="title">Coupons, Vouchers, Discount Codes</div>
          <div className="options">
          </div>
          <form onSubmit={addCouponCode}>
            <div className="input">
              <input type="text" value={couponeCode} placeholder="Enter coupon code" onChange={(e) => { setCouponeCode(e.target.value) }} />
              {couponeCode === "" && couponError &&
                <div className="error-input">Coupon code is required</div>
              }
            </div>
            <div className="button" style={{ marginTop: '30px' }}>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default Checkout