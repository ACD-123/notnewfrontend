import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Secureimage2 from "../../../../assets/Images/Singleproduct/Sidebar/2.png";
import Secureimage3 from "../../../../assets/Images/Singleproduct/Sidebar/3.png";
import Secureimage4 from "../../../../assets/Images/Singleproduct/Sidebar/4.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ProductServices from "../../../../services/API/ProductServices";
import SellerServices from "../../../../services/API/SellerServices";
import UserServices from "../../../../services/API/UserServices";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { setUserDetails, isLoggedin, setUserId } from "../../../../services/Auth";

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
  const navigate = useNavigate()
  let loggedIn = localStorage.getItem("user_details");
  const user_id = localStorage.getItem('user_id');
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
        .catch((error) => {
          toast.error(error?.response?.data?.message)
        });
    } else {
      navigate("/signin")
    }
  };

  const getSellerSavedData = () => {
    ProductServices.getSavedSellerDetails(shopGuidSave)
      .then((response) => {
        setSavedSeller(response.shop_id);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };

  const getUser = () => {
    UserServices.detail()
      .then((response) => {
        setUserDetails(response);
        setUserId(response?.id)
        setUser(response.id);
        localStorage.setItem("user_details", JSON.stringify(response));
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
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

      setShopData((prevShopData) => ({
        ...prevShopData,
        is_favourite: !prevShopData.is_favourite
      }));
      toast.success("Seller added to favorites!");
      setFavData(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message)
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
        <div className="p-d-w-r-s-b">
          <div className="p-d-w-r-s-b-w">
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
              <img src={`${shopData.sellerImage}`} />
              <h2>{productData.fullname}</h2>
            </div>
            <div className="storecontactdetails">
              <h3>{shopData?.sellerName} Store</h3>
              <ul>
                <li>
                  {shopData.is_favourite === true ?
                    <div className="textersaveSeller" onClick={() => addToFavorites(shopGuidSave)}>
                      <FaHeart /> UnSave this Seller
                    </div>
                    :
                    <div className="textersaveSeller" onClick={() => addToFavorites(shopGuidSave)}>
                      <FaRegHeart /> Save this Seller
                    </div>
                  }
                </li>
                <li>
                  <a href={`tel:${shopGuid.phone}`} >{shopGuid.phone}</a>
                </li>
                <li>
                  <Link to={`/sellershop/${shopGuid.guid}`}>Visit Seller Shop</Link>
                </li>
                <li>
                  <Link to={`/sellershop/${shopGuid.guid}`}>View Other Products</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProductSidebar;
