import React, { useState, useEffect } from 'react';
import Checkpay from '../../../assets/Images/check-pay.png';
import SellingDetailsDashBoard from './SellingDetailsDashBoard';
import SellerServices from "../../../services/API/SellerServices"; //~/services/API/SellerServices
import UserServices from "../../../services/API/UserServices"; //~/services/API/AuthService
import { toast } from "react-toastify";
import { setUserDetails, isLoggedin, getUserDetails } from "../../../services/Auth"; // ~/services/Auth



const EditBankDetails = () => {
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
      console.log('Form submitted:', { selectedBank, accountName, accountNumber, bicSwift });
      const formData ={
        'bank_id' : selectedBank,
        'accountName' : accountName,
        'accountNumber' : accountNumber,
        'bic_swift' : bicSwift,
      }
      SellerServices.updateBank(formData)
      .then((response) => {
        UserServices.detail()
        .then((responce) => {
          toast.success(response);
          setShowSuccessPopup(true);
          setUserDetails(responce);
          setShowNewComponent(true);
        })
        .catch((e) => {
          toast.error(e.message);
        });
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
    // Show success popup
    // setShowSuccessPopup(true);
  };
  // {
  //   event.preventDefault();
  //   // Here you can perform actions like submitting data to a server or processing the bank details
  //   console.log('Form submitted:', { selectedBank, accountName, accountNumber, bicSwift });
  //   // You can add further logic here for form validation, API calls, etc.

  // };
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
  SellerServices.getBankDetails().then((response) => {
    setAccountName(response.accountName);
    setSelectedBank(response.bank_id);
    setAccountNumber(response.accountNumber);
    setBicSwift(response.bic_swift);
  }).catch((e) => {
      toast.error(e.message);
    });
  //setShowNewComponent(true);
}, []);
  return (
    <>
      
        <section id='letsconnectbank'>
          <h3>Edit Bank Account details</h3>
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
              {/* <option value="Bank A">Bank A</option>
              <option value="Bank B">Bank B</option> */}
              {/* Add more options based on your bank list */}
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
            {/* <button className='savee' type="submit">Save</button> */}
            <button type="submit" className='savee' disabled={enabled}>
              {isLoading ? "loading.." : "Update"}
            </button>
          </form>
        </section>
     
      
    </>
  );
};

export default EditBankDetails;
