import React, { useEffect, useState } from 'react'
import HomeService from '../services/API/HomeService';
import Header from '../components/Header';
import ProductSkeletonLoader from '../components/Shared/ProductSkeletonLoader';
import NoDataFound from '../components/Shared/NoDataFound';
import GetSurprisedBanner from '../components/Elements/GetSurprisedBanner';
import Footer from '../components/Footer';
import ProductCard from '../components/Shared/Cards/ProductCard';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TopSelling21Plus = ({ cartFullResponse , notificationCount}) => {
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
    const user_id = localStorage.getItem('user_id');

    const getTopSellingUnderAge = (id) => {
        HomeService.getTopSellingUnderAge(id)
            .then((response) => {
                setTopSellingProducts(response?.data?.products?.slice(0, 4))
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
            .catch((error) => {
                setLoading(false)
                toast.error(error?.response?.data?.message)
            });
    };

    const navigate = useNavigate()
    useEffect(() => {
        const underage = localStorage.getItem('underage');
        if (underage == 1) {
            getTopSellingUnderAge(user_id)
        } else {
          navigate('/')
        }
      }, [])

    const handleToggleFavourite = (index) => {
        const updatedProducts = [...topSellingProducts];
        updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
        setTopSellingProducts(updatedProducts);
      };
    return (
        <>
            <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount}/>
            <div className="top-sellers" id='productcard'>
                <div className="top-sellers-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="title">Top Selling Products</h1>
                            </div>
                            {loading ?
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
                                (topSellingProducts?.length > 0 ?
                                    topSellingProducts?.map((data, index) => {
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

export default TopSelling21Plus