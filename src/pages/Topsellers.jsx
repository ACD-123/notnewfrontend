import React, { useEffect, useState } from 'react'
import SellerServices from '../services/API/SellerServices';
import Footer from '../components/Footer';
import Header from "../components/Header";
import ProductSkeletonLoader from '../components/Shared/ProductSkeletonLoader';
import GetSurprisedBanner from '../components/Elements/GetSurprisedBanner';

const Topsellers = () => {
    const [seller, setSeller] = useState([])
    const [Loader, setLoader] = useState(true)
    const user_details = JSON.parse(localStorage.getItem('user_details'));
    const getTopSellers = (id) => {
        SellerServices.getTopSellers(id)
            .then((response) => {
                console.log(response?.data , 'topseller');
                setSeller(response?.data?.top_sellers)
                setLoader(false)
            })
            .catch((e) => {
                setLoader(false)
                console.log('error', e)
            });
    };

    useEffect(() => {
        getTopSellers(user_details?.id)
    }, [])
    return (
        <>
            <Header />
            <div className="top-sellers" id='productcard'>
                <div className="top-sellers-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                            <h1 className="title">Top Sellers</h1>
                            </div>
                            {Loader ?
                            <>
                            <div className="col-lg-3">
                                <ProductSkeletonLoader/>
                            </div>
                            <div className="col-lg-3">
                                <ProductSkeletonLoader/>
                            </div>
                            <div className="col-lg-3">
                                <ProductSkeletonLoader/>
                            </div>
                            <div className="col-lg-3">
                                <ProductSkeletonLoader/>
                            </div>
                            </>
                            :
                            seller?.map((data, index) => {
                                return (
                                    <div className="col-lg-3" key={index}>
                                        <div className="top-seller-card">
                                            <img src={data?.sellerImage} alt="" />
                                            <h2>{data?.sellerName}</h2>
                                            <div className="button">
                                            <div className="button-wrap">
                                                <a href="">Visit Shop</a>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
            <GetSurprisedBanner />
            <Footer />
        </>
    )
}

export default Topsellers