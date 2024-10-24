import React, { useState, useEffect } from "react";
import Categorylistimage2 from "../../assets/Images/Categorylist/2.png";
import { BASE_URL } from "../../services/Constant";
import HomeService from "../../services/API/HomeService";
import ProductSkeletonLoader from "../Shared/ProductSkeletonLoader";
import { Link, useNavigate } from "react-router-dom";

const CategoriesListing = () => {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const getCategory = () => {
    HomeService.getrecursive().then((res) => {
      setCategories(res);
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
          <div className="row">
              <div className="col-lg-12">
              <h1 className="title">Categories</h1>
              </div>
              {loading ?
                <>
                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <ProductSkeletonLoader />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12" id='hide-on-mobile-768'>
                    <ProductSkeletonLoader />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12" id="hide-on-mobile-991">
                    <ProductSkeletonLoader />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12" id="hide-on-mobile-991">
                    <ProductSkeletonLoader />
                  </div>
                </>
                :
                categories?.length > 0 ? (
                <>
                  {categories?.map((product) => (
                    <div className="col-lg-3 col-md-6 col-sm-12" key={product.id}>
                      <div className="Top-category-card">
                        <div className="Top-category-card-wrap">
                          {product?.media?.length > 0 ? (
                            <>
                              {product.media?.map((media , index) => {
                                return (
                                  <div className="Top-category-card-img" key={index} onClick={() =>{navigate(`/category?category-id=${product?.id}`)}}>
                                    <img
                                      src={`${BASE_URL}/image/category/${media?.name}`}
                                      alt={media?.name}
                                    />
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            <div className="Top-category-card-img" onClick={() =>{navigate(`/category?category-id=${product?.id}`)}}>
                              <img src={Categorylistimage2} alt={product.name} />
                            </div>
                          )}
                          <h3 onClick={() =>{navigate(`/category?category-id=${product?.id}`)}}>{product.name}</h3>
                          <ul>
                            {product.children_recursive.map(
                            (subcategory, index) => (
                              <li key={index}>
                                <Link to={`/category?category-id=${subcategory?.id}`}>
                                  {subcategory.name}
                                </Link>
                              </li>
                            )
                          )}
                          </ul>
                          <a href="#" className="see-all-category">
                          <Link to={`/category?category-id=${product?.id}`}>
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
    </>
  );
};

export default CategoriesListing;
