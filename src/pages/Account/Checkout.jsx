// import React, { useEffect, useState } from "react";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import Payment from "../../assets/Images/Shoppingcart/payment.png";
// import { Link, useNavigate } from "react-router-dom";
// import CheckoutServices from "../../services/API/CheckoutServices"; //~/services/API/CheckoutServices
// import UserServices from "../../services/API/UserServices";
// import { STRIPE_PUBLISHABLE_KEY } from "../../services/Constant";
// import { loadStripe } from "@stripe/stripe-js";
// import {PaymentElement,Elements,useStripe,useElements,} from "@stripe/react-stripe-js";
// import Stripe from "./Stripe";
// import CartServices from "../../services/API/CartServices";
// import SaveLaterServices from "../../services/API/SaveLaterServices";
// import { toast } from "react-toastify";

// const Checkout = ({cartFullResponse}) => {
//   const [userDetails, setUserDetails] = useState(null);
//   const [checkoutData, setCheckoutData] = useState();
//   const [showModal, setShowModal] = useState(false);
//   const stripePromise = loadStripe(`${STRIPE_PUBLISHABLE_KEY}`);
//   const options = {
//     mode: "payment",
//     amount: 1099,
//     currency: "usd",
//     appearance: {
//     },
//   };
//   const [isLoading, setIsLoading] = useState(true);
//   const [secondaddress, setSecondAddress] = useState("");
//   const [changeAdds, setchangeAdds] = useState(false);
//   const [zip, setZip] = useState("");
//   const [otheraddess, setOtherAddress] = useState(true);
//   const [ordertyp, setOrderTyp] = useState("multiple");
//   const [discountPrices, setDiscountPrices] = useState(0);
//   const [prices, setPrices] = useState([]);
//   const [subTotal, setsubTotal] = useState(0);
//   const [shippingprice, setShippingPrice] = useState(0);
//   const [adminprices, setAdminPrices] = useState(0);
//   const [ordertype, setOrderType] = useState("");
//   const [amountaddingprices, setAmountAddingPrices] = useState(0);
//   const [cartitem, setCartItems] = useState(0);
//   const [savedLater, setSavedLater] = useState(false);
//   const [cartids, setCartIds] = useState([]);
//   const [bidcartimage, setBidCartImage] = useState([]);
//   const [bidcart, setBidCart] = useState({});
//   const [bidquantity, setQuantity] = useState(0);
//   const navigate = useNavigate()
//   const changeAddress = (e, change) => {
//     e.preventDefault();
//     setchangeAdds(change);
//   };
//   const cartCount = () => {
//     CartServices.count().then((response) => {
//       setCartItems(response);
//     });
//   };
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await UserServices.detail();
//         setUserDetails(response);
//       } catch (error) {
//         toast.error(error?.response?.data?.message)
//       }
//     };

//     const fetchCheckoutData = async () => {
//       try {
//         const response = await CheckoutServices.self();
//         setCheckoutData(response.data);
//       } catch (error) {
//         toast.error(error?.response?.data?.message)
//       }
//     };

//     fetchUserDetails();
//     fetchCheckoutData();
//   }, []);
//   const handleChngeAdd = (e) => {
//     e.preventDefault();
//     setSecondAddress(e.target.value);
//   };
//   const handleZip = (e) => {
//     setZip(e.target.value);
//   };
//   const handleCallback = (childData) => {
//     setOtherAddress(childData);
//   };
//   const [cart, setCart] = useState([]);

//   const getCart = () => {
//     var bidProduct = localStorage.getItem("bid_product");

