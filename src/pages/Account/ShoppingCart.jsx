import React, { useState, useEffect } from "react";
import Payment from "../../assets/Images/Shoppingcart/payment.png";
import Productimage from "../../assets/Images/Productcard/1.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Category from "../../components/Products/Archive/Category";
import Arrowright from "../../assets/Images/Shoppingcart/arrowright.png";
import { Link } from "react-router-dom";
import CartServices from "../../services/API/CartServices"; //~/services/API/CartServices
import SaveLaterServices from "../../services/API/SaveLaterServices"; //~/services/API/SaveLaterServices
import UserServices from "../../services/API/UserServices"; //~/services/API/UserServices
import PriceServices from "../../services/API/PriceServices"; //~/services/API/PriceServices
import CheckoutServices from "../../services/API/CheckoutServices"; //~/services/API/CheckoutServices
import { toast } from "react-toastify";
import {
  setUserDetails,
  isLoggedin,
  getUserDetails,
} from "../../services/Auth"; // ~/services/Auth
import {useDispatch, useSelector} from 'react-redux'
import {saveCupon, deleteCupon} from '../../store/slices/cupon'
import blank from "../../assets/Images/Productcard/blank.jpg";
import { BASE_URL } from "../../services/Constant";

const ShoppingCart = () => {
  const dispatch = useDispatch()
  const [showDiscountField, setShowDiscountField] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [cart, setCart] = useState({});
  const [cartitem, setCartItems] = useState(0);
  const [prices, setPrices] = useState({});
  const [availableprices, setAvailablePrices] = useState({});
  const [savedLater, setSavedLater] = useState(false);
  const [saved, setSaved] = useState(false);
  const [subTotal, setsubTotal] = useState(0);
  const [shippingprice, setShippingPrice] = useState(0);
  const [discountPrices, setDiscountPrices] = useState(0);
  const [adminprices, setAdminPrices] = useState(0);
  const [amountaddingprices, setAmountAddingPrices] = useState(0);
  const [coverpicture, setCoverPicture] = useState("");
  const [cartids, setCartIds] = useState([]);

  let cart_ids = [];
  const toggleDiscountField = () => {
    setShowDiscountField(!showDiscountField);
  };

  const getCart = () => {
    CartServices.self().then((response) => {
      if(response.products){
        setCoverPicture(response.products?.media[0].name)
        setCart(response);
      }
    });
  };
  const handleCheckOut = (e) => {
    e.preventDefault();
    let data = {
      dicount_code: localStorage.getItem("discountCode"),
      items_number: cartitem,
      sub_total: amountaddingprices,
      shipping_total: shippingprice,
      admin_prices: JSON.stringify(availableprices),
      order_total: amountaddingprices,
    };
    CheckoutServices.save(data).then((response) => {
      if (response.success) {
        window.location.href = "/checkout";
      }
    });
  };
  const handleDiscountSubmit = () => {
    // Logic to handle applying the discount code
    localStorage.setItem("discountCode", discountCode);
    // console.log("Discount code applied:", discountCode);
    // You can implement further logic like API calls or validation here
  };

  const handleRemoveSection = (e, id) => {
    e.preventDefault();
    CartServices.remove(id).then((response) => {
      if (response.success) {
        toast.success(response.message);
        CartServices.count()
        .then((response) => {
          dispatch(saveCupon(response));
        })
        getCart();

      } else {
        toast.error(response.message);
      }
    });

    // const sectionToRemove = document.getElementById("sectionToRemove");
    // if (sectionToRemove) {
    //   sectionToRemove.remove();
    // }
    // You might want to add further logic, such as updating the cart state, etc.
  };
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
  const cartCount = () => {
    CartServices.count().then((response) => {
      setCartItems(response);
    });
  };
  const getShopData = () => {
    // console.log(cart)
  };
  const getPrices = () => {
    PriceServices.all().then((response) => {
      var availablePrices = [];
      response.map((price) => {
        availablePrices[price.name] = price.value;
      });
      setPrices(response);
      setAvailablePrices(availablePrices);
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
    setsubTotal(cartPrice.reduce((a, v) => (a = a + v), 0));
    setShippingPrice(shippingPrice.reduce((a, v) => (a = a + v), 0));
    setAdminPrices(allPrices.reduce((a, v) => (a = a + v), 0));
    var amountAfterDiscount = subTotal - discountPrices;
    var amountbyaddingprices = amountAfterDiscount + adminprices;
    setAmountAddingPrices(amountbyaddingprices);
  };
  useEffect(() => {
    getCart();
    getShopData();
    cartCount();
    getPrices();
    handlePrices();
    getForSavedLater();
  }, []);
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}
      <section id="cart-details" style={{ padding: "20px 0px" }}>
        <div className="container">
          <h2>Shopping Cart</h2>
          <div className="row">
            <div className="col-lg-8">
              {cart.length > 0 ? (
                <>
                  {cart.map((cat, index) => {
                    let attributes = JSON.parse(cat.attributes);
                    const isSaved = cartids.includes(cat.id);
                    return (
                      <>
                        <div className="order-details" id="sectionToRemove">
                          <h3 id="storetitle">Seller: {cat.shop?.fullname}</h3>
                          <div className="row">
                            <div className="col-lg-9">
                              <div className="product-detail">
                                <div className="product-image">
                                  {coverpicture ? (
                                    <>
                                                                    <img
                                  src={`${BASE_URL}/image/product/${coverpicture}`}
                                  alt={cat.name}
                                />

                                    </>
                                  ):(
                                    <>
                                      <img
                                        src={blank}
                                        alt="blank"
                                        width="150"
                                        height="170"
                                      />
                                    </>
                                  )}
                                  {/* <img src={Productimage} /> */}
                                </div>
                                <div className="product-order-details">
                                  <h5>{cat.products?.name}</h5>
                                  {/* <span>Size : 9.5 , Color: Red</span> */}
                                  {attributes.length > 0 ? (
                                    <>
                                      {attributes.map((attribute, index) => {
                                        return (
                                          <>
                                            {attribute.color}
                                            <span>
                                              {attribute.size ? (
                                                <>Size : {attribute.size}</>
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
                                      })}
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
                                    International(have to work)
                                    <br /> Shipping from
                                    <br /> {cat.products?.location}
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
                          <hr className="dashed" />
                          <div className="buttonright">
                            {isSaved ? (
                              <button
                                className="btn btn-info btn-lg transparent"
                                type="button"
                              >
                                Saved for later
                              </button>
                            ) : (
                              <button
                                className="btn btn-info btn-lg transparent"
                                type="button"
                                onClick={(e) => handleSaveLater(e, cat.id)}
                              >
                                Save for later
                              </button>
                            )}
                            <button
                              className="btn btn-info btn-lg danger"
                              type="button"
                              onClick={(e) => handleRemoveSection(e, cat.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  <div className="order-details" id="sectionToRemove">
                    <h3 id="storetitle">Cart Items: </h3>
                    <div className="row">
                      <div className="col-lg-9">
                        <div className="product-detail">
                          <div className="product-order-details">
                            <span className="unter">
                              Your Cart is Empty!
                              <br />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="prices-order-details">&nbsp;</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {cart.length > 0 ? (
                <>
                  <div className="order-details" id="border-order-details">
                    <h5 onClick={toggleDiscountField}>
                      Applied Discount{" "}
                      <div id="iconrightaligin">
                        {" "}
                        <img src={Arrowright} />
                      </div>
                    </h5>
                    {showDiscountField && (
                      <div className="discountfields">
                        <input
                          type="text"
                          placeholder="Enter discount code"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                        />
                        <button onClick={handleDiscountSubmit}>Apply</button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            <div className="col-lg-4">
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
                    <div className="imgtoop">
                      <img src={Payment} alt="" />
                      <button
                        className="btn btn-info btn-lg gradientbtncolor"
                        type="button"
                        onClick={handleCheckOut}
                      >
                        Proceed to Checkout
                      </button>
                      {/* <Link to="/checkout">

                      </Link> */}
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

      {/* Category Include */}
      <Category />
      {/* Category Include */}

      {/* Footer */}
      <Footer />
      {/* Footer */}
    </>
  );
};

export default ShoppingCart;
