import React, { useState, useEffect } from "react";
import ProfileDb from '../../../assets/Images/SellerShop/profiledb.png'
import Icon1 from '../../../assets/Images/SellerShop/icon1.png'
import Icon2 from '../../../assets/Images/SellerShop/icon2.png'
import Icon3 from '../../../assets/Images/SellerShop/icon3.png'
import SellerServices from "../../../services/API/SellerServices";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../services/Constant";
import ProductServices from "../../../services/API/ProductServices"; //~/services/API/ProductServices
import UserServices from "../../../services/API/UserServices"; //~/services/API/AuthService
import { setUserDetails, isLoggedin, getUserDetails } from "../../../services/Auth"; // ~/services/Auth
import { FaHeart, FaRegHeart } from "react-icons/fa";

const SellerProfileDetails = () => {
    const { pathname } = window.location;
    const [shopData, setShopData] = useState(null);
    const id = pathname.split("/").pop();
    const [isLoading, setIsLoading] = useState(0);
    const [savedseller, setSavedSeller] = useState("");
    const [favData, setFavData] = useState([]);
    const [user, setUser] = useState({});
    const [productData, setProductData] = useState({});

    const getShopData = async () => {
        try {
          const response = await SellerServices.getShopHeader(id);
          if (response) {
            console.log('shop data', response.data);
            setShopData(response.data);
          }
        } catch (error) {
          console.error('Error fetching shop data:', error);
          toast.error('Failed to fetch shop data');
        }
      };
      const getUser = () => {
        UserServices.detail()
          .then((response) => {
          console.log('login',response.id);
          setUserDetails(response);
          setUser(response.id);
          localStorage.setItem('user_details', JSON.parse(response));
          })
          .catch((e) => {
          console.log('error', e)
          // toast.error(e.message);
          });
        };
      const addToFavorites = async (productId) => {
        try {
            const data = {
                favourite_against_id: productId,
                user_id: user,
                type: "2"
            };
            console.log('hit',data)
            const res = await ProductServices.isFavorite(data);
            if (res.status) {
                // Optionally, update UI or show a success message
                toast.success("Product added to favorites!");
                // Update favorites data if necessary
                setFavData(res.data);
            }
        } catch (error) {
            console.error("Error adding to favorites:", error);
            toast.error("Failed to add product to favorites.");
        }
    };
    
    useEffect(() => {
        getShopData();
    }, []);
    useEffect(() => {
        if (isLoggedin()) {
          getUser();
          // let cartItems = localStorage.getItem('cupon');
        }
        }, []);
    return (
        <>
            {shopData && (
                <div className='sellerdetails'>
                    <div className='row align-items-end'>
                        <div className='col-lg-7'>
                            <div className='profile-seller-shop'>
                                <div className='image'>
                                    <img src={`${BASE_URL}/${shopData.cover_image}`} alt="Shop Main Image" />
                                </div>
                                <div className='details-seller'>
                                    <h2>{shopData.fullname}</h2>
                                    <ul>
                                        <li>{shopData.positive}% Positive feedback</li>
                                        <li>{shopData.total_followers}k Followers</li>
                                        <li>{shopData.total_item_sold}M Items Sold</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-5'>
                            <div className='seller-mesge'>
                                <ul>
                                    <li><img src={Icon3} alt="Share" />Share</li>
                                    <li><img src={Icon2} alt="Message Seller" />Message Seller</li>
                                    <li> {shopData.is_favourite === true ? (
                                                            <FaHeart onClick={() => addToFavorites(shopData.guid)} />
                                                        ) : (
                                                            <FaRegHeart onClick={() => addToFavorites(shopData.guid)}/>
                                                        )
                                                        } Save this Seller</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SellerProfileDetails;
