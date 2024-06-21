import React from 'react'
import Sellerprofile from '../../assets/Images/Seller/profileimage.png'
import { Link, useNavigate } from 'react-router-dom'
import ReviewSection from './ReviewSection'
import PopularProductSearch from './PopularProductSearch'
import SellerFeedback from './SellerFeedback'
import { useState, useEffect } from 'react'
import Home from "../../services/API/Home"; //~/services/API/Home
import ProductServices from "../../services/API/ProductServices"; //~/services/API/ProductServices
import { toast } from "react-toastify";
import { BASE_URL } from "../../services/Constant";
import UserServices from "../../services/API/UserServices"; //~/services/API/AuthService
import { setUserDetails, isLoggedin, getUserDetails } from "../../services/Auth"; // ~/services/Auth
import SellerServices from '../../services/API/SellerServices'
import { Spinner } from 'react-bootstrap'

const SellerDetails = () => {
  const [shopData, setShopData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [favData, setFavData] = useState([]);
  const [trendingProduct, setTrendingProduct] = useState(0);
  const [savedSeller, setSavedSeller] = useState(0);
  const [user, setUser] = useState({});

  const { pathname } = window.location;
  const id = pathname.split("/").pop();
  const handleDropdownItemClick = (componentName) => {
    // Here, you can navigate to the 'Activity' component and pass the selected component name as a query parameter or state
    // For example, using query parameter
    navigate(`/customerdashboard?component=${componentName}`)
  };
  const getProduct = () => {
    ProductServices.get(id).then((res) => {
      setProductData(res);
      console.log('feedback', res.data.shop);
      setFeedbacks(res.data.seller.feedback.feedbacks);
      setShopData(res.data.seller);
      console.log('setShopData detail', res.data);
      setProductData(res.data);
      setShopGuid(res.data.shop);
      setShopGuidSave(res.data.shop.guid);
      setIsLoading(false);
      Home.getshopData(res?.shop_id)
        .then((response) => {
          if (response.status) {
            console.log('shopData', response)
            setShopData(response.data)
          }
        }).catch((e) => {
          console.log(e)
        });
      //   setShopData(res.shop_id);
    });
  };
  const getItemSold = () => {
    ProductServices.getTrendingProduct(id).then((response) => {
      setTrendingProduct(response)
    });
  };
  useEffect(() => {
    getProduct();
    // getItemSold();
  }, []);
  const itemsPerPage = 4; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedbacks.slice(indexOfFirstItem, indexOfLastItem);
  const navigate = useNavigate()
  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [shopGuid, setShopGuid] = useState([]);
  const [shopGuidSave, setShopGuidSave] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let loggedIn = localStorage.getItem("user_details");
  let logedIn;
  if (loggedIn) {
    logedIn = JSON.parse(loggedIn);
  }


  const handleSellerServices = (e) => {
    e.preventDefault();
    if (logedIn) {
      let data = {
        shop_id: productData.shop_id
      };
      SellerServices.saveSeller(data)
        .then((response) => {
          toast.success(response);
          getSellerSavedData(shopGuidSave);
        })
        .catch((e) => {
          console.log("Error:", e);
        });
    } else {
      navigate("/signin")
    }
  };

  const getSellerSavedData = () => {
    ProductServices.getSavedSellerDetails(shopGuidSave)
      .then((response) => {
        setSavedSeller(response.shop_id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUser = () => {
    UserServices.detail()
      .then((response) => {
        setUserDetails(response);
        setUser(response.id);
        localStorage.setItem("user_details", JSON.stringify(response));
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  const addToFavorites = async (shopGuid) => {
    try {
      const data = {
        favourite_against_id: shopGuid,
        user_id: user,
        type: "2"
      };
      const res = await ProductServices.isFavorite(data);
      if (res.status) {
        // Update shopData directly after API call
        setShopData((prevShopData) => ({
          ...prevShopData,
          is_favourite: !prevShopData.is_favourite // Toggle is_favourite
        }));
        toast.success("Seller added to favorites!");
        setFavData(res.data);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast.error("Failed to add seller to favorites.");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (isLoggedin()) {
      getUser();
    }
  }, []);
  return (
    <div className='sellerdetails' style={{ padding: "50px 0px" }}>
      {isLoading ? ( // Render loader if isLoading is true
        <div className="loader-container text-center">
          <Spinner animation="border" role="status">
            {/* <span className="sr-only">Loading...</span> */}
          </Spinner>
        </div>
      ) : (
        <>
          {shopData ? (
            <>
              <div className='container'>
                <div className='row align-items-center'>
                  <div className='col-lg-9'>
                    <div className='profile-details-seller'>
                      <div className='image'>
                        <img src={`${shopData.sellerImage}`} width="100" height="100" />
                      </div>
                      <div className='profile-record'>
                        <h4>{shopData.sellerName}</h4>
                        <ul>
                          <li>{shopData.positivefeedback}% Positive feedbackss</li>
                          <li>125k Followers</li>
                          <li>{productData.is_sold} Items Sold</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-3'>
                    <div className='seller-callto-actions'>
                      <Link to={`/sellershop/${shopGuid.guid}`}><button>Visit Seller Shop</button></Link>
                      <Link>
                        {shopData.is_favourite === true ? (
                          <button onClick={() => addToFavorites(shopGuidSave)}>Un Save this seller</button>
                        ) : (
                          <button onClick={() => addToFavorites(shopGuidSave)} className='saveseller'>Save this seller</button>
                        )}
                      </Link>
                      <Link><button onClick={() => handleDropdownItemClick('componentI')} className='messageseller'>Message seller</button></Link>
                    </div>
                  </div>
                </div>
                {/* SECOND ROW */}
                <div className='row'
                  style={{ padding: "40px 0px" }}
                >
                  <div className='col-lg-6 review'>
                    <h2>Detailed Seller Ratings</h2>
                    <p className='monthtext'>Last 12 months</p>
                    <ReviewSection />
                    <PopularProductSearch shopId={shopData.id} />
                  </div>
                  <div className='col-lg-6'>
                    <div className="seller-feedback">
                      <h2>Seller Feedback</h2>
                      <div className="feedback-container">
                        {currentItems.length === 0 ? (
                          <div>No Feedbacks Available</div>
                        ) : (
                          <>
                            {currentItems.map((feedback) => (
                              <div key={feedback.id} className="feedback-item">
                                <img src={`${BASE_URL}/${feedback.user.image}`} alt='user image' />
                                <div className="feedback-content">
                                  <h3>{feedback.user.name}</h3>
                                  <p>{feedback.comments}</p>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                      <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => changePage(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* SECOND ROW */}
              </div>
            </>
          ) : (<></>)}
        </>
      )}
    </div>
  )
}

export default SellerDetails