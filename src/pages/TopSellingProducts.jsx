import React, { useEffect, useState } from 'react'
import HomeService from '../services/API/HomeService';
import Header from '../components/Header';
import ProductSkeletonLoader from '../components/Shared/ProductSkeletonLoader';
import NoDataFound from '../components/Shared/NoDataFound';
import GetSurprisedBanner from '../components/Elements/GetSurprisedBanner';
import Footer from '../components/Footer';
import ProductCard from '../components/Shared/Cards/ProductCard';
// import Footer from '../../../components/Footer';
// import Header from "../../../components/Header";
// import ProductSkeletonLoader from '../../../components/Shared/ProductSkeletonLoader';
// import HomeService from '../../../services/API/HomeService';
// import ProductCard from '../../../components/Shared/Cards/ProductCard';
// import GetSurprisedBanner from '../../../components/Elements/GetSurprisedBanner';
// import NoDataFound from '../../Shared/NoDataFound';
// import ProductCard from '../components/Shared/Cards/ProductCard';

const TopSellingProducts = () => {
    const [user, setUser] = useState({});
	const [data, setData] = useState([]);
	const [banners, setBanners] = useState([]);
	const [topSellingProducts, setTopSellingProducts] = useState([]);
	const [hotProducts, setHotProducts] = useState([]);
	const [topSelling, setTopSelling] = useState([]);
	const [loading, setLoading] = useState(true);
	const loggedInUser = JSON.parse(localStorage.getItem("user_details"));

	const getTopSelling = (id) => {
		HomeService.getTopSelling(id)
			.then((response) => {
				setBanners(response?.data?.banners)
				setTopSellingProducts(response?.data?.products)
				setHotProducts(response?.data?.hot)
                setLoading(false)
			})
			.catch((e) => {
				console.log('error', e)
                setLoading(false)
			});
	};

	useEffect(() => {
		getTopSelling(loggedInUser?.id)
	}, [])

    const handleToggleFavourite = (index) => {
        const updatedProducts = [...topSellingProducts];
        updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
        setTopSellingProducts(updatedProducts);
    };
    return (
        <>
            <Header />
            <div className="top-sellers" id='productcard'>
                <div className="top-sellers-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="title">Top Sellign Products</h1>
                            </div>
                            {loading ?
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
                                (topSellingProducts?.length > 0 ?
                                    topSellingProducts?.map((data, index) => {
                                        return (
                                            <div className="col-lg-3" key={index}>
                                                <ProductCard data={data} handleToggleFavourite={handleToggleFavourite} index={index} />
                                            </div>
                                        )
                                    })
                                    :
                                    <NoDataFound title={'No latest auction products found'} />
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

export default TopSellingProducts