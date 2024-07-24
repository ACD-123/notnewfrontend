import React, { useState, useEffect } from "react";
import Nav from "../../../assets/Images/SellerShop/nav.png";
import Footer from "../../Footer";
import Header from "../../Header";
import SellerProfileDetails from "../../Elements/SellerElements/SellerProfileDetails";
import Search from "../../Elements/FilterAttributes/Search";
import SellerCategories from "./SellerCategories";
import SellerCategoryShop from "../../Elements/SellerElements/SellerCategoryShop";
import SellerAbout from "./SellerAbout";
import SellerFeedbackNew from "./SellerFeedBackNew";
import SellerServices from "../../../services/API/SellerServices"; //~/services/API/SellerServices

const SellerShop = ({cartFullResponse}) => {
  const [activeTab, setActiveTab] = useState("seller1");
  const [shopdata, setShopData] = useState([]);
  const { pathname } = window.location;
  const id = pathname.split("/").pop();
console.log('id',id)
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <>
      {/* HEADER */}
      <Header cartFullResponse={cartFullResponse}/>
      {/* HEADER */}
      <section id="sellershop">
        <div className="container">
          <div className="row">
            <SellerProfileDetails />
          </div>
          <div className="row">
            <div className="category-shop-about">
              <div
                className="main-dasboard-tabs seller-shop">
                {/* <div className="whatyouthink">
                  <Search />
                </div> */}
                <div className="tab-buttons">
                  <button
                    onClick={() => handleTabClick("seller1")}
                    className={activeTab === "seller1" ? "active" : ""}
                  >
                    <img src={Nav} /> Products
                  </button>
                  {/* <button
                    onClick={() => handleTabClick("seller2")}
                    className={activeTab === "seller2" ? "active" : ""}
                  >
                    Shop
                  </button> */}
                  <button
                    onClick={() => handleTabClick("seller3")}
                    className={activeTab === "seller3" ? "active" : ""}
                  >
                    About
                  </button>
                  <button
                    onClick={() => handleTabClick("seller4")}
                    className={activeTab === "seller4" ? "active" : ""}
                  >
                    Feedback
                  </button>
                </div>
                <div className="tab-content">
                  {activeTab === "seller1" && (
                    <div>
                      <SellerCategories />
                    </div>
                  )}
                  {/* {activeTab === "seller2" && (
                    <div>
                      <SellerCategoryShop />
                    </div>
                  )} */}
                  {activeTab === "seller3" && (
                    <div>
                      <SellerAbout />
                    </div>
                  )}
                  {activeTab === 'seller4' && <div><SellerFeedbackNew /></div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <Footer />
      {/* FOOTER */}
    </>
  );
};

export default SellerShop;
