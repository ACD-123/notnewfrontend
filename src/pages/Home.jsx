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

const Home = () => {
	const [user, setUser] = useState({});

	const getUser = () => {
		UserServices.detail()
		  .then((response) => {
			setUserDetails(response);
			setUser(response);
			localStorage.setItem('user_details', JSON.parse(response));
		  })
		  .catch((e) => {
			console.log('error', e)
			// toast.error(e.message);
		  });
	  };
	useEffect(() => {
		if (isLoggedin()) {
		  getUser();
		  // let cartItems = localStorage.getItem('cupon');
		}
	  }, []);
	// window.onunload = function (e) {
	// 	const newTabCount = localStorage.getItem('tabsOpen')
	// 	if (newTabCount !== null) {
	// 	  localStorage.setItem('tabsOpen', newTabCount - 1)
	// 	}
	//   }
	return (
		<>
			{/* Header Include */}
			<Header />
			{/* Header Include */}

			{/* Banner Include */}
			<Banner />
			{/* Banner Include */}
			{isLoggedin() ? (
			
			<>
			<RecentViewedItems />
			</>
			) : (
				''
			)
		}
			{/* RecentViewedItems Include */}
			{/*All Items Start*/}
			<Items/>
			{/*All Items Ends*/}
			{/* Category Include */}
			<Category />
			{/* Category Include */}

			{/* CategoryList Include */}
			<CategoryList />
			{/* CategoryList Include */}

			{/* GetSurprisedBanner Include */}
			<GetSurprisedBanner />
			{/* GetSurprisedBanner Include */}

			{/* Category Include */}
			<Category />
			{/* Category Include */}

			{/* FeaturedProducts Include */}
			<FeaturedProducts />
			{/* FeaturedProducts Include */}

			{/* FeaturedProducts Include */}
			<Footer />
			{/* FeaturedProducts Include */}

		</>
	);
};

export default Home;
