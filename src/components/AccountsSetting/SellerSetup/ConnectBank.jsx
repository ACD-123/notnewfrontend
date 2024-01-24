import React, { useState } from 'react';
import Checkpay from '../../../assets/Images/check-pay.png';
import SellingDetailsDashBoard from './SellingDetailsDashBoard';


const ConnectBank = () => {
  // State variables to hold form data and control component rendering
  const [selectedBank, setSelectedBank] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bicSwift, setBicSwift] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showNewComponent, setShowNewComponent] = useState(false); // State to render new component

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can perform actions like submitting data to a server or processing the bank details
    console.log('Form submitted:', { selectedBank, accountName, accountNumber, bicSwift });
    // You can add further logic here for form validation, API calls, etc.

    // Show success popup
    setShowSuccessPopup(true);
  };

  // Function to handle closing the success popup and show the new component
  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    setShowNewComponent(true); // Show the new component
  };

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
              <option value="Bank A">Bank A</option>
              <option value="Bank B">Bank B</option>
              {/* Add more options based on your bank list */}
            </select>
          </div>
          <div>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Account Name"
            />
          </div>
          <div>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Account Number"
            />
          </div>
          <div>
            <input
              type="text"
              value={bicSwift}
              onChange={(e) => setBicSwift(e.target.value)}
              placeholder="BIC/SWIFT"
            />
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
