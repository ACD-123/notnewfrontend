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
import HomeCategorySlider from "../components/Shared/Sliders/HomeCategorySlider";
import { toast } from "react-toastify";
import Auction from "../components/TwentyOnePlus/Auction";

const Home = ({cartFullResponse , notificationCount}) => {
	const [user, setUser] = useState({});
	const [data, setData] = useState([]);
	const [banners, setBanners] = useState([]);
	const [topSellingProducts, setTopSellingProducts] = useState([]);
	const [hotProducts, setHotProducts] = useState([]);
	const [topSelling, setTopSelling] = useState([]);
	const [loading, setLoading] = useState(true);
	const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
	const user_id = localStorage.getItem('user_id');

	const getTopSelling = (id) => {
		HomeService.getTopSelling(id)
			.then((response) => {
				setBanners(response?.data?.banners?.slice(0,4))
				setTopSellingProducts(response?.data?.products?.slice(0,4))
				setHotProducts(response?.data?.hot?.slice(0,4))
				setTimeout(() => {
					setLoading(false)
				}, 1000);
			})
			.catch((error) => {
				toast.error(error?.response?.data?.message)
			});
	};

	useEffect(() => {
		getTopSelling(user_id)
	}, [user_id])

	return (
		<>
			<Header cartFullResponse={cartFullResponse} notificationCount={notificationCount}/>
			<Banner data={banners} loading={loading} />
			<HomeCategorySlider/>
			<Items title={'New Items'} />
			<TopSellingProducts loading={loading} data={topSellingProducts} setTopSellingProducts={setTopSellingProducts} title={'Top Selling Products'} />
			<HotSellingProducts loading={loading} data={hotProducts} setHotProducts={setHotProducts} title={'Hot Selling Products'} />
			<Auction type={1} title={'Latest Auctions'}/>
			<CategoryList />
			<GetSurprisedBanner />
			<Footer />

		</>
	);
};

export default Home;
