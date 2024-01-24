import React, { useRef } from "react";
import Emailverifyimagebg from "../../assets/Images/Accountimages/signup.png";
import Logo from "../../assets/Images/logo.png";
import Line from "../../assets/Images/Accountimages/line.png"

var Emailverifybg = {
  backgroundImage: `url(${Emailverifyimagebg})`,
  backgroundSize: "cover",
  paddingTop: "40px",
};

const EmailVerification = () => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

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
    console.log("Submitted code:", code);

    // Redirect to another page after processing the form
    if (code === "1234") {
      // Replace "1234" with the desired verification code
      window.location.href = '/signin'; // Redirect to success page after code verification
    }
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
                  Please enter 4 digit numeric Code sent to Your Email to
                  verify.
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
                    <div className="emailresend-recieve">
                      <ul>
                        <li className="code"><a href="#">Didn’t Receive the code?</a></li>
                        <li className="resend"><a href="#">Resend</a></li>
                      </ul>
                    </div>
                    <input className="btn btn-primary" type="submit" value="Submit" />
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
