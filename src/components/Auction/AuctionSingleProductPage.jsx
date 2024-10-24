import React, { useState } from 'react'
import ProductGallery from '../Products/Archive/SingleProductElements/ProductGallery'
import SellerDetails from '../Seller/SellerDetails'
import Header from '../Header'
import Footer from '../Footer'
import AuctionProductInformation from './AuctionProductInformation'
import ProductServices from '../../services/API/ProductServices'
import { Link } from 'react-router-dom'
import ProductCard from '../Shared/Cards/ProductCard'
import NoDataFound from '../Shared/NoDataFound'
import { toast } from 'react-toastify'

const AuctionSingleProductPage = ({cartFullResponse , notificationCount}) => {
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
        <div className='container'>
          <div className='row p-0'>
            <div className="col-lg-12 p-0">
              <div className="product-detail-wrap">
                <div className="p-d-w-1">
                  <div className="p-d-w-l"><ProductGallery /></div>
                  <div className="p-d-w-c"><AuctionProductInformation getMoreToLove={getMoreToLove} setProductId={setProductId} /></div>
                </div>
              </div>
            </div>
          </div>
          <SellerDetails />
          <div className="more-to-love" id='productcard'>
            <h3>More to love<span><Link to={`/more-to-love?id=${productId}`}>View More</Link></span></h3>
            <div className="row">
              {moreToLove?.length > 0 ?
              (moreToLove?.slice(0, 4)?.map((data, index) => {
                return (
                  <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                    <ProductCard data={data} handleToggleFavourite={handleToggleFavourite} index={index} />
                  </div>
                )
              }))
              :
              <NoDataFound title={'No Data Found'}/>
              }
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default AuctionSingleProductPage