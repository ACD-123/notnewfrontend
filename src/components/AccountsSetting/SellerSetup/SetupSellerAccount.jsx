import React, { useState } from "react";
import Avatarprofile from "../../../assets/Images/avatarsignup.png";
import ConnectBank from "./ConnectBank";



const SetupSellerAccount = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Perform validations or modifications if needed
    setProfilePic(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add form submission logic here if needed

    // Set the formSubmitted state to true after form submission
    setFormSubmitted(true);
  };

  // Conditionally render the form or the new component based on formSubmitted state
  if (formSubmitted) {
    return <ConnectBank />;
  } else {
    return (
      <>
        {/* Your existing form */}
        <section id='selleraccountsetup'>
        <div className='container'>
          <div className='row align-items-center'>
            <h3>Setup Your Seller Account</h3>
              <div className='signup-form-fields register'>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
        <div className="profile-pic-wrapper">
          <div className="pic-holder">
            <img
              id="profilePic"
              className="pic"
              src={profilePic ? URL.createObjectURL(profilePic) : Avatarprofile}
              alt="Profile"
            />
            <input
              className="uploadProfileInput"
              type="file"
              name="profile_pic"
              id="newProfilePhoto"
              onChange={handleFileChange}
            />
            <label htmlFor="newProfilePhoto" className="upload-file-block">
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
        
        <input type="text" className="form-control" id="fullname" placeholder="Enter your full name" />
      </div>
      <div class="mb-3">
       
        <input type="email" className="form-control" id="email" placeholder="Enter your email" />
      </div>
      <div class="mb-3">
     
        <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" />
      </div>
      <div class="mb-3">
        
        <input type="text" className="form-control" id="address" placeholder="Enter your street address" />
      </div>
      <div className='d-flex statesfield'>
      <div className="fieldss">
        
        <select class="form-select" id="country">
          {/* <!-- Populate options for countries --> */}
          <option value="1">Country 1</option>
          <option value="2">Country 2</option>
          {/* <!-- Add more options as needed --> */}
        </select>
      </div>
      <div className="fieldss">
        
        <select class="form-select" id="state">
          {/* <!-- Populate options for states based on the selected country --> */}
          <option value="1">State 1</option>
          <option value="2">State 2</option>
          {/* <!-- Add more options as needed --> */}
        </select>
      </div>
      <div className="fieldss">
        
        <select class="form-select" id="city">
          {/* <!-- Populate options for cities based on the selected state --> */}
          <option value="1">City 1</option>
          <option value="2">City 2</option>
          {/* <!-- Add more options as needed --> */}
        </select>
      </div>
      </div>
      <div class="mb-3">
       
        <input type="text" class="form-control" id="zip" placeholder="Enter your zip code" />
      </div>
      <div class="mb-3">
       
        <input type="password" class="form-control" id="password" placeholder="Enter your password" />
      </div>
      <div class="mb-3">
       
        <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm your password" />
      </div>
      
                  <button className="btn btn-primary" type="submit">Next Step</button>
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
