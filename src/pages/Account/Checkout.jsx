import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Productimage from '../../assets/Images/Categorylisting/1.png';
import { Modal, Button, Spinner } from 'react-bootstrap';
import Payment from "../../assets/Images/Shoppingcart/payment.png"
import Checkpay from "../../assets/Images/check-pay.png"
import { Link } from 'react-router-dom';
import CheckoutServices from "../../services/API/CheckoutServices"; //~/services/API/CheckoutServices
import UserServices from "../../services/API/UserServices";
import { setUserDetails, isLoggedin, getUserDetails } from "../../services/Auth"; // ~/services/Auth
import { Carousel } from 'react-carousel-minimal'; // Import Carousel from react-carousel-minimal
import { BASE_URL } from "../../services/Constant";
import { STRIPE_PUBLISHABLE_KEY } from "../../services/Constant";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Stripe from './Stripe';
import CartServices from '../../services/API/CartServices';
import SaveLaterServices from '../../services/API/SaveLaterServices';
import { toast } from 'react-toastify';

const Checkout = () => {
  const [userDetails, setUserDetails] = useState(null); // State to store user details
  const [checkoutData, setCheckoutData] = useState(); // State to store checkout data
  const [showModal, setShowModal] = useState(false);
  const stripePromise = loadStripe(`${STRIPE_PUBLISHABLE_KEY}`);
  const options = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const [secondaddress, setSecondAddress] = useState("");
  const [changeAdds, setchangeAdds] = useState(false);
  const [zip, setZip] = useState("");
  const [otheraddess, setOtherAddress] = useState(true);
  const [ordertyp, setOrderTyp] = useState("multiple");
  const [discountPrices, setDiscountPrices] = useState(0);
  const [prices, setPrices] = useState([]);
  const [subTotal, setsubTotal] = useState(0);
  const [shippingprice, setShippingPrice] = useState(0);
  const [adminprices, setAdminPrices] = useState(0);
  const [amountaddingprices, setAmountAddingPrices] = useState(0);
  const [cartitem, setCartItems] = useState(0);
  const [savedLater, setSavedLater] = useState(false);
  const [cartids, setCartIds] = useState([]);

  const changeAddress = (e, change) => {
    e.preventDefault();
    setchangeAdds(change);
  };
  const cartCount = () => {
    CartServices.count().then((response) => {
      setCartItems(response);
    });
  };
  useEffect(() => {
    // Fetch user details when the component mounts
    const fetchUserDetails = async () => {
      try {
        const response = await UserServices.detail();
        console.log('user Data:', response); // Log the checkout data
        setUserDetails(response);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    
    // Fetch checkout data when the component mounts
    const fetchCheckoutData = async () => {
      try {
        const response = await CheckoutServices.self();
        console.log('Checkout Data:', response.data); // Log the checkout data
        setCheckoutData(response.data); // Set the checkout data in state
      } catch (error) {
        console.error('Error fetching checkout data:', error);
      }
    };

    fetchUserDetails();
    fetchCheckoutData();
  }, []); // Empty dependency array to run the effect only once when the component mounts
  const handleChngeAdd = (e) => {
    e.preventDefault();
    setSecondAddress(e.target.value);
  };
  const handleZip = (e) => {
    setZip(e.target.value);
  };
  const handleCallback = (childData) => {
    setOtherAddress(childData);
  };
  const [cart, setCart] = useState([]);
  
  const getCart = () => {
    setIsLoading(true); // Start loading
    CartServices.self().then((res) => {
      setCart(res);
      setIsLoading(false); // Stop loading when data is fetched
      var cartPrice = [];
      var shippingPrice = [];
      var allPrices = [];
      if (res.length > 0) {
        res.map((cat) => {
          cartPrice.push(cat.price);
          shippingPrice.push(cat.products.shipping_price);
        });
      }
      let discountPrice = 0;
      if (prices.length > 0) {
        prices.map((price) => {
          if (price.name !== "Discount") {
            allPrices.push(price.value);
          } else if (price.name === "Discount") {
            setDiscountPrices(price.value);
            discountPrice = price.value
          }
        });
      }
      let subttal = cartPrice.reduce((a, v) => (a = a + v), 0);
      let shippingprice = shippingPrice.reduce((a, v) => (a = a + v), 0);
      setsubTotal(subttal);
      setShippingPrice(shippingprice);
      let adminPric = allPrices.reduce((a, v) => (a = a + v), 0)
      setAdminPrices(adminPric);
      var amountAfterDiscount = subttal - discountPrice;
      var amountbyaddingprices = amountAfterDiscount + adminPric + shippingprice;
      // var amountbyaddingprices = subttal + shippingprice;
      setAmountAddingPrices(amountbyaddingprices);
    });
  };
  const handleCheckOut = (e) => {
    e.preventDefault();
    // let data = {
    //   dicount_code: localStorage.getItem("discountCode"),
    //   items_number: cartitem,
    //   sub_total: amountaddingprices,
    //   shipping_total: shippingprice,
    //   admin_prices: JSON.stringify(availableprices),
    //   order_total: amountaddingprices,
    // };
    // CheckoutServices.save(data).then((response) => {
    //   if (response.success) {
        window.location.href = "/checkout";
    //   }
    // });
  };
  let cart_ids = [];

  const getForSavedLater = () => {
    SaveLaterServices.getByUser().then((response) => {
      response.map((crt) => {
        cart_ids.push(crt.cart_id);
      });
      setCartIds(cart_ids);
    });
  };
  const handleSaveLater = (e, cartId) => {
    e.preventDefault();
    let data = {
      cart_id: cartId,
    };
    SaveLaterServices.add(data).then((response) => {
      toast.success(response.message);
      setSavedLater(true);
      getForSavedLater();
    });
  };
  const handlePrices = () => {
    var cartPrice = [];
    var shippingPrice = [];
    var allPrices = [];
    if (cart.length > 0) {
      cart.map((cat) => {
        cartPrice.push(cat.price);
        shippingPrice.push(cat.products.shipping_price);
      });
    }
    if (prices.length > 0) {
      prices.map((price) => {
        if (price.name !== "Discount") {
          allPrices.push(price.value);
        } else if (price.name === "Discount") {
          setDiscountPrices(price.value);
        }
      });
    }
    let subttal = cartPrice.reduce((a, v) => (a = a + v), 0);
    let shippingprice = shippingPrice.reduce((a, v) => (a = a + v), 0);
    setsubTotal(subttal);
    setShippingPrice(shippingprice);
    setAdminPrices(allPrices.reduce((a, v) => (a = a + v), 0));
    var amountAfterDiscount = subTotal - discountPrices;
    // var amountbyaddingprices = amountAfterDiscount + adminprices;
    var amountbyaddingprices = subttal + shippingprice;
    setAmountAddingPrices(amountbyaddingprices);
  };
  useEffect(() => {
    cartCount();
    getCart();
  }, []);
  
  return (
    <>
    <Header />
    {isLoading ? ( // Render loader if isLoading is true
        <div className='py-2 container'>Loading...</div>
      ) : (
      <>
    {userDetails && (
      
    <section id="cart-details">
        <div class="container">
            <h1>Checkout</h1>
            {/* {userDetails.address} */}
            <div class="row">
                
                <div class="col-lg-8">
                {/* <div class="order-details" id="order-detailsid">
                <h3>Shipping Details</h3>
                <div class="shipping-details">
                  <table style={{ width: "100%" }}>
                    <tr>
                      <th class="boldthtotallight">Full Name :</th>
                      <td class="boldthtotallight">{userDetails.name}</td>
                    </tr>
                    <tr>
                      <th class="boldthtotallight">Phone :</th>
                      <td>{userDetails.phone}</td>
                    </tr>
                    <tr>
                      <th class="boldthtotallight">Address :</th>
                      {changeAdds ? (
                        <>
                          <td>
                            <textarea
                              class="form-control"
                              onChange={handleChngeAdd}
                            ></textarea>
                            
                          </td>
                          <td>
                            <p
                              class="gradienttextcolor"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => changeAddress(e, false)}
                            >
                              Cancel
                            </p>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{userDetails?.address}</td>
                          <td>
                            <p
                              class="gradienttextcolor"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => changeAddress(e, true)}
                            >
                              Change Address
                            </p>
                          </td>
                        </>
                      )}
                    </tr>
                    {changeAdds ? (
                      <>
                        <tr>
                          <th class="boldthtotallight">Zip :</th>
                          <td>
                            <input
                              type="text"
                              name="zip"
                              class="form-control"
                              onChange={handleZip}
                              id="zip"
                            />
                            
                          </td>
                          <td>&nbsp;</td>
                        </tr>
                      </>
                    ) : (
                      ""
                    )}
                    
                  </table>
                </div>
              </div> */}
                <div class="order-details" id="order-detailsid">
                <h3>Pay with</h3>
                <h6>Credit or Debit card</h6>
                <span>
                  Your payements are secured, Your Details are confedentials
                </span>
                
                {userDetails?.address ? (<>
                  <p>Billing Address</p>
                <span class="tabstop">{userDetails?.address}</span>

                </>):(<></>)}
                <div class="tabs-check">
                 
                  <Elements stripe={stripePromise} options={options}>
                    <Stripe
                      changeAdds={changeAdds}
                      parentCallback={handleCallback}
                      zip={zip}
                      secondAddress={secondaddress}
                      changeaddress={changeAdds}
                      ordertype={ordertyp}
                      address={userDetails?.address}
                    />
                  </Elements>
                </div>
              </div>
                    <div class="order-details" id="order-detailsid">
                        <h3>Shipping Details</h3>
                        <div class="shipping-details">
                       
                        <table style={{width: "100%"}}>
                            <tr>
                              <th class="boldthtotallight">Full Name :</th>
                              <td class="boldthtotallight">{userDetails.name}</td>
                            </tr>
                            <tr>
                              <th class="boldthtotallight">Phone :</th>
                              <td>{userDetails.phone}</td>
                            </tr>
                            <tr>
                              <th class="boldthtotallight">Address :</th>
                              {changeAdds ? (
                        <>
                          <td>
                            <textarea
                              class="form-control"
                              onChange={handleChngeAdd}
                            ></textarea>
                            
                          </td>
                          <td>
                            <p
                              class="gradienttextcolor"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => changeAddress(e, false)}
                            >
                              Cancel
                            </p>
                          </td>
                        </>
                      ) : (
                        <>
                          <td style={{width:'60%'}}>{userDetails?.address}</td>
                          <td>
                            <p
                              class="gradienttextcolor"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => changeAddress(e, true)}
                            >
                              Change Address
                            </p>
                          </td>
                        </>
                      )}
                            </tr>
                            {changeAdds ? (
                      <>
                        <tr>
                          <th class="boldthtotallight">Zip :</th>
                          <td>
                            <input
                              type="text"
                              name="zip"
                              class="form-control"
                              onChange={handleZip}
                              id="zip"
                            />
                            
                          </td>
                          <td>&nbsp;</td>
                        </tr>
                      </>
                    ) : (
                      ""
                    )}
                          </table>
                          {/* <p class="gradienttextcolor">Change Address</p> */}
                        </div>
                    </div>
                    {checkoutData && checkoutData.map((order, orderIndex) => (
                      
  <div key={orderIndex} className='divider'>
    <h3 id="storetitle">{order.fullname}</h3>
    {order.products.map((product, productIndex) => (
      <div key={productIndex} className="order-details">
        <div className="row">
          <div className="col-lg-9">
            <div className="product-detail">
            <div className="product-image">
                <img src={product.media[0].name} alt="" style={{ width: '258px', height: '258px' }} />
            </div>

              <div className="product-order-details">
                <h5>{product.name}</h5>
                <span>Size: {product.size}, Color: {product.color}</span>
                <div className="quantitypadding">
                  <p><b><span>QTY: {product.quantity}</span></b></p>
                </div>
                <span className="unter">{product.postal_address}</span>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="prices-order-details">
              <h4>US $ {product.price}</h4>
              <span>+US $29.99</span>
            </div>
          </div>
        </div>
        <hr className="dashed" />
        <div className="buttonright">
          <button className="btn btn-info btn-lg transparent" type="button" >Save for later</button>
          <button className="btn btn-info btn-lg danger" type="button"
            onClick={(e) => handleSaveLater(e, product.id)}
          >Save for later</button>
        </div>
      </div>
    ))}
  </div>
))}

                </div>
                <div class="col-lg-4">
                {cart.length > 0 ? (
                <>
                  <div className="order-details" id="totalordervalue">
                    <h3>Order Total</h3>
                    <table style={{ width: "100%" }}>
                      <tr>
                        <th className="boldthtotal">
                          Subtotal ( {cartitem} items )
                        </th>
                        <td className="boldthtotal">$ {subTotal}</td>
                      </tr>
                      <tr>
                        <th>Shipping</th>
                        <td>$ {shippingprice}</td>
                      </tr>
                      {/* <tr>
                            <th>Income Tax</th>
                            <td>$ 4.0</td>
                          </tr> */}

                      {prices.length > 0 ? (
                        <>
                          {prices.map((price, index) => {
                            return (
                              <>
                                <tr>
                                  <th>{price.name}</th>
                                  <td>
                                    ${" "}
                                    {price.name == "Discount" ? (
                                      <>- {price.value}</>
                                    ) : (
                                      price.value
                                    )}
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      <tr>
                        <th className="totalthtextbold">Order Total</th>
                        <td className="totalthtextbold">
                          $ {amountaddingprices}
                        </td>
                      </tr>
                    </table>
                    <div class="imgtoop">
          <img src={Payment} alt="" />
          <button class="btn btn-info btn-lg gradientbtncolor" type="button">
            Confirm & Pay
          </button>
        </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="order-details" id="totalordervalue">
                    <h3>Order Total</h3>
                    <table style={{ width: "100%" }}>
                      <tr>
                        <th className="boldthtotal">Subtotal</th>
                        <td className="boldthtotal">$00.00</td>
                      </tr>
                      <tr>
                        <th className="totalthtextbold">Order Total</th>
                        <td className="totalthtextbold">$ 00.00</td>
                      </tr>
                    </table>
                    <div className="imgtoop">
                      <img src={Payment} alt="" />
                    </div>
                  </div>
                </>
              )}
            </div> 
         
        </div>
        
            </div>
           
    </section>
    )}
    </>
    )}
    <Footer />
    </>
  )
}

export default Checkout