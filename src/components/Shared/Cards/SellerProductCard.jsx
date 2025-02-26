import React from "react";
import blank from "../../../assets/Images/Productcard/blank.jpg";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const SellerProductCard = ({ data, setSubmitted, setProductId, deleteSellerProduct }) => {

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
                        {(!data?.auctioned && data?.recurring === 0) ? (<span className="auction-badge">{data?.soldstatus}</span>) : null}
                        {(!data?.auctioned && data?.recurring === 1) ? (<span className="auction-badge">{data?.soldstatus}</span>) : null}
                    </Link>

                    {(data?.auctioned && data?.recurring != 0 && data?.recurring != 1 && data?.underage == 1) ? (<span className="auction-badge">Auction</span>) : null}
                    {(data?.auctioned && data?.recurring != 0 && data?.recurring != 1 && data?.underage == 0) ? (<span className="auction-badge-21">Auction</span>) : null}
                    {data?.underage == 0 && <span className="plus21">21 +</span>}
                    <div className="px-2">
                        <>
                            <h3>{data?.name}</h3>
                            <h4>{data?.description}</h4>
                            <h2>
                                <span>
                                    ${data?.bid_price}
                                </span>
                                <div className="edit" onClick={() => { setSubmitted(true); setProductId(data?.guid) }}>Edit</div>
                                <div className="delete" onClick={() => { deleteSellerProduct(data?.id) }}><MdDelete /></div>
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
                    {(!data?.auctioned && data?.recurring === 0) ? (<span className="auction-badge">{data?.soldstatus}</span>) : null}
                    {(!data?.auctioned && data?.recurring === 1) ? (<span className="auction-badge">{data?.soldstatus}</span>) : null}
                    </Link>
                    {(data?.auctioned && data?.recurring != 0 && data?.recurring != 1 && data?.underage == 1) ? (<span className="auction-badge">Auction</span>) : null}
                    {(data?.auctioned && data?.recurring != 0 && data?.recurring != 1 && data?.underage == 0) ? (<span className="auction-badge-21">Auction</span>) : null}
                    {data?.underage == 0 && <span className="plus21">21 +</span>}
                    <div className="px-2">

                        <h3>{data?.name}</h3>
                        <h4>{data?.description}</h4>
                        <h2>
                            {data?.sale_price > 0 ?
                                <>
                                    <span>
                                        ${data?.sale_price}
                                        <div className="circle"></div>
                                        <div className="sale-price">${data?.price}</div>
                                    </span>
                                    <div className="edit" onClick={() => { setSubmitted(true); setProductId(data?.guid) }}>Edit</div>
                                    <div className="delete" onClick={() => { deleteSellerProduct(data?.id) }}><MdDelete /></div>
                                </>
                                :
                                <>
                                    <span>${data?.price}</span>
                                    <div className="edit" onClick={() => { setSubmitted(true); setProductId(data?.guid) }}>Edit</div>
                                    <div className="delete" onClick={() => { deleteSellerProduct(data?.id) }}><MdDelete /></div>
                                </>
                            }
                        </h2>
                    </div>
                </div>
            }
        </>
    )
}

export default SellerProductCard