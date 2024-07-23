import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Logo from "../assets/Images/logo.png";
import SearchwithCategories from "./Elements/SearchwithCategories";
import Avatar from "../assets/Images/Elements/avatar.png";
import Cart from "../assets/Images/Elements/cart.png";
import NavBar from "./Elements/NavBar";
import { Link } from "react-router-dom";
import UserServices from "../services/API/UserServices"; //~/services/API/AuthService
import { toast } from "react-toastify";
import { setUserDetails, isLoggedin, getUserDetails } from "../services/Auth"; // ~/services/Auth
import AuthServices from "../services/API/AuthService"; //~/services/API/AuthService
import CartServices from "../services/API/CartServices"; //~/services/API/CartServices
import { useNavigate } from "react-router-dom";

const Header_ = () => {
  const items = useSelector(state => state.cupon.cupon);
  const cart_items = items ? items : 0;
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({});
  const [cartitems, setCartItems] = useState(0);
  const navigate = useNavigate()
  let token = localStorage.getItem("access_token");
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleDropdownItemClick = (componentName) => {
    navigate(`/customerdashboard?component=${componentName}`)
  };
  const getUser = () => {
    UserServices.detail()
      .then((response) => {
        setUserDetails(response);
        setUser(response);
        localStorage.setItem('user_details', JSON.parse(response));
      })
      .catch((e) => {
        console.log('error', e)
      });
  };
  const getItems =() =>{
    CartServices.count()
    .then((response) => {
      setCartItems(response);
    })
    .catch((e) => {
      toast.error(e.message);
    });
  }
  const signOut = (e) => {
    e.preventDefault();
    const user_details = getUserDetails();
    localStorage.clear();
    navigate('/')
  };
  useEffect(() => {
    if (isLoggedin()) {
      getUser();
      getItems();
    }
  }, []);
  return (
    <>
      <header id="desktop-header">
        <div className="header-top">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-4">
                <div className="logo">
                  <Link to="/">
                    <img src={Logo} width="20%" height="100%" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <SearchwithCategories />
              </div>
              <div className="col-lg-2">
                {isLoggedin() ? (
                  <div className="cart-user">
                    <div className="cart">
                      {cart_items}
                      <Link to="/cart">
                        <img src={Cart} />
                      </Link>
                    </div>
                    <div className="user">
                      <div
                        className="avatar-container"
                        onClick={toggleDropdown}
                      >
                        <img src={Avatar} alt="User Avatar" />
                      </div>
                      {showDropdown && (
                        <div className="dropdown-content">
                          <ul>
                            <li
                              onClick={() =>
                                handleDropdownItemClick("my-orders")
                              }
                            >
                              My Orders
                            </li>
                            <li
                              onClick={() =>
                                handleDropdownItemClick("my-favourites")
                              }
                            >
                              My Favourites
                            </li>
                            <li
                              onClick={() =>
                                handleDropdownItemClick("recently-viewed")
                              }
                            >
                              Recently viewed
                            </li>
                            <li
                              onClick={() =>
                                handleDropdownItemClick("bids-offers")
                              }
                            >
                              Bids/Offers
                            </li>
                            <li
                              onClick={() =>
                                handleDropdownItemClick("wishlist")
                              }
                            >
                              Wishlist
                            </li>
                            <li
                              onClick={() =>
                                handleDropdownItemClick("purchase-history")
                              }
                            >
                              purchase history
                            </li>
                            <li
                              onClick={() =>
                                handleDropdownItemClick("buy-again")
                              }
                            >
                              buy again
                            </li>
                            <li
                              onClick={() =>
                                handleDropdownItemClick("selling-hub")
                              }
                            >
                              selling Hub
                            </li>
                            <li
                              onClick={() =>
                                handleDropdownItemClick("saved-searches")
                              }
                            >
                              saved searches
                            </li>
                            <li
                              onClick={() =>
                                handleDropdownItemClick("saved-sellers")
                              }
                            >
                              saved sellers
                            </li>
                            <li
                              onClick={() =>
                                handleDropdownItemClick("messages")
                              }
                            >
                              messages
                            </li>
                            <li onClick={signOut}>Sign Out</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to="/signin">Sign In</Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="nav-bar">
          <NavBar />
        </div>
      </header>
      {/* MOBILE HEADER */}
      <header id="mobile-header">
        <div className="header-top">
          <div className="container">
            <div
              className="row align-items-center"
              style={{ paddingTop: "20px" }}
            >
              <div className="col-md-2 col-sm-2 col">
                <div className="logo">
                  <Link to="/">
                    <img src={Logo} width="100%" height="100%" />
                  </Link>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 col">
                <div className="cart-user">
                  <div className="cart">
                    <Link to="/cart">
                      <img src={Cart} />
                    </Link>
                  </div>
                  <div className="user">
                    <div className="avatar-container" onClick={toggleDropdown}>
                      <img src={Avatar} alt="User Avatar" />
                    </div>
                    {showDropdown && (
                      <div className="dropdown-content">
                        <ul>
                          <li
                            onClick={() => handleDropdownItemClick("my-orders")}
                          >
                            My Orders
                          </li>
                          <li
                              onClick={() =>
                                handleDropdownItemClick("my-favourites")
                              }
                            >
                              My Favourites
                            </li>
                          <li
                            onClick={() =>
                              handleDropdownItemClick("recently-viewed")
                            }
                          >
                            Recently viewed
                          </li>
                          <li
                            onClick={() =>
                              handleDropdownItemClick("bids-offers")
                            }
                          >
                            Bids/Offers
                          </li>
                          <li
                            onClick={() =>
                              handleDropdownItemClick("wishlist")
                            }
                          >
                            Wishlist
                          </li>
                          <li
                            onClick={() =>
                              handleDropdownItemClick("purchase-history")
                            }
                          >
                            purchase history
                          </li>
                          <li
                            onClick={() =>
                              handleDropdownItemClick("buy-again")
                            }
                          >
                            buy again
                          </li>
                          <li
                            onClick={() =>
                              handleDropdownItemClick("selling-hub")
                            }
                          >
                            selling Hub
                          </li>
                          <li
                            onClick={() =>
                              handleDropdownItemClick("saved-searches")
                            }
                          >
                            saved searches
                          </li>
                          <li
                            onClick={() =>
                              handleDropdownItemClick("saved-sellers")
                            }
                          >
                            saved sellers
                          </li>
                          <li
                            onClick={() =>
                              handleDropdownItemClick("messages")
                            }
                          >
                            messages
                          </li>
                          <li onClick={signOut}>Sign Out</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-4 col">
                <div className="nav-bar">
                  <NavBar />
                </div>
              </div>
            </div>

            <div className="row" style={{ padding: "20px 20px" }}>
              <SearchwithCategories />
            </div>
          </div>
        </div>
      </header>
      {/* MOBILE HEADER END */}
    </>
  );
};

export default Header_;