//     setIsLoading(true);
//     if (bidProduct) {
//       setBidCartImage(JSON.parse(bidProduct).media);
//       setBidCart(JSON.parse(bidProduct));
//       setQuantity(1);
//       let prices =
//         JSON.parse(bidProduct).bids + JSON.parse(bidProduct).shipping_price;
//       setAmountAddingPrices(prices);
//       setShippingPrice(JSON.parse(bidProduct).shipping_price);
//       setsubTotal(JSON.parse(bidProduct).bids);
//       setOrderType("bids");
//     } else {
//       CartServices.self().then((res) => {
//         setCart(res);
//         setIsLoading(false);
//         var cartPrice = [];
//         var shippingPrice = [];
//         var allPrices = [];
//         if (res.length > 0) {
//           res.map((cat) => {
//             cartPrice.push(cat.price);
//             shippingPrice.push(cat.products.shipping_price);
//           });
//         }
//         let discountPrice = 0;
//         if (prices.length > 0) {
//           prices.map((price) => {
//             if (price.name !== "Discount") {
//               allPrices.push(price.value);
//             } else if (price.name === "Discount") {
//               setDiscountPrices(price.value);
//               discountPrice = price.value;
//             }
//           });
//         }
//         let subttal = cartPrice.reduce((a, v) => (a = a + v), 0);
//         let shippingprice = shippingPrice.reduce((a, v) => (a = a + v), 0);
//         setsubTotal(subttal);
//         setShippingPrice(shippingprice);
//         let adminPric = allPrices.reduce((a, v) => (a = a + v), 0);
//         setAdminPrices(adminPric);
//         setOrderType("Cart");
//         var amountAfterDiscount = subttal - discountPrice;
//         var amountbyaddingprices =
//           amountAfterDiscount + adminPric + shippingprice;
//         setAmountAddingPrices(amountbyaddingprices);
//       });
//     }
//   };
//   const handleCheckOut = (e) => {
//     e.preventDefault();
//       navigate("/checkout")
//   };
//   let cart_ids = [];

//   const getForSavedLater = () => {
//     SaveLaterServices.getByUser().then((response) => {
//       const cartIds = response.map((crt) => crt.cart_id);
//       setCartIds(cartIds);
//     });
//   };

//   const handleSaveLater = (e, cartId) => {
//     e.preventDefault();
//     let data = {
//       cart_id: cartId,
//     };
//     SaveLaterServices.add(data).then((response) => {
//       toast.success(response.message);
//       setSavedLater(true);
//       getForSavedLater();
//     });
//   };
//   const handlePrices = () => {
//     var cartPrice = [];
//     var shippingPrice = [];
//     var allPrices = [];
//     if (cart.length > 0) {
//       cart.map((cat) => {
//         cartPrice.push(cat.price);
//         shippingPrice.push(cat.products.shipping_price);
//       });
//     }
//     if (prices.length > 0) {
//       prices.map((price) => {
//         if (price.name !== "Discount") {
//           allPrices.push(price.value);
//         } else if (price.name === "Discount") {
//           setDiscountPrices(price.value);
//         }
//       });
//     }
//     let subttal = cartPrice.reduce((a, v) => (a = a + v), 0);
//     let shippingprice = shippingPrice.reduce((a, v) => (a = a + v), 0);
//     setsubTotal(subttal);
//     setShippingPrice(shippingprice);
//     setAdminPrices(allPrices.reduce((a, v) => (a = a + v), 0));
//     var amountAfterDiscount = subTotal - discountPrices;
//     var amountbyaddingprices = subttal + shippingprice;
//     setAmountAddingPrices(amountbyaddingprices);
//   };
//   useEffect(() => {
//     cartCount();
//     getCart();
//   }, []);

//   return (
//     <>
//       <Header cartFullResponse={cartFullResponse}/>
//       {isLoading ? (
//         <div className="py-2 container">Loading...</div>
//       ) : (
//         <>
//           {userDetails && (
//             <section id="cart-details">
//               <div className="container">
//                 <h1>Checkout</h1>
//                 <div className="row">
//                   <div className="col-lg-8">
//                     <div className="order-details" id="order-detailsid">
//                       <h3>Pay with</h3>
//                       <h6>Credit or Debit card</h6>
//                       <span>
//                         Your payements are secured, Your Details are
//                         confedentials
//                       </span>

//                       {userDetails?.address ? (
//                         <>
//                           <p>Billing Address</p>
//                           <span className="tabstop">{userDetails?.address}</span>
//                         </>
//                       ) : (
//                         <></>
//                       )}
//                       <div className="tabs-check">

