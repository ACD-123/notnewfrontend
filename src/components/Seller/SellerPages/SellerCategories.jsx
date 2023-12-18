import React from 'react';
import Cat1 from '../../../assets/Images/SellerShop/cat1.png';
import Cat2 from '../../../assets/Images/SellerShop/cat2.png';
import Cat3 from '../../../assets/Images/SellerShop/cat3.png';
import Cat4 from '../../../assets/Images/SellerShop/cat4.png';
import ProductCard from '../../Elements/ProductCard';
import SellerProductListing from '../../Elements/SellerElements/SellerProductListing';



const SellerCategories = () => {
  return (
    <>
    <div className='caategory'>
      <h2>Top Categories</h2>
      <div className="row">
              <div className="col-md-3">
                <img src={Cat1} className="d-block w-100" alt="..." />
                <h4>Electronics</h4>
              </div>
              <div className="col-md-3">
                <img src={Cat3} className="d-block w-100" alt="..." />
                <h4>Boxing Accessories</h4>
              </div>
              <div className="col-md-3">
                <img src={Cat4} className="d-block w-100" alt="..." />
                <h4>Men Clothing</h4>
              </div>
              <div className="col-md-3">
                <img src={Cat2} className="d-block w-100" alt="..." />
                <h4>Casual Shoes</h4>
              </div>
            </div>
            </div>
            <div className='product-listing-seller'>
                <SellerProductListing />
            </div>
    </>
  );
};

export default SellerCategories;
