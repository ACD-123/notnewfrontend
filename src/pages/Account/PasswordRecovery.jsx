import React, { useRef } from "react";
import Emailverifyimagebg from "../../assets/Images/Accountimages/signup.png";
import Logo from "../../assets/Images/logo.png";
import Line from "../../assets/Images/Accountimages/line.png"

var Emailverifybg = {
  backgroundImage: `url(${Emailverifyimagebg})`,
  backgroundSize: "cover",
  paddingTop: "40px",
};

const PasswordRecovery = () => {
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any necessary action before redirection (e.g., sending code)

    // Redirect to another page (e.g., home page '/')
    window.location.href = '/forgotverification'; // Change the URL to the desired redirection
  };

  return (
    <>
      <section id="emailverification" style={Emailverifybg}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="welcome-registration">
                <a href="/"><img src={Logo} width="auto" height="100%" alt="Logo" /></a>
                <h1>Password Recovery</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled
                </p>
              </div>
            </div>
            <div className="col-lg-7 recovery">
              <div className="email-verifyfields passwordrecovery">
                <h1>Forgot Password</h1>
                <img src={Line} alt="Line" />
                <p>
                  Don’t worry We have got Your back
                </p>
                <div className="emailfields">
                  <form onSubmit={handleSubmit}>
                    <div className="myemailfields">
                      <input
                        ref={emailRef}
                        id="email-input"
                        type="text"
                        placeholder="Enter your email address or phone no"
                      />
                    </div>
                    <input
                      className="btn btn-primary"
                      type="submit"
                      value="Send Code"
                    />
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

export default PasswordRecovery;
