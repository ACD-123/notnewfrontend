import React, { useState } from 'react';
import ShippingPolicyData from './ShippingPolicyData';
const ProductTabs = () => {
  const [selectedTab, setSelectedTab] = useState('aboutProduct');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="product-details">
      <div className="tabs">
        <button
          className={selectedTab === 'aboutProduct' ? 'active' : ''}
          onClick={() => handleTabClick('aboutProduct')}
        >
          About the Product
        </button>
        <button
          className={selectedTab === 'shippingReturns' ? 'active' : ''}
          onClick={() => handleTabClick('shippingReturns')}
        >
          Shipping & Returns
        </button>
      </div>
      <div className="tab-content">
        {selectedTab === 'aboutProduct' && (
          <div className="about-product">
            {/* Content for About the Product tab */}
            <h3>Product Information</h3>
            <p>Description, specifications, etc.</p>
            <table width="100%">
                <tbody>
                    <tr>
                        <th>Product Name</th>
                        <td>Sketch Stripe Yellow Joggs</td>
                    </tr>
                    <tr>
                        <th>Brand</th>
                        <td>Nike, Nike Z</td>
                    </tr>
                    <tr>
                        <th>Product Name</th>
                        <td>Sketch Stripe Yellow Joggs</td>
                    </tr>
                    <tr>
                        <th>Brand</th>
                        <td>No</td>
                    </tr>
                    <tr>
                        <th>Product Name</th>
                        <td>Sketch Stripe Yellow Joggs</td>
                    </tr>
                    <tr>
                        <th>Brand</th>
                        <td>Yes</td>
                    </tr>
                    <tr>
                        <th>Product Name</th>
                        <td>Sketch Stripe Yellow Joggs</td>
                    </tr>
                </tbody>
            </table>
          </div>
        )}
        {selectedTab === 'shippingReturns' && (
          <div className="shipping-returns">
            <ShippingPolicyData />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
