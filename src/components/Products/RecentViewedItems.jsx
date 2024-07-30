import React, { useState, useEffect } from 'react';
import ProductCard from "../Elements/ProductCard"
import blank from "../../assets/Images/Productcard/blank.jpg";
import ProductImage1 from "../../assets/Images/Productcard/1.png";
import { Link } from "react-router-dom";
import ProductServices from '../../services/API/ProductServices'; //~/services/API/ProductServices
import { toast } from "react-toastify";
import { BASE_URL } from "../../services/Constant";
import { setUserDetails, isLoggedin, getUserDetails } from "../../services/Auth"; // ~/services/Auth
import UserServices from "../../services/API/UserServices"; //~/services/API/AuthService
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const RecentViewedItems = () => {
  
  const [productData, setProductData] = useState([]);
    const [favData, setFavData] = useState([]);
    const [user, setUser] = useState({});

    const fetchProductData = async () => {      
      ProductServices.recent()
      .then((res) => {
        setProductData(res.slice(0, 4)); // Limit to the first 5 products
      }).catch(error => {
        toast.error(error?.response?.data?.message)
      });
    };


    const getUser = () => {
      UserServices.detail()
        .then((response) => {
        setUserDetails(response);
        setUser(response.id);
        localStorage.setItem('user_details', JSON.parse(response));
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message)
        });
      };
    useEffect(() => {
      if (isLoggedin()) {
        getUser();
        // let cartItems = localStorage.getItem('cupon');
      }
      }, []);
    const addToFavorites = async (productId) => {
        try {
            const data = {
                favourite_against_id: productId,
                user_id: user,
                type: "1"
            };
            const res = await ProductServices.isFavorite(data);
            if (res.status) {
                // Optionally, update UI or show a success message
                toast.success("Product added to favorites!");
                // Update favorites data if necessary
                setFavData(res.data);
            }
        } catch (error) {
          toast.error(error?.response?.data?.message)
        }
    };

    useEffect(() => {
      fetchProductData();
    }, []);

  return (
    <>
    <section id='product-recents-viewed'>
    {productData.length === 0 ?(
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
                      <>
                      <Link to={`/singleproduct/${product.guid}`}>
                      <h3>{product.products?.name.substring(0, 20)}...</h3>
                      <h4>{product.products?.description.substring(0, 40)}...</h4>
                      </Link>
                        <div onClick={() => addToFavorites(product.guid)} className='favoriteImg'>
                          {product.products.is_favourite === true ? (
                            <FaHeart/>
                          ) : (
                            <FaRegHeart/>
                          )
                          }
                          </div>
                      </>
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