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

const RecentViewedItems = () => {
  const [productData, setProductData] = useState([]);
  const [favData, setFavData] = useState([]);
  const [user, setUser] = useState({});

  const fetchProductData = async () => {
    try {
      const res = await ProductServices.all();
      if (res.status) {
        setProductData(res.data.slice(0, 4)); // Limit to the first 5 products
        console.log("setProductData", res.data);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  const getUser = () => {
    UserServices.detail()
      .then((response) => {
        console.log("login", response.id);
        setUserDetails(response);
        setUser(response.id);
        localStorage.setItem("user_details", JSON.parse(response));
      })
      .catch((e) => {
        console.log("error", e);
        // toast.error(e.message);
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
        type: "1",
      };
      console.log("hit", data);
      const res = await ProductServices.isFavorite(data);
      if (res.status) {
        // Optionally, update UI or show a success message
        toast.success("Product added to favorites!");
        // Update favorites data if necessary
        setFavData(res.data);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast.error("Failed to add product to favorites.");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <>
      <section id="product-recents-viewed">
        {productData.length > 0 ? (
          <>
            <div className="container">
              <div className="row">
                <div className="headings">
                  <h3>
                    New Items{" "}
                    <span>
                      <Link to="/AllNewProducts">View More</Link>
                    </span>
                  </h3>
                </div>
              </div>
            </div>
            <section id="productcard" style={{ padding: "15px 0px" }}>
              <div className="container">
                <div className="row">
                  {productData.map((product) => (
                    <div className="col col-lg-3" key={product?.guid}>
                      <div className="productlist">
                        {/* Product image */}
                        {isLoggedin() ? (
                          <>
                            <Link
                              to={
                                product?.auctioned
                                  ? `/auctionproduct/${product?.guid}`
                                  : `/singleproduct/${product?.guid}`
                              }
                            >
                              <img
                                src={
                                  product.media.length > 0
                                    ? product.media[0].name
                                    : blank
                                }
                                alt={
                                  product.media.length > 0
                                    ? product.media[0].name
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
                                  product.media.length > 0
                                    ? product.media[0].name
                                    : blank
                                }
                                alt={
                                  product.media.length > 0
                                    ? product.media[0].name
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
                                  product?.auctioned
                                    ? `/auctionproduct/${product?.guid}`
                                    : `/singleproduct/${product?.guid}`
                                }
                              >
                                <h3>{product.name.substring(0, 10)}...</h3>${" "}
                                {product?.auctioned
                                  ? product.bids
                                  : product.price}
                                <h4>
                                  {product?.description.substring(0, 15)}...
                                </h4>
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link to="/signin">
                                <h3>{product.name.substring(0, 10)}...</h3>${" "}
                                {product?.auctioned
                                  ? product.bids
                                  : product.price}
                                <h4>
                                  {product?.description.substring(0, 15)}...
                                </h4>
                              </Link>
                            </>
                          )}
                          {isLoggedin() ? (
                            <>
                              {!product?.auctioned && (
                                <div
                                  onClick={() => addToFavorites(product.guid)}
                                  className="favoriteImg"
                                >
                                  {product.is_favourite === true ? (
                                    <FaHeart />
                                  ) : (
                                    <FaRegHeart />
                                  )}
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              {!product?.auctioned && (
                                <Link to="/signin">
                                  <FaRegHeart />
                                </Link>
                              )}
                            </>
                          )}
                          {/* Product price */}
                          <p>
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

export default RecentViewedItems;
