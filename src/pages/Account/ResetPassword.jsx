import React from "react";
import Emailverifyimagebg from "../../assets/Images/Accountimages/signup.png";
import Logo from "../../assets/Images/logo.png";
import Line from "../../assets/Images/Accountimages/line.png"

var Emailverifybg = {
  backgroundImage: `url(${Emailverifyimagebg})`,
  backgroundSize: "cover",
  paddingTop: "40px",
};

const ResetPassword = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary actions (e.g., password reset logic)

    // Redirect to another page after processing the form
    window.location.href = '/signin'; // Redirect to success page after password reset
  };

  return (
    <>
      <section id="emailverification" style={Emailverifybg}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="welcome-registration">
                <a href="/"><img src={Logo} width="auto" height="100%" alt="Logo" /></a>
                <h1>Reset Password</h1>
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
                <h1>Reset Password</h1>
                <img src={Line} alt="Line" />
                <p>
                  Enter your new password and make sure it's secure
                </p>
                <div className="emailfields">
                  <form onSubmit={handleSubmit}>
                    <div className="myemailfields">
                      <input id="password" type="password" placeholder="Enter new password" />
                    </div>
                    <div className="myemailfields">
                      <input id="confirm-password" type="password" placeholder="Confirm password" />
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

export default ResetPassword;
