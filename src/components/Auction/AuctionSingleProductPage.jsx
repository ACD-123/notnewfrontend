import React from 'react'
import ProductGallery from '../Products/Archive/SingleProductElements/ProductGallery'
import SingleProductSidebar from '../Products/Archive/SingleProductElements/SingleProductSidebar'
import RecentViewedItems from "../Products/RecentViewedItems"
import ProductTabs from "../Products/Archive/SingleProductElements/ProductTabs"
import SellerDetails from '../Seller/SellerDetails'
import Header from '../Header'
import Footer from '../Footer'
import AuctionProductInformation from './AuctionProductInformation'

const AuctionSingleProductPage = () => {
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
            <AuctionProductInformation />
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

export default AuctionSingleProductPage