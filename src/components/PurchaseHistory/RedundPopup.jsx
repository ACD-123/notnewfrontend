import React, { useEffect, useState, useRef } from 'react';
import Uploadimage from '../../assets/Images/upload.png';
import OrderServices from '../../services/API/OrderServices';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

const RefundPopup = (props) => {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reason, setReason] = useState('');

  const getOrders = (orderId) => {
    OrderServices.getbyid(orderId)
      .then((response) => {
        setOrder(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getOrders(props.orderId);
  }, [props.orderId]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const selectedImages = files.slice(0, 5 - images.length);
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
        toast.error(error?.response?.data?.message)
      });
  };

  const handleCheckboxChange = (e, productId) => {
    if (e.target.checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };
  const handleDescriptions = (e) => {
    props.parentDescription(e.target.value, props.orderId);
  };
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };
  const handleSubmit = () => {
    // Check if there are selected products, images, and reasons
    if (selectedProducts.length === 0 || images.length === 0 || !reason) {
      return;
    }
  
    // Prepare the data for the API request
    const formData = new FormData();
    formData.append('order_id', order.id);
    formData.append('product_id', JSON.stringify(selectedProducts));
    formData.append('reason', reason);
    images.forEach((image, index) => {
      formData.append(`file${index}`, image); // Append each image to the form data
    });
  
    // Call the API to submit the refund request
    OrderServices.orderRefund(formData)
      .then((response) => {
        window.location.reload()
        // Reset states or perform any other necessary actions after successful submission
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };
  

  return (
    <div className='main-refund-popup'>
      <h1>Ask for a Refund</h1>
      {isLoading ? (
        <div className="loader-container text-center">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <>
          {order && (
            <section id='cart-details'>
              <div className='container'>
                <h5>Order # : <b>{order.orderid}</b></h5>
                {order.stores.map((store) => (
                  <div className='row align-items-center' key={store.id}>
                    <div className='col-lg-12 py-2'>
                      <h3 id='storetitle'>Seller: {store.name}</h3>
                    </div>
                    {store.products.map((product) => (
                      <div className='col-lg-7' key={product.id}>
                        <div className='order-details'>
                          <div className='row'>
                            <div className='product-detail'>
                              <input
                                type="checkbox"
                                value={product.id}
                                onChange={(e) => handleCheckboxChange(e, product.id)}
                              />
                              <div className='product-image'>
                                <img src={product.media.name} alt='Product' />
                              </div>
                              <div className='product-order-details'>
                                <h5>{product.name}</h5>
                                <span>Size: {product.size}, Color: {product.color}</span>
                                <div className='quantitypadding'>
                                  <p>
                                    <b>
                                      <span>QTY: {product.quantity}</span>
                                    </b>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          )}
          <h3>Refund Reason Images <span>(5 images)</span></h3>
          <input
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            ref={fileInputRef}
            multiple
            onChange={handleImageChange}
            disabled={images.length >= 5}
          />
          <button className='chseimage' onClick={() => fileInputRef.current.click()}>
            Upload Images <img src={Uploadimage} alt='Upload' />
          </button>
          <p>Minimum 5 images of an item and give Closeup image of a damaged product</p>
          <ul className='image-gallery'>
            {images.map((image, index) => (
              <li key={index} className='gallery-item'>
                <img src={image} alt={`uploaded-${index}`} className='gallery-image' />
              </li>
            ))}
          </ul>
          <h3>Describe Reason</h3>
          <textarea
  style={{ minHeight: '50px', width: '100%' }}
  placeholder='Message us'
  onChange={handleReasonChange}
></textarea>
          <p>Make sure the reason you give should be genuine otherwise your refund will be rejected</p>
          <button className='sendrefunddetails' onClick={handleSubmit}>
        Send
      </button>
          {/* <button onClick={handleSubmit}>Submit Refund Request</button> */}
        </>
      )}
    </div>
  );
};

export default RefundPopup;
