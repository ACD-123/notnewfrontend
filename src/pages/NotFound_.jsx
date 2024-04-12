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

const NotFound_ = () => {
	// window.onunload = function (e) {
	// 	const newTabCount = localStorage.getItem('tabsOpen')
	// 	if (newTabCount !== null) {
	// 	  localStorage.setItem('tabsOpen', newTabCount - 1)
	// 	}
	//   }
	return (
		<>
			<div>
				<center>
					<img src={underConstruction} />
					<h2>Page is Under Construction!</h2>
				</center>
			</div>


		</>
	);
};

export default NotFound_;
