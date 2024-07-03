import React, { useState } from 'react';
import ProductCard from '../../Elements/ProductCard';
import Chat from '../../CustomerDashboard/Chat';
import Addresses from '../PersonalInfoAllPages/Addresses'
import ListingForm from './ListingForm';
import InActiveProducts from '../../Elements/InActiveProducts';
const ProductManagement = ({submitted , setSubmitted}) => {
  const [selectedOption, setSelectedOption] = useState('');
  // const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState('active');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setSubmitted(false); // Reset submitted state when a new option is selected
    setActiveTab('active'); // Reset activeTab to default when a new option is selected
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected option:", selectedOption);
    setSubmitted(true);
    setShowPopup(false);
  };

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 'BrandNew':
        return submitted ? <ListingForm /> : null;
      case 'Used':
        return submitted ? <ListingForm /> : null;
      case 'Refurbished':
        return submitted ? <ListingForm /> : null;
      case 'Vintage':
        return submitted ? <ListingForm /> : null;
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
      {submitted ?
      <ListingForm setSubmitted={setSubmitted}/>
      :
      ( // Render component or the product-management section
        <section id='product-management' className='seller-product-managment'>
          <div className="s-p-m-one">
            <div className="s-p-m-left">
              <h3 className='title'>Start Listing your Product</h3>
              <p className='desc'>This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32</p>
            </div>
            <div className="s-p-m-right">
              <button className='listing' onClick={() =>{setSubmitted(true)}}>Create a new product listing</button>
            </div>
          </div>
          <div className='row'>
            <ul className='active-inactive-schedule'>
              <li className={activeTab === 'active' ? 'active' : ''} onClick={() => setActiveTab('active')}>Active products</li>
              <li className={activeTab === 'inactive' ? 'active' : ''} onClick={() => setActiveTab('inactive')}>Inactive products</li>
            </ul>
          </div>
          <div className='row'>
            {/* Render different content based on activeTab */}
            {activeTab === 'active' && !submitted && <ProductCard />}
            {activeTab === 'inactive' && !submitted && <InActiveProducts />}
            {/* {activeTab === 'scheduled' && !submitted && <ProductCard />} */}
          </div>
        </section>
      )}
    </>
  );
};

export default ProductManagement;
