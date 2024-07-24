import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Elements/Banner"
import RecentViewedItems from "../components/Products/RecentViewedItems"
import Items from "../components/Products/Items"
import Category from "../components/Products/Archive/Category"
import CategoryList from "../components/Products/Archive/CategoryList"
import GetSurprisedBanner from "../components/Elements/GetSurprisedBanner"
import FeaturedProducts from "../components/Products/Archive/FeaturedProducts"
import underConstruction from "../assets/Images/under-construction.png"

const NotFound = ({cartFullResponse}) => {
	// window.onunload = function (e) {
	// 	const newTabCount = localStorage.getItem('tabsOpen')
	// 	if (newTabCount !== null) {
	// 	  localStorage.setItem('tabsOpen', newTabCount - 1)
	// 	}
	//   }
	return (
		<>
			{/* Header Include */}
			<Header cartFullResponse={cartFullResponse}/>
			{/* Header Include */}
			<div>
				<center>
					<img src={underConstruction} />
					<h2>Page is Under Construction!</h2>
				</center>
			</div>

			{/* FeaturedProducts Include */}
			<Footer />
			{/* FeaturedProducts Include */}

		</>
	);
};

export default NotFound;
