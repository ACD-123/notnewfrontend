import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Stripe from "./Stripe";
import Productimage from "../../assets/Images/Categorylisting/1.png";
import ShippingServices from "../../services/API/ShippingServices";
import UserServices from "../../services/API/UserServices";
import CartServices from "../../services/API/CartServices";
import PriceServices from "../../services/API/PriceServices";
import CheckoutServices from "../../services/API/CheckoutServices";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
} from "@stripe/react-stripe-js";
import { setUserId } from "../../services/Auth";

const Checkout_old = () => {
  const [user, setUser] = useState({});
  const [userdetails, setUserDetails] = useState({});
  const [discountcode, setdiscountCode] = useState("");
  const [cart, setCart] = useState({});
  const [bidcart, setBidCart] = useState({});
  const [bidquantity, setQuantity] = useState(0);
  const [bidcartimage, setBidCartImage] = useState([]);
  const [checkout, setCheckout] = useState({});
  const [prices, setPrices] = useState({});
  const [subTotal, setsubTotal] = useState(0);
  const [shippingprice, setShippingPrice] = useState(0);
  const [amountaddingprices, setAmountAddingPrices] = useState(0);
  const [discountPrices, setDiscountPrices] = useState(0);
  const [adminprices, setAdminPrices] = useState(0);
  const [changeAdds, setchangeAdds] = useState(false);
  const [secondaddress, setSecondAddress] = useState("");
  const [ordertyp, setOrderTyp] = useState("multiple");
  const [showModal, setShowModal] = useState(false);
  const [zip, setZip] = useState("");
  const [ordertype, setOrderType] = useState("");
  const [otheraddess, setOtherAddress] = useState(true);
  const { pathname } = window.location;
  const lastSegment = pathname.split("/").pop();

  const stripePromise = loadStripe(`${STRIPE_PUBLISHABLE_KEY}`);
  const options = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
    appearance: {
    },
  };
  const getSelf = () => {
    ShippingServices.self().then((response) => {
      setUserDetails(response);
      setUserId(response?.id)
    });
  };
  const getUser = () => {
    UserServices.self().then((response) => {
      setUser(response);
    });
  };
  const getCart = () => {
    var bidProduct = localStorage.getItem('bid_product');
    if(bidProduct){
      setBidCartImage(JSON.parse(bidProduct).media)
      setBidCart(JSON.parse(bidProduct));
      setQuantity(1);
      let prices = JSON.parse(bidProduct).bids + JSON.parse(bidProduct).shipping_price
      setAmountAddingPrices(prices)
      setShippingPrice(JSON.parse(bidProduct).shipping_price)
      setsubTotal(JSON.parse(bidProduct).bids);
      setOrderType("bids")
      }else{
        CartServices.self().then((response) => {
          setCart(response);
          setOrderType("normal")
          var cartPrice = [];
          var shippingPrice = [];
          var allPrices = [];
          if (response.length > 0) {
            response.map((cat) => {
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
          setAmountAddingPrices(amountbyaddingprices);
      });
    }
  };
  const getCheckout = () => {
    CheckoutServices.self().then((response) => {
      setCheckout(response);
    });
  };
  const getPrices = () => {
    PriceServices.all().then((response) => {
      setPrices(response);
    });
  };
  const handleCallback = (childData) => {
    setOtherAddress(childData);
  };

  const changeAddress = (e, change) => {
    e.preventDefault();
    setchangeAdds(change);
  };
  const handleChngeAdd = (e) => {
    e.preventDefault();
    setSecondAddress(e.target.value);
  };
  const handleZip = (e) => {
    setZip(e.target.value);
  };

  useEffect(() => {
    setdiscountCode(localStorage.getItem("discountCode"));
    getSelf();
    getUser();
    getCart();
    getPrices();
    getCheckout();
    if (lastSegment != "") {
      setOrderTyp('single');
    } else {
      setOrderTyp('multiple');
    }
  }, []);
  return (
    <>
      <Header />
      <section id="cart-details">
        <div className="container">
          <h1>Checkout</h1>
          <div className="row">
            <div className="col-lg-8">
              {lastSegment ? (
                <>
                  <div className="order-details">
                    {(Object.keys(bidcart).length !== 0)  ? (
                      <>
                        <div className="row">
                                <div className="col-lg-9">
                                  <div className="product-detail">
                                    {bidcartimage.length > 0 ? (
                                      <>
                                        <div className="product-image">
                                          <img src={`${bidcart.media[0].name}`}
                                          width="150" height="150" alt={bidcart.media[0].name} />
                                        </div>
                                      </>
                                    ):(
                                      <></>
                                    )}
                                    <div className="product-order-details">
                                      <h5>{bidcart?.name}</h5>
                                      <div className="quantitypadding">
                                        <p>
                                          <b>
                                            <span>QTY: {bidquantity}</span>
                                          </b>
                                        </p>
                                      </div>
                                      {bidcart.location ? (
                                        <>
                                          <span className="unter">
                                            <br /> Shipping from
                                            <br />
                                            {bidcart.location}
                                          </span>
                                        </>
                                      ):(
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="prices-order-details">
                                    <h4>US $ {bidcart.bids}</h4>
                                    <span>
                                      +US $
                                      {bidcart.bids +
                                        bidcart.shipping_price}
                                    </span>
                                  </div>
                                </div>
                              </div>
                      </>
                    ):(<>
                    {cart?.length > 0 ? (
                      <>
                        {cart.map((cat, index) => {
                          let attributes = JSON.parse(cat.attributes);
                          return (
                            <>
                            {cat.shop ? (<>
                              <h3 id="storetitle" key={index}>
                                Seller: {cat.shop?.fullname}
                              </h3>
                            </>):(
                              <></>
                            )}
                              <div className="row">
                                <div className="col-lg-9">
                                  <div className="product-detail">
                                    {cat?.products?.media?.length > 0 ? (
                                      <>
                                        <div className="product-image">
                                          <img src={cat.products.media[0].name}
                                          width="150" height="150" alt={cat.products.media[0].name} />
                                        </div>
                                      </>
                                    ):(
                                      <></>
                                    )}
                                    <div className="product-order-details">
                                      <h5>{cat.products?.name}</h5>
                                      {attributes?.length > 0 ? (
                                        <>
                                          {attributes.map(
                                            (attribute, index) => {
                                              return (
                                                <>
                                                  {attribute.color}
                                                  <span key={index}>
                                                    {attribute.size ? (
                                                      <>
                                                        Size : {attribute.size}
                                                      </>
                                                    ) : (
                                                      ""
                                                    )}{" "}
                                                    {attribute.color ? (
                                                      <>
                                                        Color:{" "}
                                                        <div
                                                          style={{
                                                            background:
                                                              attribute.color,
                                                          }}
                                                        >
                                                          &nbsp;
                                                        </div>
                                                      </>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </span>
                                                </>
                                              );
                                            }
                                          )}
                                        </>
                                      ) : (
                                        ""
                                      )}
                                      <div className="quantitypadding">
                                        <p>
                                          <b>
                                            <span>QTY: {cat.quantity}</span>
                                          </b>
                                        </p>
                                      </div>
                                      <span className="unter">
                                        International
                                        <br /> Shipping from
                                        <br />
                                        {cat.products?.location}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="prices-order-details">
                                    <h4>US $ {cat.products?.price}</h4>
                                    <span>
                                      +US $
                                      {cat.products?.price +
                                        cat.products?.shipping_price}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <center><b>Loading...</b></center>
                    )}
                    </>)}
                  </div>
                </>
              ) : (
                <>
                  <div className="order-details">
                    {cart?.length > 0 ? (
                      <>
                        {cart.map((cat, index) => {
                          let attributes = JSON.parse(cat.attributes);
                          return (
                            <>
                              <h3 id="storetitle" key={index}>
                                Seller: {cat.shop?.fullname}
                              </h3>
                              <div className="row">
                                <div className="col-lg-9">
                                  <div className="product-detail">
                                    <div className="product-image">
                                      <img src={Productimage} />
                                    </div>
                                    <div className="product-order-details">
                                      <h5>{cat.products?.name}</h5>
                                      {attributes?.length > 0 ? (
                                        <>
                                          {attributes.map(
                                            (attribute, index) => {
                                              return (
                                                <>
                                                  {attribute.color}
                                                  <span key={index}>
                                                    {attribute.size ? (
                                                      <>
                                                        Size : {attribute.size}
                                                      </>
                                                    ) : (
                                                      ""
                                                    )}{" "}
                                                    {attribute.color ? (
                                                      <>
                                                        Color:{" "}
                                                        <div
                                                          style={{
                                                            background:
                                                              attribute.color,
                                                          }}
                                                        >
                                                          &nbsp;
                                                        </div>
                                                      </>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </span>
                                                </>
                                              );
                                            }
                                          )}
                                        </>
                                      ) : (
                                        ""
                                      )}
                                      <div className="quantitypadding">
                                        <p>
                                          <b>
                                            <span>QTY: {cat.quantity}</span>
                                          </b>
                                        </p>
                                      </div>
                                      <span className="unter">
                                        International
                                        <br /> Shipping from
                                        <br />
                                        {cat.products?.location}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3">
                                  <div className="prices-order-details">
                                    <h4>US $ {cat.products?.price}</h4>
                                    <span>
                                      +US $
                                      {cat.products?.price +
                                        cat.products?.shipping_price}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              )}
              <br />
              <div className="order-details" id="order-detailsid">
                <h3>Shipping Details</h3>
                <div className="shipping-details">
                  <table style={{ width: "100%" }}>
                    <tr>
                      <th className="boldthtotallight">Full Name :</th>
                      <td className="boldthtotallight">{user.name}</td>
                    </tr>
                    <tr>
                      <th className="boldthtotallight">Phone :</th>
                      <td>{user.phone}</td>
                    </tr>
                    <tr>
                      <th className="boldthtotallight">Address :</th>
                      {changeAdds ? (
                        <>
                          <td>
                            <textarea
                              className="form-control"
                              onChange={handleChngeAdd}
                            ></textarea>
                            {otheraddess ? (
                              <>
                                <p className="error">Please Enter Address</p>
                              </>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>
                            <p
                              className="gradienttextcolor"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => changeAddress(e, false)}
                            >
                              Cancel
                            </p>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{userdetails?.street_address}</td>
                          <td>
                            <p
                              className="gradienttextcolor"
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
                          <th className="boldthtotallight">Zip :</th>
                          <td>
                            <input
                              type="text"
                              name="zip"
                              className="form-control"
                              onChange={handleZip}
                              id="zip"
                            />
                            {otheraddess ? (
                              <>
                                <p className="error">Please Enter Zip</p>
                              </>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>&nbsp;</td>
                        </tr>
                      </>
                    ) : (
                      ""
                    )}
                    {discountcode ? (
                      <>
                        <tr>
                          <th>Discount Code</th>
                          <td>{discountcode}</td>
                        </tr>
                      </>
                    ) : (
                      ""
                    )}
                  </table>
                </div>
              </div>
              <br />
              <div className="order-details" id="order-detailsid">
                <h3>Pay with</h3>
                <h6>Credit or Debit card</h6>
                <span>
                  Your payements are secured, Your Details are confedentials
                </span>
                {userdetails?.street_address ? (<>
                  <p>Billing Address</p>
                <span className="tabstop">{userdetails?.street_address}</span>

                </>):(<></>)}
                <div className="tabs-check">
                  <Elements stripe={stripePromise} options={options}>
                    <Stripe
                      changeAdds={changeAdds}
                      parentCallback={handleCallback}
                      zip={zip}
                      subtotal={subTotal}
                      secondAddress={secondaddress}
                      cart={cart}
                      bidcart={bidcart}
                      orderType={ordertype}
                      adminprices={adminprices}
                      shippingprice={shippingprice}
                      total={amountaddingprices}
                      changeaddress={changeAdds}
                      ordertype={ordertyp}
                      address={userdetails?.street_address}
                    />
                  </Elements>
                </div>
              </div>
              <br />
            </div>
            <div className="col-lg-4">
              {(Object.keys(bidcart).length !== 0) ? (
                <>
                  <div className="order-details" id="totalordervalue">
                    <h3>Order Total</h3>
                    <table style={{ width: "100%" }}>
                      <tr>
                        <th className="boldthtotal">
                          Subtotal ( 1 items )
                        </th>
                        <td className="boldthtotal">$ {bidcart?.bids}</td>
                      </tr>
                      <tr>
                        <th>Shipping</th>
                        <td>$ {bidcart?.shipping_price}</td>
                      </tr>
                      {prices?.length > 0 ? (
                        <>
                          {prices.map((price, index) => {
                            return (
                              <>
                                <tr key={index}>
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
                  </div>
                </>
              ):(
                <>
                  {cart?.length > 0 ? (
                <>
                  <div className="order-details" id="totalordervalue">
                    <h3>Order Total</h3>
                    <table style={{ width: "100%" }}>
                      <tr>
                        <th className="boldthtotal">
                          Subtotal ( {cart?.length} items )
                        </th>
                        <td className="boldthtotal">$ {subTotal}</td>
                      </tr>
                      <tr>
                        <th>Shipping</th>
                        <td>$ {shippingprice}</td>
                      </tr>
                      {prices?.length > 0 ? (
                        <>
                          {prices.map((price, index) => {
                            return (
                              <>
                                <tr key={index}>
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
                  </div>
                </>
              ) : (
                <>
                  <div className="order-details" id="totalordervalue">
                    <h3>Order Total</h3>
                    <table style={{ width: "100%" }}>
                      <tr>
                        <th className="boldthtotal">&nbsp;</th>
                        <td className="boldthtotal"><center><b>Loading...</b></center></td>
                      </tr>
                    </table>
                  </div>
                </>
              )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Checkout_old;
