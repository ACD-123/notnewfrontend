import React, { useEffect, useState } from 'react'

import ProductCard from '../components/Shared/Cards/ProductCard';
import ProductSkeletonLoader from '../components/Shared/ProductSkeletonLoader';
import Header from '../components/Header';
import NoDataFound from '../components/Shared/NoDataFound';
import GetSurprisedBanner from '../components/Elements/GetSurprisedBanner';
import Footer from '../components/Footer';
import HomeService from '../services/API/HomeService';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const SearchProduct21Plus = ({cartFullResponse , notificationCount}) => {
    const [auctionProducts, setAuctionProducts] = useState([]);
    const [Loader, setLoader] = useState(true)
    const user_details = JSON.parse(localStorage.getItem('user_details'));
    const user_id = localStorage.getItem('user_id');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const text = searchParams.get('text');
    const [searchProduct, setSearchProduct] = useState([]);

    const handelInputChange = (text) => {
    HomeService.getSearchProductsUnderAge(text).then((res) => {
      setSearchProduct(res?.data)
      setLoader(false)
    }).catch((error) => {
        setLoader(false)
        toast.error(error?.response?.data?.message)
    });
  }

    useEffect(() => {
        handelInputChange(text)
    }, [text])

    const handleToggleFavourite = (index) => {
        const updatedProducts = [...searchProduct];
        updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
        setSearchProduct(updatedProducts);
    };
    return (
        <>
            <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount}/>
            <div className="top-sellers" id='productcard'>
                <div className="top-sellers-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="title">Search Product</h1>
                            </div>
                            {Loader ?
                                <>
                                    <div className="col-lg-3 col-md-6 col-sm-12">
                                        <ProductSkeletonLoader />
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12" id='hide-on-mobile-768'>
                                        <ProductSkeletonLoader />
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12" id="hide-on-mobile-991">
                                        <ProductSkeletonLoader />
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12" id="hide-on-mobile-991">
                                        <ProductSkeletonLoader />
                                    </div>
                                </>
                                :
                                (searchProduct?.products?.length > 0 ?
                                    searchProduct?.products?.map((data, index) => {
                                        return (
                                            <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                                                <ProductCard data={data} handleToggleFavourite={handleToggleFavourite} index={index} />
                                            </div>
                                        )
                                    })
                                    :
                                    <NoDataFound title={'No Data Found'} />
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

export default SearchProduct21Plus
