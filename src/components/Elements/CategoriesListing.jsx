import React, { useState, useEffect } from "react";
import Categorylistimage1 from "../../assets/Images/Categorylist/1.png";
import Categorylistimage2 from "../../assets/Images/Categorylist/2.png";
import Categorylistimage3 from "../../assets/Images/Categorylist/3.png";
import Categorylistimage4 from "../../assets/Images/Categorylist/4.png";
import Categorylistimage5 from "../../assets/Images/Categorylist/5.png";
import Categorylistimage6 from "../../assets/Images/Categorylist/6.png";
import Categorylistimage7 from "../../assets/Images/Categorylist/7.png";
import Categorylistimage8 from "../../assets/Images/Categorylist/8.png";
import Categorylistimage9 from "../../assets/Images/Categorylist/9.png";
import Categorylistimage10 from "../../assets/Images/Categorylist/10.png";
import Categorylistimage11 from "../../assets/Images/Categorylist/11.png";
import Categorylistimage12 from "../../assets/Images/Categorylist/12.png";
import Category from "../../services/API/Category"; //~/services/API/Category
import { BASE_URL } from "../../services/Constant";
import HomeService from "../../services/API/HomeService"; //~/services/API/Home
import ProductSkeletonLoader from "../Shared/ProductSkeletonLoader";
import { Link } from "react-router-dom";

const CategoriesListing = () => {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const getCategory = () => {
    HomeService.getrecursive().then((res) => {
      setCategories(res);
      console.log(res , 'categories');
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
    });
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div className="top-category-listings">
        <div className="top-category-listings-wrap">
          <div className="container">
            <div className="row">
              <h1 className="title">Categories</h1>
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
                categories.length > 0 ? (
                <>
                  {categories?.map((product) => (
                    <div className="col-lg-3" key={product.id}>
                      <div className="Top-category-card">
                        <div className="Top-category-card-wrap">
                          {product.media.length > 0 ? (
                            <>
                              {product.media?.map((media) => {
                                return (
                                  <div className="Top-category-card-img">
                                    <img
                                      src={`${BASE_URL}/image/category/${media.name}`}
                                      alt={media.name}
                                    />
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            <div className="Top-category-card-img">
                              <img src={Categorylistimage2} alt={product.name} />
                            </div>
                          )}
                          <h3>{product.name}</h3>
                          <ul>
                            {product.children_recursive.map(
                            (subcategory, index) => (
                              <li key={index}>
                                <Link to={`/sub-category?sub-cat=${subcategory.id}`}>
                                  {subcategory.name}
                                </Link>
                              </li>
                            )
                          )}
                          </ul>
                          <a href="#" className="see-all-category">
                          <Link to={`/category?cat=${product.id}`}>
                            See All
                            </Link>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="container">
                    <h3>No Data Found</h3>
                  </div>
                </>
              )
          }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesListing;
