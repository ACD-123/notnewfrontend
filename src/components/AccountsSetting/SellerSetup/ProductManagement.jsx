import React, { useState } from 'react';
import ProductCard from '../../Elements/ProductCard';
import Chat from '../../CustomerDashboard/Chat';
import Addresses from '../PersonalInfoAllPages/Addresses'
import ListingForm from './ListingForm';
import SellingDashboard from './SellingDashboard';

const ProductManagement = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [productguid, setProductGuid] = useState("");
  let loggedIn = localStorage.getItem('user_details');
  let loggedUser = JSON.parse(loggedIn)
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setSubmitted(false); // Reset submitted state when a new option is selected
    setActiveTab('active'); // Reset activeTab to default when a new option is selected
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Selected option:", selectedOption);
    localStorage.setItem('product_condition', selectedOption);
    setSubmitted(true);
    setShowPopup(false);
  };
  const  handleCallback = (childData) => {
    setSelectedOption(childData)
    setSubmitted(false);
  }
  const  handleParentCallback = (childData, guid) => {
    setSelectedOption(childData);
    setSubmitted(true); 
    setActiveTab('active');
    setProductGuid(guid);
  }
  
  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 'Edit':
        return submitted ? <ListingForm edit="edit" guid={productguid} parentCallback={handleCallback} /> : null;
      case 'BrandNew':
        return submitted ? <ListingForm parentCallback={handleCallback} /> : null;
      case 'Used':
        return submitted ? <ListingForm parentCallback={handleCallback} /> : null;
      case 'Refurbished':
        return submitted ? <ListingForm parentCallback={handleCallback} /> : null;
      case 'Vintage':
        return submitted ? <ListingForm parentCallback={handleCallback} /> : null;
      default:
        return null;
    }
  };

  const openPopup = () => {
    setShowPopup(true);
    setSubmitted(false); // Reset submitted state when opening the popup
  };

  return (
    <>
      {renderSelectedComponent() || ( // Render component or the product-management section
      <>
      {loggedUser.isTrustedSeller ? (<>
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
                    <span style={{ cursor: "pointer" }} className="close" onClick={() => setShowPopup(false)}>&times;</span>
                    <div className='seller-productmngement-popup'>
                      <h1>Select condition of your item</h1>
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
                    </div>
                  </div>
                </div>
              )}
              {submitted && renderSelectedComponent()}
            </div>
          </div>
          <div className='row'>
            <ul className='active-inactive-schedule'>
              <li className={activeTab === 'active' ? 'active' : ''} onClick={() => setActiveTab('active')}>Active products</li>
              <li className={activeTab === 'inactive' ? 'active' : ''} onClick={() => setActiveTab('inactive')}>Inactive products</li>
              <li className={activeTab === 'scheduled' ? 'active' : ''} onClick={() => setActiveTab('scheduled')}>Scheduled</li>
            </ul>
          </div>
          <div className='row'>
            {/* Render different content based on activeTab */}
            {activeTab === 'active' && !submitted && <ProductCard edit="edit" parentCallback={handleParentCallback} status='active' />}
            {activeTab === 'inactive' && !submitted && <ProductCard edit="edit" parentCallback={handleParentCallback} status='inactive' />}
            {activeTab === 'scheduled' && !submitted && <ProductCard edit="edit" parentCallback={handleParentCallback} status='scheduled' />}
          </div>
        </section>
      </>):(<>
      <SellingDashboard/></>)}
        
        </>
      )}
    </>
  );
};

export default ProductManagement;
