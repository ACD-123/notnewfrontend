import React, { useState, useEffect } from 'react';
import Checkpay from '../../../assets/Images/check-pay.png';
import SellingDetailsDashBoard from './SellingDetailsDashBoard';
import SellerServices from "../../../services/API/SellerServices"; //~/services/API/SellerServices
import UserServices from "../../../services/API/UserServices"; //~/services/API/AuthService
import { toast } from "react-toastify";
import { setUserDetails, isLoggedin, getUserDetails, setUserId } from "../../../services/Auth"; // ~/services/Auth

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
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);

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
      setIsLoading(true);
      setEnabled(true);
      const formData ={
        'bank_id' : selectedBank,
        'accountName' : accountName,
        'accountNumber' : accountNumber,
        'bic_swift' : bicSwift,
      }
      SellerServices.setBank(formData)
      .then((response) => {
        UserServices.detail()
        .then((responce) => {
          toast.success(responce);
          setShowSuccessPopup(true);
          setUserDetails(responce);
          setUserId(responce?.id)
          setShowNewComponent(true);
          window.location.href="/my-seller-account?tab=dashboard"
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message)
        });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false);
        setEnabled(false);
      })
      .then(() => {
        setIsLoading(false);
        setEnabled(false);
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
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };
  useEffect(() => {
    getBanks();
    //setShowNewComponent(true);
  }, []);
  return (
    <>
      {!showNewComponent ? (
        <section id="seller-account-creating" className="seller-not-created">
          <h3>Lets connect your bank</h3>
          <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              placeholder="Select Your Bank"
            >
              <option value="">Select Your Bank:</option>
              {banks?.length >0 ?(
                <>
                  {banks?.map((bank , index) => {
                    return (
                      <option key={index} value={bank.id}>
                        {bank.fullname}
                      </option>
                    );
                  })}
                </>
              ):('')}
            </select>
            {errors.Bank && <p className="error">{errors.Bank}</p>}
          </div>
          <div className='mb-3'>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Account Name"
            />
            {errors.accountName && <p className="error">{errors.accountName}</p>}
          </div>
          <div className='mb-3'>
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
          <button type="submit" disabled={enabled}>
            {isLoading ? "loading.." : "Finish Setup"}
          </button>
          </form>
        </section>
       ) : (
         <SellingDetailsDashBoard /> // Render the new component when showNewComponent is true
      )}

      {/* Success Popup */}
      {showSuccessPopup && !showNewComponent && (
      // {showSuccessPopup && (
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
