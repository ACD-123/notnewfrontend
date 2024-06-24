import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Elements/Banner"
import CategoriesListing from "../components/Elements/CategoriesListing"

const TopCategory = () => {
  return (
    <>
      <Header />
      <Banner />
      <CategoriesListing />
      <Footer />
    </>
  )
}

export default TopCategory