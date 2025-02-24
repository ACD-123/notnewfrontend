import React from "react";
import ProductGallery from "./SingleProductElements/ProductGallery";
import Header from "../../Header";
import Footer from "../../Footer";
import ProductInformation from "./SingleProductElements/ProductInformation";
import SingleProductSidebar from "./SingleProductElements/SingleProductSidebar";
import RecentViewedItems from "../RecentViewedItems";
import ProductTabs from "./SingleProductElements/ProductTabs";
import SellerDetails from "../../Seller/SellerDetails";

const SubCategory = ({cartFullResponse , notificationCount}) => {
  return (
    <>
      <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount}/>
      <section id="single-product" style={{ padding: "40px 0px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <ProductGallery />
            </div>
            <div className="col-lg-5">
              <ProductInformation />
            </div>
            <div className="col-lg-2">
              <SingleProductSidebar />
            </div>
          </div>
          <div className="row">
            <ProductTabs />
          </div>
          <SellerDetails />
          <div className="row">
            <RecentViewedItems />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SubCategory;
