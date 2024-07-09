import React, { useEffect } from "react"
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
import Watchlist from "../components/CustomerDashboard/Watchlist"
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

function ScrollToTop() {
	const { pathname } = useLocation();
  
	useEffect(() => {
	  // Scroll to the top whenever pathname changes
	  window.scrollTo(0, 0);
	}, [pathname]);
  
	return null;
  }
const PublicRoutes = () => {
	return (
		<>
			<BrowserRouter>
			<ScrollToTop />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<SignUp />} />
					{/* <Route path="/emailverification/:id/:guid/:expires/:email" element={<EmailVerification />} /> */}
					<Route path="/emailverification/:email" element={<EmailVerification />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/top-category" element={<TopCategory />} />
					<Route path="/top-sellers" element={<Topsellers />} />
					<Route path="/hot-deals" element={<HotDeals />} />
					<Route path="/category" element={<SingleCategory />} />
					<Route path="/sub-category" element={<SubCategory />} />
					<Route path="/auctions" element={<Auctions />} />
					<Route path="/AllProducts" element={<AllProducts />} />
					<Route path="/AllNewProducts" element={<AllNewProducts/>} />
					<Route path="/forget-password" element={<PasswordRecovery />} />
					<Route path="/forgotverification/:email" element={<ForgotVerification />} />
					<Route path="/resetpassword/:email" element={<ResetPassword />} />
					<Route path="/shoppingcart" element={<ShoppingCart />} />
					<Route path="/categorykeyword/:guid" element={<CategoryKeyword />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/checkout-buynow/:guid" element={<CheckoutBuyNow />} />
					<Route path="/checkouts/:guid" element={<Checkout />} />
					<Route path="/singleproduct/:guid" element={<SingleProduct />} />
					<Route path="/customerdashboard" element={<MainDashboard />} />
					<Route path="/bidView/:guid" element={<BidView />} />
					<Route path="/allcategories" element={<CategoryPage />} />
					<Route path="/sellershop/:guid" element={<SellerShop />} />
					<Route path="/auctionproduct/:guid" element={<AuctionSingleProductPage />} />
					<Route path="/bidwin/:guid" element={<BidWin />} />
					<Route path="/searchhistory" element={<SearchHistory />} />
					<Route path="/ongoingorder/:guid" element={<OngoingOrderManagement/>} />
					<Route path="/completedorder/:guid" element={<CompleteOrderManagement/>} />
					<Route path="/refund/:guid" element={<Refund/>} />
					<Route path="/transactions" element={<MyTransactions/>} />
					<Route path="/instock" element={<InStock/>} />
					<Route path="/outstock" element={<OutStock/>} />
					<Route path="/watchlist" element={<Watchlist/>}/>
					<Route path="/productupload" element={<ProductUpload/>} />
					<Route path="/my-seller-account" element={<MySellerAccount/>} />
					<Route path="*" element={<NotFound/>} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default PublicRoutes;
