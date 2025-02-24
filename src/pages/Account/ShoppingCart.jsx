import React, { useState, useEffect } from "react";
import Payment from "../../assets/Images/Shoppingcart/payment.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import CartServices from "../../services/API/CartServices"; //~/services/API/CartServices
import { toast } from "react-toastify";
import blank from "../../assets/Images/Productcard/blank.jpg";
import LoadingComponents from "../../components/Shared/LoadingComponents";
import NoDataFound from "../../components/Shared/NoDataFound";

const ShoppingCart = ({ getCartCount, cartFullResponses, getCartCountGuest, notificationCount }) => {
  const [cart, setCart] = useState([]);
  const [cartFullResponse, setCartFullResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [couponeCode, setCouponeCode] = useState('');
  const token = localStorage.getItem('access_token');
  const { pathname } = window.location;

  const navigate = useNavigate()

  const getCart = () => {
    CartServices.self()
      .then((res) => {
        setCouponeCode(res?.coupon)
        setCart(res?.data);
        setCartFullResponse(res)
        setIsLoading(false);
      }).catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false);
      })
  };

  const getCartGuest = () => {
    const guest_user_id = localStorage.getItem('guest_user_id');
    CartServices.selfGuest(guest_user_id)
      .then((res) => {
        setCouponeCode(res?.coupon)
        setCart(res?.data);
        setCartFullResponse(res)
        setIsLoading(false);
      }).catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false);
      })
  };

  const handleCheckOut = () => {
    navigate("/checkout")
  };

  const handleRemoveSection = (id) => {
    let req = { cart_id: id }
    if (token === null) {
      CartServices.removeGuest(req)
        .then((response) => {
          toast.success(response.message);
          getCartGuest()
          getCartCountGuest()
        }).catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    } else {
      CartServices.remove(req)
        .then((response) => {
          toast.success(response.message);
          getCart()
          getCartCount()
        }).catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    }
  };

  const clearAllCart = () => {
    const guest_user_id = localStorage.getItem('guest_user_id');
    if (token === null) {
      CartServices.clearAllCartGuest(guest_user_id)
        .then((response) => {
          toast.success(response.message);
          getCartGuest()
          getCartCountGuest()
        }).catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    } else {
      CartServices.clearAllCart()
        .then((response) => {
          toast.success(response.message);
          getCart()
          getCartCount()
        }).catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    }
  };

  const updateCartQuantity = (quantity, id, data) => {
    if (token === null) {
      if (quantity > 0 && quantity <= data?.products?.stockcapacity) {
        CartServices.updateCartGuest({ quantity: quantity }, id)
          .then((res) => {
            getCartGuest()
            getCartCountGuest()
          }).catch((error) => {
            toast.error(error?.response?.data?.message)
          })
      }
    } else {
      if (quantity > 0 && quantity <= data?.products?.stockcapacity) {
        CartServices.updateCart({ quantity: quantity }, id)
          .then((res) => {
            getCart()
            getCartCount()
          }).catch((error) => {
            toast.error(error?.response?.data?.message)
          })
      }
    }
  }

  useEffect(() => {
    if (token === null) {
      getCartGuest()
    } else {
      getCart();
    }
  }, [])

  return (
    <>
      <Header cartFullResponse={cartFullResponses} notificationCount={notificationCount} />
      <section id="cart-details">
        <div className="container">
          <h2 className="page-title">Cart</h2>
          {isLoading ? (
            <div className="loader-wrap">
              <LoadingComponents />
            </div>
          ) : (
            cart?.length > 0 ?
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
                                        <li key={index}>{attribute.key}: <span>{attribute.value}</span>{data?.attributes?.length - 1 !== index ? ',' : ''}</li>
                                      )
                                    })}
                                  </ul>
                                </span>
                                </div>
                                {data?.is_auctioned === 1 ?
                                  <div className="price">Bid Price: <span>${data?.price}</span></div>
                                  :
                                  <div className="price">Price: <span>${data.products?.sale_price > 0 ? data.products?.sale_price : data.products?.price}</span></div>
                                }
                                <div className="price">Quantity available: <span>{data.products?.stockcapacity}</span></div>
                                {data?.is_auctioned === 1 ? null :
                                  <div className="p-i-2-w">
                                    <div className="p-i-2-w-r">
                                      <div className="price">
                                        <div className="input-group">
                                          <div className="input-group-prepend">
                                            <button className="btn" type="button" onClick={() => { updateCartQuantity(data.quantity - 1, data.id, data) }}>
                                              -
                                            </button>
                                          </div>
                                          <input
                                            type="text"
                                            className="form-control"
                                            value={data.quantity}
                                            readOnly
                                          />
                                          <div className="input-group-prepend">
                                            <button className="btn" type="button" onClick={() => { updateCartQuantity(data.quantity + 1, data.id, data) }}>
                                              +
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                        {data?.is_auctioned === 1 ? null :
                          <>
                            <hr className="dashed" />
                            <div className="buttonright">
                              <button
                                className="btn btn-info btn-lg danger"
                                type="button"
                                onClick={(e) => handleRemoveSection(data?.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </>
                        }
                      </div>
                    );
                  })}
                  <div className="clear-cart"><button onClick={() => { clearAllCart() }}>clear Cart</button></div>
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
                        <th className="totalthtextbold">Order Total</th>
                        <td className="totalthtextbold">$ {cartFullResponse?.total ? cartFullResponse?.total : 0}</td>
                      </tr>
                    </table>
                    <div className="imgtoop">
                      <img src={Payment} alt="" />
                      {token === null ?
                        <button className="btn btn-info btn-lg gradientbtncolor" type="button" onClick={() => {
                          navigate(`/signup`);
                          localStorage.setItem('redirectionPage', pathname)
                        }}>
                          Proceed to Checkout
                        </button>
                        :
                        <button className="btn btn-info btn-lg gradientbtncolor" type="button" onClick={handleCheckOut}>
                          Proceed to Checkout
                        </button>
                      }
                    </div>
                  </div>
                </div>
              </div>
              :
              <NoDataFound title={'No Data Found'} />
          )}
        </div>
      </section >
      <Footer />
    </>
  );
};

export default ShoppingCart;
