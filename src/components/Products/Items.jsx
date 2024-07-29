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

const RecentViewedItems = ({ title }) => {
  const [productData, setProductData] = useState([]);
  const [favData, setFavData] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
  const isLoggedin = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(true);

  const handleToggleFavourite = (index) => {
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
      toast.error(error?.response?.data?.message)
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
                  <span><Link to="/product-filter">View More</Link></span>
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
                      <ProductCard data={product} handleToggleFavourite={handleToggleFavourite} index={index}/>
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