//                         <Elements stripe={stripePromise} options={options}>
//                           <Stripe
//                             changeAdds={changeAdds}
//                             parentCallback={handleCallback}
//                             zip={zip}
//                             subtotal={subTotal}
//                             secondAddress={secondaddress}
//                             cart={cart}
//                             bidcart={bidcart}
//                             orderType={ordertype}
//                             adminprices={adminprices}
//                             shippingprice={shippingprice}
//                             total={amountaddingprices}
//                             changeaddress={changeAdds}
//                             ordertype={ordertyp}
//                             address={userDetails?.street_address}
//                           />
//                         </Elements>
//                       </div>
//                     </div>
//                     <div className="order-details" id="order-detailsid">
//                       <h3>Shipping Details</h3>
//                       <div className="shipping-details">
//                         <table style={{ width: "100%" }}>
//                           <tr>
//                             <th className="boldthtotallight">Full Name :</th>
//                             <td className="boldthtotallight">{userDetails.name}</td>
//                           </tr>
//                           <tr>
//                             <th className="boldthtotallight">Phone :</th>
//                             <td>{userDetails.phone}</td>
//                           </tr>
//                           <tr>
//                             <th className="boldthtotallight">Address :</th>
//                             {changeAdds ? (
//                               <>
//                                 <td>
//                                   <textarea
//                                     className="form-control"
//                                     onChange={handleChngeAdd}
//                                   ></textarea>
//                                 </td>
//                                 <td>
//                                   <p
//                                     className="gradienttextcolor"
//                                     style={{ cursor: "pointer" }}
//                                     onClick={(e) => changeAddress(e, false)}
//                                   >
//                                     Cancel
//                                   </p>
//                                 </td>
//                               </>
//                             ) : (
//                               <>
//                                 <td style={{ width: "60%" }}>
//                                   {userDetails?.address}
//                                 </td>
//                                 <td>
//                                   <p
//                                     className="gradienttextcolor"
//                                     style={{ cursor: "pointer" }}
//                                     onClick={(e) => changeAddress(e, true)}
//                                   >
//                                     Change Address
//                                   </p>
//                                 </td>
//                               </>
//                             )}
//                           </tr>
//                           {changeAdds ? (
//                             <>
//                               <tr>
//                                 <th className="boldthtotallight">Zip :</th>
//                                 <td>
//                                   <input
//                                     type="text"
//                                     name="zip"
//                                     className="form-control"
//                                     onChange={handleZip}
//                                     id="zip"
//                                   />
//                                 </td>
//                                 <td>&nbsp;</td>
//                               </tr>
//                             </>
//                           ) : (
//                             ""
//                           )}
//                         </table>
//                       </div>
//                     </div>
//                     {checkoutData &&
//                       checkoutData.map((order, orderIndex) => (
//                         <div key={orderIndex} className="divider">
//                           <h3 id="storetitle">{order.storename}</h3>
//                           {order.products.map((product, productIndex) => {
//                             const isSaved = cartids.includes(product.cartid);
//                             return (
//                               <div key={productIndex} className="order-details">
//                                 <div className="row">
//                                   <div className="col-lg-9">
//                                     <div className="product-detail">
//                                       <div
//                                         className="product-image"
//                                         style={{ width: "35%" }}
//                                       >
//                                         <img
//                                           src={product.media[0].name}
//                                           alt=""
//                                           style={{
//                                             width: "100%",
//                                             objectFit: "contain",
//                                           }}
//                                         />
//                                       </div>
//                                       <div className="product-order-details">
//                                         <h5>{product.name}</h5>
//                                         <span>
//                                           Size: {product.size}, Color:{" "}
//                                           {product.color}
//                                         </span>
//                                         <div className="quantitypadding">
//                                           <p>
//                                             <b>
//                                               <span>
//                                                 QTY: {product.cartquantity}
//                                               </span>
//                                             </b>
//                                           </p>
//                                         </div>
//                                         <span className="unter">
//                                           {product.postal_address}
//                                         </span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                   <div className="col-lg-3">
//                                     <div className="prices-order-details">
//                                       <h4>US $ {product.cartprice}</h4>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <hr className="dashed" />
//                                 <div className="buttonright">
//                                   {isSaved ? (
//                                     <button
//                                       className="btn btn-info btn-lg transparent"
//                                       type="button"
//                                     >
//                                       Saved for later
//                                     </button>
//                                   ) : (
//                                     <button
//                                       className="btn btn-info btn-lg transparent"
//                                       type="button"
//                                       onClick={(e) =>
//                                         handleSaveLater(e, product.cartid)
//                                       }
//                                     >
//                                       Save for later
//                                     </button>
//                                   )}
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       ))}
//                   </div>
//                   <div className="col-lg-4">
//                     {cart.length > 0 ? (
//                       <>
//                         <div className="order-details" id="totalordervalue">
//                           <h3>Order Total</h3>
//                           <table style={{ width: "100%" }}>
//                             <tr>
//                               <th className="boldthtotal">
//                                 Subtotal ( {cartitem} items )
//                               </th>
//                               <td className="boldthtotal">$ {subTotal}</td>
//                             </tr>
//                             <tr>
//                               <th>Shipping</th>
//                               <td>$ {shippingprice}</td>
//                             </tr>
//                             {prices.length > 0 ? (
//                               <>
//                                 {prices.map((price, index) => {
//                                   return (
//                                     <>
//                                       <tr>
//                                         <th>{price.name}</th>
//                                         <td>
//                                           ${" "}
//                                           {price.name == "Discount" ? (
//                                             <>- {price.value}</>
//                                           ) : (
//                                             price.value
//                                           )}
//                                         </td>
//                                       </tr>
//                                     </>
//                                   );
//                                 })}
//                               </>
//                             ) : (
//                               ""
//                             )}
//                             <tr>
//                               <th className="totalthtextbold">Order Total</th>
//                               <td className="totalthtextbold">
//                                 $ {amountaddingprices}
//                               </td>
//                             </tr>
//                           </table>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div className="order-details" id="totalordervalue">
//                           <h3>Order Total</h3>
//                           <table style={{ width: "100%" }}>
//                             <tr>
//                               <th className="boldthtotal">Subtotal</th>
//                               <td className="boldthtotal">$00.00</td>
//                             </tr>
//                             <tr>
//                               <th className="totalthtextbold">Order Total</th>
//                               <td className="totalthtextbold">$ 00.00</td>
//                             </tr>
//                           </table>
//                           <div className="imgtoop">
//                             <img src={Payment} alt="" />
//                           </div>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </section>
//           )}
//         </>
//       )}
//       <Footer />
//     </>
//   );
// };

