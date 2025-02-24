import React from 'react';
import ProductImage1 from '../../../../assets/Images/Singleproduct/product.png'; // Renamed the variable

const ProductDetails = () => {
  const productImages = [
    ProductImage1,
    ProductImage1,
    ProductImage1,
  ];

  return (
    <div className="product-details">
      <h2>Product Name</h2>
      <Gallery images={productImages} />
    </div>
  );
};

export default ProductDetails;
