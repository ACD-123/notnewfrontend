import React, { useState } from 'react'
import ProductGallery from './SingleProductElements/ProductGallery'
import Header from '../../Header'
import Footer from '../../Footer'
import ProductInformation from "./SingleProductElements/ProductInformation"
import SingleProductSidebar from './SingleProductElements/SingleProductSidebar'
import RecentViewedItems from "../RecentViewedItems"
import ProductTabs from "./SingleProductElements/ProductTabs"
import SellerDetails from '../../Seller/SellerDetails'
import ProductServices from '../../../services/API/ProductServices'
import ProductCard from '../../Shared/Cards/ProductCard'
import { Link } from 'react-router-dom'
import LoadingComponents from '../../Shared/LoadingComponents'
import { toast } from 'react-toastify'
import NoDataFound from '../../Shared/NoDataFound'
const SingleProduct_old = ({getCartCount , getCartCountGuest , cartFullResponse , notificationCount}) => {
  const [moreToLove, setMoreToLove] = useState([])
  const [productId, setProductId] = useState('')
  const [loading, setLoading] = useState(true)

  const getMoreToLove = (product_id) => {
    ProductServices.getMoreToLove(product_id)
      .then((response) => {
        setMoreToLove(response.data?.products);
        setLoading(false)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
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
      <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount}/>
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
                    <div className="p-d-w-c"><ProductInformation getCartCount={getCartCount} getMoreToLove={getMoreToLove} setProductId={setProductId} getCartCountGuest={getCartCountGuest}/></div>
                    {/* <div className="p-d-w-r"><SingleProductSidebar /></div> */}
                  </div>
                </div>
              </div>
            </div>
            <SellerDetails />
            {/* <div className='row'>
              <RecentViewedItems />
            </div> */}
            <div className="more-to-love" id='productcard'>
              <h3>More to love<span><Link to={`/more-to-love?id=${productId}`}>View More</Link></span></h3>
              {moreToLove.length > 0 ?
              <div className="row">
                {moreToLove?.slice(0, 4)?.map((data, index) => {
                  return (
                    <div className="col-lg-3" key={index}>
                      <ProductCard data={data} handleToggleFavourite={handleToggleFavourite} index={index} />
                    </div>
                  )
                })}
              </div>
              :
              <NoDataFound title={'No more to love product found'}/>
            }
            </div>
          </div>
        {/* } */}
      </section>
      <Footer />
    </>
  )
}

export default SingleProduct_old