// export default Checkout;

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

const Checkout = ({ cartFullResponse }) => {
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
      const response = await CheckoutServices.getCheckoutData();
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
    // const orderItems = {
    //   product_id: butItNowData?.data?.[0]?.products?.[0]?.id,
    //   price: butItNowData?.data?.[0]?.products?.[0]?.buynowprice,
    //   quantity: butItNowData?.data?.[0]?.products?.[0]?.buynowquantity,
    //   attributes: JSON.stringify(butItNowData?.data?.[0]?.products?.[0]?.attributes),
    // }
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
      <Header cartFullResponse={cartFullResponse} />
      <section id="cart-details">
        <div className="container">
          <h2 className="page-title">Checkout</h2>
          <div className="row">
            <div className="col-lg-8">
              {butItNowData?.data?.map((data, index) => {
                return (
                  <div className="order-details" id="sectionToRemove" key={index}>
                    <div><h3 id="storetitle">Seller Shop : {data?.storename}</h3></div>
                    <div className="c-o-s-p">
                      {data?.products?.map((product, i) => {
                        return (
                          <div className="c-o-s-p" key={i}>
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="product-detail">
                                  <div className="product-image">
                                    <>
                                      {product?.media?.length > 0 ? (
                                        <img src={product?.media?.[0]?.name} />
                                      ) : (
                                        <img src={blank} alt="blank" />
                                      )}
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
                    <th className="boldthtotal">Subtotal ( {butItNowData?.data?.[0]?.products?.length} item )</th>
                    <td className="boldthtotal">${butItNowData?.total}</td>
                  </tr>
                  <tr>
                    <th className="boldthtotal">Shipping</th>
                    <td className="boldthtotal">${shipping?.shipping_amount?.amount ? shipping?.shipping_amount?.amount : 0}</td>
                  </tr>
                  <tr>
                    <th className="totalthtextbold">Order Total</th>
                    <td className="totalthtextbold">${butItNowData?.total}</td>
                  </tr>
                </table>
                <div className="imgtoop">
                  <img src={Payment} alt="" />
                  <button className="btn btn-info btn-lg gradientbtncolor" type="button" onClick={() => { checkout() }}>
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

export default Checkout