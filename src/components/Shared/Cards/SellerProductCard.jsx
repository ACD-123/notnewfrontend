import React from "react";
import blank from "../../../assets/Images/Productcard/blank.jpg";
import { Link } from "react-router-dom";

const SellerProductCard = ({ data, setSubmitted, setProductId }) => {

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

                    {data?.auctioned ? (<span className="auction-badge">Auction</span>) : null}
                    <div className="px-2">
                        <>
                            <h3>{data?.name}</h3>
                            <h4>{data?.description}</h4>
                            <h2>${data?.sale_price === 0 ? '0' : data?.sale_price}
                                <div className="edit" onClick={() => { setSubmitted(true); setProductId(data?.guid) }}>Edit</div>
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
                    {data?.auctioned ? (<span className="auction-badge">Auction</span>) : null}
                    <div className="px-2">

                        <h3>{data?.name}</h3>
                        <h4>{data?.description}</h4>
                        <h2>${data?.price}
                            {data?.sale_price > 0 ?
                                <>
                                    <div className="circle"></div>
                                    <div className="sale-price">${data?.sale_price}</div>
                                    <div className="edit" onClick={() => { setSubmitted(true); setProductId(data?.guid) }}>Edit</div>
                                </>
                                :
                                <div className="edit" onClick={() => { setSubmitted(true); setProductId(data?.guid) }}>Edit</div>
                            }
                        </h2>
                    </div>
                </div>
            }
        </>
    )
}

export default SellerProductCard