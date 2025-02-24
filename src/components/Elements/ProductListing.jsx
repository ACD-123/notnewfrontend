import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import ProductServices from '../../services/API/ProductServices';
import { toast } from "react-toastify";

const ProductListing = (props) => {
 
  const [productData, setProductData] = useState([]);
  const fetchProductData = async () => {      
    ProductServices.recent()
    .then((res) => {
      setProductData(res);
    }).catch(error => {
      toast.error(error?.response?.data?.message)
    });
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
                      </Link>
                    </>
                  ) : (
                    <>
                    <Link to={`/singleproduct/${product.products?.guid}`}>
                      {product.products?.media[0].name ? (
                        <>
                          <img src={`${product.products?.media[0].name}`} alt="" />
                        </>
                      ):(
                        <>
                         <h2>null</h2>
                        </>
                      ) }
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
