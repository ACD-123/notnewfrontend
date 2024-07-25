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

function ScrollToTop() {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}
const PublicRoutes = () => {
	const [cartFullResponse, setCartFullResponse] = useState([]);

	const getCartCount = () => {
		CartServices.self()
			.then((res) => {
				setCartFullResponse(res)
				console.log(res, 'cartFullResponse?.data?.length');
			}).catch((error) => {
			})
	};

	const getCartCountGuest = () => {
		const guest_user_id = localStorage.getItem('guest_user_id');
		CartServices.selfGuest(guest_user_id)
			.then((res) => {
				setCartFullResponse(res)
				console.log(res, 'cartFullResponse?.data?.length');
			}).catch((error) => {
			})
	};

	useEffect(() => {
		const token = localStorage.getItem('access_token');
		if (token === null) {
			getCartCountGuest()
		} else {
			getCartCount()
		}
	}, [])
	return (
		<>
			<BrowserRouter>
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Home cartFullResponse={cartFullResponse} />} />
					<Route path="/signup" element={<SignUp />} />
					{/* <Route path="/emailverification/:id/:guid/:expires/:email" element={<EmailVerification />} /> */}
					<Route path="/emailverification/:email" element={<EmailVerification />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/more-to-love" element={<MoreToLove cartFullResponse={cartFullResponse} />} />
					<Route path="/top-category" element={<TopCategory cartFullResponse={cartFullResponse} />} />
					<Route path="/top-sellers" element={<Topsellers cartFullResponse={cartFullResponse} />} />
					<Route path="/top-selling-prodcuts" element={<TopSellingProducts cartFullResponse={cartFullResponse} />} />
					<Route path="/hot-deals" element={<HotDeals cartFullResponse={cartFullResponse} />} />
					<Route path="/category" element={<SingleCategory cartFullResponse={cartFullResponse} />} />
					<Route path="/sub-category" element={<SubCategory cartFullResponse={cartFullResponse} />} />
					<Route path="/auctions" element={<Auctions cartFullResponse={cartFullResponse} />} />
					<Route path="/product-filter" element={<AllProducts cartFullResponse={cartFullResponse} />} />
					<Route path="/personal-info" element={<PersonalInformation cartFullResponse={cartFullResponse} />} />
					<Route path="/AllNewProducts" element={<AllNewProducts cartFullResponse={cartFullResponse} />} />
					<Route path="/forget-password" element={<PasswordRecovery />} />
					<Route path="/forgotverification/:email" element={<ForgotVerification />} />
					<Route path="/resetpassword/:email" element={<ResetPassword />} />
					<Route path="/cart" element={<ShoppingCart getCartCount={getCartCount} cartFullResponses={cartFullResponse} getCartCountGuest={getCartCountGuest} />} />
					<Route path="/categorykeyword/:guid" element={<CategoryKeyword cartFullResponse={cartFullResponse} />} />
					<Route path="/checkout" element={<Checkout cartFullResponse={cartFullResponse} />} />
					<Route path="/checkout-buynow" element={<CheckoutBuyNow cartFullResponse={cartFullResponse} />} />
					<Route path="/checkouts/:guid" element={<Checkout cartFullResponse={cartFullResponse} />} />
					<Route path="/singleproduct/:guid" element={<SingleProduct getCartCount={getCartCount} getCartCountGuest={getCartCountGuest} cartFullResponse={cartFullResponse} />} />
					<Route path="/customerdashboard" element={<MainDashboard cartFullResponse={cartFullResponse} />} />
					<Route path="/bidView/:guid" element={<BidView cartFullResponse={cartFullResponse} />} />
					<Route path="/allcategories" element={<CategoryPage cartFullResponse={cartFullResponse} />} />
					<Route path="/sellershop/:guid" element={<SellerShop cartFullResponse={cartFullResponse} />} />
					<Route path="/auctionproduct/:guid" element={<AuctionSingleProductPage cartFullResponse={cartFullResponse} />} />
					<Route path="/bidwin/:guid" element={<BidWin cartFullResponse={cartFullResponse} />} />
					<Route path="/searchhistory" element={<SearchHistory />} />
					<Route path="/ongoingorder/:guid" element={<OngoingOrderManagement />} />
					<Route path="/completedorder/:guid" element={<CompleteOrderManagement />} />
					<Route path="/refund/:guid" element={<Refund cartFullResponse={cartFullResponse} />} />
					<Route path="/transactions" element={<MyTransactions />} />
					<Route path="/instock" element={<InStock />} />
					<Route path="/outstock" element={<OutStock />} />
					<Route path="/productupload" element={<ProductUpload />} />
					<Route path="/my-seller-account" element={<MySellerAccount cartFullResponse={cartFullResponse} />} />
					<Route path="/search-product" element={<SearchProduct cartFullResponse={cartFullResponse} />} />
					<Route path="*" element={<NotFound cartFullResponse={cartFullResponse} />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default PublicRoutes;
