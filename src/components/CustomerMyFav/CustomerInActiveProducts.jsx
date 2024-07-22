import React, { useState, useEffect } from "react";
import OrderServices from "../../services/API/OrderServices";
import { toast } from "react-toastify";
import LoadingComponents from "../Shared/LoadingComponents";
import NoDataFound from "../Shared/NoDataFound";
import { BASE_URL } from "../../services/Constant";
import DefaultImage from "../../assets/Images/default-image.jpg"
import { useNavigate } from "react-router-dom";
import ProductCard from "../Shared/Cards/ProductCard";

const CustomerInActiveProducts = () => {
    const [inActiveFavProductList, setInActiveFavProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
    const navigate = useNavigate();

    const getActiveFavProducts = () => {
        OrderServices.customerActiveFavProducts(loggedInUser?.id)
            .then((response) => {
                console.log(response?.data?.in_active, 'response?.data?.active');
                setInActiveFavProductList(response?.data?.in_active);
                setIsLoading(false);

            })
            .catch((e) => {
                toast.error(e.message);
                setIsLoading(false);
            });
    };

    const handleToggleFavourite = (index) => {
        const updatedProducts = [...inActiveFavProductList];
        updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
        setInActiveFavProductList(updatedProducts);
    };

    useEffect(() => {
        getActiveFavProducts();
    }, []);

    return (
        <>
            <div className="pending-oder-managment" id="productcard">
                {isLoading ?
                    <LoadingComponents />
                    :
                    <div className="p-o-m-w">
                        {inActiveFavProductList?.length > 0 ?
                            <div className="p-o-m-w-l">
                                <div className="p-o-m-w-l">
                                    <div className="row">
                                        {inActiveFavProductList?.map((product, index) => {
                                            return (
                                                <div className="col col-lg-3" key={product?.guid}>
                                                    <ProductCard data={product} handleToggleFavourite={handleToggleFavourite} index={index} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            :
                            <NoDataFound title={'No Inactive favourite product found'} />
                        }
                    </div>
                }
            </div>
        </>
    );
};

export default CustomerInActiveProducts;


