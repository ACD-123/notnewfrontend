import React, { useState } from 'react';
import ProductCard from '../../Elements/ProductCard';
import Chat from '../../CustomerDashboard/Chat';

const ProductManagement = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [showPopup, setShowPopup] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected option:", selectedOption);
    setSubmitted(true);
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'active':
        return (
          <ProductCard />
        );
      case 'inactive':
        return (
          <ProductCard />
        );
      case 'scheduled':
        return (
          <ProductCard />
        );
      default:
        return null;
    }
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <section id='product-management'>
        <div className='row align-items-center'>
          <div className='col-lg-7'>
            <h3>Start Listing your Product</h3>
            <p>
              This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32
            </p>
          </div>
          <div className='col-lg-5'>
            <button className='listing' onClick={openPopup}>Create a new product listing</button>
            {showPopup && (
              <div className="prd-mng-popup">
                <div className="prd-mng-popup-inner">
                  <span style={{cursor: "pointer"}} className="close" onClick={closePopup}>&times;</span>
                  {/* Your popup content goes here */}
                  <div className='seller-productmngement-popup'>
         <h1>Select condition of your item</h1>
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
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='row'>
          <ul className='active-inactive-schedule'>
            <li className={activeTab === 'active' ? 'active' : ''} onClick={() => handleTabClick('active')}>Active products</li>
            <li className={activeTab === 'inactive' ? 'active' : ''} onClick={() => handleTabClick('inactive')}>Inactive products</li>
            <li className={activeTab === 'scheduled' ? 'active' : ''} onClick={() => handleTabClick('scheduled')}>Scheduled</li>
          </ul>
        </div>
        <div className='row'>
          {renderTabContent()}
        </div>
      </section>
    </>
  );
};

export default ProductManagement;
