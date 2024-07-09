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
import { BASE_URL } from "../../../services/Constant"
import { Spinner } from "react-bootstrap";
import { IoCameraReverseOutline } from "react-icons/io5";

const libraries = ['places'];
const EditProfileSetup = () => {
  const inputRef = useRef();
  const [profilePic, setProfilePic] = useState(null);
  const [shopData, setShopData] = useState([]);
  console.log('render', shopData)
  const [countries, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [currentaddress, setCurrentAddress] = useState("");
  const [cities, setCity] = useState("");
  const [states, setState] = useState("");
  const [inputErrors, setInputErrors] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [coverimage, setCoverImage] = useState("");
  const [guid, setGuid] = useState("")
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [zip, setZip] = useState("");
  const [editaddress, setEditAddress] = useState(false);
  const [addresses, setAddresses] = useState("");
  const [shopDetails, setShopDetails] = useState([]);
  const [editprofile, setEditprofile] = useState({
    country_id: "",
    state_id: "",
    city_id: "",
    fullname: "",
    email: "",
    phone: "",
    address: "",
    zip: "",
    guid: "",
    latitude: "",
    longitude: "",
    description: "",
    file: "",
    editImage: false
  });
  const fileInputRef = useRef(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDg6Ci3L6yS5YvtKAkWQjnodGUtlNYHw9Y",
    libraries
  });


  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();

      setEditprofile(prev => ({
        ...prev,
        address: place.formatted_address,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      }));
      let political, administrative_area_level_1, postalCode;

      for (let i = 0; i < place.address_components.length; i++) {
        const component = place.address_components[i];
        for (let j = 0; j < component.types.length; j++) {
          if (component.types[j] === 'country') {
            political = component.long_name;
          } else if (component.types[j] === 'administrative_area_level_1') {
            administrative_area_level_1 = component.long_name;
          } else if (component.types[j] === 'postal_code') {
            postalCode = component.long_name;
          }
        }
      }
      console.log(postalCode , 'postalCode');
      setEditprofile(prev => ({
        ...prev,
        country_id: political,
        state_id: administrative_area_level_1,
        city_id: place.name,
        zip: postalCode,
      }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setInputErrors(true)
    if(editprofile?.fullname === "" && editprofile?.phone === ""){
      return
    }
      setIsLoading(true);
      setEnabled(true);
      const fd = new FormData();
      fd.append("fullname", editprofile.fullname);
      fd.append("email", editprofile.email);
      fd.append("address", editprofile?.address);
      fd.append("phone", editprofile.phone);
      fd.append("country_id", editprofile.country_id);
      fd.append("state_id", editprofile.state_id);
      fd.append("city_id", editprofile.city_id);
      fd.append("zip", editprofile.zip);
      fd.append("latitude", editprofile.latitude);
      fd.append("longitude", editprofile.longitude);

      if (editprofile.editImage) {
        fd.append("file", editprofile?.file);
      }

      fd.append("guid", editprofile?.guid);
      SellerServices.update(fd)
        .then((response) => {
          if (response.status) {
            toast.success(response.data);
            setEditAddress(false)
          }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopData({
      ...shopData,
      [name]: value,
    });
  };

  const getShopDetail = () => {
    SellerServices.getShopDetail()
      .then((response) => {
        setIsLoading(false);
        setShopDetails(response?.data)
        console.log(response?.data, 'shop setting');
        setEditprofile({
          country_id: response?.data?.country_id,
          state_id: response?.data?.state_id,
          city_id: response?.data?.city_id,
          fullname: response?.data?.fullname,
          email: response?.data?.email,
          phone: response?.data?.phone,
          address: response?.data?.address,
          zip: response?.data?.zip,
          guid: response?.data?.guid,
          latitude: response?.data?.latitude,
          longitude: response?.data?.longitude,
          description: response?.data?.description,
          file: response?.data?.cover_image
        })
        // setUser(response);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getShopDetail();
  }, []);

 
  const handleImageFileChange = (e) => {
    setEditprofile(prev => ({ ...prev, file: e.target.files[0], editImage: true }));
  };

  return (


      <>
        <section id="selleraccountsetup" style={{ minHeight: '100%' }}>
          <div className="container" style={{ minHeight: '50%' }}>
            {isLoading ? (
              <div className="loader-container text-center">
                <Spinner animation="border" role="status"></Spinner>
              </div>
            ) : (
              <>
                <div className="row align-items-center">
                  <div className="seller-edit-profile">
                    <form onSubmit={handleSubmit}>
                      <div className="seller-profile">
                        <div className="s-p-i">
                          <div className="s-p-i-w" onClick={handleUploadClick}>
                            {!editprofile?.editImage ?
                              <img src={`${BASE_URL}/${editprofile?.file}`} />
                              :
                              <img src={URL.createObjectURL(editprofile?.file)} />
                            }
                            <span>
                              <IoCameraReverseOutline />
                            </span>
                          </div>
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleImageFileChange}
                        />
                      </div>
                      <div className="e-s-p-t-f">
                        <div className="e-s-p-t-f-l">
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={editprofile?.fullname}
                            name="fullname"
                            onChange={handleChange}
                            placeholder="Enter your full name"
                          />
                          {editprofile.fullname === '' && inputErrors && <p className="error">{errors.fullname}</p>}
                        </div>
                        <div className="e-s-p-t-f-l">
                          <input
                            type="email"
                            className="form-control"
                            defaultValue={editprofile?.email}
                            name="email"
                            onChange={handleChange}
                            placeholder="Enter your email"
                            readOnly
                          />
                          {editprofile.email === '' && inputErrors && <p className="error">{errors.email}</p>}
                        </div>
                      </div>
                      <div className="e-s-p-t-f">
                        <div className="e-s-p-t-f-l">
                          <input
                            type="tel"
                            className="form-control"
                            defaultValue={editprofile?.phone}
                            name="phone"
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                          />
                          {editprofile.phone === '' && inputErrors && <p className="error">{errors.phone}</p>}
                        </div>
                        <div className="e-s-p-t-f-l">
                          {isLoaded
                            &&
                            <StandaloneSearchBox
                              onLoad={ref => inputRef.current = ref}
                              onPlacesChanged={handlePlaceChanged}
                            >
                              <input
                                type="text"
                                className="form-control"
                                placeholder={`${editprofile?.address}`}
                              />
                            </StandaloneSearchBox>}
                          {editprofile.address === '' && inputErrors && <p className="error">{errors.address}</p>}
                        </div>
                      </div>
                      <div className="e-s-p-t-f">
                        <div className="e-s-p-t-f-l">
                          <input
                            type="tel"
                            className="form-control"
                            value={editprofile?.country_id}
                            name="country_id"
                            onChange={handleChange}
                            placeholder="Enter your country"
                            readOnly
                          />
                          {editprofile.country_id === '' && inputErrors && <p className="error">{errors.country_id}</p>}
                        </div>
                        <div className="e-s-p-t-f-l">
                          <input
                            type="tel"
                            className="form-control"
                            defaultValue={editprofile?.state_id}
                            name="state_id"
                            onChange={handleChange}
                            placeholder="Enter your state"
                            readOnly
                          />
                          {editprofile.state_id === '' && inputErrors && <p className="error">{errors.state_id}</p>}
                        </div>
                      </div>
                      <div className="e-s-p-t-f">
                        <div className="e-s-p-t-f-l">
                          <input
                            type="tel"
                            className="form-control"
                            defaultValue={editprofile?.city_id}
                            name="city_id"
                            onChange={handleChange}
                            placeholder="Enter your city"
                            readOnly
                          />
                          {editprofile.city_id === '' && inputErrors && <p className="error">{errors.city_id}</p>}
                        </div>
                        <div className="e-s-p-t-f-l">
                          <input
                            type="number"
                            class="form-control"
                            name="zip"
                            onChange={handleChange}
                            defaultValue={editprofile?.zip}
                            placeholder="Enter your zip code"
                          />
                          {editprofile.zip === '' && inputErrors && <p className="error">{errors.zip}</p>}
                        </div>
                      </div>
                      <div className="b-s-u-p">
                        <button disabled={enabled} type="submit">
                          {isLoading ? "loading.." : "Update"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </>
  );
};

export default EditProfileSetup;
