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

const SellerProfileDetails = ({ id }) => {
    const { pathname } = window.location;
    const [shopData, setShopData] = useState(null);
    // const id = pathname.split("/").pop();
    const [isLoading, setIsLoading] = useState(0);
    const [favData, setFavData] = useState([]);
    const [user, setUser] = useState({});
    const [productData, setProductData] = useState({});

    const getShopData = async () => {
        try {
            const response = await SellerServices.getShopHeader(id);
            console.log('shop data', response.data);
            setShopData(response.data);
        } catch (error) {
            toast.error('Failed to fetch shop data');
        }
    };

    const addToFavorites = async (productId) => {
        try {
            const data = {
                favourite_against_id: productId,
                user_id: user,
                type: "2"
            };
            console.log('hit', data)
            const res = await ProductServices.isFavorite(data);
            if (res.status) {
                toast.success("Product added to favorites!");
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

    return (
        <>
            <div className='seller-shop-details'>
                <div className="cover-image">
                    <img src={`${BASE_URL}/${shopData?.cover_image}`} alt="Shop Main Image" />
                </div>
                <div className="user-data">
                    <div className="user-data-left">
                        <div className='user-data-left-wrap'>
                            <div className='image'>
                                <img src={`${BASE_URL}/${shopData?.cover_image}`} alt="Shop Main Image" />
                            </div>
                            <div className='details-seller'>
                                <h2>{shopData?.fullname}</h2>
                                <ul>
                                    <li>{shopData?.positive}% Positive feedback</li>
                                    <li>{shopData?.total_item_sold}M Items Sold</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="user-data-right">
                        <ul>
                            <li><img src={Icon3} alt="Share" />Share</li>
                            <li><img src={Icon2} alt="Message Seller" />Message Seller</li>
                            <li> {shopData?.is_favourite === true ? (
                                <FaHeart onClick={() => addToFavorites(shopData?.guid)} />
                            ) : (
                                <FaRegHeart onClick={() => addToFavorites(shopData?.guid)} />
                            )
                            } Save this Seller</li>
                        </ul>
                    </div>
                </div>

            </div>
        </>
    );
}

export default SellerProfileDetails;
