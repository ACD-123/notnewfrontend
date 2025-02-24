import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Elements/Banner"
import Items from "../components/Products/Items"
import CategoryList from "../components/Products/Archive/CategoryList"
import GetSurprisedBanner from "../components/Elements/GetSurprisedBanner"
import HomeService from "../services/API/HomeService";
import TopSellingProducts from "../components/Products/TopSellingProducts";
import HotSellingProducts from "../components/Products/HotSellingProducts";
import HomeCategorySlider from "../components/Shared/Sliders/HomeCategorySlider";
import { toast } from "react-toastify";
import Auction from "../components/TwentyOnePlus/Auction";
import UsedProducts from "../components/Products/UsedProducts";


const Home = ({ cartFullResponse, notificationCount }) => {
	const [banners, setBanners] = useState([]);
	const [featureBanners, setFeatureBanners] = useState([]);
	const [topSellingProducts, setTopSellingProducts] = useState([]);
	const [hotProducts, setHotProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const user_id = localStorage.getItem('user_id');

	const getTopSelling = (id) => {
		HomeService.getTopSelling(id)
			.then((response) => {
				setBanners(response?.data?.banners)
				setFeatureBanners(response?.data?.featuredBanners)
				setTopSellingProducts(response?.data?.products?.slice(0, 4))
				setHotProducts(response?.data?.hot?.slice(0, 4))
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
			<Header cartFullResponse={cartFullResponse} notificationCount={notificationCount} />
			<HomeCategorySlider />
			<Items title={'New Arrivals '} />
			<UsedProducts />
			<TopSellingProducts loading={loading} data={topSellingProducts} setTopSellingProducts={setTopSellingProducts} title={'Top Selling Products'} />
			<HotSellingProducts loading={loading} data={hotProducts} setHotProducts={setHotProducts} title={'Hot Selling Products'} />
			<Auction type={1} title={'Latest Auctions'} />
			<CategoryList />
			<GetSurprisedBanner featureBanners={featureBanners}/>
			<Footer />

		</>
	);
};

export default Home;
