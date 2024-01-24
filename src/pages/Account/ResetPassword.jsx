import React, { useState } from "react";
import Emailverifyimagebg from "../../assets/Images/Accountimages/signup.png";
import Logo from "../../assets/Images/logo.png";
import Line from "../../assets/Images/Accountimages/line.png";
import { toast } from "react-toastify";
import AuthServices from "../../services/API/AuthService"; //~/services/API/AuthService
var Emailverifybg = {
  backgroundImage: `url(${Emailverifyimagebg})`,
  backgroundSize: "cover",
  paddingTop: "40px",
};

const ResetPassword = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const { pathname } = window.location;
  const email = pathname.split("/").pop();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = "Password is required!";
    }
    if (!formData.password_confirmation) {
      newErrors.password_confirmation = "Confirm Password is required!";
    }
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Password is Mismatch!";
    }
    formData.email = email;
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setEnabled(true);
      // Perform any necessary actions (e.g., password reset logic)
      AuthServices.resetPassword(formData)
        .then((response) => {
          toast.success(response.message);
          setTimeout(() => {
            window.location.href = "/signin";
          }, 6000);
        })
        .catch((e) => {
          toast.error(e.message);
          setIsLoading(false);
          setEnabled(false);
        })
        .then(() => {
          setIsLoading(false);
          setEnabled(false);
        });
    }
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
                <p>Enter your new password and make sure it's secure</p>
                <div className="emailfields">
                  <form onSubmit={handleSubmit}>
                    <div className="myemailfields">
                      <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter new password"
                      />
                    </div>
                    {errors.password && (
                      <p className="error">{errors.password}</p>
                    )}
                    <div className="myemailfields">
                      <input
                        id="confirm-password"
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        placeholder="Confirm password"
                      />
                    </div>
                    {errors.password_confirmation && (
                      <p className="error">{errors.password_confirmation}</p>
                    )}
                    <button className="btn btn-primary" disabled={enabled} type="submit">
                      {isLoading ? "loading.." : "Submit"}
                    </button>

                    {/* <input
                      disabled={enabled}
                      className="btn btn-primary"
                      type="submit"
                      value="Submit"
                    />
                    {isLoading ? "loading.." : "Submit"} */}
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
