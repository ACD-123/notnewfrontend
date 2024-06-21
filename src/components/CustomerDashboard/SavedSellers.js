import React, { useState, useEffect } from 'react';
import Profileimage1 from '../../assets/Images/Profilesimage/1.png'
import Profileimage2 from '../../assets/Images/Profilesimage/2.png'
import Profileimage3 from '../../assets/Images/Profilesimage/3.png'
import Heart from '../../assets/Images/Heart.png'
import { Link } from 'react-router-dom';
import UserServices from "../../services/API/UserServices.js"; //~/services/API/AuthService
import {
  setUserDetails,
  isLoggedin,
  getUserDetails,
} from "../../services/Auth/index.js";
import SellerServices from "../../services/API/SellerServices.js"; //~/services/API/SellerServices
import { Spinner } from 'react-bootstrap';
import {BASE_URL} from "../../services/Constant"
import ProductServices from '../../services/API/ProductServices.js';
import { toast } from 'react-toastify';
import { FaHeart } from 'react-icons/fa';

const SavedSellers = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading state as true
  const [saveSeller, setSaveSeller] = useState([]); // Initialize isLoading state as true
  const [sellerShop, setSellerShop] = useState([]); // Initialize isLoading state as true
  const [shopData, setShopData] = useState([]);
  const [favData, setFavData] = useState([]);

// console.log(saveSeller);
  const getUser = () => {
    UserServices.detail()
      .then((response) => {
        console.log("loginsaved", response.id);
        setUserDetails(response);
        setUser(response.id);
        console.log('user all detail',response.id);
        localStorage.setItem("user_details", JSON.parse(response));
        setIsLoading(false); // Set isLoading to false when data is fetched

      })
      .catch((e) => {
        console.log("error", e);
        // toast.error(e.message);
        setIsLoading(false); // Set isLoading to false when data is fetched

      });
  };
  const getUserSaveSeller = () => {
    // if (user && user.id) {
      UserServices.getSavedSeller(user)
        .then((response) => {
          setIsLoading(false);
          setSaveSeller(response.data); // Assuming the API returns an array of saved sellers
          setSellerShop(response.data); // Assuming the API returns an array of saved sellers
          console.log('saved sellers',response);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('Error fetching saved sellers:', error);
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
    if (isLoggedin()) {
      getUser();
      // let cartItems = localStorage.getItem('cupon');
    }
    if (user) {
      getUserSaveSeller();
    }
  }, [user]);
  
  return (
    <>
      <section id="savedsellers">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h3>Saved sellers</h3>
            <p>{saveSeller.length} Saved sellers</p>
          </div>
          <div class="col-lg-6">
            <div class="sorting">
              <button>List View</button>
              <select id="sort">
                <option value="name">Sort by Names</option>
                <option value="profileType">Sort by User</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row" style={{paddingTop: '10px'}}>
          <div class="saved-profile">
            <div>
              <div class="grid">
                <div class="grid-profile row">
                {isLoading ? ( // Render loader if isLoading is true
        <div className="loader-container text-center">
          <Spinner animation="border" role="status">
            {/* <span className="sr-only">Loading...</span> */}
          </Spinner>
        </div>
      ) : (
          <>
          {saveSeller.length == 0 ? ( // Check if customerOrders array is empty
            <div>You Could Not save any Seller</div>
          ) : (
          <>
          {saveSeller.map((seller) => (
                  <div
                    className="profile-innerdetails col-lg-6"
                    style={{marginBottom: '20px'}}
                  >
                    <div class="prf-id-name" style={{marginRight: '20px'}}>
                      <div class="profileimagesid">
                        <img
                          src={`${BASE_URL}/${seller.seller.cover_image}`}
                          alt="Bil Smith"
                        />
                      </div>
                      <div>
                        <h3>{seller.seller.fullname}</h3>
                        {/* <img
                          class="heart"
                          src={Heart}
                          alt="Heart"
                        /> */}

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
