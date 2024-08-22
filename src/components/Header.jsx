import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import Logo from "../assets/Images/logo.png";
import Cart from "../assets/Images/Elements/cart.png";
import blankUser from "../../src/assets/Images/User/blankuser.jpg"
import notification from "../../src/assets/Images/notification.png"
import Plus from "../../src/assets/Images/21plus.png"
import PlusPopup from "../../src/assets/Images/21popup.png"
import { Link } from "react-router-dom";
import UserServices from "../services/API/UserServices";
import { setUserDetails, isLoggedin, getUserDetails, setUserId } from "../services/Auth";
import CartServices from "../services/API/CartServices";
import { BASE_URL } from "../services/Constant"
import { useNavigate, useLocation } from "react-router-dom";
import SearchSvg from "./Shared/Svgs/SearchSvg";
import HeaderCategoryArrowSvg from "./Shared/Svgs/HeaderCategoryArrowSvg";
import HomeService from "../services/API/HomeService";
import HeaderArrowRightSvg from "./Shared/Svgs/HeaderArrowRightSvg";
import Skeleton from "react-skeleton-loader";
import NoDataFound from "./Shared/NoDataFound";
import ProductServices from "../services/API/ProductServices";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

const Header = ({ cartFullResponse, notificationCount }) => {
  const [show21PlusDropdown, setShow21PlusDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [searchProduct, setSearchProduct] = useState([]);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [seletedCategory, setSeletedCategory] = useState('');
  const [user, setUser] = useState({});
  const [inputSearch, setInputSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  let token = localStorage.getItem("access_token");
  const underage = localStorage.getItem("underage");
  let user_details = JSON.parse(localStorage.getItem('user_details'));
  const user_id = localStorage.getItem('user_id');
  const path = location.pathname;
  const search = location.search;


  const handleDropdownItemClick = (componentName) => {
    navigate(`/customerdashboard?tab=activity&component=${componentName}`)
  };

  const getUser = () => {
    UserServices.detail()
      .then((response) => {
        setUserDetails(response);
        setUserId(response?.id)
        setUser(response);
        localStorage.setItem('user_details', JSON.parse(response));
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };

  const getItems = () => {
    if (token) {
      CartServices.count()
        .then((response) => {
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message)
        });
    }
  }

  const signOut = (e) => {
    e.preventDefault();
    const user_details = getUserDetails();
    localStorage.clear();
    window.location.href = `/`;
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
    }).catch((error) => {
      toast.error(error?.response?.data?.message)
    });
  };


  useEffect(() => {
    getCategory();
  }, []);

  const handelInputChange = (e) => {
    setSearchLoading(true)
    setInputSearch(e.target.value)
    HomeService.getSearchProducts(e.target.value).then((res) => {
      setSearchProduct(res?.data)
      setSearchLoading(false)
    }).catch((error) => {
      toast.error(error?.response?.data?.message)
      setSearchLoading(false)
    });
  }

  const addSearchProduct = (product_id) => {
    ProductServices.addSearchProduct({ user_id: user_id, product_id: product_id })
      .then((res) => {
      }).catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  }


  const controlUnderAge = () => {
    const underage = localStorage.getItem('underage')
    if (underage == 1) {
      navigate('/21-plus')
    } else {
      localStorage.setItem('underage', 1)
      navigate('/21-plus')
    }
  }

  const categoryDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
      setCategoryDropdown(false);
    }
  };

  const handleUserClickOutside = (event) => {
    if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
      setUserDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    document.addEventListener('mousedown', handleUserClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleUserClickOutside);
    };
  }, []);

  return (
    <>
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
                          <div ref={categoryDropdownRef} className="category-drop-down" onClick={() => { setCategoryDropdown(!categoryDropdown) }}>
                            <div className="value">
                              <div className="value-wrap">
                                {seletedCategory === "" ? "Categories" : seletedCategory}
                                
                                <HeaderCategoryArrowSvg />
                              </div>
                            </div>
                            {categoryDropdown &&
                              <div className="options">
                                <div className="options-wrap">
                                  {categories?.slice(0, 3)?.map((data, index) => {
                                    return (
                                      <div key={index}>
                                        <h4 onClick={() => { navigate(`/category?category-id=${data?.id}`); setSeletedCategory(data?.name) }}>{data?.name}</h4>
                                        <ul>
                                          {data?.children_recursive?.slice(0, 3)?.map(
                                            (subcategory, index) => (
                                              <li key={index} onClick={() =>{setSeletedCategory(subcategory.name)}}>
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
                                                addSearchProduct(data?.id);
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
                                        <NoDataFound title={'No product found'} />
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
                      {underage == 1 ?
                        <div className="notification" onClick={() => { navigate('/21-plus') }}>
                          <div className="notification-wrap">
                            <img src={Plus} alt="21-plus" />
                          </div>
                        </div>
                        :
                        <div className="notification" onClick={() => { setShow21PlusDropdown(true) }}>
                          <div className="notification-wrap">
                            <img src={Plus} alt="21-plus" />
                          </div>
                        </div>
                      }
                      {isLoggedin() &&
                        <div className="notification" onClick={() => { navigate('/notification') }}>
                          <div className="notification-wrap">
                            {notificationCount?.total > 0 ?
                              <div className="notification-count">
                                <div className="notification-count-wrap">
                                  {notificationCount?.total}
                                </div>
                              </div>
                              :
                              null
                            }
                            <img src={notification} alt="" />
                          </div>
                        </div>
                      }
                      <div className="cart" onClick={() => { navigate('/cart') }}>
                        {cartFullResponse?.data?.length > 0 ?
                          <div className="cart-count">
                            <div className="cart-count-wrap">
                              {cartFullResponse?.data?.length}
                            </div>
                          </div>
                          :
                          null
                        }
                        <img src={Cart} />
                      </div>
                      {isLoggedin() ? (
                        <>
                          <div ref={userDropdownRef} className="user" onClick={() => { setUserDropdown(!userDropdown) }}>
                            {user?.profile_image ? (
                              <>
                                {user?.profile_image.includes("http") ?
                                  <div>
                                    <img src={user_details?.profile_image} width="50" height="50" style={{ borderRadius: "40px" }} alt={user.name} />
                                  </div>
                                  :
                                  <div>
                                    <img src={`${BASE_URL}/${user_details?.profile_image}`} width="50" height="50" style={{ borderRadius: "40px" }} alt={user.name} />
                                  </div>

                                }
                              </>
                            ) : (
                              <>
                                <img src={blankUser} width="50" height="50" style={{ borderRadius: "40px" }} alt="User Avatar" />
                              </>
                            )}
                            {userDropdown &&
                              <div className="user-drop-dropdown">
                                <ul>
                                  <li onClick={() => window.location.href='/my-seller-account?tab=dashboard'}>
                                    Dashboard
                                  </li>
                                  <li onClick={() => handleDropdownItemClick("my-orders")}>
                                    My Orders
                                  </li>
                                  <li onClick={() => handleDropdownItemClick("my-bids-and-offers")}>
                                    My Bids And Offers
                                  </li>
                                  <li onClick={() => handleDropdownItemClick("my-favourites")}>
                                    My Favourites
                                  </li>
                                  <li onClick={() => handleDropdownItemClick("recently-searched-items")}>
                                    Recently Searched Items
                                  </li>
                                  <li onClick={() => handleDropdownItemClick("help-and-support")}>
                                    Help And Support
                                  </li>
                                  <li onClick={() => handleDropdownItemClick("change-password")}>
                                    Change Password
                                  </li>
                                  <li onClick={() => handleDropdownItemClick("faq")}>
                                    FAQs
                                  </li>
                                  <li onClick={() => handleDropdownItemClick("privacy-policy")}>
                                    Privacy Policy
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
          {(search.includes('tab') ||
            search.includes('component') ||
            path.includes('notification') ||
            path.includes('category') &&
            !path.includes('top-category')) ? null :
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
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </header>
      <Modal show={show21PlusDropdown} size="lg" className="plus-modal-wrap" onHide={setShow21PlusDropdown}>
        <div className="modal-body">
          <div className="image">
            <img src={PlusPopup} alt="" />
          </div>
          <h2>Age Verification</h2>
          <p>Please confirm that your age over 21</p>
          <div className="buttons">
            <div className="btn-wrap">
              <button onClick={() => { setShow21PlusDropdown(false) }}>I'm Under 21</button>
            </div>
            <div className="btn-wrap">
              <button onClick={() => { controlUnderAge() }}>I'm Over 21</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
