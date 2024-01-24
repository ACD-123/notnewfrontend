import React, { useState, useRef } from 'react';
import Uploadimage from '../../assets/Images/upload.png'
import RefundProductCart from './RefundProductCart'
const RefundPopup = () => {
    const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const selectedImages = files.slice(0, 5 - images.length); // Limit to 5 images

    const imagePromises = selectedImages.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          resolve(event.target.result);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises)
      .then((imageDataArray) => {
        setImages([...images, ...imageDataArray]);
      })
      .catch((error) => {
        console.error('Error uploading images: ', error);
      });
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className='main-refund-popup'>
        <h1>Ask for a Refund</h1>
        <RefundProductCart />
      <h3>Refund Reason Images <span>( 5 images )</span></h3>  
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        multiple
        onChange={handleImageChange}
        disabled={images.length >= 5} // Disable input after reaching 5 images
      />
      <button className='chseimage' onClick={handleButtonClick}>Upload Images  <img src={Uploadimage} alt="Upload" /></button>
      <p>Minimum 5 images of an item and give Closeup image of a damage product</p>
      <ul className="image-gallery">
        {images.map((image, index) => (
          <li key={index} className="gallery-item">
            <img
              src={image}
              alt={`uploaded-${index}`}
              className="gallery-image"
            />
          </li>
        ))}
      </ul>
            <h3>Describe Reason</h3>
            <textarea style={{minHeight:"50px", width: "100%"}} placeholder='Message us'>
            </textarea>
            <p>Make sure the reason you give should be genuine otherwise your refund will be rejected </p>
    </div>
  );
};

export default RefundPopup;
