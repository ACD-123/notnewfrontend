import React, { useState } from 'react';
import ProductCard from '../../Elements/ProductCard';
import ListingForm from './ListingForm';
import InActiveProducts from '../../Elements/InActiveProducts';
const ProductManagement = ({ submitted, setSubmitted , setProductId , productId }) => {
  const [activeTab, setActiveTab] = useState('active');


  return (
    <>
      {submitted ?
        <ListingForm setSubmitted={setSubmitted} productId={productId} setProductId={setProductId}/>
        :
        (
          <section id='product-management' className='seller-product-managment'>
            <div className="s-p-m-one">
              <div className="s-p-m-left">
                <h3 className='title'>Start Listing your Product</h3>
                <p className='desc'>This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32</p>
              </div>
              <div className="s-p-m-right">
                <button className='listing' onClick={() => { setSubmitted(true) }}>Create a new product listing</button>
              </div>
            </div>
            <div className='row'>
              <div className="col-lg-12">
              <ul className='active-inactive-schedule'>
                <li className={activeTab === 'active' ? 'active' : ''} onClick={() => setActiveTab('active')}>Active products</li>
                <li className={activeTab === 'inactive' ? 'active' : ''} onClick={() => setActiveTab('inactive')}>Inactive products</li>
              </ul>
              </div>
            </div>
            <div className='row'>
              {activeTab === 'active' && !submitted && <ProductCard setSubmitted={setSubmitted} setProductId={setProductId} />}
              {activeTab === 'inactive' && !submitted && <InActiveProducts setSubmitted={setSubmitted} setProductId={setProductId} />}
            </div>
          </section>
        )}
    </>
  );
};

export default ProductManagement;
