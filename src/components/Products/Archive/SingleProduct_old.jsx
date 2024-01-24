import React from 'react'
import ProductGallery from './SingleProductElements/ProductGallery'
import Header from '../../Header'
import Footer from '../../Footer'
import ProductInformation from "./SingleProductElements/ProductInformation"
import SingleProductSidebar from './SingleProductElements/SingleProductSidebar'
import RecentViewedItems from "../RecentViewedItems"
import ProductTabs from "./SingleProductElements/ProductTabs"
import SellerDetails from '../../Seller/SellerDetails'
const SingleProduct_old = () => {
  return (
    <>

    <Header />

    <section id='single-product' style={{padding: "40px 0px"}}>
      <div className='container'>
        <div className='row'>

          <div className='col-lg-5'>
            <ProductGallery />

          </div>

          <div className='col-lg-5'>
            <ProductInformation />
          </div>

          <div className='col-lg-2'>
            <SingleProductSidebar />
          </div>

          {/* row end */}
        </div>

          {/* SECOND ROW */}
          <div className='row'>
            <ProductTabs />
          </div>
          {/* SECOND ROW */}

          {/* Third ROW */}
            <SellerDetails />
          {/* Third ROW */}

          {/* Four ROW */}
          <div className='row'>
            <RecentViewedItems />
          </div>
          {/* Four ROW */}
      </div>
    </section>

    <Footer />
    </>
  )
}

export default SingleProduct_old