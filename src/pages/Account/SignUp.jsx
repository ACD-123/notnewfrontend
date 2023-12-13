import React, { useState } from "react";
import Signupimage from "../../assets/Images/Accountimages/signup.png"
import Logo from '../../assets/Images/logo.png'
import Avatarprofile from "../../assets/Images/avatarsignup.png"
import { Link } from "react-router-dom";

var Submitcss = {
  backgroundImage: `url(${Signupimage})`,
  backgroundSize: 'cover',
  paddingTop: '40px'
};

const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Perform validations or modifications if needed
    setProfilePic(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary actions (e.g., form processing logic)

    // Simulate form processing delay (remove this setTimeout in actual implementation)
    setTimeout(() => {
      // Redirect to another page after processing the form
      window.location.href = '/emailverification'; // Redirect to success page after form submission
    }, 1000); // Simulating a delay of 1 second for form processing (remove this in actual implementation)
  };

  return (
    <>
      <section id='singup' style={Submitcss}>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <div className='welcome-registration'>
                <Link to="/"><img src={Logo} width="auto" height="100%" alt="Logo" /></Link>
                <h1>Welcome to account registration</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a
                  type specimen book.
                </p>
              </div>
            </div>
            <div className='col-lg-6 fffsa'>
              <div className='signup-form-fields register'>
                <div className='topbuttons' style={{ margin: "20px 0px" }}>
                  <ul>
                    <li><Link to="/signin">Sign in</Link></li>
                    <li><Link to="/signup">Register</Link></li>
                  </ul>
                </div>
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
      <div class="mb-3">
        
        <select class="form-select" id="country">
          {/* <!-- Populate options for countries --> */}
          <option value="1">Country 1</option>
          <option value="2">Country 2</option>
          {/* <!-- Add more options as needed --> */}
        </select>
      </div>
      <div class="mb-3">
        
        <select class="form-select" id="state">
          {/* <!-- Populate options for states based on the selected country --> */}
          <option value="1">State 1</option>
          <option value="2">State 2</option>
          {/* <!-- Add more options as needed --> */}
        </select>
      </div>
      <div class="mb-3">
        
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
      
                  <button className="btn btn-primary" type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignUp;
