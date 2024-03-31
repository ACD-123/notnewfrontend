import React, { useState, useEffect } from 'react';
import ProductCard from "../Elements/ProductCard"
import blank from "../../assets/Images/Productcard/blank.jpg";
import ProductImage1 from "../../assets/Images/Productcard/1.png";
import { Link } from "react-router-dom";
import ProductServices from '../../services/API/ProductServices'; //~/services/API/ProductServices
import { toast } from "react-toastify";
import { BASE_URL } from "../../services/Constant";
const RecentViewedItems = () => {
    const [productData, setProductData] = useState([]);
    const fetchProductData = async () => {
      try {
        ProductServices.recent()
        .then((response) => {
          console.log('recent view',response)
        setProductData(response.slice(0, 6)); // Limit to the first 5 products
      })
      } catch (error) {
        toast.error(error);
      }
    };
    useEffect(() => {
      fetchProductData();
    }, []);
  return (
    <>
    <section id='product-recents-viewed'>
    {productData.length > 0 ?(
              <>
        <div className='container'>
            <div className='row'>
                <div className='headings'>
                <h3>Recently Viewed <span><Link to="/AllProducts">View More</Link></span></h3>
                </div>
            </div>
        </div>
        <section id='productcard' style={{ padding: "15px 0px" }}>
        <div className='container'>
          <div className='row'>
              {productData.map((product) => (
              <div className='col col-lg-2' key={product.products?.guid}>
                <div className='productlist'>
                  {product?.auctioned ? (
                    <>
                      {product.products?.name}
                      <Link to={`/auctionproduct/${product.products?.guid}`}>
                      {product.products?.cover_image? (
                        <>
                          <img src={`${BASE_URL}/image/product/${product.products?.media[0].name}`} alt="" />
                        </>
                      ):(
                        <>
                          <img src={blank} alt="blank" />
                        </>
                      ) }
                        {/* <img src={product.cover_image} alt={product.name} /> */}
                      </Link>
                    </>
                  ) : (
                    <>
                    <Link to={`/singleproduct/${product.products?.guid}`}>
                      {product.products?.cover_image? (
                        <>
                        {/* https://notnewbackend.testingwebsitelink.com/image/product/aa.jpg */}
                          <img src={`${BASE_URL}/image/product/${product.products?.media[0].name}`} alt="" />
                        </>
                      ):(
                        <>
                          <img src={blank} alt="blank" />
                        </>
                      ) }
                        {/* <img src={product.cover_image} alt={product.name} /> */}
                      </Link>
                    </>
                  )}
                  {product?.auctioned ?(<span className='auction-badge'>Auction</span>) : ('')}
                  <div className='px-2'>
                    {product?.auctioned ? (
                      <Link to={`/auctionproduct/${product.products?.guid}`}>
                        <h4>{product.products?.description.substring(0, 40)}...</h4>
                      </Link>
                    ) : (
                      <Link to={`/singleproduct/${product.guid}`}>
                      <h4>{product.products?.description.substring(0, 40)}...</h4>
                      </Link>
                    )}
                    <p>
                      <p>
                      {product.products?.auctioned ? (
                      <ul>
                      {product.products?.bids !== null && (
                        <li className='price'> Maximum Bid: ${product.products?.bids}</li>
                      )}
                    </ul>
                    ) : (
                      <ul>
                          {product.products?.price !== null && (
                            <li className='price'>${product.products?.price}</li>
                          )}
                          {product.products?.price !== null && product.products?.sale_price !== null && (
                            <li className='sale'>
                              <del>${product.products?.price}</del>
                            </li>
                          )}
                          {product.products?.price !== null && product.products?.sale_price !== null && (
                            <li className='discount'>
                              {((product.products?.price - product.products?.sale_price) / product.products?.price * 100).toFixed(2)}% OFF
                            </li>
                          )}
                        </ul>
                    )}
                        
                      </p>
                    </p>
                  </div>
                </div>
              </div>
            ))}
             
          </div>
        </div>
      </section>
      </>
      ):('')}
    </section>
    </>
  )
}

export default RecentViewedItems