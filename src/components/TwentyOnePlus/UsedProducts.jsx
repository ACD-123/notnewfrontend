
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/Shared/Cards/ProductCard";
import { Link } from "react-router-dom";
import ProductSkeletonLoader from "../Shared/ProductSkeletonLoader";
import HomeService from "../../services/API/HomeService";
import { toast } from "react-toastify";

const UsedProducts = () => {
    const [usedProducts, setUsedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const user_id = localStorage.getItem('user_id');
    const getUsedProduct = (id) => {
        HomeService.getUsedProduct18Plus('Used', id)
            .then((response) => {
                setUsedProducts(response?.data?.products?.slice(0, 4))
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
            });
    };

    useEffect(() => {
        getUsedProduct(user_id)
    }, [user_id])

    const handleToggleFavourite = (index) => {
        const updatedProducts = [...usedProducts];
        updatedProducts[index].product.is_favourite = !updatedProducts[index].product.is_favourite;
        setUsedProducts(updatedProducts);
    };

    return (
        <>
            {loading ?
                <>
                    <div className="container my-5">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-12"><ProductSkeletonLoader /></div>
                            <div className="col-lg-3 col-md-6 col-sm-12" id='hide-on-mobile-768'><ProductSkeletonLoader /></div>
                            <div className="col-lg-3 col-md-6 col-sm-12" id="hide-on-mobile-991"><ProductSkeletonLoader /></div>
                            <div className="col-lg-3 col-md-6 col-sm-12" id="hide-on-mobile-991"><ProductSkeletonLoader /></div>
                        </div>
                    </div>

                </>
                :
                usedProducts?.length > 0 ?
                    <section id="product-recents-viewed" className="top-selling-product">
                        <>
                            <div className="container">
                                <div className="row">
                                    <div className="headings">
                                        <h3>
                                            Used Products
                                            {usedProducts?.length > 0 &&
                                                <span>
                                                    <Link to="/product-filter-21-plus">View More</Link>
                                                </span>
                                            }
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <section id="productcard">
                                <div className="container">
                                    <div className="row">
                                        {
                                            usedProducts?.map((product, index) => (
                                                <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                                                    <ProductCard data={product} handleToggleFavourite={handleToggleFavourite} index={index} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </section>
                        </>
                    </section>
                    :
                    null
            }
        </>
    );
};

export default UsedProducts;
