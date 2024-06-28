import React, { useEffect, useState } from 'react'
import SellerServices from '../services/API/SellerServices';
import Footer from '../components/Footer';
import Header from "../components/Header";
import ProductSkeletonLoader from '../components/Shared/ProductSkeletonLoader';
import HomeService from '../services/API/HomeService';
import ProductCard from '../components/Shared/Cards/ProductCard';
import GetSurprisedBanner from '../components/Elements/GetSurprisedBanner';

const HotDeals = () => {
    const [hotProducts, setHotProducts] = useState([]);
    const [Loader, setLoader] = useState(true)
    const user_details = JSON.parse(localStorage.getItem('user_details'));
    const getTopSellers = (id) => {
        HomeService.getTopSelling()
            .then((response) => {
                console.log(response?.data, 'topseller');
                setHotProducts(response?.data?.hot)
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

    const handleToggleFavourite = (index) => {
        const updatedProducts = [...hotProducts];
        updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
        setHotProducts(updatedProducts);
      };
    return (
        <>
            <Header />
            <div className="top-sellers">
                <div className="top-sellers-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="title">Hot Deals</h1>
                            </div>
                            {Loader ?
                                <>
                                    <div className="col-lg-3">
                                        <ProductSkeletonLoader />
                                    </div>
                                    <div className="col-lg-3">
                                        <ProductSkeletonLoader />
                                    </div>
                                    <div className="col-lg-3">
                                        <ProductSkeletonLoader />
                                    </div>
                                    <div className="col-lg-3">
                                        <ProductSkeletonLoader />
                                    </div>
                                </>
                                :
                                hotProducts?.map((data, index) => {
                                    return (
                                        <div className="col-lg-3" key={index}>
                                            <ProductCard data={data} handleToggleFavourite={handleToggleFavourite} index={index}/>
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

export default HotDeals