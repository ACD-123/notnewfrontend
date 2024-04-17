import React, { useState, useEffect, useRef } from "react";
import Avatarprofile from "../../../assets/Images/avatarsignup.png";
import ConnectBank from "./ConnectBank";
import { toast } from "react-toastify";
import CountryServices from "../../../services/API/CountryServices"; //~/services/API/CountryServices
import SellerServices from "../../../services/API/SellerServices"; //~/services/API/SellerServices
import State from "../../../services/API/State"; //~/services/API/State
import City from "../../../services/API/City"; //~/services/API/City
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import {GOOGLE_LOCATION_KEY} from '../../../services/Constant'
import {BASE_URL} from "../../../services/Constant"
const libraries = ['places'];
const SetupSellerAccount = () => {
  const inputRef = useRef();
  const [profilePic, setProfilePic] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission
  const [formData, setFormData] = useState({
    guid: "",
    fullname: "",
    email: "",
    address: "",
    phone: "",
    country_id: 0,
    state_id: 0,
    city_id: 0,
    zip: "",
    latitude: "",
    longitude: "",
    description: "",
  });
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [cities, setCity] = useState("City");
  const [states, setState] = useState("State");
  const [address, setAddress] = useState("");
  const [countries, setCountry] = useState("Country");
  const [shopData, setShopData] = useState([]);
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
  let token = localStorage.getItem("access_token");
  
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

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Perform validations or modifications if needed
    setProfilePic(selectedFile);
  };
  const getUserStoreInfo = () => {
    let loggedInUser = localStorage.getItem("user_details");
    if (loggedInUser) {
      const loggedInUsers = JSON.parse(loggedInUser);
      SellerServices.getShopDetails()
        .then((response) => {
          if (response.status) {
            setFormData(response.data);
            setGuid(response.data.guid)
            setCoverImage(response.data.cover_image);
            setCity(response.data.city_id);
            setState(response.data.state_id);
            setAddress(response.data.address); 
            setCountry(response.data.country_id);
            setZip(response.data.zip)
            setAddress(response.data.address)
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!formData.fullname) {
      newErrors.name = "User Full Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!address) {
      newErrors.address = "Address is required";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    }
    if (!countries) {
      newErrors.country = "Country is required";
    }
    if (!states) {
      newErrors.state = "State is required";
    }
    if (!cities) {
      newErrors.city = "City is required";
    }
    if (!zip) {
      newErrors.zip = "Zip is required";
    }
    if(!formData.description){
      newErrors.description = "Description is required";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      formData.address = address;
      formData.country = countries;
      formData.state = states;
      formData.city = cities;
      formData.zip = zip;
      formData.latitude = latitude;
      formData.longitude = longitude;

      const fd = new FormData();
      fd.append("fullname", formData.fullname);
      fd.append("email", formData.email);
      fd.append("address", formData.address);
      fd.append("phone", formData.phone);
      fd.append("country", formData.country);
      fd.append("state", formData.state);
      fd.append("city", formData.city);
      fd.append("zip", formData.zip);
      fd.append("latitude", formData.latitude);
      fd.append("longitude", formData.longitude);
      fd.append("description", formData.description);
      fd.append("guid", guid);
      if (profilePic) {
        fd.append("file", profilePic);
      }
      for (let pair of fd.entries()) {
        console.log('formdata params'+pair[0] + ", " + pair[1]);
      }
      setIsLoading(true);
      setEnabled(true);
      if (formData.guid === "") {
        SellerServices.save(fd)
          .then((response) => {
            setFormSubmitted(true);
            if (response.status) {
              toast.success(response.data);
              setEditAddress(false)
            } else {
              toast.error(response.data);
            }
          })
          .catch((e) => {
            if('email', e.response.data.message == '1'){
              toast.error(e.response.data.data);
            }
            console.log('error:', e)
            setIsLoading(false);
            setEnabled(false);
          })
          .then(() => {
            setIsLoading(false);
            setEnabled(false);
          });
      } else {
        SellerServices.update(fd)
          .then((response) => {
            toast.success(response);
            setFormSubmitted(true);
            setEditAddress(false)
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
  };
  const handleCountryChange = (e) => {
    // console.log('country_id', e.target.value)
    // formData.country_id = e.target.value;
    State.get(e.target.value)
      .then((response) => {
        setState(response);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const handleStateChange = (e) => {
    // formData.state_id = e.target.value;
    City.get(e.target.value)
      .then((response) => {
        setCity(response);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log('hello')
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleAddAddress =()=>{
    setEditAddress(true)
    // formData.address = addresses;
  }
  useEffect(() => {
    let loggedInUser = localStorage.getItem("user_details");
    if (loggedInUser) {
      const loggedInUsers = JSON.parse(loggedInUser);
      setUser(loggedInUsers);
      formData.fullname =loggedInUsers.name
      formData.email =loggedInUsers.email
      formData.phone =loggedInUsers.phone
      getUserStoreInfo();
    }
  }, []);
  // Conditionally render the form or the new component based on formSubmitted state
  if (formSubmitted) {
    return <ConnectBank />;
  } else {
    return (
      <>
        {shopData}
        <section id="selleraccountsetup">
          <div className="container">
            <div className="row align-items-center">
              <h3>Setup Your Seller Shop</h3>
              <div className="signup-form-fields register">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
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
                        {coverimage ? (<>
                          <img
                          id="profilePic"
                          className="pic"
                          src={`${BASE_URL}/${coverimage}`}
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
                        {/* {coverimage ? (
                          <>
                          <img 
                             id="profilePic"
                             className="pic"
                             src={`${BASE_URL}/${coverimage}`}
                             width="50"
                             height="50"
                             style={{ borderRadius: "40px"}}
                             alt={user.name} />
                          </>
                        ) : (
                          <>
                            <img
                              id="profilePic"
                              className="pic"
                              src={
                                profilePic
                                  ? URL.createObjectURL(profilePic)
                                  : Avatarprofile
                              }
                              alt="Profile"
                            />
                          </>
                        )} */}
                        <input
                          className="uploadProfileInput"
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          name="profile_pic"
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
                  </div>
                  <div class="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && <p className="error">{errors.name}</p>}
                  <div class="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && <p className="error">{errors.email}</p>}
                  <div class="mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phone && <p className="error">{errors.phone}</p>}
                  <div class="mb-3">
                    {/* <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your street address"
                    /> */}
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
                  </div>
                  {errors.address && <p className="error">{errors.address}</p>}
                  <div class="mb-3">
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      onChange={handleChange}
                      placeholder="Enter Your Description"
                    >
                      {formData.description}
                    </textarea>
                  </div>
                  {errors.description && <p className="error">{errors.description}</p>}
                  <div className="d-flex statesfield">
                    <div className="fieldss">
                    <label className="form-control">
                      {countries}
                    </label>

                      {/* <select
                        class="form-select"
                        name="country_id"
                        value={formData.country_id}
                        onChange={handleChange}
                        id="country"
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
                      {errors.country && (
                        <p className="error">{errors.country}</p>
                      )}
                    </div>
                    <div className="fieldss">
                    <label className="form-control">
                      {states}
                    </label>
                      {/* <select
                        class="form-select"
                        name="state_id"
                        value={formData.state_id}
                        onChange={handleChange}
                        id="state_id"
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
                      {errors.state && <p className="error">{errors.state}</p>}
                    </div>
                    <div className="fieldss">
                    <label className="form-control">
                      {cities}
                    </label>
                      {/* <select
                        className="form-select"
                        id="city_id"
                        name="city_id"
                        value={formData.city_id}
                        onChange={handleChange}
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
                      {errors.city && <p className="error">{errors.city}</p>}
                    </div>
                  </div>
                  <div class="mb-3">
                    {/* <input
                      type="text"
                      className="form-control"
                      id="zip"
                      name="zip"
                      value={formData.zip || user.zip}
                      onChange={handleChange}
                      placeholder="Enter your zip code"
                    /> */}
                    <label className="form-control">
                      {zip}
                    </label>
                  </div>
                  {errors.zip && <p className="error">{errors.zip}</p>}
                  {/* <div class="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                    />
                  </div>
                  {errors.password && (
                    <p className="error">{errors.password}</p>
                  )}
                  <div class="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      id="password_confirmation"
                      placeholder="Confirm your password"
                    />
                  </div>
                  {errors.password_confirmation && (
                    <p className="error">{errors.password_confirmation}</p>
                  )} */}
                  <input
                    type="hidden"
                    id="guid"
                    name="guid"
                    value={formData.guid}
                  />
                  <button
                    className="btn btn-primary"
                    disabled={enabled}
                    type="submit"
                  >
                    {isLoading ? "loading.." : "Next Step"}
                  </button>

                  {/* <button className="btn btn-primary" type="submit">Next Step</button> */}
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default SetupSellerAccount;
