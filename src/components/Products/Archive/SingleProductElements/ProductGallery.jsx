import React, { useState, useEffect } from "react";
import ProductServices from "../../../../services/API/ProductServices";
import { Spinner } from "react-bootstrap";

const ProductGallery = () => {
  const [product, setProductData] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { pathname } = window.location;
  const id = pathname.split("/").pop();

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };
  const getProduct = () => {
    setIsLoading(true)
    try {
      ProductServices.get(id).then((response) => {
        setIsLoading(false)
        if (response.data.media.length > 0) {
          setProductData(response.data.media);
          setSelectedImage(response.data.media[0].name);
        }
      });
    } catch (error) {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <>
      {isLoading ?
        <div className="loader-container">
          <Spinner animation="border" role="status"></Spinner>
        </div>
        :
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
      }
    </>

  );
};

export default ProductGallery;
