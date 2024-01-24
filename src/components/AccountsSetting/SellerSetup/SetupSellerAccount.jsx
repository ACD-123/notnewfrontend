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
    name: "",
    email: "",
    address: "",
    phone: "",
    country: "",
    state: "",
    city: "",
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
  let token = localStorage.getItem("access_token");
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Perform validations or modifications if needed
    setProfilePic(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform validation here (e.g., check for empty fields)
    const newErrors = {};
    if (!formData.name) {
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
    if (!formData.country) {
      newErrors.country = "Country is required";
    }
    
    if (!formData.state) {
      newErrors.state = "State is required";
    }
    if (!formData.city) {
      newErrors.city = "City is required";
    }
    if (!formData.zip) {
      newErrors.zip = "Zip is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (!formData.password_confirmation) {
      newErrors.password_confirmation = "Confirm Password is required";
    }
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Password is mismatch";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      SellerServices.save(formData)
      .then((response) => {
        toast.success(response);
        setTimeout(() => {
          setFormSubmitted(true);
        }, 6000);
      })
      .catch((e) => {
        toast.error(e.message);
      });
      // Set the formSubmitted state to true after form submission
      // setFormSubmitted(true);
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
    formData.country = e.target.value;
    State.get(e.target.value)
      .then((response) => {
        setState(response);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const handleStateChange = (e) => {
    formData.state = e.target.value;
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
    }
  }, []);
  // Conditionally render the form or the new component based on formSubmitted state
  if (formSubmitted) {
    return <ConnectBank />;
  } else {
    return (
      <>
        {/* Your existing form */}
        <section id="selleraccountsetup">
          <div className="container">
            <div className="row align-items-center">
              <h3>Setup Your Seller Account</h3>
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
                      name="name"
                      value={formData.name}
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
                        name="country"
                        value={formData.country}
                        onChange={handleCountryChange}
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
                        name="state"
                        value={formData.state}
                        onChange={handleStateChange}
                        id="state"
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
                        id="city"
                        name="city"
                        value={formData.city}
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
                  <div class="mb-3">
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
                  )}
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
