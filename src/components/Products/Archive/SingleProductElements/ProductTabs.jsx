import React, { useState, useEffect } from "react";
import ProductServices from "../../../../services/API/ProductServices"; //~/services/API/ProductServices

import ShippingPolicyData from './ShippingPolicyData';
const ProductTabs = () => {
  const [selectedTab, setSelectedTab] = useState('aboutProduct');
  const [productData, setProductData] = useState([]);
  const { pathname } = window.location;
  const id = pathname.split("/").pop();

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  const getProduct = () => {
    ProductServices.get(id).then((response) => {
      setProductData(response);
    });
  };  
  useEffect(() => {
    getProduct();
  }, []);
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
                        <td>{productData.name}</td>
                    </tr>
                    {productData.brand ? (<>
                        <tr>
                          <th>Brand</th>
                          <td>{productData.brand}</td>
                      </tr>
                    </>):(<></>)}
                    {productData.model ? (
                      <>
                        <tr>
                            <th>Model</th>
                            <td>{productData.model}</td>
                        </tr>
                      </>
                    ):('')}
                    <tr>
                        <th>Condition</th>
                        <td>{productData.condition}</td>
                    </tr>
                    <tr>
                        <th>Deliver Company</th>
                        <td>{productData.delivery_company}</td>
                    </tr>
                    <tr>
                        <th>Shipping Price</th>
                        <td>$ {productData.shipping_price}</td>
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
