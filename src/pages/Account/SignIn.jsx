/*global FB*/
import React, { useState, useEffect } from "react";
import Signinbgs from "../../assets/Images/Accountimages/signinbg.png";
import Logo from "../../assets/Images/logo.png";
import Google from "../../assets/Images/Accountimages/google.png";
import Facebook from "../../assets/Images/Accountimages/facebook.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from 'react-facebook-login';
import { useGoogleOneTapLogin } from "@react-oauth/google";
import {
  setAccessToken,
  setRefreshToken,
  setUserId,
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
    guest_user_id: ""
  });
  const [remember, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [user, setUser] = useState([]);
  const [logins, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');
  const navigate = useNavigate()
  const guest_user_id = localStorage.getItem('guest_user_id');
  const redirectionPage = localStorage.getItem('redirectionPage');
  const ProductId = localStorage.getItem('ProductId');
  const responseFacebook = (response) => {
    if (response.status !== "unknown") {
      AuthServices.facebookLogin(response)
        .then(
          response => {
          })
        .catch(error => {
          toast.error(error?.response?.data?.message)
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

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      // console.log(credentialResponse , 'credentialResponse');

      AuthServices.googleLogin({...credentialResponse , guest_user_id: guest_user_id})
        .then((res) => {
          localStorage.setItem("user_details", JSON.stringify(res.data));
          localStorage.setItem("user_id", res.data?.id);
          localStorage.removeItem('guest_user_id')
          localStorage.setItem(
            "access_token",
            res.token
          );
          if (redirectionPage === "singleproduct") {
            localStorage.removeItem('redirectionPage');
            localStorage.removeItem('ProductId');
            localStorage.removeItem('guest_user_id');
            window.location.href = `/${redirectionPage}/${ProductId}`;
          } else if (redirectionPage === "cart") {
            localStorage.removeItem('redirectionPage');
            localStorage.removeItem('ProductId');
            localStorage.removeItem('guest_user_id');
            window.location.href = `/${redirectionPage}`;
          } else {
            localStorage.removeItem('guest_user_id');
            window.location.href = `/`;
          }
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message)
        });
    },
    onError: () => {

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
      navigate('/')
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email Name is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    formData.remember_me = remember;
    // formData.guest_user_id = guest_user_id;

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setEnabled(true);
      await AuthServices.login({ ...formData, guest_user_id: guest_user_id })
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
              setUserId(response?.data?.id)
            } else {
              localStorage.removeItem("user_details");
            }

            if (redirectionPage === null) {
              localStorage.removeItem('guest_user_id');
              window.location.href = `/`;
            } else {
              localStorage.removeItem('redirectionPage');
              localStorage.removeItem('guest_user_id');
              window.location.href = `${redirectionPage}`;

            }
            setAccessToken(response.token);
          }
        })
        .catch((error) => {
          console.log(error , 'errorerror');
          
          toast.error(error.response.data.message);
          setIsLoading(false);
          setEnabled(false);
        })
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
                          theme="filled_black"
                          text="signin_with"
                          onSuccess={(credentialResponse) => {
                            AuthServices.googleLogin(credentialResponse)
                              .then((res) => {
                                localStorage.setItem("user_details", JSON.stringify(res.data));
                                localStorage.setItem("user_id", res.data?.id);
                                localStorage.setItem(
                                  "access_token",
                                  res.token
                                );
                                navigate('/')
                              })
                              .catch((error) => {
                                toast.error(error?.response?.data?.message)
                              });
                          }}
                          onError={() => {

                          }}
                        />
                        {/* <a href="#" onClick={() => login()}> */}
                        {/* <img src={Google} /> */}
                        {/* </a> */}
                      </li>
                      <li>
                        <FacebookLogin
                          appId="855777062581776"
                          autoLoad={false}
                          fields="id,name,email,picture"
                          textButton="Sign in with Facebook"
                          // scope="public_profile,email,user_friends"
                          scope={['email']}
                          callback={responseFacebook}
                          icon="fa-facebook" />
                        {/* <img src={Facebook} /> */}
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
                      <Link to="/forget-password">Forgot Password</Link>
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
