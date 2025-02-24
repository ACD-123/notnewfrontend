
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/Shared/Cards/ProductCard";
import { Link } from "react-router-dom";
import ProductSkeletonLoader from "../Shared/ProductSkeletonLoader";
import HomeService from "../../services/API/HomeService";
import { toast } from "react-toastify";

const TopSelling = ({ title }) => {
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const user_id = localStorage.getItem('user_id');

    const getTopSellingUnderAge = (id) => {
        HomeService.getTopSellingUnderAge(id)
            .then((response) => {
                setTopSellingProducts(response?.data?.products?.slice(0, 4))
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
            .catch((error) => {
                setLoading(false)
                toast.error(error?.response?.data?.message)
            });
    };

    useEffect(() => {
        getTopSellingUnderAge(user_id)
    }, [])

    const handleToggleFavourite = (index) => {
        const updatedProducts = [...topSellingProducts];
        updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
        setTopSellingProducts(updatedProducts);
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
                topSellingProducts?.length > 0 ?
                    <section id="product-recents-viewed" className="top-selling-product">
                        <>
                            <div className="container">
                                <div className="row">
                                    <div className="headings">
                                        <h3>
                                            {title}
                                            {topSellingProducts?.length > 0 &&
                                                <span>
                                                    <Link to="/top-selling-21-plus">View More</Link>
                                                </span>
                                            }
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <section id="productcard">
                                <div className="container">
                                    <div className="row">

                                        {topSellingProducts?.map((product, index) => (
                                            <div className="col-lg-3 col-md-6 col-sm-12" key={product?.product?.guid}>
                                                <ProductCard data={product} handleToggleFavourite={handleToggleFavourite} index={index} />
                                            </div>
                                        ))}

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

export default TopSelling;
