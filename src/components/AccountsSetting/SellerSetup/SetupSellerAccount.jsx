import React, { useState, useEffect } from "react";
import Avatarprofile from "../../../assets/Images/avatarsignup.png";
import ConnectBank from "./ConnectBank";
import { toast } from "react-toastify";
import CountryServices from "../../../services/API/CountryServices"; //~/services/API/CountryServices
import SellerServices from "../../../services/API/SellerServices"; //~/services/API/SellerServices
import State from "../../../services/API/State"; //~/services/API/State
import City from "../../../services/API/City"; //~/services/API/City

const SetupSellerAccount = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission
  const [formData, setFormData] = useState({
    guid:"",
    fullname: "",
    email: "",
    address: "",
    phone: "",
    country_id: 0,
    state_id: 0,
    city_id: 0,
    zip: "",
    password: "",
    password_confirmation: "",
  });
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [cities, setCity] = useState({});
  const [states, setState] = useState({});
  const [countries, setCountry] = useState({});
  const [shopData, setShopData] = useState([]);
  let token = localStorage.getItem("access_token");
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Perform validations or modifications if needed
    setProfilePic(selectedFile);
  };
  const getUserStoreInfo =() =>{
    let loggedInUser = localStorage.getItem("user_details");
    if (loggedInUser) {
    const loggedInUsers = JSON.parse(loggedInUser);
    SellerServices.getShopDetails()
    .then((response) => {
      console.log('shop')
      if(response.status){
        setFormData(response.data);
        State.get(response.data.country_id)
        .then((states) => {
          setState(states);
        })
        City.get(response.data.state_id)
        .then((cities) => {
          setCity(cities);
        })
      }
    })
    .catch((e) => {
      console.log(e.message);
    });
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!formData.fullname) {
      newErrors.name = "User Full Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    }
    if (!formData.country_id) {
      newErrors.country = "Country is required";
    }
    if (!formData.state_id) {
      newErrors.state = "State is required";
    }
    if (!formData.city_id) {
      newErrors.city = "City is required";
    }
    if (!formData.zip) {
      newErrors.zip = "Zip is required";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("address", formData.address);
      fd.append("phone", formData.phone);
      fd.append("country", formData.country_id);
      fd.append("state", formData.state_id);
      fd.append("city", formData.city_id);
      fd.append("zip", formData.zip);
      if(profilePic){
        fd.append("file", profilePic);
      }
      for (let pair of fd.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      
      setIsLoading(true);
      setEnabled(true);
      if(formData.guid === ""){
        SellerServices.save(fd)
        .then((response) => {
            setFormSubmitted(true);
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
      }else{
        SellerServices.update(fd)
        .then((response) => {
          toast.success(response);
          setFormSubmitted(true);
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
  const getCountry = () => {
    CountryServices.all()
      .then((response) => {
        setCountry(response);
      })
      .catch((e) => {
        toast.error(e.message);
      });
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
    if(name == "country_id"){
      State.get(e.target.value)
      .then((response) => {
        setState(response);
      })
    }
    if(name == "state_id"){
      City.get(e.target.value)
      .then((response) => {
        setCity(response);
      })
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    getCountry();
    let loggedInUser = localStorage.getItem("user_details");
    if (loggedInUser) {
      const loggedInUsers = JSON.parse(loggedInUser);
      setUser(loggedInUsers);
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
                        <input
                          className="uploadProfileInput"
                          type="file"
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
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your street address"
                    />
                  </div>
                  {errors.address && <p className="error">{errors.address}</p>}
                  <div className="d-flex statesfield">
                    <div className="fieldss">
                      <select
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
                      </select>
                      {errors.country && (
                        <p className="error">{errors.country}</p>
                      )}
                    </div>
                    <div className="fieldss">
                      <select
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
                      </select>
                      {errors.state && <p className="error">{errors.state}</p>}
                    </div>
                    <div className="fieldss">
                      <select
                        className="form-select"
                        id="city_id"
                        name="city_id"
                        value={formData.city_id}
                        onChange={handleChange}
                      >
                        {/* <!-- Populate options for cities based on the selected state --> */}
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

                        {/* <!-- Add more options as needed --> */}
                      </select>
                      {errors.city && <p className="error">{errors.city}</p>}
                    </div>
                  </div>
                  <div class="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      name="zip"
                      value={formData.zip || user.zip}
                      onChange={handleChange}
                      placeholder="Enter your zip code"
                    />
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
