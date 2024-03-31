import React, { useState, useEffect } from "react";
import Profileimage from "../../../assets/Images/Profilesimage/1.png";
import SellerServices from "../../../services/API/SellerServices"; //~/services/API/SellerServices
import CountryServices from "../../../services/API/CountryServices"; //~/services/API/CountryServices
import State from "../../../services/API/State"; //~/services/API/State
import City from "../../../services/API/City"; //~/services/API/City
import { toast } from "react-toastify";
import moment from "moment";

const EditProfileSetup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [shopData, setShopData] = useState([]);
  const [countries, setCountry] = useState({});
  const [cities, setCity] = useState({});
  const [states, setState] = useState({}); 
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
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

  const handleCityChange = (e) => {
    // shopData.city_id = e.target.value;
  };
  const handleSubmit = (e) =>{
    e.preventDefault();
    const newErrors = {};
    if (!shopData.fullname) {
      newErrors.fullname = "Full Name is required";
    }
    if (!shopData.email) {
      newErrors.email = "Email is required";
    }
    if (!shopData.address) {
      newErrors.address = "Address is required";
    }
    if (!shopData.phone) {
      newErrors.phone = "Phone is required";
    }
    if (!shopData.country_id) {
      newErrors.country_id = "Country is required";
    }
    if (!shopData.state_id) {
      newErrors.state_id = "State is required";
    }
    if (!shopData.city_id) {
      newErrors.city_id = "City is required";
    }
    if (!shopData.zip) {
      newErrors.zip = "Zip is required";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setEnabled(true);
      SellerServices.update(shopData)
      .then((response) => {
        toast.success(response);
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
        SellerServices.getShopDetails(loggedInUsers?.id)
          .then((response) => {
            if(response.status){
              setShopData(response.data);
              setCountry(response.data.country_id)
              setState(response.data.state_id)
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
                    <div>
                      <img src={Profileimage} />
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
                <div className="col-lg-3">
                  <button className="updte-profile">Update Profile</button>
                </div>
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
                      <input
                        type="text"
                        className="form-control"
                        value={shopData?.address}
                        id="address"
                        name="address"
                        onChange={handleChange}
                        placeholder="Enter your street address"
                      />
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
                        value={shopData?.zip}
                        placeholder="Enter your zip code"
                      />
                      {errors.zip && <p className="error">{errors.zip}</p>}
                    </div>
                    <button disabled={enabled} className="btn btn-primary svavava" type="submit">
                      {isLoading ? "loading.." : "Save"}
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
  );
};

export default EditProfileSetup;
