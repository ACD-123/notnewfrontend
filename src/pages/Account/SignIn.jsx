/*global FB*/
import React, { useState, useEffect } from "react";
import Signinbgs from "../../assets/Images/Accountimages/signinbg.png";
import Logo from "../../assets/Images/logo.png";
import Google from "../../assets/Images/Accountimages/google.png";
import Facebook from "../../assets/Images/Accountimages/facebook.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from 'react-facebook-login';
import { useGoogleOneTapLogin } from "@react-oauth/google";
import {
  setAccessToken,
  setRefreshToken,
  setfcmToken,
} from "../../services/Auth"; // ~/services/Auth
import { setUserDetails } from "../../services/Auth"; // ~/services/Auth
import AuthServices from "../../services/API/AuthService"; //~/services/API/AuthService
import { isEmpty } from "../../services/Utilities";

var Signinbg = {
  backgroundImage: `url(${Signinbgs})`,
  backgroundSize: "cover",
  paddingTop: "40px",
};
const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [remember, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [user, setUser] = useState([]);
  const [logins, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');
  const responseFacebook = (response) => {
    console.log('fb_response', response);
    if(response.status !== "unknown"){
          AuthServices.facebookLogin(response)
              .then(
                  response => {
                      console.log('responce from back end', response)
                      // localStorage.setItem('user', JSON.stringify(response.data.data))
                      // localStorage.setItem('token', JSON.stringify(response.data.token))
                      // window.location.replace('/');
                  })
              .catch(error => {
                      console.log(error.response);
                  });
          setData(response);
          setPicture(response.picture.data.url);
          if (response.accessToken) {
            setLogin(true);
          } else {
            setLogin(false);
          }
    }
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: "auth-code",
  });
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleRememberMeChange = (e) => {
    setRememberMe(!remember);
  };
  const getUserData = () => {
    const loggedInUser = localStorage.getItem("user_details");
    if (loggedInUser) {
      const loggedInUsers = JSON.parse(loggedInUser);
      setUser(loggedInUsers);
    }
  };
  const checkLogin = () => {
    if (user.length > 0) {
        window.location.replace("/");
    }
  };
  const fbInit = (response) => {
    window.fbAsyncInit = function () {
        FB.init({
          appId: "855777062581776",
          cookie: true, 
          xfbml: true,
          status: true,
          oauth: true,
          channelUrl: 'https://notnew.testingwebsitelink.com/',
          version: "v17.0",
        });
        FB.AppEvents.logPageView();
      };
    
      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation here (e.g., check for empty fields)
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email Name is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    formData.remember_me = remember;
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setEnabled(true);
      AuthServices.login(formData)
        .then((response) => {
          if (response == "NotExits") {
            toast.error("User Does not Exits!");
          } else if (response.status === "fail") {
            toast.error(response.message[0]);
            return;
          } else {
            toast.success(response.message);
            if (response.rememberme == true) {
              setUserDetails(response.data);
            } else {
              localStorage.removeItem("user_details");
            }
            setTimeout(() => {
              window.location.href = "/";
            }, 6000);
            setAccessToken(response.token);
          }
        })
        .catch((e) => {
          toast.error(e.response.data.message);
          setIsLoading(false);
          setEnabled(false);
        })
        .then(() => {
          setIsLoading(false);
          setEnabled(false);
        });
    }
  };
  useEffect(() => {
    // fbInit();
    getUserData();
    checkLogin();
  }, []);
  return (
    <>
      <section id="signin" style={Signinbg}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="welcome-registration">
                <Link to="/">
                  <img src={Logo} width="auto" height="100%" />
                </Link>
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
            <div className="col-lg-6 dsa">
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
                      <li>
                        <GoogleLogin
                          onSuccess={(credentialResponse) => {
                            // console.log('google',credentialResponse);
                            AuthServices.googleLogin(credentialResponse)
                              .then((res) => {
                                localStorage.setItem(
                                  "user_details",
                                  JSON.stringify(res.data)
                                );
                                localStorage.setItem(
                                  "access_token",
                                  res.token
                                );
                                window.location.replace("/");
                              })
                              .catch((error) => {
                                console.log("ERROR:: ", error.response);
                              });
                          }}
                          onError={() => {
                            console.log("Login Failed");
                          }}
                        />
                        ;{/* <a href="#" onClick={() => login()}> */}
                        <img src={Google} />
                        {/* </a> */}
                      </li>
                      <li>
                        <a href="#">
                        <FacebookLogin
                            appId="855777062581776"
                            autoLoad={false}
                            fields="id,name,email,picture"
                            // scope="public_profile,email,user_friends"
                            scope={['email']}
                            callback={responseFacebook}
                            icon="fa-facebook" />
                          <img src={Facebook} />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <p>Or use your email account</p>
                </div>
                <form onSubmit={handleSubmit} id="loginForm">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="error">{errors.password}</p>
                  )}
                  <div className="remember-password">
                    <div className="remm">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="remember_me"
                        checked={remember}
                        value={formData.remember_me}
                        onChange={handleRememberMeChange}
                      />
                      <label htmlFor="rememberMe">Remember me</label>
                    </div>
                    <div className="remm">
                      <Link to="/passwordrecovery">Forgot Password</Link>
                    </div>
                  </div>
                  {/* <input type="submit" value="Sign In" /> */}
                  <button type="submit" disabled={enabled}>
                    {isLoading ? "loading.." : "Sign In"}
                  </button>
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
