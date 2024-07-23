import React, { useState } from 'react'
import ProductGallery from '../Products/Archive/SingleProductElements/ProductGallery'
import SingleProductSidebar from '../Products/Archive/SingleProductElements/SingleProductSidebar'
import RecentViewedItems from "../Products/RecentViewedItems"
import ProductTabs from "../Products/Archive/SingleProductElements/ProductTabs"
import SellerDetails from '../Seller/SellerDetails'
import Header from '../Header'
import Footer from '../Footer'
import AuctionProductInformation from './AuctionProductInformation'
import ProductServices from '../../services/API/ProductServices'
import { Link } from 'react-router-dom'
import ProductCard from '../Shared/Cards/ProductCard'
import NoDataFound from '../Shared/NoDataFound'

const AuctionSingleProductPage = () => {
  const [moreToLove, setMoreToLove] = useState([])
  const [productId, setProductId] = useState('')
  const [loading, setLoading] = useState(true)

  const getMoreToLove = (product_id) => {
    ProductServices.getMoreToLove(product_id)
      .then((response) => {
        setMoreToLove(response.data?.products);
        setLoading(false)
      })
      .catch((e) => {
        console.log(e);
        setLoading(false)
      });
  };

  const handleToggleFavourite = (index) => {
    const updatedProducts = [...moreToLove];
    updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
    setMoreToLove(updatedProducts);
  };
  return (
    <>
      <Header />
      <section id='single-product' className='single-product-detail'>
        {/* {loading ?
          <LoadingComponents />
          : */}
        <div className='container'>
          <div className='row p-0'>
            <div className="col-lg-12 p-0">
              <div className="product-detail-wrap">
                <div className="p-d-w-1">
                  <div className="p-d-w-l"><ProductGallery /></div>
                  <div className="p-d-w-c"><AuctionProductInformation getMoreToLove={getMoreToLove} setProductId={setProductId} /></div>
                  <div className="p-d-w-r"><SingleProductSidebar /></div>
                </div>
              </div>
            </div>
          </div>
          <SellerDetails />
          <div className='row'>
            <RecentViewedItems />
          </div>
          <div className="more-to-love" id='productcard'>
            <h3>More to love<span><Link to={`/more-to-love?id=${productId}`}>View More</Link></span></h3>
            <div className="row">
              {moreToLove.length > 0 ?
              (moreToLove?.slice(0, 4)?.map((data, index) => {
                return (
                  <div className="col-lg-3" key={index}>
                    <ProductCard data={data} handleToggleFavourite={handleToggleFavourite} index={index} />
                  </div>
                )
              }))
              :
              <NoDataFound title={'No more to love product found'}/>
              }
            </div>
          </div>
        </div>
        {/* } */}
      </section>


      {/* <section id='single-product' style={{padding: "40px 0px"}}>
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
        </div>
          <div className='row'>
            <ProductTabs />
          </div>
            <SellerDetails />
          <div className='row'>
            <RecentViewedItems />
          </div>
      </div>
    </section> */}
      <Footer />
    </>
  )
}

export default AuctionSingleProductPage