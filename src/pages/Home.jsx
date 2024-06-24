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
	const [topSelling, setTopSelling] = useState([]);
	const getUser = () => {
		UserServices.detail()
			.then((response) => {
				setUserDetails(response);
				setUser(response);
				localStorage.setItem('user_details', JSON.parse(response));
			})
			.catch((e) => {
				console.log('error', e)
			});
	};
	useEffect(() => {
		if (isLoggedin()) {
			getUser();
		}
	}, []);

	const getTopSelling = () => {
		HomeService.getTopSelling()
			.then((response) => {
				setData(response?.data)
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
			{/* top banner */}
			<Banner data={data} />
			{/* new items */}
			<Items data={data} title={'New Items'}/>
			{/* top selling products */}
			<TopSellingProducts data={data} title={'Top Selling Products'}/>
			{/* hot daily deals */}
			<HotSellingProducts data={data} title={'Hot Selling Products'}/>
			{/* Explore Known Categories */}
			{/* {isLoggedin() ? (<RecentViewedItems />) : (null)} */}
			
			{/* <Category /> */}
			<CategoryList />
			<GetSurprisedBanner />
			{/* <Category /> */}
			{/* <FeaturedProducts /> */}
			<Footer />

		</>
	);
};

export default Home;
