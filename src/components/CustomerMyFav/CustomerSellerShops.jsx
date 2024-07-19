import React, { useState, useEffect } from "react";
import OrderServices from "../../services/API/OrderServices";
import { toast } from "react-toastify";
import LoadingComponents from "../Shared/LoadingComponents";
import NoDataFound from "../Shared/NoDataFound";
import { BASE_URL } from "../../services/Constant";
import DefaultImage from "../../assets/Images/default-image.jpg"
import { useNavigate } from "react-router-dom";

const CustomerSellerShops = () => {
    const [sellerShopList, setSellerShopList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
    const navigate = useNavigate();

    const getSellerShops = () => {
        OrderServices.customerSellerShops(loggedInUser?.id)
            .then((response) => {
                setSellerShopList(response?.data);
                setIsLoading(false);

            })
            .catch((e) => {
                toast.error(e.message);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getSellerShops();
    }, []);

    return (
        <>
            <div className="pending-oder-managment">
                {isLoading ?
                    <LoadingComponents />
                    :
                    <div className="p-o-m-w">
                        {sellerShopList?.length > 0 ?
                            <div className="p-o-m-w-l">
                                {sellerShopList?.map((data, index) => {
                                    return (
                                        <ul>
                                            <li>
                                                <div className="p-o-m-w-l-l">
                                                    <div className="p-o-m-w-l-l-l">
                                                        {data?.seller?.user?.profile_image ?
                                                            <img src={`${BASE_URL}/${data?.seller?.user?.profile_image}`} alt="Product" />
                                                            :
                                                            <img src={DefaultImage} alt="Product" />
                                                        }
                                                    </div>
                                                    <div className="p-o-m-w-l-l-r">
                                                        <h2><span>{data?.seller?.fullname}</span></h2>
                                                        <h3>{data?.seller?.description}</h3>
                                                    </div>
                                                </div>
                                                <div className="p-o-m-w-l-r">
                                                    <div className="p-o-m-w-l-r-w-d">
                                                        <button onClick={() => { navigate(`/sellershop/${data?.seller?.guid}`) }}>Visit Seller Shop</button>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    )
                                })}
                            </div>
                            :
                            <NoDataFound title={'No seller shop found'} />
                        }
                    </div>
                }
            </div>
        </>
    );
};

export default CustomerSellerShops;

