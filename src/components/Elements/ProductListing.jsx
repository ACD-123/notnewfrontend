import React,{useState, useEffect} from 'react';
import ProductImage1 from "../../assets/Images/Categorylisting/1.png"
import ProductImage2 from "../../assets/Images/Categorylisting/2.png";
import ProductImage3 from "../../assets/Images/Categorylisting/3.png";
import ProductImage4 from "../../assets/Images/Categorylisting/4.png";
import ProductImage5 from "../../assets/Images/Categorylisting/5.png";
import {Link} from 'react-router-dom'
import ProductServices from '../../services/API/ProductServices'; //~/services/API/ProductServices
import { toast } from "react-toastify";
import { BASE_URL } from "../../services/Constant";

const ProductListing = (props) => {
 
  const [productData, setProductData] = useState([]);
  const fetchProductData = async () => {      
    ProductServices.recent()
    .then((res) => {
      console.log('resodddd',res)
      setProductData(res); // Limit to the first 5 products
    }).catch(error => console.log(error));
  };
  useEffect(() => {
    fetchProductData();
  }, []);
  return (
    <>
      <section id='productcard' style={{ padding: "10px 0px" }}>
        <div className='row'>
          
      {productData.map((product) => (
        <div className='col col-lg-3' key={product.products?.guid}>
                <div className='productlist'>
                  {product?.auctioned ? (
                    <>
                      {/* {product.products?.name} */}
                      <Link to={`/auctionproduct/${product.products?.guid}`}>
                      {product.products?.media[0].name? (
                        <>
                          <img src={`${product.products?.media[0].name}`} alt="" />
                        </>
                      ):(
                        <>
                          <h1>null</h1>
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
                        {/* https://notnewbackend.testingwebsitelink.com/image/product/aa.jpg */}
                          <img src={`${product.products?.media[0].name}`} alt="" />
                        </>
                      ):(
                        <>
                         <h2>null</h2>
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
      </section>
    </>
  );
};

export default ProductListing;
