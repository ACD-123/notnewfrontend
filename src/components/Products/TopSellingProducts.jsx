
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

const TopSellingProducts = ({ data, setTopSellingProducts, title, loading }) => {
  const [productData, setProductData] = useState([]);
  const [favData, setFavData] = useState([]);
  const [user, setUser] = useState();
  const isLoggedin = localStorage.getItem("access_token");
  const loggedInUser = JSON.parse(localStorage.getItem("user_details"));

  const handleToggleFavourite = (index) => {
    console.log('calling');
    const updatedProducts = [...data];
    updatedProducts[index].product.is_favourite = !updatedProducts[index].product.is_favourite;
    setTopSellingProducts(updatedProducts);
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
        setFavData(res.data);
      }
    } catch (error) {
      toast.error("Failed to add product to favorites.");
    }
  };


  return (
    <>
      <section id="product-recents-viewed" className="top-selling-product">
        {/* {data?.length > 0 ? ( */}
        <>
          <div className="container">
            <div className="row">
              <div className="headings">
                <h3>
                  {title}
                  <span>
                    <Link to="/AllNewProducts">View More</Link>
                  </span>
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
                  data?.map((product, index) => (
                    <div className="col col-lg-3" key={product?.product?.guid}>
                      <div className="productlist">
                        {isLoggedin ? (
                          <>
                            <Link
                              to={product?.product?.auctioned ? `/auctionproduct/${product?.product?.guid}` : `/singleproduct/${product?.product?.guid}`}>
                              <img
                                src={product?.product?.media?.length > 0 ? product?.product?.media?.[0]?.name : blank
                                }
                                alt={product?.product?.media?.length > 0 ? product?.product?.media?.[0]?.name : "blank"
                                }
                              />
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link to="/signin">
                              <img
                                src={product?.product?.media?.length > 0 ? product?.product?.media?.[0]?.name : blank}
                                alt={product?.product?.media?.length > 0 ? product?.product?.media?.[0]?.name : "no image"}
                              />
                            </Link>
                          </>
                        )}
                        {product?.product?.auctioned ? (<span className="auction-badge">Auction</span>) : null}
                        <div className="px-2">
                          {isLoggedin ? (
                            <>
                              <Link
                                to={
                                  product?.product?.auctioned
                                    ? `/auctionproduct/${product?.product?.guid}`
                                    : `/singleproduct/${product?.product?.guid}`
                                }
                              >
                                <h3>{product?.product?.name?.substring(0, 20)}...</h3>
                                {product?.product?.auctioned ?
                                  <h2>${product?.product?.bids}</h2>
                                  :
                                  <h2>${product?.product?.price}
                                    {product?.product?.sale_price > 0 ?
                                      <>
                                        <div className="circle"></div>
                                        <div className="sale-price">${product?.product?.sale_price}</div>
                                      </>
                                      :
                                      null
                                    }
                                  </h2>
                                }
                                <h4>{product?.product?.description?.substring(0, 15)}...</h4>
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link to="/signin">
                                <h3>{product?.product?.name?.substring(0, 50)}...</h3>
                                {product?.product?.auctioned ?
                                  <h2>${product?.product?.bids}</h2>
                                  :
                                  <h2>${product?.product?.price}
                                    {product?.product?.sale_price > 0 ?
                                      <>
                                        <div className="circle"></div>
                                        <div className="sale-price">${product?.product?.sale_price}</div>
                                      </>
                                      :
                                      null
                                    }
                                  </h2>
                                }
                                <h4>{product?.product?.description?.substring(0, 50)}...</h4>
                              </Link>
                            </>
                          )}
                          {isLoggedin ? (
                            <>
                              {!product?.product?.auctioned && (
                                <div onClick={() => addToFavorites(product?.product?.guid, index)} className="favoriteImg">
                                  {product?.product?.is_favourite === true ? (<FaHeart />) : (<FaRegHeart />)}
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
                            {product?.product?.sale_price !== null ||
                              (product?.product?.sale_price !== 0 && (
                                <li className="price">
                                  $
                                  {product?.product?.sale_price
                                    ? product?.product?.sale_price
                                    : 0}
                                </li>
                              ))}
                            {(product?.product?.price !== null &&
                              product?.product?.sale_price !== null) ||
                              (product?.product?.sale_price !== 0 && (
                                <li className="sale">
                                  <del>
                                    ${product?.product?.price ? product?.product?.price : 0}
                                  </del>
                                </li>
                              ))}
                            {(product?.product?.price !== null &&
                              product?.product?.sale_price !== null) ||
                              (product?.product?.sale_price !== 0 && (
                                <li className="discount">
                                  {(
                                    ((product?.product?.price - product?.product?.sale_price) /
                                      product?.product?.price) *
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
        {/* ) : (
          ""
        )} */}
      </section>
    </>
  );
};

export default TopSellingProducts;
