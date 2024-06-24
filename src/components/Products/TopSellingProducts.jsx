
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

const TopSellingProducts = ({data , title}) => {
  const [productData, setProductData] = useState([]);
  const [favData, setFavData] = useState([]);
  const [user, setUser] = useState();
  const getUser = () => {
    UserServices.detail()
      .then((response) => {
        setUserDetails(response);
        setUser(response.id);
        localStorage.setItem("user_details", JSON.parse(response));
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  const fetchProductData = async () => {
    try {
      const res = await ProductServices.all(user);
      if (res.status) {
        setProductData(res.data.slice(0, 4));
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  
  useEffect(() => {
    if (isLoggedin()) {
      getUser();
    }
  }, []);
  const addToFavorites = async (productId) => {
    try {
      const data = {
        favourite_against_id: productId,
        user_id: user,
        type: "1",
      };
      const res = await ProductServices.isFavorite(data);
      if (res.status) {
        setFavData(res.data);
      }
    } catch (error) {
      toast.error("Failed to add product to favorites.");
    }
  };

  useEffect(() => {
    if (user) {
      fetchProductData();
    }
  }, [user]);

  return (
    <>
      <section id="product-recents-viewed" className="top-selling-product">
        {data?.products?.length > 0 ? (
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
                  {data?.products?.map((item) => (
                    <div className="col col-lg-3" key={item?.product_id}>
                      <div className="productlist">
                        {/* Product image */}
                        {isLoggedin() ? (
                          <>
                            <Link
                              to={
                                item?.auctioned
                                  ? `/auctionproduct/${item?.product_id}`
                                  : `/singleproduct/${item?.product_id}`
                              }
                            >
                              <img
                                src={
                                  item?.product?.media?.length > 0
                                    ? item?.product?.media?.[0]?.name
                                    : blank
                                }
                                alt={
                                  item?.product?.media?.length > 0
                                    ? item?.product?.media?.[0]?.name
                                    : "blank"
                                }
                              />
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link to="/signin">
                              <img
                                src={
                                  item?.product?.media?.length > 0
                                    ? item?.product?.media?.[0]?.name
                                    : blank
                                }
                                alt={
                                  item?.product?.media?.length > 0
                                    ? item?.product?.media?.[0]?.name
                                    : "blank"
                                }
                              />
                            </Link>
                          </>
                        )}
                        {/* Auction badge */}
                        {/* {product?.auctioned && (
                          <span className="auction-badge">Auction</span>
                        )} */}
                        <div className="px-2">
                          {/* Product details */}
                          {isLoggedin() ? (
                            <>
                              <Link
                                to={
                                  item?.auctioned
                                    ? `/auctionproduct/${item?.product_id}`
                                    : `/singleproduct/${item?.product_id}`
                                }
                              >
                                <h3>{item?.product?.name.substring(0, 10)}...</h3>${" "}
                                {item?.product?.auctioned
                                  ? item?.product?.bids
                                  : item?.product?.price}
                                <h4>
                                  {item?.product?.description.substring(0, 15)}...
                                </h4>
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link to="/signin">
                                <h3>{item?.product?.name.substring(0, 10)}...</h3>${" "}
                                {item?.product?.auctioned
                                  ? item?.product?.bids
                                  : item?.product?.price}
                                <h4>
                                  {item?.description.substring(0, 15)}...
                                </h4>
                              </Link>
                            </>
                          )}
                          {isLoggedin() ? (
                            <>
                              {!item?.auctioned && (
                                <div
                                  onClick={() => addToFavorites(item?.product_id)}
                                  className="favoriteImg"
                                >
                                  {item?.product?.is_favourite === true ? (
                                    <FaHeart />
                                  ) : (
                                    <FaRegHeart />
                                  )}
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {!item?.product?.auctioned && (
                                <Link to="/signin">
                                  <FaRegHeart />
                                </Link>
                              )}
                            </>
                          )}
                          {/* Product price */}
                          <p>
                            <ul>
                              {item?.product?.sale_price !== null ||
                                (item?.product?.sale_price !== 0 && (
                                  <li className="price">
                                    $
                                    {item?.product?.sale_price
                                      ? item?.product?.sale_price
                                      : 0}
                                  </li>
                                ))}
                              {(item?.product?.price !== null &&
                                item?.product?.sale_price !== null) ||
                                (item?.product?.sale_price !== 0 && (
                                  <li className="sale">
                                    <del>
                                      ${item?.product?.price ? item?.product?.price : 0}
                                    </del>
                                  </li>
                                ))}
                              {(item?.product?.price !== null &&
                                item?.product?.sale_price !== null) ||
                                (item?.product?.sale_price !== 0 && (
                                  <li className="discount">
                                    {(
                                      ((item?.product?.price - item?.product?.sale_price) /
                                        item?.product?.price) *
                                      100
                                    ).toFixed(2)}
                                    % OFF
                                  </li>
                                ))}
                            </ul>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default TopSellingProducts;
