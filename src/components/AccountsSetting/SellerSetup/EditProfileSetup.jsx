import React, { useState, useEffect, useRef } from "react";
import SellerServices from "../../../services/API/SellerServices";
import { toast } from "react-toastify";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { BASE_URL } from "../../../services/Constant"
import { Spinner } from "react-bootstrap";
import { IoCameraReverseOutline } from "react-icons/io5";
import LoadingComponents from "../../Shared/LoadingComponents";
import { MdDelete } from "react-icons/md";

const libraries = ['places'];
const EditProfileSetup = ({ getShopDetaill, isLoading, setIsLoading }) => {
  const inputRef = useRef();
  const [inputErrors, setInputErrors] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const [enabled, setEnabled] = useState(false);
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
    video: "",
    editImage: false,
    editVideo: false
  });
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDg6Ci3L6yS5YvtKAkWQjnodGUtlNYHw9Y",
    libraries
  });

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleVideoUploadClick = () => {
    videoInputRef.current.click();
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
    if (editprofile?.fullname === "" && editprofile?.file === "" && editprofile?.address === "" &&
      editprofile?.city_id === "" && editprofile?.country_id === "" && editprofile?.zip === "" &&
      editprofile?.description === "" && editprofile?.video === ""
    ) { return }
    setIsLoading(true);
    setEnabled(true);
    // if (editprofile.editVideo) {
    const fd = new FormData();
    fd.append("video", editprofile.video);
    fd.append("deleted", editprofile.video ? 0 : 1);
    SellerServices.updateVideo(fd)
      .then((response) => {
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
        fd.append("description", editprofile.description);

        if (editprofile.editImage) {
          fd.append("file", editprofile?.file);
        }
        fd.append("guid", editprofile?.guid);
        SellerServices.update(fd)
          .then((response) => {
            toast.success(response.data);
            getShopDetaill()
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message)
            setIsLoading(false);
            setEnabled(false);
          })
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false);
        setEnabled(false);
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditprofile({
      ...editprofile,
      [name]: value,
    });
  };

  const getShopDetail = () => {
    SellerServices.getShopDetail()
      .then((response) => {
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
          file: response?.data?.cover_image,
          video: response?.data?.video,
          editImage: false,
          editVideo: false

        })
        setIsLoading(false);

      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getShopDetail();
  }, []);

  const handleImageFileChange = (e) => {
    return setEditprofile(prev => ({ ...prev, file: e.target.files[0], editImage: true }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      e.target.value = null;
      return;
    }

    setEditprofile({ ...editprofile, video: file, editVideo: true });
    e.target.value = null;
  };

  const deleteSelectedVideo = () => {
    setEditprofile({ ...editprofile, video: "", editVideo: false });
  }

  const updateSellerVideo = () => {
    if (editprofile.editVideo) {

    } else {
      handleSubmit()
    }
  }

  return (


    <>
      <section id="selleraccountsetup" style={{ minHeight: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="container" style={{ minHeight: '50%' }}>
          {isLoading ? (
            <LoadingComponents />
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
                        {editprofile.fullname === '' && inputErrors && <p className="error">Name is required</p>}
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
                        {editprofile.email === '' && inputErrors && <p className="error">Email is required</p>}
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
                        {editprofile.phone === '' && inputErrors && <p className="error">Number is required</p>}
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
                        {editprofile.address === '' && inputErrors && <p className="error">Address is required</p>}
                      </div>
                    </div>
                    <div className="e-s-p-t-f">
                      <div className="e-s-p-t-f-l">
                        <input
                          type="text"
                          className="form-control"
                          value={editprofile?.country_id}
                          name="country_id"
                          onChange={handleChange}
                          placeholder="Enter your country"
                          readOnly
                        />
                        {editprofile.country_id === '' && inputErrors && <p className="error">Country is required</p>}
                      </div>
                      <div className="e-s-p-t-f-l">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={editprofile?.state_id}
                          name="state_id"
                          onChange={handleChange}
                          placeholder="Enter your state"
                          readOnly
                        />
                        {editprofile.state_id === '' && inputErrors && <p className="error">State is required</p>}
                      </div>
                      <div className="e-s-p-t-f-l">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={editprofile?.zip}
                          name="zip"
                          onChange={handleChange}
                          placeholder="Enter your state"
                        // readOnly
                        />
                        {editprofile.zip === '' && inputErrors && <p className="error">Postal code is required</p>}
                      </div>
                    </div>
                    <div className="e-s-p-t-f">
                      <div className="e-s-p-t-f-l">
                        <textarea
                          type="text"
                          className="form-control"
                          name="description"
                          onChange={handleChange}
                          defaultValue={editprofile?.description}
                          placeholder="Enter description"
                        />
                        {editprofile.description === '' && inputErrors &&
                          <p className="error">Description is required</p>}
                      </div>
                    </div>
                    <div className="p-m-i-u">
                      {!editprofile?.editVideo && editprofile?.video == null &&
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
                        {editprofile?.video != '' && editprofile?.video != null ?
                          (!editprofile?.editVideo && editprofile?.video?.includes('image') ?
                            <div className="selected-videos-box">
                              <video width="100%" controls>
                                <source src={`${BASE_URL}/public/${editprofile?.video}`} />
                                Your browser does not support the video tag.
                              </video>
                              <span onClick={() => deleteSelectedVideo()}><MdDelete /></span>
                            </div>
                            :
                            <div className="selected-videos-box">
                              <video width="100%" controls>
                                <source src={URL.createObjectURL(editprofile?.video)} />
                                Your browser does not support the video tag.
                              </video>
                              <span onClick={() => { deleteSelectedVideo() }}><MdDelete /></span>
                            </div>
                          )

                          :
                          null
                        }
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
