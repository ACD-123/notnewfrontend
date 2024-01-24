import React, { useRef, useState } from "react";
import Emailverifyimagebg from "../../assets/Images/Accountimages/signup.png";
import Logo from "../../assets/Images/logo.png";
import Line from "../../assets/Images/Accountimages/line.png";
import AuthServices from "../../services/API/AuthService"; //~/services/API/AuthService
import { toast } from "react-toastify";
var Emailverifybg = {
  backgroundImage: `url(${Emailverifyimagebg})`,
  backgroundSize: "cover",
  paddingTop: "40px",
};

const ForgotVerification = () => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const { pathname } = window.location;
  const email = pathname.split("/").pop();
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
    AuthServices.verifyOtp(data)
      .then((response) => {
        toast.success(response.message);
        setTimeout(() => {
          window.location.href = "/resetpassword/"+email;
        }, 6000);
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
                    {/* <input
                      className="btn btn-primary"
                      type="submit"
                      value="Send Code"
                    /> */}
                    <button
                      type="submit"
                      lassName="btn btn-primary"
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
