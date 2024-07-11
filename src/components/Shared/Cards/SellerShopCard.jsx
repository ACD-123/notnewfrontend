import React from "react";
import blank from "../../../assets/Images/Productcard/blank.jpg";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const SellerShopCard = ({ data}) => {

    return (
        <>
            {data?.auctioned ?
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

                    {(data?.auctioned && data?.recurring !== 0 && data?.recurring !== 1) ? (<span className="auction-badge">Auction</span>) : null}
                    {(!data?.auctioned && data?.recurring === 0) ? (<span className="auction-badge">{data?.soldstatus}</span>) : null}
                    {(!data?.auctioned && data?.recurring === 1) ? (<span className="auction-badge">{data?.soldstatus}</span>) : null}
                    <div className="px-2">
                        <>
                            <h3>{data?.name}</h3>
                            <h4>{data?.description}</h4>
                            <h2>
                                    ${data?.bid_price}
                            </h2>
                        </>
                    </div>
                </div>
                :
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
                    {(data?.auctioned && data?.recurring !== 0 && data?.recurring !== 1) ? (<span className="auction-badge">Auction</span>) : null}
                    {(!data?.auctioned && data?.recurring === 0) ? (<span className="auction-badge">{data?.soldstatus}</span>) : null}
                    {(!data?.auctioned && data?.recurring === 1) ? (<span className="auction-badge">{data?.soldstatus}</span>) : null}
                    <div className="px-2">

                        <h3>{data?.name}</h3>
                        <h4>{data?.description}</h4>
                        <h2>
                            {data?.sale_price > 0 ?
                                <>
                                        ${data?.price}
                                        <div className="circle"></div>
                                        <div className="sale-price">${data?.sale_price}</div>
                                </>
                                :
                                <>
                                    ${data?.price}
                                </>
                            }
                        </h2>
                    </div>
                </div>
            }
        </>
    )
}

export default SellerShopCard