import React, { useRef, useState, useEffect } from "react";
import Emailverifyimagebg from "../../assets/Images/Accountimages/signup.png";
import Logo from "../../assets/Images/logo.png";
import Line from "../../assets/Images/Accountimages/line.png";
import AuthServices from "../../services/API/AuthService";
import UserServices from "../../services/API/UserServices";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
var Emailverifybg = {
  backgroundImage: `url(${Emailverifyimagebg})`,
  backgroundSize: "cover",
};


const ForgotVerification = () => {
  const navigate = useNavigate()
  const [resendCountdown, setResendCountdown] = useState(60);

  useEffect(() => {
    let countdownInterval;

    if (resendCountdown > 0) {
      countdownInterval = setInterval(() => {
        setResendCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [resendCountdown]);

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const { pathname } = window.location;
  const email = pathname.split("/").pop();
  const handleInputChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    if (value !== "") {
      if (index < inputRefs.length - 1 && inputRefs[index + 1].current) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const code = inputRefs.map((ref) => ref.current.value).join("");
    setIsLoading(true);
    setEnabled(true);
    let data = {
      otp: code,
    };
    AuthServices.verifyOtp(data)
      .then((response) => {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/resetpassword/" + email)
        }, 1500);
      })
      .catch((error) => {
        toast.error("Otp is not Correct");
        setIsLoading(false);
        setEnabled(false);
      })
      .then(() => {
        setIsLoading(false);
        setEnabled(false);
      });
  };
  const handleResend = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setEnabled(true);
    setResendCountdown(60);
    let data = {
      'email': email
    }
    UserServices.resendForgetOtp(data)
      .then((response) => {
        if (response.status) {
          toast.success(response.data)
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false);
        setEnabled(false);
      }).then(() => {
        setIsLoading(false);
        setEnabled(false);
      });
  }
  const formatCountdownTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
      navigate('/')
    } else {
    }
  }, [])
  return (
    <>
      <section id="emailverification" style={Emailverifybg}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="welcome-registration">
                <a href="/">
                  <img src={Logo} width="auto" height="100%" alt="Logo" />
                </a>
                <h1>Forgot Password</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="email-verifyfields">
                <h1>Forgot Password</h1>
                <img src={Line} alt="Line" />
                <p>
                  Now enter your 4 digit code we’ve sent you on the email <br />
                  <span
                    style={{ color: "#6CACBB", textDecoration: "underline" }}
                  >
                    {email}
                  </span>
                </p>
                <div className="emailfields">
                  <form onSubmit={handleSubmit}>
                    <div className="myemailfields">
                      {[0, 1, 2, 3].map((index) => (
                        <input
                          className="myinputfields"
                          key={index}
                          type="text"
                          maxLength="1"
                          ref={inputRefs[index]}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          required
                        />
                      ))}
                    </div>
                    <div className="emailresend-recieve py-4">
                      <ul style={{ alignItems: 'center' }}>
                        <li className="code">
                          <a href=''>
                            {resendCountdown > 0
                              ? `Resend code in ${formatCountdownTime(resendCountdown)}`
                              : "Didn't receive the code?"}
                          </a>
                        </li>
                        <li className="resend">
                          <button disabled={resendCountdown > 0} onClick={handleResend}>
                            Resend
                          </button>
                        </li>
                      </ul>

                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={enabled}
                    >
                      {isLoading ? "loading.." : "Send Code"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotVerification;
