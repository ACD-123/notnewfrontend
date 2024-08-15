
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/Shared/Cards/ProductCard";
import { Link } from "react-router-dom";
import ProductSkeletonLoader from "../Shared/ProductSkeletonLoader";
import HomeService from "../../services/API/HomeService";
import { toast } from "react-toastify";
import NoDataFound from "../Shared/NoDataFound";

const TopSelling = ({ title }) => {
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
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
            <section id="product-recents-viewed" className="top-selling-product">
                <>
                    <div className="container">
                        <div className="row">
                            <div className="headings">
                                <h3>
                                    {title}
                                    {topSellingProducts.length > 0 &&
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
                                {loading ?
                                    <>
                                        <div className="col-lg-3"><ProductSkeletonLoader /></div>
                                        <div className="col-lg-3"><ProductSkeletonLoader /></div>
                                        <div className="col-lg-3"><ProductSkeletonLoader /></div>
                                        <div className="col-lg-3"><ProductSkeletonLoader /></div>

                                    </>
                                    :

                                    (
                                        topSellingProducts.length > 0 ?
                                            topSellingProducts?.map((product, index) => (
                                                <div className="col col-lg-3" key={product?.product?.guid}>
                                                    <ProductCard data={product} handleToggleFavourite={handleToggleFavourite} index={index} />
                                                </div>
                                            ))
                                            :
                                            <NoDataFound title={'No top selling product found'} />
                                    )
                                }
                            </div>
                        </div>
                    </section>
                </>
            </section>
        </>
    );
};

export default TopSelling;
