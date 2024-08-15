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

const NewArrival = ({ title }) => {
  const [productData, setProductData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [favData, setFavData] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
  const user_id = localStorage.getItem('user_id');
  const isLoggedin = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(true);

  const handleToggleFavourite = (index) => {
    const updatedProducts = [...productData];
    updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
    setProductData(updatedProducts);
  };

  const getUnderAgeProducts = async () => {
    try {
      const res = await ProductServices.getUnderAgeProducts(user_id);
      if (res.status) {
        setProductData(res.data?.products);
        setPagination(res?.data?.pagination)
        setTimeout(() => {
          setLoading(false)
        }, 1000);
      }
    } catch (error) {
      setLoading(false)
      toast.error(error?.response?.data?.message)
    }
  };


  useEffect(() => {
    getUnderAgeProducts();
  }, []);

  return (
    <>
      <section id="product-recents-viewed">
        <>
          <div className="container">
            <div className="row">
              <div className="headings">
                <h3>{title}
                  {productData.length > 0 &&
                    <span><Link to="/new-arrival-21-plus">View More</Link></span>
                  }
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
                    productData.length > 0 ?
                      productData?.slice(0, 4)?.map((product, index) => (
                        <div className="col col-lg-3" key={product?.guid}>
                          <ProductCard data={product} handleToggleFavourite={handleToggleFavourite} index={index} />
                        </div>
                      ))
                      :
                      <NoDataFound title={'No new arrival product found'} />
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

export default NewArrival;
