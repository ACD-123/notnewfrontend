import React, { useState, useEffect, useRef } from "react";
import UserServices from "../../../services/API/UserServices";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../services/Constant";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { IoIosCamera } from "react-icons/io";
import LoadingComponents from "../../Shared/LoadingComponents";

const libraries = ["places"];
const PersonalInfo = () => {
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [inputError, setInputError] = useState(false);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDg6Ci3L6yS5YvtKAkWQjnodGUtlNYHw9Y",
    libraries,
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

  const handlePlaceChanged = () => {
    console.log(inputRef.current.getPlaces(), 'getPlaces');
    const [place] = inputRef.current.getPlaces();
    if (place) {
      setUserFormData(prev => ({
        ...prev,
        address: place.formatted_address
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
      setUserFormData(prev => ({
        ...prev,
        country: political,
        states: administrative_area_level_1,
        city: place.name,
        zip: postalCode,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setUserFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setUserFormData(prev => ({ ...prev, [name]: value }));
    }
  };

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
      setIsLoading(false);
    }).catch(error => {
      console.error('Error fetching user data:', error);
      setIsLoading(false);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputError(true);

    // Check if any field is non-empty
    const hasValidInput = Object.values(userFormData).some(field => field !== "");
console.log(hasValidInput , 'hasValidInput');
    if (!hasValidInput) {
      setEnabled(true);
      setIsLoading(true);

      const formData = new FormData();
      if (editImage) {
        formData.append("file", userFormData.file);
      }

      // Append all form data
      Object.keys(userFormData).forEach(key => {
        formData.append(key, userFormData[key]);
      });

      UserServices.updateProfile(formData)
        .then((response) => {
          setIsLoading(false);
          setInputError(false);
          setEnabled(false);
        })
        .catch((error) => {
          console.error("Profile update failed:", error);
          setIsLoading(false);
          setInputError(false);
          setEnabled(false);
        });
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setUserFormData((prev) => ({ ...prev, file: event.target.files[0] }))
    setEditImage(true)
  };

  return (
    <>

      {isLoading ? (
        <LoadingComponents />
      ) : (
        <section id="prsnlinfo">
          <div className="row">
            <div className="col-lg-12">
              <div class="main-content">
                <div class="seller-new-transaction">
                  <div class="title">Profile Information</div>
                  <div className="peronsinfo-form">
                    <div className="pranker">
                      <div className="profile-pic-wrapper">
                        <div className="pic-holder">
                          {!editImage ? (
                            userFormData?.file?.includes('http') ? (
                              <img
                                id="profilePic"
                                className="pic"
                                src={userFormData.file}
                              />
                            ) : (
                              <img
                                id="profilePic"
                                className="pic"
                                src={`${BASE_URL}/${userFormData?.file}`}
                              />
                            )
                          ) : (
                            <img id="profilePic" className="pic" src={URL.createObjectURL(userFormData?.file)} />
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
                          <label htmlFor="newProfilePhoto" className="upload-file-block">
                            <div className="text-center">
                              <div className="text-uppercase">
                                <IoIosCamera />
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                      <div>
                        <h2>{userFormData.name}</h2>
                        <h6><a href={`mailto:${userFormData.email}`}>{userFormData.email}</a></h6>
                      </div>
                    </div>
                    <div className="prnform">
                      <form onSubmit={handleSubmit}>
                        <div className="input-wrap">
                          <div className="input">
                            <input type="text" name="name" value={userFormData.name} onChange={handleChange} placeholder="Enter name" />
                            {inputError && userFormData.name === '' && <div className="error-input">Name is required</div>}
                          </div>

                          <div className="input">
                            <input type="text" name="lastname" value={userFormData.lastname} onChange={handleChange} placeholder="Enter last Name" />
                            {inputError && userFormData.lastname === '' && <div className="error-input">Last name is required</div>}
                          </div>
                        </div>
                        <div className="input-wrap">
                          <div className="input">
                            <input type="tel" name="phone" value={userFormData.phone} onChange={handleChange} placeholder="Enter phone number" />
                            {inputError && userFormData.phone === '' && <div className="error-input">Phone number is required</div>}
                          </div>

                          <div className="input">
                            {isLoaded && (
                              <StandaloneSearchBox onLoad={(ref) => (inputRef.current = ref)} onPlacesChanged={handlePlaceChanged}>
                                <input type="text" value={userFormData.address} placeholder={userFormData.address} />
                              </StandaloneSearchBox>
                            )}
                            {userFormData.address === "" && inputError && <div className="error-input">Address is required</div>}
                          </div>
                        </div>
                        <div className="input-wrap">
                          <div className="input">
                            <input name="country" readOnly onChange={handleChange} value={userFormData.country} placeholder="Enter country" />
                            {userFormData.country === "" && inputError && <div className="error-input">Country is required</div>}
                          </div>

                          <div className="input">
                            <input name="states" readOnly onChange={handleChange} value={userFormData.states} placeholder="Enter State" />
                            {userFormData.states === "" && inputError && <div className="error-input">State is required</div>}
                          </div>

                          <div className="input">
                            <input name="city" readOnly onChange={handleChange} value={userFormData.city} placeholder="Enter city" />
                            {userFormData.city === "" && inputError && <div className="error-input">City is required</div>}
                          </div>
                        </div>
                        <div className="input-wrap">
                          <div className="input">
                            <input name="email" readOnly onChange={handleChange} value={userFormData.email} placeholder="Enter email" />
                            {userFormData.email === "" && inputError && <div className="error-input">Email is required</div>}
                          </div>

                          <div className="input">
                            <input name="site" onChange={handleChange} value={userFormData.site} placeholder="Enter site" />
                            {userFormData.site === "" && inputError && <div className="error-input">Site is required</div>}
                          </div>
                        </div>
                        <button type="submit" disabled={enabled}>
                          {isLoading ? "loading.." : "Submit"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PersonalInfo;
