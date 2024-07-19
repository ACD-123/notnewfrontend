import React, { useState, useEffect, useRef } from "react";
import Profile from "../../../assets/Images/PersonalInfo/profile.png";
import blankuser from "../../../assets/Images/User/blankuser.jpg";
import UserServices from "../../../services/API/UserServices"; //~/services/API/UserServices
import {
  setUserDetails,
  isLoggedin,
  getUserDetails,
} from "../../../services/Auth"; // ~/services/Auth
import { toast } from "react-toastify";
import { BASE_URL } from "../../../services/Constant";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { Form, Spinner } from "react-bootstrap";
import { IoIosCamera } from "react-icons/io";
import LoadingComponents from "../../Shared/LoadingComponents";

const libraries = ["places"];
const PersonalInfo = () => {
  const inputRef = useRef();
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAd] = useState("");
  const [emails, setEmail] = useState("");
  const [cities, setCity] = useState("City");
  const [states, setState] = useState("State");
  const [addresses, setAddress] = useState("");
  const [countries, setCountry] = useState("Country");
  const [site, setSite] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [zip, setZip] = useState("Zip");
  const [profilepic, setProfileImage] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading state as true
  const [enabled, setEnabled] = useState(false);
  const [editaddress, setEditAddress] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    email: "",
    site: "",
  });
  const [userFormData, setUserFormData] = useState({
    name: '',
    lastname: '',
    country: '',
    states: '',
    city: '',
    zip: '',
    email: '',
    phone: '',
    site: "profilesite",
    address: '',
    file: ''
  });
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDg6Ci3L6yS5YvtKAkWQjnodGUtlNYHw9Y",
    libraries,
  });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    UserServices.self().then((response) => {
      console.log(response, 'user data');
      setUserFormData({
        name: response?.name,
        lastname: response?.last_name,
        country: response?.country_id,
        states: response?.state_id,
        city: response?.city_id,
        zip: response?.zip,
        email: response?.email,
        phone: response?.phone,
        site: "profilesite",
        address: response?.address,
        file: response?.profile_image
      })
      console.log(response?.profile_image?.includes('images'), 'userFormData?.file');
      console.log(response?.profile_image?.includes('http'), 'userFormData?.file');
      setProfileImage(response.profile_image);
      setEmail(response.email);
      setName(response.name);
      setLastName(response.last_name);
      setPhone(response.phone);
      setAd(response.address);
      setSite(response.site);
      setUser(response);
      setIsLoading(false);
    }).catch(error => {
      console.error('Error fetching user data:', error);
      setIsLoading(false);
    });
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleAdd = (e) => {
    setAd(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.vaue);
  };

  const handleSite = (e) => {
    setSite(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setProfilePic(selectedFile);
  };

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      setAddress(place.formatted_address);
      setLatitude(place.geometry.location.lat());
      setLongitude(place.geometry.location.lng());
      for (var i = 0; i < place.address_components.length; i++) {
        for (var j = 0; j < place.address_components[i].types.length; j++) {
          if (place.address_components[i].types[j] == "postal_code") {
            setZip(place.address_components[i].long_name);
          }
          if (place.address_components[i].types[0] == "locality") {
            setCity(place.address_components[i].long_name);
          }
          if (
            place.address_components[i].types[0] ==
            "administrative_area_level_1"
          ) {
            setState(place.address_components[i].long_name);
          }
          if (place.address_components[i].types[0] == "country") {
            setCountry(place.address_components[i].long_name);
          }
        }
      }
    }
  };

  const handleAddAddress = () => {
    setEditAddress(true);
    formData.address = addresses;
  };

  return (
    <>
      <div class="main-content">
        <div class="seller-new-transaction">
          <div class="title">Profile Information</div>
          <div className="peronsinfo-form">

          </div>
          <div className="peronsinfo-form">
            <div className="pranker">
              <div className="profile-pic-wrapper">
                <div className="pic-holder">
                  {userFormData?.file?.includes('images') ? (
                    userFormData?.file?.includes('http') ? (
                      <img
                        id="profilePic"
                        className="pic"
                        src={user.profile_image}
                      />
                    ) : (
                      <img
                        id="profilePic"
                        className="pic"
                        src={`${BASE_URL}/${profilepic}`}
                      />
                    )
                  ) : (
                    <></>
                    // <img id="profilePic" className="pic" src={URL.createObjectURL(userFormData?.file)}/>
                  )}

                  <input
                    className="uploadProfileInput"
                    type="file"
                    accept="image/png, image/jpeg"
                    name="profile_pic"
                    style={{ display: "none" }}
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
                        <IoIosCamera />
                        {/* Upload <br /> Profile Photo */}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              <div>
                <h2>{user.name}</h2>
                <h6>
                  <a
                    style={{ textTransform: "lowercase" }}
                    href={`mailto:${user.email}`}
                  >
                    {user.email}
                  </a>
                </h6>
              </div>
            </div>
            <h5>Profile Information</h5>
            <div className="prnform">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Other input fields */}
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleName}
                  required
                  placeholder="Name"
                />
                <br />
                <input
                  type="text"
                  name="last_name"
                  value={lastname}
                  onChange={handleLastName}
                  required
                  placeholder="Last Name"
                />
                <br />
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={handlePhone}
                  required
                  placeholder="Phone:"
                />
                <br />
                {/* Render the address input directly */}
                <Form.Control
                  placeholder={address}
                  style={{ height: "150px" }}
                  as="textarea"
                  rows={3}
                  value={address}
                  onChange={(e) => setAd(e.target.value)}
                />
                <br />
                <input
                  type="email"
                  name="email"
                  value={emails}
                  onChange={handleEmail}
                  placeholder="Email:"
                  required
                />

                <br />

                <input
                  type="text"
                  name="site"
                  value={site}
                  onChange={handleSite}
                  placeholder="Web Site"
                />

                <br />
                <button type="submit" disabled={enabled}>
                  {isLoading ? "loading.." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <LoadingComponents />
      ) : (
        <section id="prsnlinfo">
          <div className="row">
            <div className="col-lg-12">

            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PersonalInfo;
