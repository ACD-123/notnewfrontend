import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Elements/Banner"
import RecentViewedItems from "../components/Products/RecentViewedItems"
import Items from "../components/Products/Items"
import Category from "../components/Products/Archive/Category"
import CategoryList from "../components/Products/Archive/CategoryList"
import GetSurprisedBanner from "../components/Elements/GetSurprisedBanner"
import FeaturedProducts from "../components/Products/Archive/FeaturedProducts"
import { setUserDetails, isLoggedin, getUserDetails } from "../services/Auth"; // ~/services/Auth
import UserServices from "../services/API/UserServices"; //~/services/API/AuthService
import HomeService from "../services/API/HomeService"; //~/services/API/AuthService
import TopSellingProducts from "../components/Products/TopSellingProducts";
import HotSellingProducts from "../components/Products/HotSellingProducts";

const Home = () => {
	const [user, setUser] = useState({});
	const [data, setData] = useState([]);
	const [banners, setBanners] = useState([]);
	const [topSellingProducts, setTopSellingProducts] = useState([]);
	const [hotProducts, setHotProducts] = useState([]);
	const [topSelling, setTopSelling] = useState([]);
	const [loading, setLoading] = useState(true);

	const getTopSelling = () => {
		HomeService.getTopSelling()
			.then((response) => {
				setBanners(response?.data?.banners)
				setTopSellingProducts(response?.data?.products)
				setHotProducts(response?.data?.hot)
				setTimeout(() => {
					setLoading(false)
				}, 1000);
			})
			.catch((e) => {
				console.log('error', e)
			});
	};

	useEffect(() => {
		getTopSelling()
	}, [])

	return (
		<>
			<Header />
			<Banner data={banners} loading={loading} />
			<Items title={'New Items'} />
			<TopSellingProducts loading={loading} data={topSellingProducts} setTopSellingProducts={setTopSellingProducts} title={'Top Selling Products'} />
			<HotSellingProducts loading={loading} data={hotProducts} setHotProducts={setHotProducts} title={'Hot Selling Products'} />
			<CategoryList />
			<GetSurprisedBanner />
			<Footer />

		</>
	);
};

export default Home;
