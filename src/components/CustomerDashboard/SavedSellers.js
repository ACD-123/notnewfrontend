import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserServices from "../../services/API/UserServices.js";
import {
  setUserDetails,
  isLoggedin,
  setUserId,
} from "../../services/Auth/index.js";
import { Spinner } from 'react-bootstrap';
import { BASE_URL } from "../../services/Constant"
import ProductServices from '../../services/API/ProductServices.js';
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa';

const SavedSellers = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [saveSeller, setSaveSeller] = useState([]);
  const [sellerShop, setSellerShop] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [favData, setFavData] = useState([]);

  const getUser = () => {
    UserServices.detail()
      .then((response) => {
        setUserDetails(response);
        setUserId(response?.id)
        setUser(response.id);
        localStorage.setItem("user_details", JSON.parse(response));
        setIsLoading(false);

      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false);

      });
  };
  const getUserSaveSeller = () => {
    UserServices.getSavedSeller(user)
      .then((response) => {
        setIsLoading(false);
        setSaveSeller(response.data);
        setSellerShop(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error?.response?.data?.message)
      });
    // }
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
        setShopData((prevShopData) => ({
          ...prevShopData,
          is_favourite: !prevShopData.is_favourite
        }));
        toast.success("Seller added to favorites!");
        setFavData(res.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      toast.error("Failed to add seller to favorites.");
    }
  };
  useEffect(() => {
    if (isLoggedin()) {
      getUser();
    }
    if (user) {
      getUserSaveSeller();
    }
  }, [user]);

  return (
    <>
      <section id="savedsellers">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h3>Saved sellers</h3>
            <p>{saveSeller?.length} Saved sellers</p>
          </div>
          <div className="col-lg-6">
            <div className="sorting">
              <button>List View</button>
              <select id="sort">
                <option value="name">Sort by Names</option>
                <option value="profileType">Sort by User</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row" style={{ paddingTop: '10px' }}>
          <div className="saved-profile">
            <div>
              <div className="grid">
                <div className="grid-profile row">
                  {isLoading ? (
                    <div className="loader-container text-center">
                      <Spinner animation="border" role="status">
                      </Spinner>
                    </div>
                  ) : (
                    <>
                      {saveSeller?.length == 0 ? (
                        <div>You Could Not save any Seller</div>
                      ) : (
                        <>
                          {saveSeller.map((seller) => (
                            <div
                              className="profile-innerdetails col-lg-6"
                              style={{ marginBottom: '20px' }}
                            >
                              <div className="prf-id-name" style={{ marginRight: '20px' }}>
                                <div className="profileimagesid">
                                  <img
                                    src={`${BASE_URL}/${seller.seller.cover_image}`}
                                    alt="Bil Smith"
                                  />
                                </div>
                                <div>
                                  <h3>{seller.seller.fullname}</h3>

                                  <span onClick={() => addToFavorites(seller.seller.guid)} style={{ fontSize: "15px", display: "flex", alignItems: "center", gap: "6px", color: '#2994F8' }}>
                                    <FaHeart /> UnSave this Seller
                                  </span>
                                  <Link to={`/sellershop/${seller.seller.guid}`}>Visit Profile</Link>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SavedSellers;
