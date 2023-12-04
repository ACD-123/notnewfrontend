import React, { useState } from 'react';
import ProductImage1 from '../../../../assets/Images/Singleproduct/product.png';
import ProductImage2 from '../../../../assets/Images/Singleproduct/Product1.png';
import ProductImage3 from '../../../../assets/Images/Singleproduct/Product2.png';
import ProductImage4 from '../../../../assets/Images/Singleproduct/Product3.png';

const ProductGallery = () => {
  // Sample product data
  const products = [
    { id: 1, name: 'Product 1', image: ProductImage1 },
    { id: 2, name: 'Product 2', image: ProductImage2 },
    { id: 3, name: 'Product 3', image: ProductImage3 },
    { id: 4, name: 'Product 4', image: ProductImage4 },
    // Add more products as needed
  ];

  const [selectedImage, setSelectedImage] = useState(products[0].image);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="product-gallery">
        <div className="thumbnails">
        {products.map((product) => (
          <img
            key={product.id}
            src={product.image}
            alt={product.name}
            onClick={() => handleThumbnailClick(product.image)}
            className={selectedImage === product.image ? 'active' : ''}
          />
        ))}
      </div>
      <div className="gallery-images">
        <img src={selectedImage} alt="Selected Product" />
      </div>
      
    </div>
  );
};

export default ProductGallery;
