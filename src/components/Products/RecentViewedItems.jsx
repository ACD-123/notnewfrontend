import React, { useState, useEffect } from 'react';
import ProductCard from "../Elements/ProductCard"
import ProductImage1 from "../../assets/Images/Productcard/1.png";
import { Link } from "react-router-dom";
import ProductServices from '../../services/API/ProductServices'; //~/services/API/ProductServices
import { toast } from "react-toastify";
const RecentViewedItems = () => {
    const [productData, setProductData] = useState([]);
    const fetchProductData = async () => {
      try {
        ProductServices.recent()
        .then((response) => {
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
                <h3> <span><Link to="/AllProducts">View More</Link></span></h3>
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
                    // <Link to={`/auctionproduct/${product.id}`}>
                    <Link to={`/auctionproduct/${product.products?.guid}`}>
                      <img src={ProductImage1} alt={ProductImage1} />
                      {/* <img src={product.cover_image} alt={product.name} /> */}
                    </Link>
                  ) : (
                    // <Link to={`/singleproduct/${product.id}`}>
                    <Link to={`/singleproduct/${product.products?.guid}`}>
                      <img src={ProductImage1} alt={ProductImage1} />
                      {/* <img src={product.cover_image} alt={product.name} /> */}
                    </Link>
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