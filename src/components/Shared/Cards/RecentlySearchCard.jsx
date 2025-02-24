import React from "react";
import blank from "../../../assets/Images/Productcard/blank.jpg";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

const RecentlySearchCard = ({ data, removeProductFromSearchList, index }) => {

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
                </div>
                <span className="d-r-s-o-p-i" onClick={() => { removeProduct(data?.search_id) }}><MdDeleteOutline /></span>
            </div>
        </>
    )
}

export default RecentlySearchCard