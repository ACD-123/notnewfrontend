import React, { useState, useEffect } from "react";
import ProductCard from "../Elements/ProductCard";
import ProductImage1 from "../../assets/Images/Productcard/1.png";
import blank from "../../assets/Images/Productcard/blank.jpg";
import { Link } from "react-router-dom";
import ProductServices from "../../services/API/ProductServices"; //~/services/API/ProductServices
import { toast } from "react-toastify";
import { BASE_URL } from "../../services/Constant";
import {
  setUserDetails,
  isLoggedin,
  getUserDetails,
} from "../../services/Auth"; // ~/services/Auth
import UserServices from "../../services/API/UserServices"; //~/services/API/AuthService
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ProductSkeletonLoader from "../Shared/ProductSkeletonLoader";

const RecentViewedItems = ({ title }) => {
  const [productData, setProductData] = useState([]);
  const [favData, setFavData] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
  const isLoggedin = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(true);

  const handleToggleFavourite = (index) => {
    console.log('calling');
    const updatedProducts = [...productData];
    updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
    setProductData(updatedProducts);
  };

  const fetchProductData = async () => {
    try {
      const res = await ProductServices.all(loggedInUser?.id);
      if (res.status) {
        setProductData(res.data.slice(0, 4));
        setTimeout(() => {
          setLoading(false)
        }, 1000);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };


  const addToFavorites = async (productId, index) => {
    handleToggleFavourite(index)
    try {
      const data = {
        favourite_against_id: productId,
        user_id: loggedInUser?.id,
        type: "1",
      };
      const res = await ProductServices.isFavorite(data);
      if (res.success) {
        toast.success("Product added to favorites!");
      }
    } catch (error) {
      toast.error("Failed to add product to favorites.");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <>
      <section id="product-recents-viewed">
        <>
          <div className="container">
            <div className="row">
              <div className="headings">
                <h3>{title}
                  <span><Link to="/AllNewProducts">View More</Link></span>
                </h3>
              </div>
            </div>
          </div>
          <section id="productcard">
            <div className="container">
              <div className="row">
                {loading ?
                  <>
                    <div className="col-lg-3">
                      <ProductSkeletonLoader />
                    </div>
                    <div className="col-lg-3">
                      <ProductSkeletonLoader />
                    </div>
                    <div className="col-lg-3">
                      <ProductSkeletonLoader />
                    </div>
                    <div className="col-lg-3">
                      <ProductSkeletonLoader />
                    </div>
                  </>
                  :
                  productData.map((product, index) => (
                    <div className="col col-lg-3" key={product?.guid}>
                      <div className="productlist">
                        {isLoggedin ? (
                          <>
                            <Link
                              to={product?.auctioned ? `/auctionproduct/${product?.guid}` : `/singleproduct/${product?.guid}`}>
                              <img
                                src={product.media.length > 0 ? product.media[0].name : blank
                                }
                                alt={product.media.length > 0 ? product.media[0].name : "blank"
                                }
                              />
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link to="/signin">
                              <img
                                src={product.media.length > 0 ? product.media[0].name : blank}
                                alt={product.media.length > 0 ? product.media[0].name : "no image"}
                              />
                            </Link>
                          </>
                        )}
                        {product?.auctioned ? (<span className="auction-badge">Auction</span>) : null}
                        <div className="px-2">
                          {isLoggedin ? (
                            <>
                              <Link
                                to={
                                  product?.auctioned
                                    ? `/auctionproduct/${product?.guid}`
                                    : `/singleproduct/${product?.guid}`
                                }
                              >
                                <h3>{product.name.substring(0, 20)}...</h3>
                                {product?.auctioned ?
                                  <h2>${product?.bids}</h2>
                                  :
                                  <h2>${product?.price}
                                    {product?.sale_price > 0 ?
                                      <>
                                        <div className="circle"></div>
                                        <div className="sale-price">${product?.sale_price}</div>
                                      </>
                                      :
                                      null
                                    }
                                  </h2>
                                }
                                <h4>{product?.description.substring(0, 15)}...</h4>
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link to="/signin">
                                <h3>{product.name.substring(0, 50)}...</h3>
                                {product?.auctioned ?
                                  <h2>${product?.bids}</h2>
                                  :
                                  <h2>${product?.price}
                                    {product?.sale_price > 0 ?
                                      <>
                                        <div className="circle"></div>
                                        <div className="sale-price">${product?.sale_price}</div>
                                      </>
                                      :
                                      null
                                    }
                                  </h2>
                                }
                                <h4>{product?.description.substring(0, 50)}...</h4>
                              </Link>
                            </>
                          )}
                          {isLoggedin ? (
                            <>
                              {!product?.auctioned && (
                                <div onClick={() => addToFavorites(product.guid, index)} className="favoriteImg">
                                  {product.is_favourite === true ? (<FaHeart />) : (<FaRegHeart />)}
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              <Link to="/signin">
                                <div  className="favoriteImg">
                                  <FaRegHeart />
                                </div>
                              </Link>
                            </>
                          )}
                          {/* Product price */}
                          {/* <p>
                            <ul>
                              {product?.sale_price !== null ||
                                (product?.sale_price !== 0 && (
                                  <li className="price">
                                    $
                                    {product?.sale_price
                                      ? product?.sale_price
                                      : 0}
                                  </li>
                                ))}
                              {(product?.price !== null &&
                                product?.sale_price !== null) ||
                                (product?.sale_price !== 0 && (
                                  <li className="sale">
                                    <del>
                                      ${product?.price ? product?.price : 0}
                                    </del>
                                  </li>
                                ))}
                              {(product?.price !== null &&
                                product?.sale_price !== null) ||
                                (product?.sale_price !== 0 && (
                                  <li className="discount">
                                    {(
                                      ((product?.price - product?.sale_price) /
                                        product?.price) *
                                      100
                                    ).toFixed(2)}
                                    % OFF
                                  </li>
                                ))}
                            </ul>
                          </p> */}
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </section>
        </>
      </section>
    </>
  );
};

export default RecentViewedItems;
