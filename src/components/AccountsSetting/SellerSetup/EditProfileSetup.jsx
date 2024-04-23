import React, { useState, useEffect, useRef } from "react";
import Profileimage from "../../../assets/Images/Profilesimage/1.png";
import SellerServices from "../../../services/API/SellerServices"; //~/services/API/SellerServices
import CountryServices from "../../../services/API/CountryServices"; //~/services/API/CountryServices
import State from "../../../services/API/State"; //~/services/API/State
import City from "../../../services/API/City"; //~/services/API/City
import { toast } from "react-toastify";
import Avatarprofile from "../../../assets/Images/avatarsignup.png";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import moment from "moment";
import {BASE_URL} from "../../../services/Constant"
import { Spinner } from "react-bootstrap";

const libraries = ['places'];
const EditProfileSetup = () => {
  const inputRef = useRef();
  const [profilePic, setProfilePic] = useState(null);
  const [shopData, setShopData] = useState([]);
  const [countries, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [currentaddress, setCurrentAddress] = useState("");
  const [cities, setCity] = useState("");
  const [states, setState] = useState(""); 
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [coverimage, setCoverImage] = useState("");
  const [guid, setGuid] = useState("")
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [zip, setZip] = useState("Zip");
  const [editaddress, setEditAddress] = useState(false);
  const [addresses, setAddresses] = useState("");
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDg6Ci3L6yS5YvtKAkWQjnodGUtlNYHw9Y",
      libraries
  });
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Perform validations or modifications if needed
    setProfilePic(selectedFile);
  };
  // const getCountry = () => {
  //   CountryServices.all()
  //     .then((response) => {
  //       setCountry(response);
  //     })
  //     .catch((e) => {
  //       toast.error(e.message);
  //     });
  // };
  const getStates = () => {
    State.all()
      .then((response) => {
        setState(response);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  const getCities = () => {
    City.all()
      .then((response) => {
        setCity(response);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  const handleCountryChange = (e) => {
    shopData.country_id = e.target.value;
    State.get(e.target.value)
      .then((response) => {
        setState(response);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const handleStateChange = (e) => {
    shopData.state_id = e.target.value;
    City.get(e.target.value)
      .then((response) => {
        setCity(response);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const handlePlaceChanged = () => { 
    const [ place ] = inputRef.current.getPlaces();
    if(place) { 
        setAddress(place.formatted_address)
        setLatitude(place.geometry.location.lat())
        setLongitude(place.geometry.location.lng())
        for (var i = 0; i < place.address_components.length; i++) {
          for (var j = 0; j < place.address_components[i].types.length; j++) {
            if (place.address_components[i].types[j] == "postal_code") {
                setZip(place.address_components[i].long_name)
            // document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
            }
            if (place.address_components[i].types[0] == "locality") {
                  setCity(place.address_components[i].long_name);
                }
            if (place.address_components[i].types[0] == "administrative_area_level_1") {
                  setState(place.address_components[i].long_name);
                }
            if (place.address_components[i].types[0] == "country") {
                  setCountry(place.address_components[i].long_name);
              }
          }
        }
    } 
}
  const handleCityChange = (e) => {
    // shopData.city_id = e.target.value;
  };
  const handleAddAddress =()=>{
    setEditAddress(true)
    // shopData.address = addresses;
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    const newErrors = {};
    if (!shopData.fullname) {
      newErrors.fullname = "Full Name is required";
    }
    if (!shopData.email) {
      newErrors.email = "Email is required";
    }
    // if (!address) {
    //   newErrors.address = "Address is required";
    // }
    if (!shopData.phone) {
      newErrors.phone = "Phone is required";
    }
    if (!countries) {
      newErrors.country_id = "Country is required";
    }
    if (!states) {
      newErrors.state_id = "State is required";
    }
    if (!cities) {
      newErrors.city_id = "City is required";
    }
    if (!zip) {
      newErrors.zip = "Zip is required";
    }
    shopData.country_id = countries;
    shopData.state_id = states;
    shopData.city_id = cities; 
    shopData.zip = zip;
    shopData.address = address;
    shopData.latitude = latitude;
    shopData.longitude = longitude;
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setEnabled(true);
      const fd = new FormData();
      fd.append("fullname", shopData.fullname);
      fd.append("email", shopData.email);
      fd.append("address", address);
      fd.append("phone", shopData.phone);
      fd.append("country_id", shopData.country_id);
      fd.append("state_id", shopData.state_id);
      fd.append("city_id", shopData.city_id);
      fd.append("zip", shopData.zip);
      fd.append("latitude", shopData.latitude);
      fd.append("longitude", shopData.longitude);
      if(address){
        fd.append("address", address);
      }else if(addresses){
        fd.append("address", addresses);
      }
      if (profilePic) {
        fd.append("file", profilePic);
      }
      for (let pair of fd.entries()) {
        console.log('formdata params'+pair[0] + ", " + pair[1]);
      }
      fd.append("guid", guid);
      SellerServices.update(fd)
      .then((response) => {
        if(response.status){
          toast.success(response.data);
          setEditAddress(false)
        }
        // setTimeout(() => {
          // setFormSubmitted(true);
        // }, 6000);
      })
      .catch((e) => {
        toast.error(e.message);
        setIsLoading(false);
        setEnabled(false);
      })
      .then(() => {
        setIsLoading(false);
        setEnabled(false);
      });
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopData({
      ...shopData,
      [name]: value,
    });
  };
  useEffect(() => {
    let loggedInUser = localStorage.getItem("user_details");
    if (loggedInUser) {
      const loggedInUsers = JSON.parse(loggedInUser);
      if (loggedInUsers.isTrustedSeller === 1) {
        setIsLoading(true); // Start loading
        SellerServices.getShopDetails(loggedInUsers?.id)
          .then((response) => {
            if(response.status){
              setGuid(response.data.guid)
              console.log('shop')
              setShopData(response.data);
              setCountry(response.data.country_id)
              setCurrentAddress(response.data.address)
              setState(response.data.state_id)
              setCity(response.data.city_id)
              setAddress(response.data.address)
              setIsLoading(false); // Stop loading when data is fetched
              // setCountry("")
            }
            // State.get(response.country_id)
            // .then((states) => {
            //   setState(states);
            // })
            // City.get(response.state_id)
            // .then((cities) => {
            //   setCity(cities);
            // })
          })
          .catch((e) => {
            console.log(e.message);
          });
      }
    }
    // getCountry();
  }, []);
  return (
    <>
    {isLoading ? ( // Render loader if isLoading is true
        <div className="loader-container text-center">
          <Spinner animation="border" role="status">
            {/* <span className="sr-only">Loading...</span> */}
          </Spinner>
        </div>
      ) : (
        <>

      {/* Your existing form */}
      <section id="selleraccountsetup">
        <div className="container"> 
           {shopData ? (
            <>
              <div
                className="row align-items-center edit-profile"
                style={{ padding: "40px 0px" }}
              >
                <div className="col-lg-9">
                  <div className="profile0-details">
                  <div className="profile-pic-wrapper">
                      <div className="pic-holder">
                      {profilePic ? (<><img
                          id="profilePic"
                          className="pic"
                          src={
                            profilePic
                              ? URL.createObjectURL(profilePic)
                              : profilePic
                          }
                        /></>):(<>
                        {shopData.cover_image ? (<>
                          <img
                          id="profilePic"
                          className="pic"
                          src={`${BASE_URL}/${shopData.cover_image}`}
                        />

                        </>):(
                          <>
                          <img
                          id="profilePic"
                          className="pic"
                          src={
                            profilePic
                              ? URL.createObjectURL(profilePic)
                              : profilePic
                          }
                        />
                          </>
                        )}
                        </>)}
                        {/* {shopData.cover_image ? (
                          <>
                          <img 
                             id="profilePic"
                             className="pic"
                             src={`${BASE_URL}/${shopData.cover_image}`}
                             width="100"
                             height="50"
                             style={{ borderRadius: "40px"}}
                             alt={shopData.fullname} />
                          </>
                        ) : (
                          <>
                            <img
                              id="profilePic"
                              width="100"
                              height="50"
                              className="pic"
                              src={Avatarprofile}
                              alt="Profile"
                            />
                          </>
                        )} */}
                        <input
                          className="uploadProfileInput"
                          type="file"
                          accept="image/png, image/jpeg"
                          name="profile_pic"
                          style={{display:'none'}}
                          id="newProfilePhoto"
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="newProfilePhoto"
                          className="upload-file-block"
                        >
                          <div className="text-center">
                            <div className="mb-2">
                              <i className="fa fa-camera fa-2x"></i>
                            </div>
                            <div className="text-uppercase">
                              Upload <br /> Profile Photo
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div>
                      <h2>{shopData?.fullname}</h2>
                      <h3>
                        Joined since :{" "}
                        {moment(shopData?.created_at).format("YYYY")}
                      </h3>
                    </div>
                  </div>
                </div>
                {/* <div className="col-lg-3">
                  <button className="updte-profile">Update Profile</button>
                </div> */}
              </div>
              <div className="row align-items-center">
                <div className="signup-form-fields register">
                  <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        value={shopData?.fullname}
                        id="fullname"
                        name="fullname"
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.fullname && <p className="error">{errors.fullname}</p>}
                    <div class="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        value={shopData?.email}
                        id="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && <p className="error">{errors.email}</p>}
                    <div class="mb-3">
                      <input
                        type="tel"
                        className="form-control"
                        value={shopData?.phone}
                        id="phone"
                        name="phone"
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && <p className="error">{errors.phone}</p>}
                    </div>
                    <div class="mb-3">
                      {/* <input
                        type="text"
                        className="form-control"
                        value={shopData?.address}
                        id="address"
                        name="address"
                        onChange={handleChange}
                        placeholder="Enter your street address"
                      /> */}
                      {/* <label>Your Current Location:</label>
                      <p>{currentaddress}</p>
                      {isLoaded
                      &&
                      <StandaloneSearchBox
                        onLoad={ref => inputRef.current = ref}
                        onPlacesChanged={handlePlaceChanged}
                      >
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your street address"
                        />
                    </StandaloneSearchBox>} */}
                       {isLoaded
                          &&
                          <StandaloneSearchBox
                            onLoad={ref => inputRef.current = ref}
                            onPlacesChanged={handlePlaceChanged}
                          >
                            <input
                                type="text"
                                className="form-control"
                                placeholder={`${address}`}
                            />
                        </StandaloneSearchBox>}
                     
                      <br />
                      <br />
                      {errors.address && <p className="error">{errors.address}</p>}
                    </div>
                    <div className="d-flex statesfield">
                      <div className="fieldss">
                        <label  className="form-control">
                        {countries}
                        </label>
                        {/* <select
                          class="form-select"
                          id="country"
                          value={shopData?.country_id}
                          onChange={handleCountryChange}
                        >
                          <option value="">Select Country</option>
                          {countries.length > 0 ? (
                            <>
                              {countries?.map((country) => {
                                return (
                                  <option key={country.id} value={country.id}>
                                    {country.name}
                                  </option>
                                );
                              })}
                            </>
                          ) : (
                            ""
                          )}
                        </select> */}
                        {errors.country_id && <p className="error">{errors.country_id}</p>}
                      </div>
                      <div className="fieldss">
                      <label  className="form-control">
                        {states}
                        </label>

                        {/* <select
                          class="form-select"
                          id="state"
                          value={shopData?.state_id}
                          onChange={handleStateChange}
                        >
                          <option value="">Select States</option>
                          {states.length > 0 ? (
                            <>
                              {states?.map((state) => {
                                return (
                                  <option key={state.id} value={state.id}>
                                    {state.name}
                                  </option>
                                );
                              })}
                            </>
                          ) : (
                            // <option value="2">State 2</option>
                            ""
                          )}
                        </select> */}
                        {errors.state_id && <p className="error">{errors.state_id}</p>}
                      </div>
                      <div className="fieldss">
                        <label  className="form-control">
                          {cities}
                        </label>
                        {/* <select
                          class="form-select"
                          id="city"
                          name="city"
                          onChange={handleCityChange}
                          value={shopData?.city_id}
                        >
                          <option value="">Select City</option>
                          {cities.length > 0 ? (
                            <>
                              {cities?.map((city) => {
                                return (
                                  <option key={city.id} value={city.id}>
                                    {city.name}
                                  </option>
                                );
                              })}
                            </>
                          ) : (
                            ""
                          )}
                        </select> */}
                        {errors.city_id && <p className="error">{errors.city_id}</p>}
                      </div>
                    </div>
                    <div class="mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="zip"
                        name="zip"
                        onChange={handleChange}
                        value={zip}
                        placeholder="Enter your zip code"
                      />
                      {errors.zip && <p className="error">{errors.zip}</p>}
                    </div>
                    <button disabled={enabled} className="btn btn-primary svavava" type="submit">
                      {isLoading ? "loading.." : "Update"}
                    </button>
                  </form>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </section>
      </>
      )}
    </>
  );
};

export default EditProfileSetup;
