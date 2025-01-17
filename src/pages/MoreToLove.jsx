import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom';
import ProductServices from '../services/API/ProductServices';
import ProductSkeletonLoader from '../components/Shared/ProductSkeletonLoader';
import ProductCard from '../components/Shared/Cards/ProductCard';
import NoDataFound from '../components/Shared/NoDataFound';
import { toast } from 'react-toastify';

export const MoreToLove = ({cartFullResponse , notificationCount}) => {
    const [moreToLove , setMoreToLove] = useState([])
    const [Loader, setLoader] = useState(true)
    const user_details = JSON.parse(localStorage.getItem('user_details'));
    const user_id = localStorage.getItem('user_id');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const product_id = searchParams.get('id');
    const getAuctionProducts = (product_id) => {
        ProductServices.getMoreToLove(product_id)
            .then((response) => {
                setMoreToLove(response.data?.products);
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
                toast.error(error?.response?.data?.message)
            });
    };

    useEffect(() => {
        getAuctionProducts(product_id)
    }, [])

    const handleToggleFavourite = (index) => {
        const updatedProducts = [...moreToLove];
        updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
        setMoreToLove(updatedProducts);
      };
    return (
        <>
            <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount}/>
            <div className="top-sellers">
                <div className="top-sellers-wrap" id='productcard'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="title">More To Love</h1>
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
                                (moreToLove?.length > 0 ?
                                    moreToLove?.map((data, index) => {
                                        return (
                                            <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
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
            <Footer />
        </>
    )
}
