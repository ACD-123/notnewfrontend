import React, { useState, useEffect } from "react";
import ProductServices from "../../../../services/API/ProductServices"; //~/services/API/ProductServices
import { BASE_URL } from "../../../../services/Constant";

const ProductGallery = () => {
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
      if(product.length > 0){
        setSelectedImage(product[0].name);
      }
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
          ""
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
