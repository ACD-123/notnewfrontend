import React, { useState} from "react";
import Footer from "../../Footer";
import Header from "../../Header";
import SellerProfileDetails from "../../Elements/SellerElements/SellerProfileDetails";
import SellerCategories from "./SellerCategories";
import SellerAbout from "./SellerAbout";
import SellerFeedbackNew from "./SellerFeedBackNew";

const SellerShop = ({ cartFullResponse, notificationCount }) => {
  const [activeTab, setActiveTab] = useState("seller1");
  const [tab, setTab] = useState(0);
  const { pathname } = window.location;
  const id = pathname.split("/").pop();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount} />
      <section id="sellershop">
        <div className="container">
          <div className="row">
            <SellerProfileDetails id={id} />
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="tab-buttons">
                <div className="t-b-b">
                  <button className={`${tab === 0 ? "active" : ''}`} onClick={() => { setTab(0) }}>Shop</button>
                  <button className={`${tab === 1 ? "active" : ''}`} onClick={() => { setTab(1) }}>About Us</button>
                  <button className={`${tab === 2 ? "active" : ''}`} onClick={() => { setTab(2) }}>FeedBack</button>
                </div>
                <div className="t-b-w">{tab === 0 ? "Shop" : tab === 1 ? "About Us" : "FeedBack"}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
            {tab === 0 && <SellerCategories />}
            {tab === 1 && <SellerAbout />}
            {tab === 2 && <SellerFeedbackNew />}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SellerShop;
