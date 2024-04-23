import React, { useRef, useEffect, useState } from "react";
import Emailverifyimagebg from "../../assets/Images/Accountimages/signup.png";
import Logo from "../../assets/Images/logo.png";
import Line from "../../assets/Images/Accountimages/line.png"
import AuthServices from "../../services/API/AuthService"; //~/services/API/AuthService
import UserServices from "../../services/API/UserServices"; //~/services/API/UserServices
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

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

  useEffect(() => {
    let countdownInterval;

    if (resendCountdown > 0) {
      // Start the countdown timer if the countdown value is greater than 0
      countdownInterval = setInterval(() => {
        setResendCountdown((prevCountdown) => prevCountdown - 1); // Decrement countdown value every second
      }, 1000);
    }

    return () => {
      // Cleanup function to clear the interval when component unmounts or countdown reaches 0
      clearInterval(countdownInterval);
    };
  }, [resendCountdown]); // Run the effect whenever the resendCountdown state changes

  const extractEmail = () => {
    setEmail(params.email); // Extract email from useParams hook
  }
  const handleInputChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1); // Limit input to one character
    }

    if (value !== "") {
      // Move focus to the next input field if there's input
      if (index < inputRefs.length - 1 && inputRefs[index + 1].current) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Get the values from each input field for further processing
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
          window.location.href = "/signin";
        }, 1500);
      })
      .catch((e) => {
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
    .catch((e) => {
      console.log('Error:', e)
      setIsLoading(false);
      setEnabled(false);
    }).then(() => {
      setIsLoading(false);
      setEnabled(false);
    });
}
  useEffect(() => {
    extractEmail();
  }, []);

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
