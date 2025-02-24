import React, { useState, useEffect } from "react";
import OrderServices from "../../services/API/OrderServices";
import { toast } from "react-toastify";
import LoadingComponents from "../Shared/LoadingComponents";
import NoDataFound from "../Shared/NoDataFound";
import { useNavigate } from "react-router-dom";
import ProductCard from "../Shared/Cards/ProductCard";

const CustomerActiveProducts = () => {
    const [activeFavProductList, setActiveFavProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user_id = localStorage.getItem('user_id');

    const getActiveFavProducts = () => {
        OrderServices.customerActiveFavProducts(user_id)
            .then((response) => {
                setActiveFavProductList(response?.data?.active);
                setIsLoading(false);

            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
                setIsLoading(false);
            });
    };

    const handleToggleFavourite = (index) => {
        getActiveFavProducts()
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
                        {activeFavProductList?.length > 0 ?
                            <div className="p-o-m-w-l">
                                <div className="row">
                                    {activeFavProductList?.map((product, index) => {
                                        return (
                                            <div className="col-lg-4 col-md-6 col-sm-12" key={product?.guid}>
                                                <ProductCard data={product} handleToggleFavourite={handleToggleFavourite} index={index} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            :
                            <NoDataFound title={'No Data Found'} />
                        }
                    </div>
                }
            </div>
        </>
    );
};

export default CustomerActiveProducts;


