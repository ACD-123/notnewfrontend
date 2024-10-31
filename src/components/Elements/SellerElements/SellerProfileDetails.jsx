import React, { useState, useEffect } from "react";
import Icon2 from '../../../assets/Images/SellerShop/icon2.png'
import Icon3 from '../../../assets/Images/SellerShop/icon3.png'
import SellerServices from "../../../services/API/SellerServices";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../services/Constant";
import ProductServices from "../../../services/API/ProductServices";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import LoadingComponents from "../../Shared/LoadingComponents";
import { useNavigate } from "react-router-dom";
import { isLoggedin } from "../../../services/Auth";

const SellerProfileDetails = ({ id }) => {
    const [shopData, setShopData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const user_id = localStorage.getItem('user_id')
    const navigate = useNavigate()

    const getShopData = async () => {
        try {
            const response = await SellerServices.getShopHeader(id);
            setIsLoading(false)
            setShopData(response.data);
        } catch (error) {
            setIsLoading(false)
            toast.error('Failed to fetch shop data');
        }
    };

    const addToFavorites = async (productId) => {
        setShopData((prev) =>({...prev , is_favourite : !shopData.is_favourite}))
        try {
            const data = {
                favourite_against_id: productId,
                user_id: user_id,
                type: "2"
            };
            const res = await ProductServices.isFavorite(data);
            toast.success(res.message);
            getShopData()
            // if (res.status) {
            //     setFavData(res.data);
            // }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    };

    const shareThisSeller = () => {
        navigator.clipboard.writeText(`${window.location.origin}/sellershop/${id}`);
        toast.success('Link copied')
    }

    useEffect(() => {
        getShopData();
    }, []);

    return (
        <>
            {isLoading ?
                <div className="seller-profile-feedback-loader">
                    <LoadingComponents />
                </div>
                :
                <div className='seller-shop-details'>
                    <div className="cover-image">
                    {shopData?.main_image ?
                        <img src={`${BASE_URL}/${shopData?.main_image}`} alt="Shop Main Image" />
                            :
                            <img src={`${BASE_URL}/${shopData?.cover_image}`} alt="Shop Main Image" />
                        }
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
                                <li onClick={() => { shareThisSeller() }}><img src={Icon3} alt="Share" />Share</li>
                                {isLoggedin() ?
                                    <li onClick={() => navigate(`/customerdashboard?tab=messages&id=${id}`)}>
                                        <img src={Icon2} alt="Message Seller" />Message Seller</li>
                                    :
                                    <li onClick={() => navigate(`/signup`)}>
                                        <img src={Icon2} alt="Message Seller" />Message Seller</li>
                                }
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
            }
        </>
    );
}

export default SellerProfileDetails;
