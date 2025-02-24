import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductServices from "../../services/API/ProductServices";
import { toast } from "react-toastify";
import UserServices from "../../services/API/UserServices";
import { setUserDetails, isLoggedin, setUserId } from "../../services/Auth";
import LoadingComponents from '../Shared/LoadingComponents';
import blankUser from '../../assets/Images/User/blankuser.jpg'
import { BASE_URL } from '../../services/Constant';

const SellerDetails = () => {
  const [shopData, setShopData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [favData, setFavData] = useState([]);
  const [user, setUser] = useState({});
  const token = localStorage.getItem('access_token');

  const { pathname } = window.location;
  const id = pathname.split("/").pop();

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
  }, [id]);

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
            <div className='profile-details-seller' onClick={() => { navigate(`/sellershop/${shopGuid.guid}`) }}>
              <div className='image'>
                {shopData?.sellerImage == BASE_URL+'/' ?
                  <img src={blankUser} width="100" height="100" />
                  :
                  <img src={`${shopData.sellerImage}`} width="100" height="100" />
                }
              </div>
              <div className='profile-record'>
                <h4>{shopData.sellerName}</h4>
                <ul>
                  <li>{shopData.positivefeedback}% Positive feedbacks</li>
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
        </>
      )}
    </div >
  )
}

export default SellerDetails