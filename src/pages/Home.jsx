import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Elements/Banner"
import RecentViewedItems from "../components/Products/RecentViewedItems"
import Category from "../components/Products/Archive/Category"
import CategoryList from "../components/Products/Archive/CategoryList"
import GetSurprisedBanner from "../components/Elements/GetSurprisedBanner"
import FeaturedProducts from "../components/Products/Archive/FeaturedProducts"

const Home = () => {
	return (
		<>
			{/* Header Include */}
			<Header />
			{/* Header Include */}

			{/* Banner Include */}
			<Banner />
			{/* Banner Includer */}

			{/* RecentViewedItems Include */}
			<RecentViewedItems />
			{/* RecentViewedItems Include */}

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
