import React, { useState, useEffect } from "react";
import blank from "../../../assets/Images/Productcard/blank.jpg";
import { Link, useNavigate } from "react-router-dom";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import ProductServices from "../../../services/API/ProductServices";
import { toast } from "react-toastify";

const ProductCard = ({ data, handleToggleFavourite, index }) => {
    const isLoggedin = localStorage.getItem("access_token");
    const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
    const user_id = localStorage.getItem('user_id');
    const { pathname } = window.location;
    const navigate = useNavigate()

    const addToFavorites = async (productId, index) => {
        handleToggleFavourite(index)
        try {
            const data = {
                favourite_against_id: productId,
                user_id: user_id,
                type: "1",
            };
            const res = await ProductServices.isFavorite(data);
            if (res.success) {
            }
        } catch (error) {
            toast.error("Failed to add product to favorites.");
        }
    };

    return (
        <>
            {data?.product?.id != '' && data?.product?.id != null && data?.product?.id != undefined ?
                <div className="productlist">
                    <>
                        <Link
                            to={data?.product?.auctioned ? `/auctionproduct/${data?.product?.guid}` : `/singleproduct/${data?.product?.guid}`}>
                            <img
                                src={data?.product?.media?.length > 0 ? data?.product?.media?.[0]?.name : blank
                                }
                                alt={data?.product?.media?.length > 0 ? data?.product?.media?.[0]?.name : "blank"
                                }
                            />
                        </Link>
                    </>
                    {data?.product?.auctioned && data?.product?.underage === 1 ? (<span className="auction-badge">Auction</span>) : null}
                    {data?.product?.auctioned && data?.product?.underage === 0 ? (<span className="auction-badge-21">Auction</span>) : null}
                    {data?.underage === 0 && <span className="plus21">21 +</span>}
                    <div className="px-2">
                        <>
                            <Link
                                to={
                                    data?.product?.auctioned
                                        ? `/auctionproduct/${data?.product?.guid}`
                                        : `/singleproduct/${data?.product?.guid}`
                                }
                            >
                                <h3>{data?.product?.name}</h3>
                                <h4>{data?.product?.description}</h4>
                                {data?.product?.auctioned ?
                                    <h2>${data?.product?.bids}</h2>
                                    :
                                    data?.product?.sale_price > 0 ?
                                        (<>
                                            <h2>${data?.product?.sale_price}
                                                <div className="circle"></div>
                                                <div className="sale-price">${data?.product?.price}</div>
                                            </h2>
                                        </>)
                                        :
                                        (<>
                                            <h2>${data?.product?.price}</h2>
                                        </>)


                                    //         < h2 > ${data?.product?.price}
                                    //     {data?.product?.sale_price > 0 ?
                                    //         <>
                                    //             <div className="circle"></div>
                                    //             <div className="sale-price">${data?.product?.sale_price}</div>
                                    //         </>
                                    //         :
                                    //         null
                                    //     }
                                    // </h2>
                                }

                            </Link>
                        </>
                        {isLoggedin ? (
                            <>
                                {!data?.product?.auctioned && (
                                    <div onClick={() => addToFavorites(data?.product?.guid, index)} className="favoriteImg">
                                        {data?.product?.is_favourite === true ? (<FaHeart />) : (<FaRegHeart />)}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="favoriteImg"
                                    onClick={() => {
                                        navigate(`/signup`);
                                        localStorage.setItem('redirectionPage', pathname)
                                    }}>
                                    <FaRegHeart />
                                </div>
                            </>
                        )}
                    </div>
                </div >
                :
                <div className="productlist">
                    <>
                        <Link
                            to={data?.auctioned ? `/auctionproduct/${data?.guid}` : `/singleproduct/${data?.guid}`}>
                            <img
                                src={data?.media?.length > 0 ? data?.media?.[0]?.name : blank
                                }
                                alt={data?.media?.length > 0 ? data?.media?.[0]?.name : "blank"
                                }
                            />
                        </Link>
                    </>
                    {data?.auctioned && data?.underage === 1 ? (<span className="auction-badge">Auction</span>) : null}
                    {data?.auctioned && data?.underage === 0 ? (<span className="auction-badge-21">Auction</span>) : null}
                    {data?.underage === 0 && <span className="plus21">21 +</span>}
                    <div className="px-2">
                        <>
                            <Link
                                to={
                                    data?.auctioned
                                        ? `/auctionproduct/${data?.guid}`
                                        : `/singleproduct/${data?.guid}`
                                }
                            >
                                <h3>{data?.name}</h3>
                                <h4>{data?.description}</h4>
                                {data?.auctioned ?
                                    (data?.bids ?
                                        <h2>${data?.bids}</h2>
                                        :
                                        <h2>${data?.bid_price}</h2>
                                    )
                                    :
                                    // <h2>${data?.price}
                                    //     {data?.sale_price > 0 ?
                                    //         <>
                                    //             <div className="circle"></div>
                                    //             <div className="sale-price">${data?.sale_price}</div>
                                    //         </>
                                    //         :
                                    //         null
                                    //     }
                                    // </h2>
                                    data?.sale_price > 0 ?
                                        (<>
                                            <h2>${data?.sale_price}
                                                <div className="circle"></div>
                                                <div className="sale-price">${data?.price}</div>
                                            </h2>
                                        </>)
                                        :
                                        (<>
                                            <h2>${data?.price}</h2>
                                        </>)
                                }
                            </Link>
                        </>
                        {isLoggedin ? (
                            <>
                                <div onClick={() => addToFavorites(data.guid, index)} className="favoriteImg">
                                    {data?.is_favourite === true ? (<FaHeart />) : (<FaRegHeart />)}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="favoriteImg"
                                    onClick={() => {
                                        navigate(`/signup`);
                                        localStorage.setItem('redirectionPage', pathname)
                                    }}
                                >
                                    <FaRegHeart />
                                </div>
                            </>
                        )}
                    </div>
                </div >
            }
        </>
    )
}

export default ProductCard