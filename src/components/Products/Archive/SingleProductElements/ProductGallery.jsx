import React, { useState, useEffect } from "react";
import ProductServices from "../../../../services/API/ProductServices"; //~/services/API/ProductServices
import { BASE_URL } from "../../../../services/Constant";
import blank from "../../../../assets/Images/Productcard/blank.jpg";

const ProductGallery = () => {
  // // Sample product data
  // const products = [
  //   { id: 1, name: 'Product 1', image: ProductImage1 },
  //   { id: 2, name: 'Product 2', image: ProductImage2 },
  //   { id: 3, name: 'Product 3', image: ProductImage3 },
  //   { id: 4, name: 'Product 4', image: ProductImage4 },
  //   // Add more products as needed
  // ];

  // const [selectedImage, setSelectedImage] = useState(products[0].image);

  // const handleThumbnailClick = (image) => {
  //   setSelectedImage(image);
  // };
  const [product, setProductData] = useState([]);
  // const [selectedImage, setSelectedImage] = useState(product[0].image);
  const [selectedImage, setSelectedImage] = useState("");

  const { pathname } = window.location;
  const id = pathname.split("/").pop();

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };
  const getProduct = () => {
    ProductServices.get(id).then((response) => {
      setProductData(response.media);
      setSelectedImage(response.media[0].name);
      // if(product.length > 0){
        // setSelectedImage(product[0].name);
      // }
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="product-gallery">
    <div className="thumbnails">
      {product.length > 0 ? (
        <>
          {product.map((image) => {
            return (
              <>
                <img
                  key={image.id}
                  src={`${BASE_URL}/image/product/${image.name}`}
                  alt={image.name}
                  onClick={() => handleThumbnailClick(image.name)}
                  className={selectedImage === image.name ? "active" : ""}
                />
              </>
            );
          })}
        </>
      ) : (
          <>
            <img
              src={blank}
              alt='blank'
              width="300"
              height="500"
            />
          </>

      )}
    </div>
    {selectedImage ? (
      <>
        <div className="gallery-images">
          <img
            src={`${BASE_URL}/image/product/${selectedImage}`}
            alt="Selected Product"
          />
        </div>
      </>
    ):('')}
  </div>

  );
};

export default ProductGallery;
