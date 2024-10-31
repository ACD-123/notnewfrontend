import React, { useState, useEffect, useRef } from "react";
import ConnectBank from "./ConnectBank";
import { toast } from "react-toastify";
import SellerServices from "../../../services/API/SellerServices";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { BASE_URL } from "../../../services/Constant"
import { IoCamera } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
const libraries = ['places'];
const SetupSellerAccount = () => {
  const inputRef = useRef();
  const [profilePic, setProfilePic] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
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
    video: "",
    editVideo: false,
    main_image: "",
    editMainImage: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [cities, setCity] = useState("City");
  const [states, setState] = useState("State");
  const [address, setAddress] = useState("");
  const [countries, setCountry] = useState("Country");
  const [coverimage, setCoverImage] = useState("");
  const [guid, setGuid] = useState("")
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [zip, setZip] = useState("Zip");
  const videoInputRef = useRef(null);
  const mainImageInputRef = useRef(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDg6Ci3L6yS5YvtKAkWQjnodGUtlNYHw9Y",
    libraries
  });

  const handlePlaceChanged = () => {
    const places = inputRef.current.getPlaces();
    if (places && places?.length > 0) {
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
        .catch((error) => {
          // toast.error(error?.response?.data?.message)
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!formData.fullname) { newErrors.name = "User Full Name is required"; }
    if (!formData.email) { newErrors.email = "Email is required"; }
    if (!address) { newErrors.address = "Address is required"; }
    if (!formData.phone) { newErrors.phone = "Phone is required"; }
    if (!countries) { newErrors.country = "Country is required"; }
    if (!states) { newErrors.state = "State is required"; }
    if (!cities) { newErrors.city = "City is required"; }
    if (!zip) { newErrors.zip = "Zip is required"; }
    if (!formData.description) { newErrors.description = "Description is required"; }
    if (!formData.main_image) { newErrors.main_image = "Main image is required"; }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {

      const fd = new FormData();
      fd.append("video", formData.video);
      fd.append("deleted", formData.video ? 0 : 1);
      SellerServices.updateVideo(fd)
        .then((response) => {
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
          fd.append("main_image", formData.main_image);
          fd.append("guid", guid);
          if (profilePic) { fd.append("file", profilePic); }
          setIsLoading(true);
          setEnabled(true);
          if (formData.guid === "") {
            SellerServices.save(fd)
              .then((response) => {
                setFormSubmitted(true);
                if (response.status) {
                  toast.success(response.data);
                } else {
                  toast.error(response.data);
                }
              })
              .catch((error) => {
                toast.error(error?.response?.data?.message)
                if ('email', error.response.data.message == '1') {
                  toast.error(error.response.data.data);
                }
                setIsLoading(false);
                setEnabled(false);
              })
          } else {
            SellerServices.update(fd)
              .then((response) => {
                toast.success(response);
                setFormSubmitted(true);
              })
              .catch((error) => {
                toast.error(error?.response?.data?.message)
                setIsLoading(false);
                setEnabled(false);
              })
          }
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message)
          setIsLoading(false);
          setEnabled(false);
        })

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    let loggedInUser = localStorage.getItem("user_details");
    if (loggedInUser) {
      const loggedInUsers = JSON.parse(loggedInUser);
      formData.fullname = loggedInUsers.name
      formData.email = loggedInUsers.email
      formData.phone = loggedInUsers.phone
      getUserStoreInfo();
    }
  }, []);

  const handleVideoUploadClick = () => {
    videoInputRef.current.click();
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      e.target.value = null;
      return;
    }

    setFormData({ ...formData, video: file, editVideo: true });
    e.target.value = null;
  };

  const deleteSelectedVideo = () => {
    setFormData({ ...formData, video: "", editVideo: false });
  };

  const deleteSelectedMainImage = () => {
    setFormData({ ...formData, main_image: "", editMainImage: false });
  };

  const handleMainImageUploadClick = () => {
    mainImageInputRef.current.click();
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, main_image: file, editMainImage: true });
    e.target.value = null;
  };

  if (formSubmitted) {
    return <ConnectBank />;
  } else {
    return (
      <>
        <section id="seller-account-creating" className="seller-not-created">
          <div className="container">
            <div className="row align-items-center">
              <h3>Setup Your Seller Shop</h3>
              <div className="signup-form-fields register">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <div className="seller-profile-pic-wrapper">
                      <div className="pic-holder">
                        {profilePic ? (
                          <img id="profilePic" className="pic"
                            src={profilePic ? URL.createObjectURL(profilePic) : profilePic} />
                        ) : (<>
                          {coverimage ? (
                            <img id="profilePic" className="pic" src={`${BASE_URL}/${coverimage}`} />
                          ) : (
                            <img id="profilePic" className="pic"
                              src={profilePic ? URL.createObjectURL(profilePic) : profilePic} />
                          )}
                        </>)}
                        <input
                          className="uploadProfileInput"
                          type="file"
                          accept="image/png, image/jpeg"
                          name="profile_pic"
                          style={{ display: 'none' }}
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
                              <IoCamera />
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="error">{errors.name}</p>}
                    </div>
                    <div className="col-lg-6 mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                      {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="col-lg-6 mb-3">
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && <p className="error">{errors.phone}</p>}
                    </div>
                    <div className="col-lg-6 mb-3">
                      {isLoaded && (
                        <StandaloneSearchBox
                          onLoad={ref => inputRef.current = ref}
                          onPlacesChanged={handlePlaceChanged}
                        >
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            onChange={handleChange}
                            placeholder={address ? address : "Enter your address"}
                          />
                        </StandaloneSearchBox>
                      )}
                      {!isLoaded && <p>Loading...</p>}
                      {errors.address && <p className="error">{errors.address}</p>}
                    </div>
                    <div className="col-lg-6 mb-3">
                      <div className="fieldss">
                        <label className="form-control">
                          {countries}
                        </label>
                        {errors.country && (
                          <p className="error">{errors.country}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                      <div className="fieldss">
                        <label className="form-control">
                          {states}
                        </label>
                        {errors.state && <p className="error">{errors.state}</p>}
                      </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                      <div className="fieldss">
                        <label className="form-control">
                          {cities}
                        </label>
                        {errors.city && <p className="error">{errors.city}</p>}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="mb-3">
                        <label className="form-control">
                          {zip}
                        </label>
                      </div>
                      {errors.zip && <p className="error">{errors.zip}</p>}
                    </div>
                    <div className="col-lg-12 mb-3">
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        onChange={handleChange}
                        placeholder="Enter Your Description"
                      >
                        {formData.description}
                      </textarea>
                      {errors.description && <p className="error">{errors.description}</p>}
                    </div>
                    <div className="col-lg-6 mb-3">
                      <div className="p-m-i-u" >
                        {!formData?.editMainImage && formData?.main_image == '' &&
                          <div className="p-m-i-u-wrap">
                            <div className="upload-box" onClick={handleMainImageUploadClick}>
                              <svg width="96" height="97" viewBox="0 0 96 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M29.8004 48.4615H66.1696M47.985 66.6462V30.2769M47.985 93.9231C72.9888 93.9231 93.4465 73.4654 93.4465 48.4615C93.4465 23.4577 72.9888 3 47.985 3C22.9811 3 2.52344 23.4577 2.52344 48.4615C2.52344 73.4654 22.9811 93.9231 47.985 93.9231Z" stroke="#BBBBBB" stroke-width="4.54615" strokeLinecap="round" stroke-linejoin="round" />
                              </svg>
                              <span>Click here to cover image Video</span>
                              <input
                                type="file"
                                ref={mainImageInputRef}
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleMainImageChange}
                              />
                            </div>
                          </div>
                        }
                        <div className="selected-images">
                          {formData?.main_image != '' ?
                            (!formData?.editMainImage && formData?.main_image?.includes('image') ?
                              <div className="selected-videos-box" style={{display:'flex',justifyContent : 'center'}}>
                                <img src={`${BASE_URL}/public/${formData?.video}`} alt="" style={{ height: '200px', width: '100%', objectFit: 'contain', borderRadius:'22px' }} />
                                <span onClick={() => deleteSelectedMainImage()}><CiEdit /></span>
                              </div>
                              :
                              <div className="selected-videos-box" style={{display:'flex',justifyContent : 'center'}}>
                                <img src={URL.createObjectURL(formData?.main_image)} alt="" style={{ height: '200px', width: '100%', objectFit: 'contain' , borderRadius:'22px' }} />
                                <span onClick={() => deleteSelectedMainImage()}><CiEdit /></span>
                              </div>
                            )
                            :
                            null
                          }
                        </div>
                        {errors.main_image && <p className="error">{errors.main_image}</p>}
                      </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                      <div className="p-m-i-u">
                        {!formData?.editVideo && formData?.video == '' &&
                          <div className="p-m-i-u-wrap">
                            <div className="upload-box" onClick={handleVideoUploadClick}>
                              <svg width="96" height="97" viewBox="0 0 96 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M29.8004 48.4615H66.1696M47.985 66.6462V30.2769M47.985 93.9231C72.9888 93.9231 93.4465 73.4654 93.4465 48.4615C93.4465 23.4577 72.9888 3 47.985 3C22.9811 3 2.52344 23.4577 2.52344 48.4615C2.52344 73.4654 22.9811 93.9231 47.985 93.9231Z" stroke="#BBBBBB" stroke-width="4.54615" strokeLinecap="round" stroke-linejoin="round" />
                              </svg>
                              <span>Click here to upload Video</span>
                              <input
                                type="file"
                                ref={videoInputRef}
                                accept="video/*"
                                style={{ display: 'none' }}
                                onChange={handleVideoChange}
                              />
                            </div>
                          </div>
                        }
                        <div className="selected-images">
                          {formData?.video != '' ?
                            (!formData?.editVideo && formData?.video?.includes('image') ?
                              <div className="selected-videos-box">
                                <video width="100%" controls>
                                  <source src={`${BASE_URL}/public/${formData?.video}`} />
                                  Your browser does not support the video tag.
                                </video>
                                <span onClick={() => deleteSelectedVideo()}><CiEdit /></span>
                              </div>
                              :
                              <div className="selected-videos-box">
                                <video width="100%" controls>
                                  <source src={URL.createObjectURL(formData?.video)} />
                                  Your browser does not support the video tag.
                                </video>
                                <span onClick={() => { deleteSelectedVideo() }}><CiEdit /></span>
                              </div>
                            )

                            :
                            null
                          }
                        </div>

                      </div>
                    </div>
                  </div>

                  <input type="hidden" id="guid" name="guid" value={formData.guid} />
                  <button
                    className="btn btn-primary"
                    disabled={enabled}
                    type="submit"
                  >
                    {isLoading ? "loading.." : "Next Step"}
                  </button>
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
