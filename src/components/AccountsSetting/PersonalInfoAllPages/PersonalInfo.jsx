import React, { useState, useEffect } from "react";
import Profile from "../../../assets/Images/PersonalInfo/profile.png";
import blankuser from "../../../assets/Images/User/blankuser.jpg";
import UserServices from "../../../services/API/UserServices"; //~/services/API/UserServices
import { setUserDetails, isLoggedin, getUserDetails } from "../../../services/Auth"; // ~/services/Auth
import { toast } from "react-toastify";
import {BASE_URL} from "../../../services/Constant"
const PersonalInfo = () => {
  const [user, setUser] = useState({});
  const [phone, setPhone] = useState("");
  const [address, setAd] = useState("");
  const [emails, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [profilepic, setProfileImage] = useState("");
  const [profilePic, setProfilePic] = useState(null)
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    email: "",
    site: "",
  });
  const getUser = () =>{
    UserServices.self().then((response) => {  
      setProfileImage(response.profile_image);
      setEmail(response.email);
      setPhone(response.phone);
      setAd(response.address);
      setSite(response.site);
      setUser(response);
    });
  }
  const handlePhone =(e) =>{
    setPhone(e.target.value);
  }
  const handleAdd =(e) =>{
    setAd(e.target.value);
  }
  const handleEmail =(e) =>{
    setEmail(e.target.vaue);
  }
  const handleSite = (e) =>{
    setSite(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("email", emails);
    fd.append("address", address);
    fd.append("phone", phone);
    fd.append("site", site);
    if(profilePic){
      fd.append("file", profilePic);
    }
    for (let pair of fd.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    // let data ={
    //   phone: phone,
    //   address: address,
    //   email: emails,
    //   site: site,
    // }
    // Reset form fields
    // setFormData({
    //   phone: phone,
    //   address: addresses,
    //   email: email,
    //   site: site,
    // });
    UserServices.updateProfile(fd)
    .then((response) => {
      if(response.status){
        toast.success(response.data)
      }
    });
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Perform validations or modifications if needed
    setProfilePic(selectedFile);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
    {user? (<>
      <section id="prsnlinfo">
        <div className="row">
              <div className="col-lg-3">
              {/* https://notnewbackend.testingwebsitelink.com/storage/users/51/user/0c98aa20-b9db-4629-9dca-ec6f0377533d.jfif */}
              <div className="profile-pic-wrapper">
                      <div className="pic-holder">
                        {profilepic ? (<>
                          <img
                          id="profilePic"
                          className="pic"
                          src={`${BASE_URL}/${profilepic}`}
                        />
{/* src="https://notnewbackend.testingwebsitelink.com/storage/users/51/user/0c98aa20-b9db-4629-9dca-ec6f0377533d.jfif" */}

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
          {/* <div className="col-lg-3">
            {profilepic ?(
              <>
                <div className="profile-img">
                  <img style={{ width: "100%" }} src={profilepic} />
                </div>
              </>
            ):(
              <>
                <dv className="profile-img">
                  <img style={{ width: "100%" }} src={blankuser} alt="blank" />
                </dv>
              </>
            )}
          </div> */}
          <div className="col-lg-9">
            <div className="peronsinfo-form">
              <h2>{user.name}</h2>
              <h6>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </h6>
              <h5>Profile Information</h5>
              <div className="prnform">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={handlePhone}
                    required
                    placeholder="Phone:"
                  />
                  <br />
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleAdd}
                    required
                    placeholder="Address:"
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
                    placeholder="Site:"
                    required
                  />

                  <br />
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>):('')}
    </>
  );
};

export default PersonalInfo;
