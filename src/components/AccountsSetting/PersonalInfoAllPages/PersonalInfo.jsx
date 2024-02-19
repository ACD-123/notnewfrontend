import React, { useState, useEffect } from "react";
import Profile from "../../../assets/Images/PersonalInfo/profile.png";
import UserServices from "../../../services/API/UserServices"; //~/services/API/UserServices
import { setUserDetails, isLoggedin, getUserDetails } from "../../../services/Auth"; // ~/services/Auth
import { toast } from "react-toastify";

const PersonalInfo = () => {
  const [user, setUser] = useState({});
  const [phone, setPhone] = useState("");
  const [addresses, setAddress] = useState("");
  const [emails, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    email: "",
    site: "",
  });
  const getUser = () =>{
    UserServices.self().then((response) => {
      setEmail(response.email);
      setPhone(response.phone);
      setAddress(response.address);
      setSite(response.site);
      setUser(response);
    });
  }
  const handlePhone =(e) =>{
    setPhone(e.target.value);
  }
  const handleAddress =(e) =>{
    setAddress(e.target.vaue);
  }
  const handleEmail =(e) =>{
    setEmail(e.target.vaue);
  }
  const handleSite = (e) =>{
    setSite(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let data ={
      phone: phone,
      address: addresses,
      email: emails,
      site: site,
    }
    // Reset form fields
    // setFormData({
    //   phone: phone,
    //   address: addresses,
    //   email: email,
    //   site: site,
    // });
    UserServices.updateProfile(data)
    .then((response) => {
      if(response.success){
        setUserDetails(response)
        toast.success(response.message)
      }
    });
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
            <dv className="profile-img">
              <img style={{ width: "100%" }} src={Profile} />
            </dv>
          </div>
          <div className="col-lg-9">
            <div className="peronsinfo-form">
              <h2>Micheal Kroll </h2>
              <h6>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </h6>
              <h5>Profile Information</h5>
              <div className="prnform">
                <form onSubmit={handleSubmit}>
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
                    value={addresses}
                    onChange={handleAddress}
                    placeholder="Address:"
                    required
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
