
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/Shared/Cards/ProductCard";
import { Link } from "react-router-dom";
import ProductSkeletonLoader from "../Shared/ProductSkeletonLoader";
import HomeService from "../../services/API/HomeService";
import { toast } from "react-toastify";
import NoDataFound from "../Shared/NoDataFound";

const ExploreAll = ({ title }) => {
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);
    const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
    const user_id = localStorage.getItem('user_id');

    const getHotUnderAge = (id) => {
        HomeService.getHotUnderAge(id)
            .then((response) => {
                setTopSellingProducts(response?.data?.products)
                setPagination(response?.data?.pagination)
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
        getHotUnderAge(user_id)
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
                    <section id="product-recents-viewed" className="top-selling-product under-age">
                        <>
                            <div className="container">
                                <div className="row">
                                    <div className="headings">
                                        <h3>
                                            {title}
                                            <span>
                                                <Link to="/explore-all-21-plus">View More</Link>
                                            </span>
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

export default ExploreAll;
