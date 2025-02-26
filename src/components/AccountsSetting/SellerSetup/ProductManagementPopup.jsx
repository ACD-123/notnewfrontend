import React, { useState } from 'react';
import Chat from '../../CustomerDashboard/Chat';
import { setCondition } from "../services/Auth"; // ~/services/Auth
const ProductManagementPopup = () => {
    const [selectedOption, setSelectedOption] = useState('BrandNew');
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCondition(selectedOption);
  };

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 'BrandNew':
        return <Chat />;
      case 'Used':
        return <Chat />;
      case 'Refurbished':
        return <Chat />;
      default:
        return null;
    }
  };

  
  return (

    <div className='seller-productmngement-popup'>
         <h1>Select condition of your itemee</h1>
                  <p>This book is a treatise on the theory of ethics, very popular during the Renaissance. </p>
                  <form onSubmit={handleSubmit}>
      <label>
        <input
          type="radio"
          value="BrandNew"
          checked={selectedOption === 'BrandNew'}
          onChange={handleOptionChange}
        />
        Brand New
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="Used"
          checked={selectedOption === 'Used'}
          onChange={handleOptionChange}
        />
        Used
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="Refurbished"
          checked={selectedOption === 'Refurbished'}
          onChange={handleOptionChange}
        />
        Refurbished
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="Vintage"
          checked={selectedOption === 'Vintage'}
          onChange={handleOptionChange}
        />
        Vintage
      </label>
      <br />
        <button type="submit">Submit</button>
        </form>
        {submitted && renderSelectedComponent()}
    </div>
  )
}

export default ProductManagementPopup