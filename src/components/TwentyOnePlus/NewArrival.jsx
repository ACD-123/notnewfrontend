import React, { useState, useEffect } from "react";
import ProductCard from "../../components/Shared/Cards/ProductCard";
import { Link } from "react-router-dom";
import ProductServices from "../../services/API/ProductServices";
import { toast } from "react-toastify";
import ProductSkeletonLoader from "../Shared/ProductSkeletonLoader";
import NoDataFound from "../Shared/NoDataFound";

const NewArrival = ({ title }) => {
  const [productData, setProductData] = useState([]);
  const [pagination, setPagination] = useState({});
  const user_id = localStorage.getItem('user_id');
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
      {loading ?
        <>
          <div className="container my-5">
            <div className="row">
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
            </div>
          </div>
        </>
        :
        productData?.length > 0 ?
          <section id="product-recents-viewed">
            <>
              <div className="container">
                <div className="row">
                  <div className="headings">
                    <h3>{title}
                      <span><Link to="/new-arrival-21-plus">View More</Link></span>
                    </h3>
                  </div>
                </div>
              </div>
              <section id="productcard">
                <div className="container">
                  <div className="row">
                    {
                      productData?.length > 0 ?
                        productData?.slice(0, 4)?.map((product, index) => (
                          <div className="col-lg-3 col-md-6 col-sm-12" key={product?.guid}>
                            <ProductCard data={product} handleToggleFavourite={handleToggleFavourite} index={index} />
                          </div>
                        ))
                        :
                        <NoDataFound title={'No Data Found'} />
                    }
                  </div>
                </div>
              </section>
            </>
          </section>
          : null

      }
    </>
  );
};

export default NewArrival;
