import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Logo from "../assets/Images/logo.png";
import SearchwithCategories from "./Elements/SearchwithCategories";
import Avatar from "../assets/Images/Elements/avatar.png";
import Cart from "../assets/Images/Elements/cart.png";
import NavBar from "./Elements/NavBar";
import blankUser from "../../src/assets/Images/User/blankuser.jpg"
import { Link } from "react-router-dom";
import UserServices from "../services/API/UserServices"; //~/services/API/AuthService
import { toast } from "react-toastify";
import { setUserDetails, isLoggedin, getUserDetails } from "../services/Auth"; // ~/services/Auth
import AuthServices from "../services/API/AuthService"; //~/services/API/AuthService
import CartServices from "../services/API/CartServices"; //~/services/API/CartServices
import {BASE_URL} from "../services/Constant"
import { useNavigate } from "react-router-dom";
const Header = () => {
  const items = useSelector(state => state.cupon.cupon);
  const cart_items = items ? items : 0;
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({});
  const [profilepic, setProfilePic] = useState("");
  const [cartitems, setCartItems] = useState(0);
  let token = localStorage.getItem("access_token");
  const navigate =useNavigate()
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleDropdownItemClick = (componentName) => {
    navigate(`/customerdashboard?tab=activity&component=${componentName}`)
  };
  const getUser = () => {
    UserServices.detail()
      .then((response) => {
        setProfilePic(response.profile_image)
        setUserDetails(response);
        setUser(response);
        localStorage.setItem('user_details', JSON.parse(response));
      })
      .catch((e) => {
        console.log('error', e)
      });
  };
  const getItems =() =>{
    if(token){
      CartServices.count()
      .then((response) => {
        if(response > 0){
          setCartItems(response);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
    }
  }
  const signOut = (e) => {
    e.preventDefault();
    const user_details = getUserDetails();
    localStorage.clear();
    navigate(`/`)
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
              <div className="col-lg-2" style={{textAlign:'end'}}>
                {isLoggedin() ? (
                  <div className="cart-user">
                    <div className="cart">
                      <span className="cartitmes">
                      {cart_items ? cart_items : cartitems}
                      </span>
                      <Link to="/shoppingcart">
                        <img src={Cart} />
                      </Link>
                    </div>
                    <div className="user">
                      <div
                        className="avatar-container"
                        onClick={toggleDropdown}
                      > 
                        {profilepic ? (
                          <>
                          {/* https://notnewbackend.testingwebsitelink.com/images/User/62/a249749c-e1cd-49fe-8eb1-83595042ae64.jpg */}
                          {(() => {
                          if (user.register_type === 'google' || user.register_type === 'facebook') {
                            return (
                              <div>
                                <img src={profilepic} width="50" height="50" style={{ borderRadius: "40px"}} alt={user.name} />
                              </div>
                            );
                          } else if (user.register_type == 'email'){
                            return (
                              <div>
                                <img src={`${BASE_URL}/${profilepic}`} width="50" height="50" style={{ borderRadius: "40px"}} alt={user.name} />
                              </div>
                            )
                          }
                        })()}
                          </>
                        ):(
                          <>
                            <img src={blankUser} width="50" height="50" style={{ borderRadius: "40px"}} alt="User Avatar" />
                          </>
                        )}
                      </div>
                      {showDropdown && (
                        <div className="dropdown-content">
                          <ul>
                            <li
                              onClick={() =>
                                handleDropdownItemClick("dashboard")
                              }
                            >
                              Dashboard
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
                              saved searches{" "}
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
                    <a href="/signin" className="login" >Sign In</a>
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
              {isLoggedin() ? (
                  <div className="cart-user">
                    <div className="cart">
                      <span className="cartitmes">
                      {cart_items}
                      </span>
                      <Link to="/shoppingcart">
                        <img src={Cart} />
                      </Link>
                    </div>
                    {/* <div className="cartitmes">

                    <div/> */}

                    <div className="user">
                      <div
                        className="avatar-container"
                        onClick={toggleDropdown}
                      > 
                        {profilepic ? (
                          <>
                          {/* https://notnewbackend.testingwebsitelink.com/images/User/62/a249749c-e1cd-49fe-8eb1-83595042ae64.jpg */}
                          {(() => {
                          if (user.register_type === 'google' || user.register_type === 'facebook') {
                            return (
                              <div>
                                <img src={profilepic} width="50" height="50" style={{ borderRadius: "40px"}} alt={user.name} />
                              </div>
                            );
                          } else if (user.register_type == 'email'){
                            return (
                              <div>
                                <img src={`${BASE_URL}/${profilepic}`} width="50" height="50" style={{ borderRadius: "40px"}} alt={user.name} />
                              </div>
                            )
                          }
                        })()}
                          </>
                        ):(
                          <>
                            <img src={blankUser} width="50" height="50" style={{ borderRadius: "40px"}} alt="User Avatar" />
                          </>
                        )}
                        {/* <img src={Avatar} alt="User Avatar" /> */}
                        
                      </div>
                      {showDropdown && (
                        <div className="dropdown-content">
                          <ul>
                            <li
                              onClick={() =>
                                handleDropdownItemClick("dashboard")
                              }
                            >
                              Dashboard
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
                              saved searches{" "}
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
                    <a href="/signin" className="login" >Sign In</a>
                )}
                {/* <div className="cart-user">
                  <div className="cart">
                    <Link to="/shoppingcart">
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
                            onClick={() => handleDropdownItemClick("component")}
                          >
                            Dashboard
                          </li>
                          <li
                            onClick={() =>
                              handleDropdownItemClick("componentA")
                            }
                          >
                            Recently viewed
                          </li>
                          <li
                            onClick={() =>
                              handleDropdownItemClick("componentB")
                            }
                          >
                            Bids/Offers
                          </li>
                          <li
                            onClick={() =>
                              handleDropdownItemClick("componentC")
                            }
                          >
                            Wishlist
                          </li>
                          <li
                            onClick={() =>
                              handleDropdownItemClick("componentD")
                            }
                          >
                            purchase history
                          </li>
                          <li
                            onClick={() =>
                              handleDropdownItemClick("componentE")
                            }
                          >
                            buy again
                          </li>
                          <li
                            onClick={() =>
                              handleDropdownItemClick("componentF")
                            }
                          >
                            selling Hub
                          </li>
                          <li
                            onClick={() =>
                              handleDropdownItemClick("componentG")
                            }
                          >
                            saved searches{" "}
                          </li>
                          <li
                            onClick={() =>
                              handleDropdownItemClick("componentH")
                            }
                          >
                            saved sellers
                          </li>
                          <li
                            onClick={() =>
                              handleDropdownItemClick("componentI")
                            }
                          >
                            messages
                          </li>
                          <li onClick={signOut}>Sign Out</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div> */}
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

export default Header;
