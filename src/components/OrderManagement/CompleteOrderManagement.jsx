import React, { useEffect, useState } from "react";
import Prdimage from "../../assets/Images/Singleproduct/prdimage.png";
import Prdimage1 from "../../assets/Images/Singleproduct/Product1.png";
import Prdimage2 from "../../assets/Images/Singleproduct/Product2.png";
import Prdimage3 from "../../assets/Images/icons/completed.png";
import Prdimage4 from "../../assets/Images/Singleproduct/product.png";
import Location from "../../assets/Images/map.png";
import icon1 from "../../assets/Images/icons/1.png";
import icon2 from "../../assets/Images/icons/2.png";
import icon3 from "../../assets/Images/icons/3.png";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import OrderServices from "../../services/API/OrderServices";
import { toast } from "react-toastify";
// DetailedProductInfo component to display details of a single product
const DetailedProductInfo = ({ product }) => {
  // Modify this component to display detailed product information as per your needs
  return (
    <div className="detailed-product-info">
      <h3 className="details">Order Details</h3>
      <h4>Order #: {product.orderNumber}</h4>
      <div className="row">
        <div className="col-lg-8">
          <div className="location">
            <img style={{ width: "100%" }} src={Location} />
          </div>
        </div>
        <div
          className="col-lg-4"
          style={{ border: "2.15px solid #E9E9E9", background: "#FCFCFC" }}
        >
          <div className="order-seller-details">
            <p>
              <img src={icon1} /> {product.address}
            </p>
            <p>
              <img src={icon2} /> {product.phone}
            </p>
            <p>
              <img src={icon3} /> {product.name}
            </p>
          </div>
        </div>
      </div>
      <div className="row align-items-center deliverystatus">
        <div className="col-lg-6">
          <div className="deliverystatustime">
            <h3>Delivery Status</h3>
            <p>
              Est Delivery: <span>{product.deliveryStatus}</span>
            </p>
          </div>
        </div>
        <div className="col-lg-6">
          <select>
            <option>Delivered</option>
            <option>Pending</option>
            <option>Refund</option>
          </select>
        </div>
      </div>
      <div className="row align-items-center" style={{ padding: "30px 0px" }}>
        <h3>Order Items</h3>
        <div className="col-lg-9">
          <div className="product-image">
            <div className="image">
              <img src={product.images} />
            </div>
            <div className="prd-details">
              <h5>{product.productName}</h5>
              <p>${product.price}</p>
              <p className="size-color">
                <span>Size:</span> {product.size} <span>Color:</span>{" "}
                {product.color}
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <h5 className="qunty">
            Quantity :<span>{product.quantity}</span>
          </h5>
        </div>
      </div>
      <div className="order-price-detail">
        <p className="order-price-detail-list">
          <div>Subtotal ( {product.item} item )</div>
          <div>{product.subTotal}$</div>
        </p>
        <p className="order-price-detail-list">
          <div>Shipping</div>
          <div>{product.shipping}$</div>
        </p>
        <p className="order-price-detail-list">
          <div>Discount</div>
          <div>{product.discount}$</div>
        </p>
        <p className="order-price-detail-list ordertotal">
          <div>Order Total</div>
          <div>{product.orderTotal}$</div>
        </p>
      </div>
      <div className="not-order-detail">
        <h3>Note</h3>
        <div className="ord-note">
          <p>{product.note}</p>
        </div>
      </div>
      <Link style={{ textDecoration: "unset" }}>
        <button className="updteordr">Updated Order</button>
      </Link>
    </div>
  );
};

const CompleteOrderManagement = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showReviews, setShowReviews] = useState(false); // New state for reviews display

  const handleViewDetails = (index) => {
    setSelectedProduct(index);
  };

  const handleReviews = (index) => {
    setSelectedProduct(index); // Set selected product index
    setShowReviews(true); // Set showReviews state to true to display reviews
  };

  const handleBack = () => {
    setShowReviews(false); // Set showReviews state to false when going back
    setSelectedProduct(null);
  };

  const getOrderSummary = () => {
    OrderServices.sellerCompletedOrders()
      .then((response) => {
        console.log('ordersCompleted',response);
        setSelectedProduct(response);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  useEffect(() => {
    getOrderSummary();
  }, []);
  if (showReviews && selectedProduct !== null && selectedProduct[selectedProduct]) {
    const selectedOrder = selectedProduct[selectedProduct];

    return (
      <div className="reviews-view-ordrmngment">
        <h3>Order Reviews</h3>
        <DetailedProductInfo product={selectedOrder} />
        <h3>Ratings</h3>
        {/* Render reviews for the selected product */}
        <div className="review-section">
          {/* Map through selectedOrder.reviews */}
          {selectedOrder.reviews.map((review, index) => (
            <div key={index} className="review">
              {/* Display star rating based on review.rating */}
              <div className="stars-values">
                <StarRating value={review.rating} />
                <div>{`${review.rating}`}</div>
              </div>
              <div className="customer-reviews">
                <h3>Customer Review</h3>
                <p>{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="bckkkkk" onClick={handleBack}>
          Back
        </button>
      </div>
    );
  }

  if (selectedProduct !== null && selectedProduct[selectedProduct]) {
    const selectedOrder = selectedProduct[selectedProduct];

    return (
      <div className="detailed-view">
        <DetailedProductInfo product={selectedOrder} />
        <button className="bckkkkk" onClick={() => setSelectedProduct(null)}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="ongoing ordmangemnt">
      <h3>Complete Orders</h3>
      {selectedProduct && selectedProduct.data && selectedProduct.data.map((order, index) => (
        <div className="row align-items-center" key={index}>
          <div className="col-lg-8">
            <div className="product-image">
              <div className="image">
                {/* {order.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`Product ${imgIndex + 1}`}
                  />
                ))} */}
                  <img  src={Prdimage3} alt="Product" />
              </div>
              <div className="prd-details">
                <h5>
                  Order # : <b>{order.orderid}</b>
                </h5>
                <h3><span style={{fontWeight:'normal'}}>Customer Name:</span> {order.fullname}</h3>
                <h6 style={{ color: "#70BE44" }}><span style={{fontWeight:'normal',color:'black'}}>Order Status: </span>{order.status}</h6>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="rightarrow viedeails">
              <button onClick={() => handleViewDetails(index)}>
                View Details
              </button>
              <br />
              <button className="rviews" onClick={() => handleReviews(index)}>
                Refund
              </button>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default CompleteOrderManagement;
