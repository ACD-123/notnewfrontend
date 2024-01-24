import React from 'react';
import ProductGallery from './ProductGallery'
import ProductImage1 from '../../../../assets/Images/Singleproduct/product.png'; // Renamed the variable

const ProductDetails = () => {
  const productImages = [
    ProductImage1, // Use the variable holding the image URL instead of a string
    ProductImage1,
    ProductImage1,
    // Add more image URLs as needed
  ];

  return (
    <div className="product-details">
      <h2>Product Name</h2>
      {/* Other product details */}
      <Gallery images={productImages} /> {/* Use the Gallery component */}
      {/* Other product information */}
    </div>
  );
};

export default ProductDetails;
