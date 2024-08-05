import React from "react";
import blank from "../../../assets/Images/Productcard/blank.jpg";
import { Link } from "react-router-dom";
import ProductServices from "../../../services/API/ProductServices";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";

const RecentlySearchCard = ({ data, removeProductFromSearchList, index }) => {
    const isLoggedin = localStorage.getItem("access_token");
    const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
    

    const removeProduct = async (productId) => {
        removeProductFromSearchList(productId)
    };

    return (
        <>
            <div className="productlist">
                <Link
                    to={data?.auctioned ? `/auctionproduct/${data?.guid}` : `/singleproduct/${data?.guid}`}>
                    <img
                        src={data?.media?.length > 0 ? data?.media?.[0]?.name : blank
                        }
                        alt={data?.media?.length > 0 ? data?.media?.[0]?.name : "blank"
                        }
                    />
                </Link>
                {data?.auctioned ? (<span className="auction-badge">Auction</span>) : null}
                <div className="px-2">
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
                </div>
                <span className="d-r-s-o-p-i" onClick={() =>{removeProduct(data?.search_id)}}><MdDeleteOutline /></span>
            </div>
        </>
    )
}

export default RecentlySearchCard