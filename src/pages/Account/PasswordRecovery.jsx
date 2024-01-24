import React, { useRef, useState, useEffect } from "react";
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

const PasswordRecovery = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const emailRef = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Please Write Email for Password Recovery!";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Perform any necessary action before redirection (e.g., sending code)
      setIsLoading(true);
      setEnabled(true);
      AuthServices.forgetPassword(formData)
        .then((response) => {
          if (response.message == "User Found") {
            window.location.href = "/forgotverification/" + formData.email;
          }
        })
        .catch((e) => {
          toast.error("Email does not exist");
          setIsLoading(false);
          setEnabled(false);
        })
        .then(() => {
          setIsLoading(false);
          setEnabled(false);
        });
      // Redirect to another page (e.g., home page '/')
      // window.location.href = '/forgotverification'; // Change the URL to the desired redirection
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
                <p>Don't worry We have got Your back</p>
                <div className="emailfields">
                  <form onSubmit={handleSubmit}>
                    <div className="myemailfields">
                      <input
                        ref={emailRef}
                        id="email-input"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address or phone no"
                      />
                    </div>
                    {errors.email && <p className="error">{errors.email}</p>}
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

export default PasswordRecovery;
