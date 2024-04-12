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
      ProductServices.recent()
      .then((res) => {
        setProductData(res.slice(0, 6)); // Limit to the first 5 products
      }).catch(error => console.log(error));
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
                <h3>Recently Viewed <span><Link to="/notFound">View More</Link></span></h3>
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
                      {product.products?.media[0].name? (
                        <>
                          <img src={`${product.products?.media[0].name}`} alt="" />
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
                      {product.products?.media[0].name ? (
                        <>
                        {/* http://localhost:8000/image/product/aa.jpg */}
                          <img src={`${product.products?.media[0].name}`} alt="" />
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
                  {product.products?.auctioned ?(<span className='auction-badge'>Auction</span>) : ('')}
                  <div className='px-2'>
                    {product?.auctioned ? (
                      <Link to={`/auctionproduct/${product.products?.guid}`}>
                        <h3>{product.products?.name.substring(0, 20)}...</h3>
                        <h4>{product.products?.description.substring(0, 40)}...</h4>
                      </Link>
                    ) : (
                      <Link to={`/singleproduct/${product.guid}`}>
                      <h3>{product.products?.name.substring(0, 20)}...</h3>
                      <h4>{product.products?.description.substring(0, 40)}...</h4>
                      </Link>
                    )}
                    <p>
                      <p>
                      {product.products?.auctioned ? (
                                <>
                                  <ul>
                                    <li className="sale">
                                      <p>
                                        <b>Bids: </b>$ {product.products?.bids}
                                      </p>
                                    </li>
                                    {(product.products?.price !== null &&
                                      product.products?.sale_price !== null) ||
                                      (product.products?.sale_price !== 0 && (
                                        <li className="sale">
                                          <del>${product.products?.price}</del>
                                        </li>
                                      ))}
                                    {(product.products?.price !== null &&
                                      product.products?.sale_price !== null) ||
                                      (product.products?.sale_price !== 0 && (
                                        <li className="discount">
                                          {(
                                            ((product.products?.price -
                                              product.products?.sale_price) /
                                              product.products?.price) *
                                            100
                                          ).toFixed(2)}
                                          % OFF
                                        </li>
                                      ))}
                                  </ul>
                                </>
                              ) : (
                                <>
                                  <ul>
                                    <li className="sale">
                                      <p>
                                        <b>Price: </b>$ {product.products?.price}
                                      </p>
                                    </li>
                                    {(product.products?.price !== null &&
                                      product.products?.sale_price !== null) ||
                                      (product.products?.sale_price !== 0 && (
                                        <li className="sale">
                                          <del>${product.products?.price}</del>
                                        </li>
                                      ))}
                                    {(product.products?.price !== null &&
                                      product.products?.sale_price !== null) ||
                                      (product.products?.sale_price !== 0 && (
                                        <li className="discount">
                                          {(
                                            ((product.products?.price -
                                              product.products?.sale_price) /
                                              product.products?.price) *
                                            100
                                          ).toFixed(2)}
                                          % OFF
                                        </li>
                                      ))}
                                  </ul>
                                </>
                              )}
                      {/* {product.products?.auctioned ? (
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
                    )} */}
                        
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