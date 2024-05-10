import React, { useEffect, useState } from "react";
import Prdimage from "../../assets/Images/Seller/Refundimages/1.png";
import Prdimage1 from "../../assets/Images/Seller/Refundimages/2.png";
import Prdimage2 from "../../assets/Images/Seller/Refundimages/3.png";
import Prdimage3 from "../../assets/Images/icons/refund.png";
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
import OrderServices from "../../services/API/OrderServices";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
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
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading state as true

  const handleViewDetails = (index) => {
    setSelectedProduct(index);
  };

  const getOrderSummary = () => {
    OrderServices.sellerRefundOrders()
      .then((response) => {
        console.log('ordersRefund',response);
        setSelectedProduct(response);
        setIsLoading(false)
      })
      .catch((e) => {
        toast.error(e.message);
        setIsLoading(false)
      });
  };

  useEffect(() => {
    getOrderSummary();
  }, []);

  if (selectedProduct !== null && selectedProduct[selectedProduct]) {
    const selectedOrder = selectedProduct[selectedProduct];

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
      <h3>Refund Orders</h3>
      {isLoading ? ( // Render loader if isLoading is true
        <div className="loader-container text-center">
          <Spinner animation="border" role="status">
            {/* <span className="sr-only">Loading...</span> */}
          </Spinner>
        </div>
      ) : (
        <>
        {selectedProduct.data.length === 0 ? (
           <div>No Refund Products</div>
          ) : (
          <>
      {selectedProduct && selectedProduct.data && selectedProduct.data.map((order, index) => (
        <div className="row align-items-center" key={index}>
          <div className="col-lg-10">
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
                      <span>Refund Approval</span>:{" "}
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
                  {/* <div>
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
                  </div> */}
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
      </>
      )}
      </>
      )}
    </div>
  );
};

export default RefundManagement;
