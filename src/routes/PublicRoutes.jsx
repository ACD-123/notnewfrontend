import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import Home from "../pages/Home"
import SignUp from "../pages/Account/SignUp"
import EmailVerification from "../pages/Account/EmailVerification"
import SignIn from "../pages/Account/SignIn"
import TopCategory from "../pages/TopCategory"
import SingleCategory from "../components/Products/Archive/SingleCategory"
import AllProducts from "../components/Products/Archive/AllProducts"
import PasswordRecovery from "../pages/Account/PasswordRecovery"
import ResetPassword from "../pages/Account/ResetPassword"
import ForgotVerification from "../pages/Account/ForgotVerification"
import ShoppingCart from "../pages/Account/ShoppingCart"
import CategoryKeyword from "../components/Products/Archive/CategoryKeyword"
import Checkout from "../pages/Account/Checkout"
import SingleProduct from "../components/Products/Archive/SingleProduct_old"
import MainDashboard from '../components/CustomerDashboard/MainDashboard'
import "../assets/css/app.css"
import BidView from "../components/CustomerDashboard/BidView"
import CategoryPage from "../pages/Account/CategoryPage"
import SellerShop from "../components/Seller/SellerPages/SellerShop"
import AuctionSingleProductPage from '../components/Auction/AuctionSingleProductPage'
import BidWin from "../components/Auction/BidWin"
import SearchHistory from "../components/AccountsSetting/PersonalInfoAllPages/SearchHistory"
import OngoingOrderManagement from "../components/OrderManagement/OngoingOrderManagement"
import CompleteOrderManagement from "../components/OrderManagement/CompleteOrderManagement"
import MyTransactions from "../components/AccountsSetting/SellerSetup/MyTransactions"
import InStock from "../components/AccountsSetting/SellerSetup/InStock"
import OutStock from "../components/AccountsSetting/SellerSetup/InStock"
import Auctions from "../components/Products/Archive/Auctions"
import ProductUpload from "../components/Products/ProductUpload"
import NotFound from "../pages/NotFound"
import CheckoutBuyNow from "../pages/Account/CheckoutBuyNow"
import AllNewProducts from "../components/Products/Archive/AllNewProducts"
import Refund from "../components/PurchaseHistory/Refund"
import SubCategory from "../components/Products/Archive/SubCategory"
import Topsellers from "../pages/Topsellers"
import HotDeals from "../pages/HotDeals"
import MySellerAccount from "../pages/MySellerAccount"
import SearchProduct from "../pages/SearchProduct"
import TopSellingProducts from "../pages/TopSellingProducts"
import PersonalInformation from "../pages/PersonalInformation"
import { MoreToLove } from "../pages/MoreToLove"
import CartServices from "../services/API/CartServices"
import { UserNotification } from "../pages/UserNotification"
import { toast } from "react-toastify"
import TwentyOnePlus from "../pages/TwentyOnePlus"
import NewArrivals21Plus from "../pages/NewArrivals21Plus"
import TopSelling21Plus from "../pages/TopSelling21Plus"
import ExploreAll21Plus from "../pages/ExploreAll21Plus"
import laravelEcho from "../socket"
import HomeService from "../services/API/HomeService"

function ScrollToTop() {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}
const PublicRoutes = () => {
	const [cartFullResponse, setCartFullResponse] = useState([]);
	const [notificationCount, setNotificationCount] = useState([]);
	const user_id = localStorage.getItem('user_id');


	useEffect(() => {
		const channel = laravelEcho.channel("notification-channel-" + user_id);
		channel.listen(".notification-channel", (data) => {
			getNotificationCount()
		});

		return () => {
			channel.stopListening(".notification-channel");
		};
	}, []);

	const getCartCount = () => {
		CartServices.self()
			.then((res) => {
				setCartFullResponse(res)
			}).catch((error) => {
				toast.error(error?.response?.data?.message)
			})
	};

	const getCartCountGuest = () => {
		const guest_user_id = localStorage.getItem('guest_user_id');
		CartServices.selfGuest(guest_user_id)
			.then((res) => {
				setCartFullResponse(res)
			}).catch((error) => {
				toast.error(error?.response?.data?.message)
			})
	};

	const getNotificationCount = () => {
		HomeService.getNotificationCount(user_id)
			.then((res) => {
				setNotificationCount(res?.data);
			}).catch((error) => {
				toast.error(error?.response?.data?.message)
			});
	};

	const token = localStorage.getItem('access_token');
	useEffect(() => {
		if (token === null) {
			getCartCountGuest()
		} else {
			getCartCount();
			getNotificationCount();
		}
	}, [user_id])


	return (
		<>
			<BrowserRouter>
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Home cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/emailverification/:email" element={<EmailVerification />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/21-plus" element={<TwentyOnePlus cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/explore-all-21-plus" element={<ExploreAll21Plus cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/new-arrival-21-plus" element={<NewArrivals21Plus cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/top-selling-21-plus" element={<TopSelling21Plus cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/more-to-love" element={<MoreToLove cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/top-category" element={<TopCategory cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/top-sellers" element={<Topsellers cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/top-selling-prodcuts" element={<TopSellingProducts cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/hot-deals" element={<HotDeals cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/category" element={<SingleCategory cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/sub-category" element={<SubCategory cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/auctions" element={<Auctions cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/product-filter" element={<AllProducts cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/personal-info" element={<PersonalInformation cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/AllNewProducts" element={<AllNewProducts cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/forget-password" element={<PasswordRecovery />} />
					<Route path="/forgotverification/:email" element={<ForgotVerification />} />
					<Route path="/resetpassword/:email" element={<ResetPassword />} />
					<Route path="/cart" element={<ShoppingCart getCartCount={getCartCount} cartFullResponses={cartFullResponse} getCartCountGuest={getCartCountGuest} notificationCount={notificationCount} />} />
					<Route path="/categorykeyword/:guid" element={<CategoryKeyword cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/checkout" element={<Checkout cartFullResponse={cartFullResponse} getCartCount={getCartCount} notificationCount={notificationCount} />} />
					<Route path="/checkout-buynow" element={<CheckoutBuyNow cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/checkouts/:guid" element={<Checkout cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/singleproduct/:guid" element={<SingleProduct getCartCount={getCartCount} getCartCountGuest={getCartCountGuest} cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/customerdashboard" element={<MainDashboard cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/bidView/:guid" element={<BidView cartFullResponse={cartFullResponse} />} notificationCount={notificationCount} />
					<Route path="/allcategories" element={<CategoryPage cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/sellershop/:guid" element={<SellerShop cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/auctionproduct/:guid" element={<AuctionSingleProductPage cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/bidwin/:guid" element={<BidWin cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/searchhistory" element={<SearchHistory />} />
					<Route path="/notification" element={<UserNotification getNotificationCount={getNotificationCount} notificationCount={notificationCount} />} />
					<Route path="/ongoingorder/:guid" element={<OngoingOrderManagement />} />
					<Route path="/completedorder/:guid" element={<CompleteOrderManagement />} />
					<Route path="/refund/:guid" element={<Refund />} />
					<Route path="/transactions" element={<MyTransactions />} />
					<Route path="/instock" element={<InStock />} />
					<Route path="/outstock" element={<OutStock />} />
					<Route path="/productupload" element={<ProductUpload />} />
					<Route path="/my-seller-account" element={<MySellerAccount cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="/search-product" element={<SearchProduct cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
					<Route path="*" element={<NotFound cartFullResponse={cartFullResponse} notificationCount={notificationCount} />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default PublicRoutes;
