import React, { useState } from "react";
import Profileimage from '../../../assets/Images/Profilesimage/1.png'
const EditProfileSetup = () => {
  const [profilePic, setProfilePic] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Perform validations or modifications if needed
    setProfilePic(selectedFile);
  };

 
    return (
      <>
        {/* Your existing form */}
        <section id='selleraccountsetup'>
        <div className='container'>
            <div className="row align-items-center edit-profile" style={{padding:"40px 0px"}}>
                <div className="col-lg-9">
                    <div className="profile0-details">
                        <div>
                            <img src={Profileimage} />
                        </div>
                        <div>
                            <h2>ABCD EFGHIKL (4737594)</h2>
                            <h3>Joined since : 2022</h3>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <button className="updte-profile">Update Profile</button>
                </div>
            </div>
          <div className='row align-items-center'>
              <div className='signup-form-fields register'>
                <form>
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
      
                  <button className="btn btn-primary svavava" type="submit">Save</button>
                </form>
              </div>

          </div>
        </div>
      </section>
      </>
    );
  
};

export default EditProfileSetup;
