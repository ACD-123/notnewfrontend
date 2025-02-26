import React, { useState } from "react";
import ProductCard from "../../components/Shared/Cards/ProductCard";
import { Link } from "react-router-dom";
import ProductServices from "../../services/API/ProductServices";
import { toast } from "react-toastify";
import ProductSkeletonLoader from "../Shared/ProductSkeletonLoader";
import NoDataFound from "../Shared/NoDataFound";

const HotSellingProducts = ({ loading, data, setHotProducts, title }) => {

  const handleToggleFavourite = (index) => {
    const updatedProducts = [...data];
    updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
    setHotProducts(updatedProducts);
  };


  return (
    <>
      {loading ?
        <>
          <div className="container my-5">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12"><ProductSkeletonLoader /></div>
              <div className="col-lg-3 col-md-6 col-sm-12" id='hide-on-mobile-768'><ProductSkeletonLoader /></div>
              <div className="col-lg-3 col-md-6 col-sm-12" id="hide-on-mobile-991"><ProductSkeletonLoader /></div>
              <div className="col-lg-3 col-md-6 col-sm-12" id="hide-on-mobile-991"><ProductSkeletonLoader /></div>
            </div>
          </div>
        </>
        :
        data?.length > 0 ?
          <section id="product-recents-viewed" className="hot-selling-product">
            <>
              <div className="container">
                <div className="row">
                  <div className="headings">
                    <h3>
                      {title}
                      {data.legth > 0 &&
                        <span>
                          <Link to="/hot-deals">View More</Link>
                        </span>
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
                      (
                        data?.length > 0 ?
                          data?.map((product, index) => (
                            <div className="col-lg-3 col-md-6 col-sm-12" key={product?.guid}>
                              <ProductCard data={product} handleToggleFavourite={handleToggleFavourite} index={index} />
                            </div>
                          ))
                          :
                          <NoDataFound title={'No Data Found'} />
                      )
                    }
                  </div>
                </div>
              </section>
            </>
          </section>
          :
          null}
    </>
  );
};

export default HotSellingProducts;
