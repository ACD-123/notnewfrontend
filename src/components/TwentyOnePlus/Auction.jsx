
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/Shared/Cards/ProductCard";
import { Link } from "react-router-dom";
import ProductSkeletonLoader from "../Shared/ProductSkeletonLoader";
import HomeService from "../../services/API/HomeService";
import { toast } from "react-toastify";
import NoDataFound from "../Shared/NoDataFound";

const Auction = ({ type, title }) => {
    const [auctionProducts, setAuctionProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const [Loader, setLoader] = useState(true)
    const user_details = JSON.parse(localStorage.getItem('user_details'));
    const user_id = localStorage.getItem('user_id');
    const getAuctionProducts = (user_id, type, page, page_size) => {
        HomeService.getAuctionProducts(user_id, type, page, page_size)
            .then((response) => {
                setAuctionProducts(response?.data?.auctioned)
                setLatestProducts(response?.data?.latest)
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
                toast.error(error?.response?.data?.message)
            });
    };

    useEffect(() => {
        getAuctionProducts(user_id, type, 1, 4)
    }, [])

    const handleToggleFavouriteAuction = (index) => {
        const updatedProducts = [...auctionProducts];
        updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
        setAuctionProducts(updatedProducts);
    };
    const handleToggleFavouriteLatest = (index) => {
        const updatedProducts = [...auctionProducts];
        updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
        setAuctionProducts(updatedProducts);
    };

    return (
        <>
            {Loader ?
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
                latestProducts?.length > 0 ?
                    <section id="product-recents-viewed" className="top-selling-product under-age">
                        <>
                            <div className="container">
                                <div className="row">
                                    <div className="headings">
                                        <h3>
                                            {title}
                                            {type == 1 ?
                                                <span>
                                                    <Link to="/auctions">View More</Link>
                                                </span>
                                                :
                                                <span>
                                                    <Link to="/auctions-21-plus">View More</Link>
                                                </span>}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <section id="productcard">
                                <div className="container">
                                    <div className="row">
                                        {Loader ?
                                            <>
                                                <div className="col-lg-3 col-md-6 col-sm-12"><ProductSkeletonLoader /></div>
                                                <div className="col-lg-3 col-md-6 col-sm-12" id='hide-on-mobile-768'><ProductSkeletonLoader /></div>
                                                <div className="col-lg-3 col-md-6 col-sm-12" id="hide-on-mobile-991"><ProductSkeletonLoader /></div>
                                                <div className="col-lg-3 col-md-6 col-sm-12" id="hide-on-mobile-991"><ProductSkeletonLoader /></div>

                                            </>
                                            :

                                            (
                                                latestProducts?.length > 0 ?
                                                    latestProducts?.map((product, index) => (
                                                        <div className="col-lg-3 col-md-6 col-sm-12" key={product?.product?.guid}>
                                                            <ProductCard data={product} handleToggleFavourite={handleToggleFavouriteLatest} index={index} />
                                                        </div>
                                                    ))
                                                    :
                                                    <NoDataFound title={'No Data Found'} />
                                            )
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

export default Auction;
