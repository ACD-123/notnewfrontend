import React, { useState, useEffect } from "react";
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

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({});
  let token = localStorage.getItem("access_token");
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleDropdownItemClick = (componentName) => {
    window.location.href = `/customerdashboard?component=${componentName}`;
  };
  const getUser = () => {
    UserServices.detail()
      .then((response) => {
        setUserDetails(response);
        setUser(response);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  const signOut = (e) => {
    e.preventDefault();
    const user_details = getUserDetails();
    localStorage.clear();
    window.location.href = "/";
  };
  useEffect(() => {
    if (isLoggedin()) {
      getUser();
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
                      <Link to="/shoppingcart">
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
                                handleDropdownItemClick("component")
                              }
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

export default Header;
