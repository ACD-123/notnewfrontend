import React, { useState, useEffect } from "react";
import blank from "../../../assets/Images/Productcard/blank.jpg";
import { Link } from "react-router-dom";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import ProductServices from "../../../services/API/ProductServices";
import { toast } from "react-toastify";

const ProductCard = ({ data, handleToggleFavourite, index }) => {
    const isLoggedin = localStorage.getItem("access_token");
    const loggedInUser = JSON.parse(localStorage.getItem("user_details"));

    const addToFavorites = async (productId, index) => {
        handleToggleFavourite(index)
        try {
            const data = {
                favourite_against_id: productId,
                user_id: loggedInUser?.id,
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
                    {isLoggedin ? (
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
                    ) : (
                        <>
                            <Link to="/signin">
                                <img
                                    src={data?.product?.media?.length > 0 ? data?.product?.media?.[0]?.name : blank}
                                    alt={data?.product?.media?.length > 0 ? data?.product?.media?.[0]?.name : "no image"}
                                />
                            </Link>
                        </>
                    )}
                    {data?.product?.auctioned ? (<span className="auction-badge">Auction</span>) : null}
                    <div className="px-2">
                        {isLoggedin ? (
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
                                        <h2>${data?.product?.price}
                                            {data?.product?.sale_price > 0 ?
                                                <>
                                                    <div className="circle"></div>
                                                    <div className="sale-price">${data?.product?.sale_price}</div>
                                                </>
                                                :
                                                null
                                            }
                                        </h2>
                                    }

                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/signin">
                                    <h3>{data?.product?.name}</h3>
                                    <h4>{data?.product?.description}</h4>
                                    {data?.product?.auctioned ?
                                        <h2>${data?.product?.bids}</h2>
                                        :
                                        <h2>${data?.product?.price}
                                            {data?.product?.sale_price > 0 ?
                                                <>
                                                    <div className="circle"></div>
                                                    <div className="sale-price">${data?.product?.sale_price}</div>
                                                </>
                                                :
                                                null
                                            }
                                        </h2>
                                    }

                                </Link>
                            </>
                        )}
                        {isLoggedin ? (
                            <>
                                {!data?.product?.auctioned && (
                                    <div onClick={() => addToFavorites(data?.product?.guid, index)} className="favoriteImg">
                                        {data?.product?.is_favourite === true ? (<FaHeart />) : (<FaRegHeart />)}
                                    </div>
                                )}
                            </>
                        ) : (
                            data?.product?.auctioned ? null :
                            <>
                                <Link to="/signin">
                                    <div className="favoriteImg">
                                        <FaRegHeart />
                                    </div>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                :
                <div className="productlist">
                    {isLoggedin ? (
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
                    ) : (
                        <>
                            <Link to="/signin">
                                <img
                                    src={data?.media?.length > 0 ? data?.media?.[0]?.name : blank}
                                    alt={data?.media?.length > 0 ? data?.media?.[0]?.name : "no image"}
                                />
                            </Link>
                        </>
                    )}
                    {data?.auctioned ? (<span className="auction-badge">Auction</span>) : null}
                    <div className="px-2">
                        {isLoggedin ? (
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
                                        <h2>${data?.bids}</h2>
                                        :
                                        <h2>${data?.price}
                                            {data?.sale_price > 0 ?
                                                <>
                                                    <div className="circle"></div>
                                                    <div className="sale-price">${data?.sale_price}</div>
                                                </>
                                                :
                                                null
                                            }
                                        </h2>
                                    }
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/signin">
                                    <h3>{data?.name}</h3>
                                    <h4>{data?.description}</h4>
                                    {data?.auctioned ?
                                        <h2>${data?.bids}</h2>
                                        :
                                        <h2>${data?.price}
                                            {data?.sale_price > 0 ?
                                                <>
                                                    <div className="circle"></div>
                                                    <div className="sale-price">${data?.sale_price}</div>
                                                </>
                                                :
                                                null
                                            }
                                        </h2>
                                    }

                                </Link>
                            </>
                        )}
                        {isLoggedin ? (
                            <>
                                {!data?.auctioned && (
                                    <div onClick={() => addToFavorites(data.guid, index)} className="favoriteImg">
                                        {data?.is_favourite === true ? (<FaHeart />) : (<FaRegHeart />)}
                                    </div>
                                )}
                            </>
                        ) : (
                            data?.auctioned ? null :
                            <>
                                <Link to="/signin">
                                    <div className="favoriteImg">
                                        <FaRegHeart />
                                    </div>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            }
        </>
    )
}

export default ProductCard