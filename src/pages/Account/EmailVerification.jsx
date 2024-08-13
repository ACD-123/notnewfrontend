import React, { useRef, useEffect, useState } from "react";
import Emailverifyimagebg from "../../assets/Images/Accountimages/signup.png";
import Logo from "../../assets/Images/logo.png";
import Line from "../../assets/Images/Accountimages/line.png"
import AuthServices from "../../services/API/AuthService"; //~/services/API/AuthService
import UserServices from "../../services/API/UserServices"; //~/services/API/UserServices
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

var Emailverifybg = {
  backgroundImage: `url(${Emailverifyimagebg})`,
  backgroundSize: "cover",
  paddingTop: "40px",
};

const EmailVerification = () => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const params = useParams(); // Initialize the useParams hook
  const [resendCountdown, setResendCountdown] = useState(60); // Initial countdown value
  const navigate = useNavigate()
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

  const extractEmail = () => {
    setEmail(params.email);
  }
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
    AuthServices.verifyAuthOtp(data)
      .then((response) => {
        toast.success(response.message);
        setTimeout(() => {
          navigate("/signin")
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

  const handleResend = (e) =>{
    e.preventDefault();
    setIsLoading(true);
    setEnabled(true);
    setResendCountdown(60);
    let data={
      'email': email
    }
    UserServices.resendOtp(data)
     .then((response) => {
      if(response.status){
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

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
      navigate('/')
    } else {
      extractEmail();
    }
  }, [])

  const formatCountdownTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  return (
    <>
      <section id="emailverification" style={Emailverifybg}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="welcome-registration">
                <a href="/"><img src={Logo} width="auto" height="100%" /></a>
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
              <div className="email-verifyfields">
                <h1>Email Verification</h1>
                <img src={Line} />
                <p>
                  Please enter 4 digit numeric Code sent to
                  <br />
                  Your Email 
                  <br />
                  {email} 
                  <br />
                  to verify.
                </p>
                <div className="emailfields">
                  <form onSubmit={handleSubmit}>
                    <div className="myemailfields">
                      {[0, 1, 2, 3].map((index) => (
                        <input className="myinputfields"
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
                      <ul>
                        <li className="code"><a href=''>
              {resendCountdown > 0
              ? `Resend code in ${formatCountdownTime(resendCountdown)}`
              : "Didn't receive the code?"}
              </a></li>
                        <li className="resend">
                        <button disabled={resendCountdown > 0} onClick={handleResend}>
              Resend
            </button>
                        </li>
                      </ul>
                    </div>
                    <button className="btn btn-primary" type="submit" disabled={enabled}>
                      {isLoading ? "loading.." : "Submit"}
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

export default EmailVerification;
