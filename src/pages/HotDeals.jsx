import React, { useEffect, useState } from 'react'
import SellerServices from '../services/API/SellerServices';
import Footer from '../components/Footer';
import Header from "../components/Header";
import ProductSkeletonLoader from '../components/Shared/ProductSkeletonLoader';
import HomeService from '../services/API/HomeService';
import ProductCard from '../components/Shared/Cards/ProductCard';
import GetSurprisedBanner from '../components/Elements/GetSurprisedBanner';
import NoDataFound from '../components/Shared/NoDataFound';
import { toast } from 'react-toastify';

const HotDeals = ({cartFullResponse}) => {
    const [hotProducts, setHotProducts] = useState([]);
    const [Loader, setLoader] = useState(true)
    const getTopSellers = () => {
        const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
        HomeService.getTopSelling(loggedInUser?.id)
            .then((response) => {
                setHotProducts(response?.data?.hot)
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
                toast.error(error?.response?.data?.message)
            });
    };

    useEffect(() => {
        getTopSellers()
    }, [])

    const handleToggleFavourite = (index) => {
        const updatedProducts = [...hotProducts];
        updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
        setHotProducts(updatedProducts);
    };
    return (
        <>
            <Header cartFullResponse={cartFullResponse}/>
            <div className="top-sellers">
                <div className="top-sellers-wrap" id='productcard'>
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
                                (hotProducts?.length > 0 ?
                                    hotProducts?.map((data, index) => {
                                        return (
                                            <div className="col-lg-3" key={index}>
                                                <ProductCard data={data} handleToggleFavourite={handleToggleFavourite} index={index} />
                                            </div>
                                        )
                                    })
                                    :
                                    <NoDataFound title={'No hot deal products found'} />
                                )
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