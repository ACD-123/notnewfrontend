import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Elements/Banner"
import CategoriesListing from "../components/Elements/CategoriesListing"

const TopCategory = () => {
  return (
    <>
    {/* Header Include */}
			<Header />
	{/* Header Include */}

    {/* Banner Include */}
			<Banner />
	{/* Banner Includer */}

    {/* CategoriesListing */}
    <CategoriesListing />
    {/* CategoriesListing */}
    
    {/* FeaturedProducts Include */}
			<Footer />
	{/* FeaturedProducts Include */}
    </>
  )
}

export default TopCategory