import React, { useState } from 'react';



const EditBankDetails = () => {
  // State variables to hold form data and control component rendering
  const [selectedBank, setSelectedBank] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bicSwift, setBicSwift] = useState('');


  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can perform actions like submitting data to a server or processing the bank details
    console.log('Form submitted:', { selectedBank, accountName, accountNumber, bicSwift });
    // You can add further logic here for form validation, API calls, etc.

  };



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
            <button className='savee' type="submit">Save</button>
          </form>
        </section>
     
      
    </>
  );
};

export default EditBankDetails;
