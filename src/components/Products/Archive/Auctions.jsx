import React, { useEffect, useState } from 'react'
import Footer from '../../../components/Footer';
import Header from "../../../components/Header";
import ProductSkeletonLoader from '../../../components/Shared/ProductSkeletonLoader';
import HomeService from '../../../services/API/HomeService';
import ProductCard from '../../../components/Shared/Cards/ProductCard';
import GetSurprisedBanner from '../../../components/Elements/GetSurprisedBanner';
import NoDataFound from '../../Shared/NoDataFound';
import { toast } from 'react-toastify';

const Auctions = ({cartFullResponse}) => {
    const [auctionProducts, setAuctionProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const [Loader, setLoader] = useState(true)
    const user_details = JSON.parse(localStorage.getItem('user_details'));
    const getAuctionProducts = () => {
        HomeService.getAuctionProducts(user_details?.id)
            .then((response) => {
                setAuctionProducts(response?.data?.auctioned)
                setLatestProducts(response?.data?.latest)
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
                toast.error(error?.response?.data?.message)
            });
    };

    useEffect(() => {
        getAuctionProducts(user_details?.id)
    }, [])

    const handleToggleFavouriteAuction = (index) => {
        const updatedProducts = [...auctionProducts];
        updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
        setAuctionProducts(updatedProducts);
    };
    const handleToggleFavouriteLatest = (index) => {
        const updatedProducts = [...auctionProducts];
        updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
        setAuctionProducts(updatedProducts);
    };
    return (
        <>
            <Header cartFullResponse={cartFullResponse}/>
            <div className="top-sellers">
                <div className="top-sellers-wrap" id='productcard'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="title">Latest Auctions</h1>
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
                                (latestProducts?.length > 0 ?
                                    latestProducts?.map((data, index) => {
                                        return (
                                            <div className="col-lg-3" key={index}>
                                                <ProductCard data={data} handleToggleFavourite={handleToggleFavouriteLatest} index={index} />
                                            </div>
                                        )
                                    })
                                    :
                                    <NoDataFound title={'No latest auction products found'} />
                                )
                            }
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="title">Auctions</h1>
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
                                (auctionProducts?.length > 0 ?
                                    auctionProducts?.map((data, index) => {
                                        return (
                                            <div className="col-lg-3" key={index}>
                                                <ProductCard data={data} handleToggleFavourite={handleToggleFavouriteAuction} index={index} />
                                            </div>
                                        )
                                    })
                                    :
                                    <NoDataFound title={'No auction products found'} />
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

export default Auctions