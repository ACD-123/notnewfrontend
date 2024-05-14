import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Secureimage1 from "../../../../assets/Images/Singleproduct/Sidebar/1.png";
import Secureimage2 from "../../../../assets/Images/Singleproduct/Sidebar/2.png";
import Secureimage3 from "../../../../assets/Images/Singleproduct/Sidebar/3.png";
import Secureimage4 from "../../../../assets/Images/Singleproduct/Sidebar/4.png";
import Image from "../../../../assets/Images/Singleproduct/Sidebar/notnew.png";
import Heart from "../../../../assets/Images/Singleproduct/Sidebar/heart.png";
import {
  FaHeart,
  FaRegHeart
} from "react-icons/fa";
import ProductServices from "../../../../services/API/ProductServices"; //~/services/API/ProductServices
import SellerServices from "../../../../services/API/SellerServices"; //~/services/API/SellerServices
import UserServices from "../../../../services/API/UserServices"; //~/services/API/AuthService
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { setUserDetails, isLoggedin, getUserDetails } from "../../../../services/Auth"; // ~/services/Auth

const SingleProductSidebar = () => {
  const { pathname } = window.location;
  const id = pathname.split("/").pop();

  const [productData, setProductData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [shopGuid, setShopGuid] = useState([]);
  const [shopGuidSave, setShopGuidSave] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savedseller, setSavedSeller] = useState("");
  const [favData, setFavData] = useState([]);
  const [user, setUser] = useState({});

  let loggedIn = localStorage.getItem("user_details");
  let logedIn;
  if (loggedIn) {
    logedIn = JSON.parse(loggedIn);
  }

  const getProduct = () => {
    ProductServices.get(id)
      .then((res) => {
        setShopData(res.data.seller);
        setProductData(res.data);
        setShopGuid(res.data.shop);
        setShopGuidSave(res.data.shop.guid);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSellerServices = (e) => {
    e.preventDefault();
    if (logedIn) {
      let data = {
        shop_id: productData.shop_id
      };
      SellerServices.saveSeller(data)
        .then((response) => {
          toast.success(response);
          getSellerSavedData(shopGuidSave);
        })
        .catch((e) => {
          console.log("Error:", e);
        });
    } else {
      window.location.href = "/signin";
    }
  };

  const getSellerSavedData = () => {
    ProductServices.getSavedSellerDetails(shopGuidSave)
      .then((response) => {
        setSavedSeller(response.shop_id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUser = () => {
    UserServices.detail()
      .then((response) => {
        setUserDetails(response);
        console.log('user_details',response);
        setUser(response.id);
        localStorage.setItem("user_details", JSON.stringify(response));
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  const addToFavorites = async (shopGuid) => {
    try {
      const data = {
        favourite_against_id: shopGuid,
        user_id: user,
        type: "2"
      };
      const res = await ProductServices.isFavorite(data);
      if (res.status) {
        // Update shopData directly after API call
        setShopData((prevShopData) => ({
          ...prevShopData,
          is_favourite: !prevShopData.is_favourite // Toggle is_favourite
        }));
        toast.success("Seller added to favorites!");
        setFavData(res.data);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast.error("Failed to add seller to favorites.");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (isLoggedin()) {
      getUser();
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader-container text-center">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : (
        <div className="singleproduct-sidebar">
          <div className="secure">
            <div className="image">
              <img src={Secureimage2} />
            </div>
            <div className="text-secure">
              <h4>Safe payments</h4>
              <p>It is a long established fact that a reader will be distracted</p>
            </div>
          </div>

          <div className="secure">
            <div className="image">
              <img src={Secureimage3} />
            </div>
            <div className="text-secure">
              <h4>Security & privacy</h4>
              <p>It is a long established fact that a reader will be distracted</p>
            </div>
          </div>

          <div className="secure">
            <div className="image">
              <img src={Secureimage4} />
            </div>
            <div className="text-secure">
              <h4>Buyer Protection</h4>
              <p>It is a long established fact that a reader will be distracted</p>
            </div>
          </div>
          <hr />
          <div className="store">
            <img width="150" height="100" src={`${shopData.sellerImage}`} />
            <h2>{productData.fullname}</h2>
          </div>
          <div className="storecontactdetails">
            <ul>
              <li>
                <div className="textersaveSeller" onClick={() => addToFavorites(shopGuidSave)}>
                  {shopData.is_favourite === true ? (
                    <span style={{ fontSize: "15px", display: "flex", alignItems: "center", gap: "6px", color: '#2994F8' }}>
                      <FaHeart /> UnSave this Seller
                    </span>
                  ) : (
                    <span style={{ fontSize: "15px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <FaRegHeart /> Save this Seller
                    </span>
                  )}
                </div>
              </li>
              <li>
                <a href={`tel:${shopData.phone}`} >{shopData.phone}</a>
              </li>
              <li>
                <Link to={`/sellershop/${shopGuid.guid}`}>Visit Seller Shop</Link>
              </li>
              <li>
                <Link to="#">View Other Products</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProductSidebar;
