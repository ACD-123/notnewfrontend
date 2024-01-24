import React, { useState } from "react";
import Profile from "../../../assets/Images/PersonalInfo/profile.png";
const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    email: "",
    site: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, for example, submit it to an API
    console.log(formData);
    // Reset form fields
    setFormData({
      phone: "",
      address: "",
      email: "",
      site: "",
    });
  };

  return (
    <>
      <section id="prsnlinfo">
        <div className="row">
          <div className="col-lg-3">
            <dv className="profile-img">
              <img style={{ width: "100%" }} src={Profile} />
            </dv>
          </div>
          <div className="col-lg-9">
            <div className="peronsinfo-form">
              <h2>Micheal Kroll </h2>
              <h6>
                <a href="mailto:Customer@mail.com">customer@mail.com</a>
              </h6>
              <h5>Profile Information</h5>
              <div className="prnform">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Phone:"
                  />
                  <br />

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address:"
                    required
                  />

                  <br />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email:"
                    required
                  />

                  <br />

                  <input
                    type="text"
                    name="site"
                    value={formData.site}
                    onChange={handleChange}
                    placeholder="Site:"
                    required
                  />

                  <br />
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PersonalInfo;
