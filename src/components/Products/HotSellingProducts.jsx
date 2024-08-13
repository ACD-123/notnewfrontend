import React, { useState, useEffect } from "react";
import ProductCard from "../../components/Shared/Cards/ProductCard";
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
import NoDataFound from "../Shared/NoDataFound";

const HotSellingProducts = ({ loading, data, setHotProducts, title }) => {
  const [productData, setProductData] = useState([]);
  const [favData, setFavData] = useState([]);
  const [user, setUser] = useState();
  const isLoggedin = localStorage.getItem("access_token");
  const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
  const user_id = localStorage.getItem('user_id');

  const handleToggleFavourite = (index) => {
    const updatedProducts = [...data];
    updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
    setHotProducts(updatedProducts);
  };

  const addToFavorites = async (productId, index) => {
    handleToggleFavourite(index)
    try {
      const data = {
        favourite_against_id: productId,
        user_id: user_id,
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
      <section id="product-recents-viewed" className="hot-selling-product">
        <>
          <div className="container">
            <div className="row">
              <div className="headings">
                <h3>
                  {title}
                  <span>
                    <Link to="/hot-deals">View More</Link>
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
                  (
                    data.legth > 0 ?
                      data?.map((product, index) => (
                        <div className="col col-lg-3" key={product?.guid}>
                          <ProductCard data={product} handleToggleFavourite={handleToggleFavourite} index={index} />
                        </div>
                      ))
                      :
                      <NoDataFound title={'No hot selling product found'}/>
                  )
                }
              </div>
            </div>
          </section>
        </>
      </section>
    </>
  );
};

export default HotSellingProducts;
