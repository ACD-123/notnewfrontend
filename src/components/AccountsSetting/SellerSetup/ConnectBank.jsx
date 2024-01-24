import React, { useState, useEffect } from 'react';
import Checkpay from '../../../assets/Images/check-pay.png';
import SellingDetailsDashBoard from './SellingDetailsDashBoard';
import SellerServices from "../../../services/API/SellerServices"; //~/services/API/SellerServices
import { toast } from "react-toastify";

const ConnectBank = () => {
  // State variables to hold form data and control component rendering
  const [selectedBank, setSelectedBank] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bicSwift, setBicSwift] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showNewComponent, setShowNewComponent] = useState(false); // State to render new component
  const [banks, setBanks] = useState({}); // State to render new component
  const [errors, setErrors] = useState({});
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    if (!selectedBank) {
      newErrors.Bank = "Bank is required";
    }
    if (!accountName) {
      newErrors.accountName = "Account Name is required";
    }
    if (!accountNumber) {
      newErrors.accountNumber = "Account Number is required";
    }
    if (!bicSwift) {
      newErrors.bicSwift = "BIC/Swift is required";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', { selectedBank, accountName, accountNumber, bicSwift });
      const formData ={
        'bank_id' : selectedBank,
        'accountName' : accountName,
        'accountNumber' : accountNumber,
        'bic_swift' : bicSwift,
      }
      SellerServices.setBank(formData)
      .then((response) => {
        toast.success(response);
        setShowSuccessPopup(true);
      })
      .catch((e) => {
        toast.error(e.message);
      });
    }
    // Show success popup
    // setShowSuccessPopup(true);
  };

  // Function to handle closing the success popup and show the new component
  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    setShowNewComponent(true); // Show the new component
  };
  const getBanks = () => {
    SellerServices.getBanks()
      .then((response) => {
        setBanks(response);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  useEffect(() => {
    getBanks();
    let loggedInUser = localStorage.getItem("user_details");
    if (loggedInUser) {
      const loggedInUsers = JSON.parse(loggedInUser);
      if(loggedInUsers.isTrustedSeller){
        setShowNewComponent(true);
      }
    }
  }, []);
  return (
    <>
      {!showNewComponent ? (
        <section id='letsconnectbank'>
          <h3>Lets connect your bank</h3>
          <form onSubmit={handleSubmit}>
          <div>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              placeholder="Select Your Bank"
            >
              <option value="">Select Your Bank:</option>
              {banks.length >0 ?(
                <>
                  {banks?.map((bank) => {
                    return (
                      <option key={bank.id} value={bank.id}>
                        {bank.fullname}
                      </option>
                    );
                  })}
                </>
              ):('')}
            </select>
            {errors.Bank && <p className="error">{errors.Bank}</p>}
          </div>
          <div>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Account Name"
            />
            {errors.accountName && <p className="error">{errors.accountName}</p>}
          </div>
          <div>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Account Number"
            />
            {errors.accountNumber && <p className="error">{errors.accountNumber}</p>}
          </div>
          <div>
            <input
              type="text"
              value={bicSwift}
              onChange={(e) => setBicSwift(e.target.value)}
              placeholder="BIC/SWIFT"
            />
            {errors.bicSwift && <p className="error">{errors.bicSwift}</p>}
          </div>
            <button type="submit">Finish Setup</button>
          </form>
        </section>
      ) : (
        <SellingDetailsDashBoard /> // Render the new component when showNewComponent is true
      )}

      {/* Success Popup */}
      {showSuccessPopup && !showNewComponent && (
        <div className="success-popupbank">
          <div className="success-popup-inner">
            <img src={Checkpay} alt="Check Pay" />
            <h3>Shop setup successful</h3>
            <p>We hope you enjoy selling on our platform</p>
            {/* Close button in the success popup */}
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectBank;
