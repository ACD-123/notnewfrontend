import React,{useState, useEffect} from 'react';
import ProductImage1 from "../../assets/Images/Categorylisting/1.png"
import ProductImage2 from "../../assets/Images/Categorylisting/2.png";
import ProductImage3 from "../../assets/Images/Categorylisting/3.png";
import ProductImage4 from "../../assets/Images/Categorylisting/4.png";
import ProductImage5 from "../../assets/Images/Categorylisting/5.png";
import {Link} from 'react-router-dom'
import ProductServices from '../../services/API/ProductServices'; //~/services/API/ProductServices
import { toast } from "react-toastify";

const ProductListing = (props) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
      try {
         setLoading(true);
        if(props.product){
          setLoading(false);  
          setProduct(props.product)
        }
      }catch (error) {
        console.error('Error fetching product data:', error);
        setError('Error fetching product data. Please try again later.');
      } finally {
        setLoading(false);
      }

  }, []);
  return (
    <>
      <section id='productcard' style={{ padding: "10px 0px" }}>
        <div className='container'>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className='row'>
              <div className='col col-lg-3' key={product.id}>
                <div className='productlist'>
                {product.auction ? (
                      <Link to={`/auctionproduct`}>
                        <img src={ProductImage1} alt={ProductImage1} />
                      </Link>
                  ) : (
                    <Link to={`/singleproduct/${product.guid}`}>
                      <img src={ProductImage1} alt={ProductImage1} />
                    </Link>
                )}
                {product.auction && <span className='auction-badge'>Auction</span>}
                <div className='px-2'>
                      {product.auction ? (
                          <Link to={`/auctionproduct`}>
                            <h3>{product.name}</h3>
                            <h4>{product.description}</h4>
                            <h4>{product.condition}</h4>
                          </Link>
                        ) : (
                          <Link to={`/singleproduct/${product.guid}`}>
                            <h3>{product.name}</h3>
                            <h4>{product.description}</h4>
                            <h4>{product.condition}</h4>
                          </Link>
                        )}
                        <p> 
                        <ul>
                          {product.sale_price !== null || product.sale_price !== 0 && (
                            <li className='price'>${product.sale_price}</li>
                          )}
                          {product.price !== null && product.sale_price !== null || product.sale_price !== 0 && (
                            <li className='sale'>
                              <del>${product.price}</del>
                            </li>
                          )}
                          {product.price !== null && product.sale_price !== null || product.sale_price !== 0 && (
                            <li className='discount'>
                              {((product.price - product.sale_price) / product.price * 100).toFixed(2)}% OFF
                            </li>
                          )}
                          {product.price !== null  && (
                            <li className='price'>
                              ${product.price}
                            </li>
                          )}
                        </ul>
                      </p>
                </div>
                </div>
              </div>
              
              {/* {productData.map((product) => (
                <div className='col col-lg-3' key={product.id}>
                  <div className='productlist'>
                    {product.auction ? (
                      <Link to={`/auctionproduct`}>
                        <img src={ProductImage1} alt={ProductImage1} />
                      </Link>
                    ) : (
                      <Link to={`/singleproduct/${product.guid}`}>
                        <img src={ProductImage1} alt={ProductImage1} />
                      </Link>
                    )}
                    {product.auction && <span className='auction-badge'>Auction</span>}
                    <div className='px-2'>
                      {product.auction ? (
                        <Link to={`/auctionproduct`}>
                          <h4>{product.description}</h4>
                        </Link>
                      ) : (
                        <Link to={`/singleproduct/${product.guid}`}>
                          <h4>{product.description}</h4>
                        </Link>
                      )}
                      <p>
                        <ul>
                          {product.sale_price !== null && (
                            <li className='price'>${product.sale_price}</li>
                          )}
                          {product.price !== null && product.sale_price !== null && (
                            <li className='sale'>
                              <del>${product.price}</del>
                            </li>
                          )}
                          {product.price !== null && product.sale_price !== null && (
                            <li className='discount'>
                              {((product.price - product.sale_price) / product.price * 100).toFixed(2)}% OFF
                            </li>
                          )}
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>
              ))} */}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductListing;
