import React, { useState } from "react";
import Prdimage from "../../assets/Images/Singleproduct/prdimage.png";
import Prdimage1 from "../../assets/Images/Singleproduct/Product1.png";
import Prdimage2 from "../../assets/Images/Singleproduct/Product2.png";
import Prdimage3 from "../../assets/Images/Singleproduct/Product3.png";
import Prdimage4 from "../../assets/Images/Singleproduct/product.png";
import Location from "../../assets/Images/map.png";
import icon1 from "../../assets/Images/icons/1.png";
import icon2 from "../../assets/Images/icons/2.png";
import icon3 from "../../assets/Images/icons/3.png";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
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

  const ordersData = [
    {
      orderNumber: "312323",
      productName: "EliteStride: High-Performance Running Shoes",
      images: [Prdimage],
      reviews: [
        {
          comment:
            "I absolutely love my new pair of shoes! The comfort level is off the charts, and they fit like a dream right out of the box. The design is sleek and stylish, making them versatile for both casual outings and more formal occasions. What impressed me the most was the quality of materials used; these shoes feel durable and well-made. Plus, the traction on the soles is fantastic, providing excellent grip on various surfaces. Overall, Im extremely satisfied with my purchase and would highly recommend these shoes to anyone looking for both style and comfort!",
          rating: 2,
        },
        // Other reviews for this product
      ],
      status: "Delivered",
      address: "2438 6th Ave, Ketchikan, Alaska 99901, USA",
      phone: "02184548845",
      name: "Slim Shady",
      deliveryStatus: "Tue, Dec 15 -Wed, Dec 16",
      price: "38.00",
      quantity: "3",
      size: "2.9",
      color: "Red, GREEN",
      subTotal: "58.88",
      item: "2",
      shipping: "56.00",
      discount: "-30",
      orderTotal: "98.00",
      note: 'This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
    },
    {
      orderNumber: "53535",
      productName: "SneakEase: Stylish & Comfortable Casual Sneakers",
      images: [Prdimage1],
      reviews: [
        {
          comment:
            "I took these boots on a rugged hiking trip, and they performed flawlessly. The ankle support provided stability on uneven terrain, and the waterproofing kept my feet dry even through puddles and streams. Theyre sturdy without feeling bulky, and the grip on the soles is exceptional. Despite the tough conditions, my feet felt comfortable and supported throughout the entire hike. These boots are a game-changer for any outdoor enthusiast!",
          rating: 4.9,
        },
        // Other reviews for this product
      ],
      status: "Delivered",
      address: "2438 6th Ave, Ketchikan, Alaska 99901, USA",
      phone: "02184548845",
      name: "Jon Wick",
      deliveryStatus: "Tue, Dec 15 -Wed, Dec 16",
      price: "38.00",
      quantity: "5",
      size: "2.9",
      color: "Red, GREEN",
      subTotal: "58.88",
      item: "2",
      shipping: "56.00",
      discount: "-30",
      orderTotal: "98.00",
      note: 'This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
    },
    {
      orderNumber: "414324",
      productName: "SummitTrail: Durable & Waterproof Hiking Boots",
      images: [Prdimage2],
      reviews: [
        {
          comment:
            "Ive been wearing these sneakers every day since I got them! Theyre not only stylish but incredibly comfortable. The memory foam insoles feel like walking on clouds, and the arch support is fantastic. Theyre also very versatile, matching perfectly with various outfits. The quality is evident, and after weeks of constant wear, they still look brand new. I highly recommend these for anyone seeking comfort and style in their everyday footwear.",
          rating: 2.5,
        },
        // Other reviews for this product
      ],
      status: "Delivered",
      address: "2438 6th Ave, Ketchikan, Alaska 99901, USA",
      phone: "02184548845",
      name: "Johnny",
      deliveryStatus: "Tue, Dec 12 -Wed, Dec 16",
      price: "38.00",
      quantity: "3",
      size: "2.9",
      color: "Green, White",
      subTotal: "58.88",
      item: "2",
      shipping: "56.00",
      discount: "-30",
      orderTotal: "98.00",
      note: 'This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
    },
    {
      orderNumber: "636363",
      productName: "EleganceStep: Classic & Comfortable Dress Shoes",
      images: [Prdimage3],
      reviews: [
        {
          comment:
            "As a dedicated runner, finding the right pair of shoes is crucial. These running shoes exceeded my expectations! The cushioning is superb, offering incredible support and comfort mile after mile. They are incredibly lightweight, which helps with my speed, and the breathability keeps my feet cool even on longer runs. The design is also striking, and the traction is top-notch. I couldnt be happier with my purchase!",
          rating: 5,
        },
        // Other reviews for this product
      ],
      status: "Delivered",
      address: "2438 6th Ave, Ketchikan, Alaska 99901, USA",
      phone: "02184548845",
      name: "John Doe",
      deliveryStatus: "Tue, Dec 23 -Wed, Dec 16",
      price: "38.00",
      quantity: "3",
      size: "2.9",
      color: "Red, Black",
      subTotal: "58.88",
      item: "2",
      shipping: "56.00",
      discount: "-30",
      orderTotal: "98.00",
      note: 'This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
    },
  ];
  if (showReviews && selectedProduct !== null && ordersData[selectedProduct]) {
    const selectedOrder = ordersData[selectedProduct];

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

  if (selectedProduct !== null && ordersData[selectedProduct]) {
    const selectedOrder = ordersData[selectedProduct];

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
      {ordersData.map((order, index) => (
        <div className="row align-items-center" key={order.orderNumber}>
          <div className="col-lg-8">
            <div className="product-image">
              <div className="image">
                {order.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`Product ${imgIndex + 1}`}
                  />
                ))}
              </div>
              <div className="prd-details">
                <h5>
                  Order # : <b>{order.orderNumber}</b>
                </h5>
                <h3>{order.productName}</h3>
                <h6 style={{ color: "#70BE44" }}>{order.status}</h6>
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
                Reviews
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
