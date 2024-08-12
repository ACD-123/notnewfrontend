import React, { useState, useEffect, useRef } from "react";
import Signupimage from "../../assets/Images/Accountimages/signup.png";
import Logo from "../../assets/Images/logo.png";
import Avatarprofile from "../../assets/Images/avatarsignup.png";
import { Link, useLocation } from "react-router-dom";
import CountryServices from "../../services/API/CountryServices"; //~/services/API/CountryServices
import State from "../../services/API/State"; //~/services/API/State
import City from "../../services/API/City"; //~/services/API/City
import AuthService from "../../services/API/AuthService"; //~/services/API/CountryServices
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { GOOGLE_LOCATION_KEY } from '../../services/Constant'
import { BASE_URL } from "../../services/Constant"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

var Submitcss = {
  backgroundImage: `url(${Signupimage})`,
  backgroundSize: "cover",
  paddingTop: "40px",
};
const libraries = ['places'];

const SignUp = () => {
  const navigate = useNavigate();

  const inputRef = useRef();
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    password: "",
    password_confirmation: "",
    latitude: "",
    longitude: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [cities, setCity] = useState("City");
  const [states, setState] = useState("States");
  const [country, setCountry] = useState("Country");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [zip, setZip] = useState("");
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDg6Ci3L6yS5YvtKAkWQjnodGUtlNYHw9Y",
    libraries
  });
  const handlePlaceChanged = () => {
    const places = inputRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      setAddress(place.formatted_address);
      setLatitude(place.geometry.location.lat());
      setLongitude(place.geometry.location.lng());

      place.address_components.forEach(component => {
        const componentType = component.types[0];
        switch (componentType) {
          case "postal_code":
            setZip(component.long_name);
            break;
          case "locality":
            setCity(component.long_name);
            break;
          case "administrative_area_level_1":
            setState(component.long_name);
            break;
          case "country":
            setCountry(component.long_name);
            break;
          default:
            break;
        }
      });
    } else {
      
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Perform validations or modifications if needed
    setProfilePic(selectedFile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform validation here (e.g., check for empty fields)
    const newErrors = {};
    if (!formData.firstname) {
      newErrors.name = "User First Name is required";
    }
    if (!formData.lastname) {
      newErrors.lastname = "User Last Name is required";
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
    if (!country) {
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

      formData.address = address;
      formData.country = country;
      formData.state = states;
      formData.city = cities;
      formData.zip = zip;
      formData.latitude = latitude;
      formData.longitude = longitude;

      const fd = new FormData();
      fd.append("firstname", formData.firstname);
      fd.append("lastname", formData.lastname);
      fd.append("email", formData.email);
      fd.append("address", formData.address);
      fd.append("phone", formData.phone);
      fd.append("country", formData.country);
      fd.append("state", formData.state);
      fd.append("city", formData.city);
      fd.append("zip", formData.zip);
      fd.append("password", formData.password);
      fd.append("password_confirmation", formData.password_confirmation);
      fd.append("latitude", formData.latitude);
      fd.append("longitude", formData.longitude);
      if (profilePic) {
        fd.append("file", profilePic);
      }
      setIsLoading(true);
      setEnabled(true);
      AuthService.register(fd)
        .then((response) => {
          if (response.status === "email") {
            toast.error(response.message);
            setIsLoading(false);
            setEnabled(false);
          } else if (response.status === "registered") {
            toast.success(response.message);
            setIsLoading(false);
            setEnabled(false);
            navigate(`/emailverification/${formData.email}`);

          } else if (response.status === "fails") {
            toast.error(response.message);
            setIsLoading(false);
            setEnabled(false);
          } else if (response.status === "username") {
            toast.error(response.message);
            setIsLoading(false);
            setEnabled(false);
          }
        })
        .catch((error) => {
          if (error.response.status == "409") {
            toast.error("Email Already Exists");
            // toast.error(e.response?.data.message);
          } else {
          
          }
          setIsLoading(false);
          setEnabled(false);
        })
        .then(() => {
          setIsLoading(false);
          setEnabled(false);
        });
    }
  };
  useEffect(() => {
    //
  }, []);
  return (
    <>
      <section id="singup" style={Submitcss}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="welcome-registration">
                <Link to="/">
                  <img src={Logo} width="auto" height="100%" alt="Logo" />
                </Link>
                <h1>Welcome to account registration</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
            <div className="col-lg-6 fffsa">
              <div className="signup-form-fields register">
                <div className="topbuttons" style={{ margin: "20px 0px" }}>
                  <ul>
                    <li>
                      <Link to="/signin">Sign in</Link>
                    </li>
                    <li>
                      <Link to="/signup">Register</Link>
                    </li>
                  </ul>
                </div>
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
                          style={{display:'none'}}
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
                  <div className="d-flex statesfield">
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="fullname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="error">{errors.name}</p>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Enter your Last name"
                      />
                      {errors.lastname && (
                        <p className="error">{errors.lastname}</p>
                      )}
                    </div>
                  </div>
                  <div className="d-flex statesfield">
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="error">{errors.email}</p>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="error">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="d-flex statesfield">
                    <div className="mb-3">
                      {isLoaded && (
                        <StandaloneSearchBox
                          onLoad={ref => inputRef.current = ref}
                          onPlacesChanged={handlePlaceChanged}
                        >
                          <input
                            type="text"
                            className="form-control"
                            placeholder={address ? address : "Enter your address"}
                          />
                        </StandaloneSearchBox>
                      )}
                      {!isLoaded && <p>Loading...</p>}
                      {errors.address && (
                        <p className="error">{errors.address}</p>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        name="zip"
                        value={zip}
                        onChange={handleChange}
                        placeholder="Enter your zip code"
                      />
                      {errors.zip && (
                        <p className="error">{errors.zip}</p>
                      )}
                    </div>
                  </div>
                  <div className="d-flex statesfield">
                    <div className="mb-3">
                      <label className="form-control">
                        {country}
                      </label>
                      {errors.country && (
                        <p className="error">{errors.country}</p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-control">
                        {states}
                      </label>
                      {/* <select className="form-select" 
                        name="state"
                        value={formData.state}
                        onChange={handleStateChange}  
                        id="state"
                      >
                        <option value="">Select States</option>
                        {states.length > 0 ?(
                          <>
                          {states?.map(state => {
                              return (
                                <option key={state.id} value={state.id}>{state.name}</option>
                              )
                            } )}
                          </>
                        ):('')}
                      </select> */}
                      {errors.state && (
                        <p className="error">{errors.state}</p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-control">
                        {cities}
                      </label>
                      {/* <select 
                        className="form-select" 
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}  
                        >
                        <option value="">Select City</option>
                        {cities.length > 0 ? (
                          <>
                            {cities?.map(city => {
                              return (
                                <option key={city.id} value={city.id}>{city.name}</option>
                              )
                            } )}
                          </>
                        ):('')}
                      </select> */}
                      {errors.city && (
                        <p className="error">{errors.city}</p>
                      )}
                    </div>
                  </div>
                  <div className="d-flex statesfield">
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                      />
                      {errors.password && (
                        <p className="error">{errors.password}</p>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        id="password_confirmation"
                        placeholder="Confirm your password"
                      />
                      {errors.password_confirmation && (
                        <p className="error">{errors.password_confirmation}</p>
                      )}
                    </div>
                  </div>
                  <button className="btn btn-primary" disabled={enabled} type="submit">
                    {isLoading ? "loading.." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
