import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import SignUp from "../pages/Account/SignUp"
import EmailVerification from "../pages/Account/EmailVerification"
import SignIn from "../pages/Account/SignIn"
import TopCategory from "../pages/TopCategory"
import SingleCategory from "../components/Products/Archive/SingleCategory"
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

const PublicRoutes = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/emailverification/:id/:guid/:expires/:email" element={<EmailVerification />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/topcategory" element={<TopCategory />} />
					<Route path="/singlecategory/:guid" element={<SingleCategory />} />
					<Route path="/passwordrecovery" element={<PasswordRecovery />} />
					<Route path="/forgotverification/:email" element={<ForgotVerification />} />
					<Route path="/resetpassword/:email" element={<ResetPassword />} />
					<Route path="/shoppingcart" element={<ShoppingCart />} />
					<Route path="/categorykeyword/:guid" element={<CategoryKeyword />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/singleproduct/:guid" element={<SingleProduct />} />
					<Route path="/customerdashboard" element={<MainDashboard />} />
					<Route path="/bidView" element={<BidView />} />
					<Route path="/allcategories" element={<CategoryPage />} />
					<Route path="/sellershop" element={<SellerShop />} />
					<Route path="/auctionproduct" element={<AuctionSingleProductPage />} />
					<Route path="/bidwin" element={<BidWin />} />
					<Route path="/searchhistory" element={<SearchHistory />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default PublicRoutes;
