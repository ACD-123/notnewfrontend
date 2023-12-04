import React from "react";
import Signinbgs from "../../assets/Images/Accountimages/signinbg.png";
import Logo from "../../assets/Images/logo.png";
import Google from "../../assets/Images/Accountimages/google.png"
import Facebook from "../../assets/Images/Accountimages/facebook.png"
import { Link } from "react-router-dom";
var Signinbg = {
  backgroundImage: `url(${Signinbgs})`,
  backgroundSize: "cover",
  paddingTop: "40px",
};
const SignIn = () => {
  return (
    <>
      <section id="signin" style={Signinbg}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="welcome-registration">
                <Link to="/"><img src={Logo} width="auto" height="100%" /></Link>
                <h1>Welcome to account registration</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="signup-form-fields signinbutton">
                <div className="topbuttons" style={{ margin: "20px 0px" }}>
                  <ul>
                    <li>
                      <Link to="/signin">Sign in</Link>
                    </li>
                    <li>
                    <Link to="/signup">Register</Link>
                    </li>
                  </ul>
                </div>
                <div className="verifyfromgoogle">
                    <div className="images-google">
                        <ul>
                            <li><a href="#"><img src={Google}/></a></li>
                            <li><a href="#"><img src={Facebook}/></a></li>
                        </ul>
                    </div>
                <p>Or use your email account</p>
                </div>
                <form id="loginForm">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                  />

                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                  />

                  <div className="remember-password">
                    <div className="remm">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                      />
                      <label for="rememberMe">Remember me</label>
                    </div>
                    <div className="remm">
                     <Link to="/passwordrecovery">Forgot Password</Link>
                    </div>
                  </div>

                  <input type="submit" value="Sign In" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
