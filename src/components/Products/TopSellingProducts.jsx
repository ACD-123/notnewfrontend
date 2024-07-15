
import React from "react";
import ProductCard from "../../components/Shared/Cards/ProductCard";
import { Link } from "react-router-dom";
import ProductSkeletonLoader from "../Shared/ProductSkeletonLoader";

const TopSellingProducts = ({ data, setTopSellingProducts, title, loading }) => {

  const handleToggleFavourite = (index) => {
    const updatedProducts = [...data];
    updatedProducts[index].product.is_favourite = !updatedProducts[index].product.is_favourite;
    setTopSellingProducts(updatedProducts);
  };

  return (
    <>
      <section id="product-recents-viewed" className="top-selling-product">
        <>
          <div className="container">
            <div className="row">
              <div className="headings">
                <h3>
                  {title}
                  <span>
                    <Link to="/top-selling-prodcuts">View More</Link>
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
                    <div className="col-lg-3"><ProductSkeletonLoader /></div>
                    <div className="col-lg-3"><ProductSkeletonLoader /></div>
                    <div className="col-lg-3"><ProductSkeletonLoader /></div>
                    <div className="col-lg-3"><ProductSkeletonLoader /></div>

                  </>
                  :
                  data?.map((product, index) => (
                    <div className="col col-lg-3" key={product?.product?.guid}>
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

export default TopSellingProducts;
