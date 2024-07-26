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

const SellerShop = ({ cartFullResponse }) => {
  const [activeTab, setActiveTab] = useState("seller1");
  const [tab, setTab] = useState(0);
  const [shopdata, setShopData] = useState([]);
  const { pathname } = window.location;
  const id = pathname.split("/").pop();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Header cartFullResponse={cartFullResponse} />
      <section id="sellershop">
        <div className="container">
          <div className="row">
            <SellerProfileDetails id={id} />
          </div>
          <div className="row">
            <div className="tab-buttons">
              <div className="t-b-b">
                <button className={`${tab === 0 ? "active" : ''}`} onClick={() =>{setTab(0)}}>Shop</button>
                <button className={`${tab === 1 ? "active" : ''}`} onClick={() =>{setTab(1)}}>About Us</button>
                <button className={`${tab === 2 ? "active" : ''}`} onClick={() =>{setTab(2)}}>FeedBack</button>
              </div>
              <div className="t-b-w">{tab === 0 ?"Shop" : tab === 1 ? "About Us" : "FeedBack"}</div>
            </div>
          </div>
          <div className="row">
            {tab === 0 && <SellerCategories />}
            {tab === 1 && <SellerAbout />}
            {tab === 2 && <SellerFeedbackNew />}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SellerShop;
