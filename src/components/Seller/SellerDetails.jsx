import React from 'react'
import Sellerprofile from '../../assets/Images/Seller/profileimage.png'
import { Link, useNavigate } from 'react-router-dom'
import ReviewSection from './ReviewSection'
import PopularProductSearch from './PopularProductSearch'
import SellerFeedback from './SellerFeedback'
import { useState, useEffect } from 'react'
import HomeService from "../../services/API/HomeService"; //~/services/API/Home
import ProductServices from "../../services/API/ProductServices"; //~/services/API/ProductServices
import { toast } from "react-toastify";
import { BASE_URL } from "../../services/Constant";
import UserServices from "../../services/API/UserServices"; //~/services/API/AuthService
import { setUserDetails, isLoggedin, getUserDetails, setUserId } from "../../services/Auth"; // ~/services/Auth
import SellerServices from '../../services/API/SellerServices'
import { Spinner } from 'react-bootstrap'
import LoadingComponents from '../Shared/LoadingComponents'
import NoDataFound from '../Shared/NoDataFound'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

const SellerDetails = () => {
  const [shopData, setShopData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [favData, setFavData] = useState([]);
  const [trendingProduct, setTrendingProduct] = useState(0);
  const [savedSeller, setSavedSeller] = useState(0);
  const [user, setUser] = useState({});
  const token = localStorage.getItem('access_token');

  const { pathname } = window.location;
  const id = pathname.split("/").pop();
  const handleDropdownItemClick = (componentName) => {
    navigate(`/customerdashboard?component=${componentName}`)
  };
  const getProduct = () => {
    ProductServices.get(id).then((res) => {
      setProductData(res);
      setFeedbacks(res.data.seller.feedback.feedbacks);
      setShopData(res.data.seller);
      setProductData(res.data);
      setShopGuid(res.data.shop);
      setShopGuidSave(res.data.shop.guid);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getProduct();
  }, []);
  const navigate = useNavigate()
  const [shopGuid, setShopGuid] = useState([]);
  const [shopGuidSave, setShopGuidSave] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let loggedIn = localStorage.getItem("user_details");
  let logedIn;
  if (loggedIn) {
    logedIn = JSON.parse(loggedIn);
  }


  const getUser = () => {
    UserServices.detail()
      .then((response) => {
        setUserDetails(response);
        setUserId(response?.id)
        setUser(response.id);
        localStorage.setItem("user_details", JSON.stringify(response));
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
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
      setShopData((prevShopData) => ({
        ...prevShopData,
        is_favourite: !prevShopData.is_favourite
      }));
      toast.success("Seller added to favorites!");
      setFavData(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message)
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
    <div className='sellerdetails'>
      {isLoading ? (
        <LoadingComponents />
      ) : (
        <>
          <div className="sellerdetails-wrap">
            <div className='profile-details-seller' onClick={() =>{navigate(`/sellershop/${shopGuid.guid}`)}}>
              <div className='image'>
                <img src={`${shopData.sellerImage}`} width="100" height="100" />
              </div>
              <div className='profile-record'>
                <h4>{shopData.sellerName}</h4>
                <ul>
                  <li>{shopData.positivefeedback}% Positive feedbackss</li>
                  <li>{productData.is_sold} Items Sold</li>
                </ul>
              </div>
            </div>
            <div className='seller-callto-actions'>
              <Link to={`/sellershop/${shopGuid.guid}`}><button>Visit Seller Shop</button></Link>
              <div>
                {shopData.is_favourite === true ?
                  <button onClick={() => addToFavorites(shopGuidSave)}>Un Save this seller</button>
                  :
                  (token === null ?
                    <button
                      onClick={() => {
                        navigate(`/signup`);
                        localStorage.setItem('redirectionPage', pathname)
                      }}
                      className='saveseller'>Save this seller</button>
                    :
                    <button onClick={() => addToFavorites(shopGuidSave)} className='saveseller'>Save this seller</button>

                  )}
              </div>
              {token === null ?
                <div>
                  <button onClick={() => { navigate(`/signup`); localStorage.setItem('redirectionPage', pathname) }} className='messageseller'>Message seller</button>
                </div>
                :
                <div><button onClick={() => navigate(`/customerdashboard?tab=messages&id=${shopGuid.guid}`)} className='messageseller'>Message seller</button></div>
              }
            </div>
          </div>

          {/* <div className='col-lg-6 review'>
              <h2>Detailed Seller Ratings</h2>
              <p className='monthtext'>Last 12 months</p>
              <ReviewSection />
              <PopularProductSearch shopId={shopData.id} />
            </div> */}
          {/* <div className="customer-feedback">
            <h2>Feedbacks</h2>
            <div className="feedback-container">
              {currentItems.length === 0 ? (
                <NoDataFound title={'No Feedbacks Available'} />
              ) : (
                <>
                  <div className="row">
                    {currentItems.map((feedback , index) => (
                      <div className="col-lg-6" key={index}>
                        <div key={feedback.id} className="feedback-item">
                          <div className="feedback-item-left">
                            <div className="feedback-item-left-left">
                              <img src={`${BASE_URL}/${feedback.user.image}`} alt='user image' />
                            </div>
                            <div className="feedback-item-left-right">
                              <h3>{feedback.user.name}</h3>
                              <p>{feedback.comments}</p>
                            </div>
                          </div>
                          <div className="feedback-item-right">
                            <h3>{feedback.user.period}</h3>
                            <p>
                              {+feedback.ratings === 5 &&
                                <>
                                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                </>
                              }
                              {+feedback.ratings === 4 &&
                                <>
                                  <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar />
                                </>
                              }
                              {+feedback.ratings === 3 &&
                                <>
                                  <FaStar /><FaStar /><FaStar /><FaRegStar /><FaRegStar />
                                </>
                              }
                              {+feedback.ratings === 2 &&
                                <>
                                  <FaStar /><FaStar /><FaRegStar /><FaRegStar /><FaRegStar />
                                </>
                              }
                              {+feedback.ratings === 1 &&
                                <>
                                  <FaStar /><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar />
                                </>
                              }
                              {+feedback.ratings === 0 &&
                                <>
                                  <FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar />
                                </>
                              }
                              {+feedback.ratings > 0 && +feedback.ratings < 1 &&
                                <>
                                  <FaStarHalfAlt /><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar />
                                </>
                              }
                              {+feedback.ratings > 1 && +feedback.ratings < 2 &&
                                <>
                                  <FaStar /><FaStarHalfAlt /><FaRegStar /><FaRegStar /><FaRegStar />
                                </>
                              }
                              {+feedback.ratings > 2 && +feedback.ratings < 3 &&
                                <>
                                  <FaStar /><FaStar /><FaStarHalfAlt /><FaRegStar /><FaRegStar />
                                </>
                              }
                              {+feedback.ratings > 3 && +feedback.ratings < 4 &&
                                <>
                                  <FaStar /><FaStar /><FaStar /><FaStarHalfAlt /><FaRegStar />
                                </>
                              }
                              {+feedback.ratings > 4 && +feedback.ratings < 5 &&
                                <>
                                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                                </>
                              }
                              <span>({feedback.ratings})</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div> */}
        </>
      )}
    </div >
  )
}

export default SellerDetails