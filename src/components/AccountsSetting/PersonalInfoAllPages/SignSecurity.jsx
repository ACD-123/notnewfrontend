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
  const [secans, setSecAns] = useState("");
  const [errors, setErrors] = useState({});
  
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSecretQuestion=(e)=>{
    setSecQuest(e.target.value)
  };
  const handleSecretAnswer=(e)=>{
    setSecAns(e.target.value)
  };
  const handleSaveSecret = (e) =>{
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
      let data={
        "secret_question" : secquest,
        "secret_answer" : secans
    }
      UserServices.secretQuestion(data)
      .then((response) => {
          if(response.status){
            toast.success(response.message);
            setSecQuest('')
            setSecAns('')
            setSecretQuestion(false)
          }else{
            setSecretQuestion(true)
          }
        }).catch((e) => {
          toast.error(e);
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
      let data={
        "password" : newPassword,
        "confirm_password" : confirmPassword
    }
      UserServices.changePassword(data)
      .then((response) => {
        if(response.status){
          toast.success(response.message);
          setShowPasswordFields(false);
          setNewPassword('');
          setConfirmPassword('');
        }else{
          setShowPasswordFields(true)
        }
      }).catch((e) => {
        toast.error(e);
      });
    }
  };
  const secretQuest = [
    { id: "what is your Pet Name", name: "what is your Pet Name" },
    { id: "what is your Favoirite Color", name: "what is your Favoirite Color" },
    // Add more states as needed
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
  const handleTwoStep = (e) =>{
    setStepVerification(!stepVerification)
    let data ={
      "twosteps" : stepVerification
    }
    UserServices.twoSteps(data)
    .then((response) => {
      if(response.status){
        toast.success(response.message);
      }
    }).catch((e) => {
      toast.error(e);
    });
  }
  const handleThirdParty = () =>{
    setThirdPartyAccess(!thirdPartyAccess) 
    let data ={
      "thirdparty" : thirdPartyAccess
    }
    UserServices.thirdParty(data)
    .then((response) => {
      if(response.status){
        toast.success(response.message);
      }
    }).catch((e) => {
      toast.error(e);
    });
  }
  const hanleFbAccount=()=>{
    setFacebookAccount(!facebookAccount)
    let data ={
      "fbaccount" : facebookAccount
    }
    UserServices.fbAccount(data)
    .then((response) => {
      if(response.status){
        toast.success(response.message);
      }
    }).catch((e) => {
      toast.error(e);
    });

  }
  const secretQuestion=(e)=>{
    setSecretQuestion(true);
  }

  const togglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
  };
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user_details'));
    setStepVerification(user.twosteps)   
    setThirdPartyAccess(user.thirdparty)   
    setFacebookAccount(user.fbaccount)   
    setSecQuest(user.secret_question)   
    setSecAns(user.secret_answer)   
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
                      {secretQuest.map((question) => {
                        return(
                          <>
                            <option value={question.id}>{question.name}</option>
                          </>
                        )
                      })}
                      </>
                    ):('')}
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
              </div></>):('')}
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
                  onChange={() => handleThirdParty() }
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
