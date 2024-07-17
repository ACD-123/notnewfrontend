import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Logo from "../assets/Images/logo.png";
import SearchwithCategories from "./Elements/SearchwithCategories";
import Cart from "../assets/Images/Elements/cart.png";
import NavBar from "./Elements/NavBar";
import blankUser from "../../src/assets/Images/User/blankuser.jpg"
import { Link } from "react-router-dom";
import UserServices from "../services/API/UserServices";
import { setUserDetails, isLoggedin, getUserDetails } from "../services/Auth";
import CartServices from "../services/API/CartServices";
import { BASE_URL } from "../services/Constant"
import { useNavigate, useLocation } from "react-router-dom";
import SearchSvg from "./Shared/Svgs/SearchSvg";
import HeaderCategoryArrowSvg from "./Shared/Svgs/HeaderCategoryArrowSvg";
import HomeService from "../services/API/HomeService";
import HeaderArrowRightSvg from "./Shared/Svgs/HeaderArrowRightSvg";
import Skeleton from "react-skeleton-loader";
import NoDataFound from "./Shared/NoDataFound";
const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [searchProduct, setSearchProduct] = useState([]);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [user, setUser] = useState({});
  const [profilepic, setProfilePic] = useState("");
  const [cartitems, setCartItems] = useState(0);
  const [inputSearch, setInputSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  let token = localStorage.getItem("access_token");
  const items = useSelector(state => state.cupon.cupon);
  let user_details = JSON.parse(localStorage.getItem('user_details'));
  const cart_items = items ? items : 0;
  const path = location.pathname;
  const search = location.search;

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
  const getItems = () => {
    if (token) {
      CartServices.count()
        .then((response) => {
          if (response > 0) {
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

  const [categories, setCategories] = useState([]);
  const getCategory = () => {
    HomeService.getrecursive().then((res) => {
      setCategories(res);
      console.log(res, 'categories');
    }).catch((error) => {
    });
  };
  useEffect(() => {
    getCategory();
  }, []);

  const handelInputChange = (e) => {
    setSearchLoading(true)
    setInputSearch(e.target.value)
    HomeService.getSearchProducts(e.target.value).then((res) => {
      // setCategories(res);
      console.log(res?.data, 'getSearchProducts');
      setSearchProduct(res?.data)
      setSearchLoading(false)
    }).catch((error) => {
      setSearchLoading(false)
    });
  }


  return (
    <>
      {/* <header id="desktop-header">
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
              <div className="col-lg-2" style={{ textAlign: 'end' }}>
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
                            {(() => {
                              if (user.register_type === 'google' || user.register_type === 'facebook') {
                                return (
                                  <div>
                                    <img src={user_details?.profile_image} width="50" height="50" style={{ borderRadius: "40px" }} alt={user.name} />
                                  </div>
                                );
                              } else if (user.register_type == 'email') {
                                return (
                                  <div>
                                    <img src={`${BASE_URL}/${user_details?.profile_image}`} width="50" height="50" style={{ borderRadius: "40px" }} alt={user.name} />
                                  </div>
                                )
                              }
                            })()}
                          </>
                        ) : (
                          <>
                            <img src={blankUser} width="50" height="50" style={{ borderRadius: "40px" }} alt="User Avatar" />
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
                    <div className="user">
                      <div
                        className="avatar-container"
                        onClick={toggleDropdown}
                      >
                        {profilepic ? (
                          <>
                            {(() => {
                              if (user.register_type === 'google' || user.register_type === 'facebook') {
                                return (
                                  <div>
                                    <img src={profilepic} width="50" height="50" style={{ borderRadius: "40px" }} alt={user.name} />
                                  </div>
                                );
                              } else if (user.register_type == 'email') {
                                return (
                                  <div>
                                    <img src={`${BASE_URL}/${profilepic}`} width="50" height="50" style={{ borderRadius: "40px" }} alt={user.name} />
                                  </div>
                                )
                              }
                            })()}
                          </>
                        ) : (
                          <>
                            <img src={blankUser} width="50" height="50" style={{ borderRadius: "40px" }} alt="User Avatar" />
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
      </header> */}

      <header>
        <div className="header-wrap">
          <div className="header-wrap-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="header-top">
                    <div className="header-left">
                      <div className="header-logo">
                        <Link to="/">
                          <img src={Logo} width="20%" height="100%" />
                        </Link>
                      </div>
                    </div>
                    <div className="header-right">
                      <div className="search-bar">
                        <div className="search-bar-t" style={{
                          borderBottomLeftRadius: inputSearch !== "" ? '0px' : '24px',
                          borderBottomRightRadius: inputSearch !== "" ? '0px' : '24px',
                          borderBottom: inputSearch !== "" ? '0px' : '1px solid #DBDBDB'
                        }}>
                          <div className="search-icon">
                            <SearchSvg />
                          </div>
                          <div className="input">
                            <input type="text" placeholder="Search Here Anything....." onChange={handelInputChange} />
                          </div>
                          <div className="category-drop-down" onClick={() => { setCategoryDropdown(!categoryDropdown) }}>
                            <div className="value">
                              <div className="value-wrap">
                                Categories
                                <HeaderCategoryArrowSvg />
                              </div>
                            </div>
                            {categoryDropdown &&
                              <div className="options">
                                <div className="options-wrap">
                                  {categories?.slice(0, 3)?.map((data, index) => {
                                    return (
                                      <div>
                                        <h4 onClick={() =>{navigate(`/category?category-id=${data?.id}`)}}>{data?.name}</h4>
                                        <ul>
                                          {data?.children_recursive?.slice(0, 3)?.map(
                                            (subcategory, index) => (
                                              <li key={index}>
                                                <Link to={`/category?category-id=${subcategory?.id}`}>
                                                  {subcategory.name}
                                                </Link>
                                              </li>
                                            )
                                          )}
                                        </ul>

                                      </div>
                                    )
                                  })}
                                </div>
                                <div className="footer">
                                  <Link to={'/top-category'}>See All Categories</Link>
                                  <HeaderArrowRightSvg />
                                  <HeaderArrowRightSvg />
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                        {inputSearch != '' &&
                          <div className="search-bar-b">
                            <div className="search-bar-b-w">
                              <div className="search-bar-b-w-list">
                                {inputSearch != '' ?
                                  (searchLoading ?
                                    <ul>
                                      <li><Skeleton /></li>
                                      <li><Skeleton /></li>
                                      <li><Skeleton /></li>
                                    </ul>
                                    :
                                    <>
                                    {searchProduct?.products?.length > 0 ?
                                    <ul>
                                      {searchProduct?.products?.slice(0, 5)?.map((data, index) => {
                                        return (
                                          <li key={index} onClick={() => {
                                            if (data?.auctioned) {
                                              navigate(`/auctionproduct/${data?.guid}`)
                                            } else {
                                              navigate(`/singleproduct/${data?.guid}`)
                                            }
                                          }}>
                                            <div>
                                              <img src={data?.media?.[0]?.name} alt="" />
                                            </div>
                                            <div>
                                              <h3>{data?.name}</h3>
                                              <p>{data?.description}</p>
                                            </div>
                                          </li>
                                        )
                                      })}
                                    </ul>
                                    :
                                    <NoDataFound title={'No product found'}/>
                                    }
                                    </>
                                  )
                                  :
                                  null
                                }
                              </div>
                              {searchProduct?.products?.length > 0 ?
                              <div className="search-bar-b-w-l-m">
                                <Link to={`/search-product?text=${inputSearch}`}>Load More</Link>
                              </div>
                              :
                              null}
                            </div>
                          </div>
                        }
                      </div>
                      {isLoggedin() ? (
                        <>
                          <div className="cart">
                            <div className="cart-count">
                              <div className="cart-count-wrap">
                                2
                              </div>
                            </div>
                            <img src={Cart} />
                          </div>
                          <div className="user" onClick={() => { setUserDropdown(!userDropdown) }}>
                            {profilepic ? (
                              <>
                                {(() => {
                                  if (user.register_type === 'google' || user.register_type === 'facebook') {
                                    return (
                                      <div>
                                        <img src={user_details?.profile_image} width="50" height="50" style={{ borderRadius: "40px" }} alt={user.name} />
                                      </div>
                                    );
                                  } else if (user.register_type == 'email') {
                                    return (
                                      <div>
                                        <img src={`${BASE_URL}/${user_details?.profile_image}`} width="50" height="50" style={{ borderRadius: "40px" }} alt={user.name} />
                                      </div>
                                    )
                                  }
                                })()}
                              </>
                            ) : (
                              <>
                                <img src={blankUser} width="50" height="50" style={{ borderRadius: "40px" }} alt="User Avatar" />
                              </>
                            )}
                            {userDropdown &&
                              <div className="user-drop-dropdown">
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
                            }
                          </div>
                        </>
                      )
                        :
                        (
                          <div className="sign-in-button">
                            <Link to={'/signin'}>Sign In</Link>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {(search.includes('tab') || search.includes('component') || path.includes('category') && !path.includes('top-category')) ? null :
            <div className="header-wrap-bottom">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="bottom">
                      <ul>
                        <li className={`${path === '/' ? 'active' : ''}`}><Link className='nav-link' to="/">Home</Link></li>
                        <li className={`${path === '/top-category' ? 'active' : ''}`}><Link className='nav-link' to="/top-category">Top Categories</Link></li>
                        <li className={`${path === '/auctions' ? 'active' : ''}`}><Link className='nav-link' to="/auctions">Auctions</Link></li>
                        <li className={`${path === '/hot-deals' ? 'active' : ''}`}><Link className='nav-link' to="/hot-deals">Hot Deals</Link></li>
                        <li className={`${path === '/top-sellers' ? 'active' : ''}`}><Link className='nav-link' to="/top-sellers">Top Sellers</Link></li>
                        {/* <li><Nav.Link href="/categorykeyword">Electronics</Nav.Link></li>
                    <li><Nav.Link href="/categorykeyword">Vintage Products</Nav.Link></li>
                    <li><Nav.Link href="/categorykeyword">Auto Parts</Nav.Link></li> */}
                        {/* <li className={`${path === '/notFound' ? 'active' : ''}`}><Link className='nav-link' to="/notFound">Recomendations</Link></li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </header>
    </>
  );
};

export default Header;
