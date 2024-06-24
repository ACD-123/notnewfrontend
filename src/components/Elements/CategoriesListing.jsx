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

const CategoriesListing = () => {
  const [categories, setCategoryData] = useState({});
  const [loadingDots, setLoadingDots] = useState("..."); // State to control loading dots
  const getCategory = () => {
    HomeService.getrecursive().then((res) => {
      setCategoryData(res);
    });
  };
  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots((prev) => (prev === "..." ? "" : prev + "."));
    }, 500); // Change the interval time as needed
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <section id="categorylistings">
        <div className="container">
          <div className="row">
            <h1>Categories</h1>
            {categories.length > 0 ? (
              <>
                {categories?.map((product) => (
                  <div
                    className="col-lg-3"
                    key={product.id}
                    style={{ padding: "40px 20px" }}
                  >
                    <div className="productlist">
                      {product.media.length > 0 ? (
                        <>
                          {product.media?.map((media) => {
                            return (
                              <div className="productImageTopCat">
                                <img
                                  src={`${BASE_URL}/image/category/${media.name}`}
                                  alt={media.name}
                                />
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        <img src={Categorylistimage2} alt={product.name} />
                      )}
                      <h3>{product.name}</h3>
                      <ul>
                        {product.children_recursive.map(
                          (subcategory, index) => (
                            <li key={index}>
                              <a href={`singlecategory/${subcategory.guid}`}>
                                {subcategory.name}
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                      <a
                        href="#"
                        style={{
                          color: "#00C3C9",
                          textTransform: "capitalize",
                        }}
                      >
                        See All
                      </a>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="container">
                  <h3>Loading{loadingDots}</h3>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoriesListing;
