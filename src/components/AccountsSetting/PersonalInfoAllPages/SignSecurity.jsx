import React, { useState, useEffect } from 'react';
import Downarrow from '../../../assets/Images/down.png';
import UserServices from "../../../services/API/UserServices"; //~/services/API/UserServices
import { toast } from "react-toastify";

const SignSecurity = () => {
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stepVerification, setStepVerification] = useState(false);
  const [thirdPartyAccess, setThirdPartyAccess] = useState(false);
  const [facebookAccount, setFacebookAccount] = useState(false);
  const [secretquestion, setSecretQuestion] = useState(false);
  const [secquest, setSecQuest] = useState("");
  const [secquestion, setSecQuestion] = useState("");
  const [secans, setSecAns] = useState("");
  const [errors, setErrors] = useState({});

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSecretQuestion = (e) => {
    setSecQuest(e.target.value)
  };

  const handleSecretAnswer = (e) => {
    setSecAns(e.target.value)
  };

  const handleSaveSecret = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!secquest) {
      newErrors.secquestion = "Secret Question is Required!";
    }
    if (!secans) {
      newErrors.secanswer = "Secret Answer is Required!";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      let data = {
        "secret_question": secquest,
        "secret_answer": secans
      }
      UserServices.secretQuestion(data)
        .then((response) => {
          if (response.status) {
            toast.success(response.message);
            setSecQuest('')
            setSecAns('')
            setSecretQuestion(false)
            getUserInfo()
          } else {
            setSecretQuestion(true)
          }
        }).catch((error) => {
          toast.error(error?.response?.data?.message)
        });
    }
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!newPassword) {
      newErrors.password = "Password is Required!";
    }
    if (!confirmPassword) {
      newErrors.confirmpassword = "Confirm Password is Required!";
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmpassword = "Password Must be Matched!";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      let data = {
        "password": newPassword,
        "confirm_password": confirmPassword
      }
      UserServices.changePassword(data)
        .then((response) => {
          if (response.status) {
            toast.success(response.message);
            setShowPasswordFields(false);
            setNewPassword('');
            setConfirmPassword('');
          } else {
            setShowPasswordFields(true)
          }
        }).catch((error) => {
          toast.error(error?.response?.data?.message)
        });
    }
  };

  const secretQuest = [
    { id: "what is your Pet Name", name: "what is your Pet Name" },
    { id: "what is your Favoirite Color", name: "what is your Favoirite Color" },
  ];

  const handleCancel = () => {
    setShowPasswordFields(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSecretCancel = () => {
    setSecQuest('')
    setSecAns('')
    setSecretQuestion(false)
  };

  const handleTwoStep = (e) => {
    setStepVerification(!stepVerification)
    let data = {
      "twosteps": stepVerification
    }
    UserServices.twoSteps(data)
      .then((response) => {
        if (response.status) {
          toast.success(response.message);
        }
      }).catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  }

  const handleThirdParty = () => {
    setThirdPartyAccess(!thirdPartyAccess)
    let data = {
      "thirdparty": thirdPartyAccess
    }
    UserServices.thirdParty(data)
      .then((response) => {
        if (response.status) {
          toast.success(response.message);
        }
      }).catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  }

  const hanleFbAccount = () => {
    setFacebookAccount(!facebookAccount)
    let data = {
      "fbaccount": facebookAccount
    }
    UserServices.fbAccount(data)
      .then((response) => {
        if (response.status) {
          toast.success(response.message);
        }
      }).catch((error) => {
        toast.error(error?.response?.data?.message)
      });

  }

  const secretQuestion = (e) => {
    setSecretQuestion(true);
  }

  const togglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  const getUserInfo = () => {
    UserServices.self()
      .then((res) => {
        setStepVerification(res.twosteps)
        setThirdPartyAccess(res.thirdparty)
        setFacebookAccount(res.fbaccount)
        setSecQuestion(res.secret_question)
        setSecAns(res.secret_answer)
      }).catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  }

  useEffect(() => {
    getUserInfo()
  }, []);

  return (
    <>
      <h3>Sign & Security</h3>
      <section id='sign-security'>
        <div className='row'>
          <div className='chngepaswrd'>
            <h6 onClick={togglePasswordFields}>Change Password <img src={Downarrow} /></h6>
            {showPasswordFields && (
              <form onSubmit={handleSave}>
                <p>Create a new Password or modify an existing one</p>
                <div>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    placeholder='New Password'
                  />
                </div>
                {errors.password && (
                  <p className="error">{errors.password}</p>
                )}
                <div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder='Confirm password'
                  />
                </div>
                {errors.confirmpassword && (
                  <p className="error">{errors.confirmpassword}</p>
                )}
                <div className='signscrtybuttn'>
                  <button className='cancel-sign' type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button type="submit">
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='securityquest'>
            <h6>Secret questions</h6>
            <button onClick={secretQuestion}>Set</button>
          </div>
          {secretquestion ? (<>
            <div className='chngepaswrd'>
              <form onSubmit={handleSaveSecret}>
                <p>Set Secret Question for your Profile!</p>
                <div>
                  <select onChange={handleSecretQuestion}>
                    <option value="">Select Secret Question</option>
                    {secretQuest ? (
                      <>
                        {secretQuest.map((question, index) => {
                          return (
                            <>
                              {(() => {
                                if (question.id === secquestion) {
                                  return (
                                    <option selected="true" value={question.id} key={index}>{question.name}</option>
                                  )
                                } else {
                                  return (
                                    <option value={question.id} key={index}>{question.name}</option>
                                  )
                                }
                              })()}

                            </>
                          )
                        })}
                      </>
                    ) : ('')}
                  </select>
                </div>
                {errors.password && (
                  <p className="error">{errors.password}</p>
                )}
                <div>
                  <input
                    type="text"
                    value={secans}
                    onChange={handleSecretAnswer}
                    placeholder='Secret Answer'
                  />
                </div>
                {errors.confirmpassword && (
                  <p className="error">{errors.confirmpassword}</p>
                )}
                <div className='signscrtybuttn'>
                  <button className='cancel-sign' type="button" onClick={handleSecretCancel}>
                    Cancel
                  </button>
                  <button type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div></>) : ('')}
        </div>
        <hr />
        <div className='row'>
          <div className='stepverification'>
            <div>
              <h6>2 step verification</h6>
            </div>
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={stepVerification}
                  onChange={(e) => handleTwoStep(e)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='stepverification'>
            <div>
              <h6>Third-party app access</h6>
            </div>
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={thirdPartyAccess}
                  onChange={() => handleThirdParty()}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='stepverification'>
            <div>
              <h6>Facebook account</h6>
            </div>
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={facebookAccount}
                  onChange={() => hanleFbAccount()}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        <hr />
      </section>
    </>
  );
};

export default SignSecurity;
