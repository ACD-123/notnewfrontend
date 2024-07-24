import React, { useState, useEffect } from "react";
import Payment from "../../assets/Images/Shoppingcart/payment.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Category from "../../components/Products/Archive/Category";
import Arrowright from "../../assets/Images/Shoppingcart/arrowright.png";
import { useNavigate } from "react-router-dom";
import CartServices from "../../services/API/CartServices"; //~/services/API/CartServices
import SaveLaterServices from "../../services/API/SaveLaterServices"; //~/services/API/SaveLaterServices
import PriceServices from "../../services/API/PriceServices"; //~/services/API/PriceServices
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'
import blank from "../../assets/Images/Productcard/blank.jpg";
import { Spinner } from "react-bootstrap";
import ProductServices from "../../services/API/ProductServices";
import LoadingComponents from "../../components/Shared/LoadingComponents";
import NoDataFound from "../../components/Shared/NoDataFound";

const ShoppingCart = ({ getCartCount, cartFullResponses }) => {
  const [showDiscountField, setShowDiscountField] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartFullResponse, setCartFullResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputError, setInputError] = useState(false);
  const [couponeCode, setCouponeCode] = useState('');
  const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
  const navigate = useNavigate()
  let cart_ids = [];

  const toggleDiscountField = () => {
    setShowDiscountField(!showDiscountField);
  };

  const getCart = () => {
    CartServices.self()
      .then((res) => {
        console.log(res?.data[0]?.products?.media.length, 'resres');
        setCart(res?.data);
        setCartFullResponse(res)
        setIsLoading(false);
      }).catch((error) => {
        setIsLoading(false);
      })
  };

  const handleCheckOut = () => {
    navigate("/checkout")
  };

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
        getCart()
        getCartCount()
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const handleRemoveSection = (id) => {
    let req = {
      cart_id: id
    }
    CartServices.remove(req)
      .then((response) => {
        toast.success(response.message);
        getCart()
        getCartCount()
      }).catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const clearAllCart = () => {
    CartServices.clearAllCart()
      .then((response) => {
        toast.success(response.message);
        getCart()
        getCartCount()
      }).catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const addToFavorites = async (productId) => {
    try {
      const data = {
        favourite_against_id: productId,
        user_id: loggedInUser?.id,
        type: "1",
      };
      const res = await ProductServices.isFavorite(data);
      getCart()
      getCartCount()
    } catch (error) {
      toast.error("Failed to add product to favorites.");
    }
  };

  const updateCartQuantity = (quantity, id, data) => {
    if (quantity > 0 && quantity <= data?.products?.stockcapacity) {
      CartServices.updateCart({ quantity: quantity }, id)
        .then((res) => {
          getCart()
          getCartCount()
        }).catch((error) => {

        })
    }
  }

  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      <Header cartFullResponse={cartFullResponses} />
      <section id="cart-details">
        <div className="container">
          <h2 className="page-title">Cart</h2>
          {isLoading ? (
            <div className="loader-wrap">
              <LoadingComponents />
            </div>
          ) : (
            cart.length > 0 ?
              <div className="row">
                <div className="col-lg-8">
                  {cart.map((data, index) => {
                    return (
                      <div className="order-details" id="sectionToRemove" key={index}>
                        <div><h3 id="storetitle">Seller Shop : {data.shop?.fullname}</h3></div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="product-detail">
                              <div className="product-image">
                                <>
                                  {data?.products?.media?.length > 0 ? (
                                    <img src={data.products.media[0].name} />
                                  ) : (
                                    <img src={blank} alt="blank" />
                                  )}
                                </>
                              </div>
                              <div className="product-order-details">
                                <div className="name">Name: <span>{data.products.name}</span></div>
                                <div className="attribute">Attributes: <span>
                                  <ul>
                                    {data?.attributes.map((attribute, index) => {
                                      return (
                                        <li key={index}>{attribute.key}: <span>{attribute.value}</span>{data?.attributes.length - 1 !== index ? ',' : ''}</li>
                                      )
                                    })}
                                  </ul>
                                </span>
                                </div>
                                <div className="price">Price: <span>${data.products?.price}</span></div>
                                <div className="price">Quantity available: <span>{data.products?.stockcapacity}</span></div>
                                <div className="p-i-2-w">
                                  <div className="p-i-2-w-r">
                                    <div className="price">
                                      <div class="input-group">
                                        <div class="input-group-prepend">
                                          <button class="btn" type="button" onClick={() => { updateCartQuantity(data.quantity - 1, data.id, data) }}>
                                            -
                                          </button>
                                        </div>
                                        <input
                                          type="text"
                                          class="form-control"
                                          value={data.quantity}
                                          readOnly
                                        // onChange={handleQuantity}
                                        />
                                        <div class="input-group-prepend">
                                          <button class="btn" type="button" onClick={() => { updateCartQuantity(data.quantity + 1, data.id, data) }}>
                                            +
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="dashed" />
                        <div className="buttonright">
                          {data?.products?.is_favourite ? (
                            <button
                              className="btn btn-info btn-lg transparent"
                              type="button"
                              onClick={(e) => addToFavorites(data?.products?.guid)}
                            >
                              Saved
                            </button>
                          ) : (
                            <button
                              className="btn btn-info btn-lg transparent"
                              type="button"
                              onClick={(e) => addToFavorites(data?.products?.guid)}
                            >
                              Save for later
                            </button>
                          )}
                          <button
                            className="btn btn-info btn-lg danger"
                            type="button"
                            onClick={(e) => handleRemoveSection(data?.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <div><button onClick={() => { clearAllCart() }}>clear Cart</button></div>
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
                          value={couponeCode}
                          onChange={(e) => setCouponeCode(e.target.value)}
                        />
                        <button onClick={handleDiscountSubmit}>Apply</button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="order-details" id="totalordervalue">
                    <h3>Order Total</h3>
                    <table style={{ width: "100%" }}>
                      <tr>
                        <th className="boldthtotal">Subtotal ( {cartFullResponse?.product_count ? cartFullResponse?.product_count : 0} items )</th>
                        <td className="boldthtotal">$ {cartFullResponse?.sub_total ? cartFullResponse?.sub_total : 0}</td>
                      </tr>
                      <tr>
                        <th className="boldthtotal">Shipping</th>
                        <td className="boldthtotal">$ {cartFullResponse?.shipping ? cartFullResponse?.shipping : 0}</td>
                      </tr>
                      <tr>
                        <th className="totalthtextbold">Order Total</th>
                        <td className="totalthtextbold">$ {cartFullResponse?.total ? cartFullResponse?.total : 0}</td>
                      </tr>
                    </table>
                    <div className="imgtoop">
                      <img src={Payment} alt="" />
                      <button className="btn btn-info btn-lg gradientbtncolor" type="button" onClick={handleCheckOut}>
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              :
              <NoDataFound title={'Cart is empty'} />
          )}
        </div>
      </section >
      <Footer />
    </>
  );
};

export default ShoppingCart;
