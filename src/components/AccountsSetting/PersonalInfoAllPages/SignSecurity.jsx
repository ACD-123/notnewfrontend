import React, { useState } from 'react';
import Downarrow from '../../../assets/Images/down.png';

const SignSecurity = () => {
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stepVerification, setStepVerification] = useState(false);
  const [thirdPartyAccess, setThirdPartyAccess] = useState(false);
  const [facebookAccount, setFacebookAccount] = useState(false);

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSave = () => {
    if (newPassword === confirmPassword) {
      console.log('New password:', newPassword);
      console.log('Confirmed password:', confirmPassword);
    } else {
      console.error("Passwords don't match");
    }
    setShowPasswordFields(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleCancel = () => {
    setShowPasswordFields(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  const togglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  return (
    <>
      <h3>Sign & Security</h3>
      <section id='sign-security'>
        <div className='row'>
          <div className='chngepaswrd'>
            <h6 onClick={togglePasswordFields}>Change Password <img src={Downarrow} /></h6>
            {showPasswordFields && (
              <form>
                <p>Create a new Password or modify an existing one</p>
                <div>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    placeholder='New Password'
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder='Confirm password'
                  />
                </div>
                <div className='signscrtybuttn'>
                  <button className='cancel-sign' type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button type="button" onClick={handleSave}>
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
            <button>Set</button>
          </div>
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
                  onChange={() => setStepVerification(!stepVerification)}
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
                  onChange={() => setThirdPartyAccess(!thirdPartyAccess)}
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
                  onChange={() => setFacebookAccount(!facebookAccount)}
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
