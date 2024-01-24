import React, { useState } from "react";
import Prdimage from "../../assets/Images/Seller/Refundimages/1.png";
import Prdimage1 from "../../assets/Images/Seller/Refundimages/2.png";
import Prdimage2 from "../../assets/Images/Seller/Refundimages/3.png";
import Prdimage3 from "../../assets/Images/Seller/Refundimages/4.png";
import Redundimage1 from "../../assets/Images/Refundreasonimages/1.png";
import Redundimage2 from "../../assets/Images/Refundreasonimages/2.png";
import Redundimage3 from "../../assets/Images/Refundreasonimages/3.png";
import Redundimage4 from "../../assets/Images/Refundreasonimages/4.png";
import Redundimage5 from "../../assets/Images/Refundreasonimages/5.png";
import Location from "../../assets/Images/map.png";
import icon1 from "../../assets/Images/icons/1.png";
import icon2 from "../../assets/Images/icons/2.png";
import icon3 from "../../assets/Images/icons/3.png";
import { Link } from "react-router-dom";
import objction from "../../assets/Images/objection.png";
// DetailedProductInfo component to display details of a single product
const DetailedProductInfo = ({ product }) => {
  // Modify this component to display detailed product information as per your needs
  return (
    <div className="detailed-product-info">
      <h3>Order Details</h3>
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

      <div className="row align-items-center" style={{ padding: "40px 0px" }}>
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
      <div className="row" style={{ paddingBottom: "20px" }}>
        <h3>Refund Reason Images</h3>
        <div className="refund-images-gallry">
          {product.galleryImages &&
            product.galleryImages.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Gallery Image ${index}`} />
              </div>
            ))}
        </div>

      </div>
      <div className="not-order-detail">
        <h3>Refund Resons</h3>
        <div className="ord-note">
          <p>{product.refundReason}</p>
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
      <div className="row align-items-center refnd-objct">
        <hr />
        <div className="col-lg-9">
          <div className="deliverystatustime">
            <h3>Refund Approval</h3>
            <p>
              <img src={objction} /> Amount will be transferred after admin
              approval and amount will be deducted from your earnings
            </p>
          </div>
        </div>
        <div className="col-lg-3">
          <select>
            <option>Pending</option>
            <option>Delivered</option>
            <option>Refund</option>
          </select>
        </div>
      </div>
      <Link style={{ textDecoration: "unset" }}>
        <button className="updteordr">Updated Order</button>
      </Link>
    </div>
  );
};

const RefundManagement = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewDetails = (index) => {
    setSelectedProduct(index);
  };

  const ordersData = [
    {
      orderNumber: "753525",
      productName: "Stride in Style: Urban Chic Sneakers",
      images: [Prdimage],
      galleryImages: [Redundimage1, Redundimage3, Redundimage5, Redundimage2],
      status: "Refund Requested",
      address: "2438 6th Ave, Ketchikan, Alaska 99901, USA",
      phone: "02184548845",
      name: "Slim Shady",
      deliveryStatus: "Tue, Dec 15 -Wed, Dec 16",
      price: "28.00",
      quantity: "4",
      size: "2.9",
      color: "Red, GREEN",
      subTotal: "58.88",
      item: "2",
      shipping: "56.00",
      discount: "-30",
      orderTotal: "98.00",
      adminApproval: "Pending",
      sellerApproval: "Approved",
      refundReason:
        "The shoes received didnt match the size ordered, causing discomfort or inconvenience.",
      note: 'This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
    },
    {
      orderNumber: "57463",
      productName: "Elevate Every Step: Classic Leather Loafers",
      images: [Prdimage1],
      galleryImages: [
        Redundimage1,
        Redundimage2,
        Redundimage3,
        Redundimage4,
        Redundimage5,
      ],
      status: "Pending",
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
      adminApproval: "Approved",
      sellerApproval: "Pending",
      refundReason:
        "Significant defects like torn seams, detached soles, or material issues affecting wearability.",
      note: 'This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
    },
    {
      orderNumber: "414324",
      productName: "Adventurer's Choice: Trailblazer Hiking Boots",
      images: [Prdimage2],
      galleryImages: [Redundimage4, Redundimage5, Redundimage1, Redundimage2],
      status: "Pending",
      address: "2438 6th Ave, Ketchikan, Alaska 99901, USA",
      phone: "02184548845",
      name: "Slim Shady",
      deliveryStatus: "Tue, Dec 12 -Wed, Dec 16",
      price: "38.00",
      quantity: "3",
      size: "2.9",
      color: "Red, White",
      subTotal: "58.88",
      item: "2",
      shipping: "56.00",
      discount: "-30",
      orderTotal: "98.00",
      adminApproval: "Pending",
      sellerApproval: "Approved",
      refundReason:
        "The product received differed significantly from its online description or images.",
      note: 'This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
    },
    {
      orderNumber: "636363",
      productName: "Sleek Sophistication: Formal Oxford Collection",
      images: [Prdimage3],
      galleryImages: [
        Redundimage4,
        Redundimage1,
        Redundimage2,
        Redundimage3,
        Redundimage5,
      ],
      status: "Approved",
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
      adminApproval: "Pending",
      sellerApproval: "Pending",
      refundReason:
        "Despite the correct size, the shoes are uncomfortable or cause discomfort when worn.",
      note: 'This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
    },
  ];

  if (selectedProduct !== null && ordersData[selectedProduct]) {
    const selectedOrder = ordersData[selectedProduct];

    return (
      <div className="detailed-view">
        <DetailedProductInfo product={selectedOrder} />
        <button className="bckkkkk" onClick={() => setSelectedProduct(null)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="ongoing ordmangemnt">
      <h3>Ongoing Orders</h3>
      {ordersData.map((order, index) => (
        <div className="row align-items-center" key={order.orderNumber}>
          <div className="col-lg-10">
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
                <div className="admin-seller-order-status">
                  <div>
                    <h6
                      style={{
                        color:
                          order.status === "Pending"
                            ? "#0688FF"
                            : order.status === "Approved"
                            ? "green"
                            : order.status === "Refund Requested"
                            ? "red"
                            : "black",
                      }}
                    >
                      {order.status}
                    </h6>
                  </div>
                  <div>
                    <h6>
                      <span>Admin Approval</span>:{" "}
                      <em
                        style={{
                          color:
                            order.adminApproval === "Pending"
                              ? "#0688FF"
                              : order.adminApproval === "Approved"
                              ? "green"
                              : "black",
                        }}
                      >
                        {order.adminApproval}
                      </em>
                    </h6>
                  </div>
                  <div>
                    <h6>
                      <span>Seller Approval</span>:{" "}
                      <em
                        style={{
                          color:
                            order.sellerApproval === "Pending"
                              ? "#0688FF"
                              : order.sellerApproval === "Approved"
                              ? "green"
                              : "black",
                        }}
                      >
                        {order.sellerApproval}
                      </em>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-2">
            <div className="rightarrow viedeails">
              <button
                className="refndbtnnn"
                onClick={() => handleViewDetails(index)}
              >
                View Details
              </button>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default RefundManagement;
