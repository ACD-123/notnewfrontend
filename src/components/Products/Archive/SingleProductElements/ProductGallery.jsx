import React, { useState, useEffect } from "react";
import ProductServices from "../../../../services/API/ProductServices"; //~/services/API/ProductServices
import { BASE_URL } from "../../../../services/Constant";
import blank from "../../../../assets/Images/Productcard/blank.jpg";

const ProductGallery = () => {
  const [product, setProductData] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  const { pathname } = window.location;
  const id = pathname.split("/").pop();

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };
  const getProduct = () => {
    ProductServices.get(id).then((response) => {
      if (response.data.media.length > 0) {
        setProductData(response.data.media);
        setSelectedImage(response.data.media[0].name);
      }
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="p-g">
      {product?.length > 1 &&
        <div className="p-g-t-w">
          <div className="p-g-t">
            {product.length > 0 &&
              <>
                {product?.slice(0, 5)?.map((image, index) => {
                  return (
                    <>
                      <div key={index}>
                        <img key={image.id} src={`${image.name}`} alt={image.name} onClick={() => handleThumbnailClick(image.name)}
                          className={selectedImage === image.name ? "active" : ""} />
                      </div>
                    </>
                  );
                })}
              </>
            }
          </div>
        </div>
      }
      {selectedImage ? (
        <>
          <div className="g-i">
            <img
              src={`${selectedImage}`}
              alt="Selected Product"
            />
          </div>
        </>
      ) : ('')}
    </div>

  );
};

export default ProductGallery;
