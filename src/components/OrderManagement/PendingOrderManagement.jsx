import React, { useState, useEffect } from "react";
import Prdimage from "../../assets/Images/Singleproduct/prdimage.png";
import Prdimage1 from "../../assets/Images/Singleproduct/Product1.png";
import Prdimage2 from "../../assets/Images/Singleproduct/Product2.png";
import Prdimage3 from "../../assets/Images/icons/active.png";
import Prdimage4 from "../../assets/Images/Singleproduct/product.png";
import Location from "../../assets/Images/map.png";
import icon1 from "../../assets/Images/icons/1.png";
import icon2 from "../../assets/Images/icons/2.png";
import icon3 from "../../assets/Images/icons/3.png";
import { Link } from "react-router-dom";
import OrderServices from "../../services/API/OrderServices"; //~/services/API/OrderServices
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import Backimage from "../../assets/Images/back-icon.png";
import Popup from "./Popup";

const DetailedProductInfo = ({ orderId, goBack }) => {
  const [order, setOrder] = useState({});
  const [singleOrderItems, setOrderItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [orderProduct, setOrderProduct] = useState([]); // Initialize as empty array

  const getOrderDetails = (id) => {
    OrderServices.getOrderDetailsbyid(id)
      .then((response) => {
        console.log("idorderdata", response.data);
        setOrder(response.data);
        setOrderProduct(response.data.products);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        setIsLoading(false);
        toast.error("Failed to fetch order details.");
      });
  };

  useEffect(() => {
    if (orderId) {
      getOrderDetails(orderId);
    }
  }, [orderId]);

  return (
    <>
      {isLoading ? (
        <div className="loader-container text-center">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <>
          <div className="detailed-product-info">
            <h3>Order Details</h3>
            <h4>Order #: {order.orderid}</h4>
            <div className="row">
              <div className="col-lg-8">
                <div className="location">
                  <img style={{ width: "100%" }} src={Location} />
                </div>
              </div>
              <div
                className="col-lg-4"
                style={{
                  border: "2.15px solid #E9E9E9",
                  background: "#FCFCFC",
                }}
              >
                <div className="order-seller-details">
                  <p>
                    <img src={icon1} /> {order.shipmentaddress}
                  </p>
                  <p>
                    <img src={icon2} /> {order.phone}
                  </p>
                  <p>
                    <img src={icon3} /> {order.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="row align-items-center deliverystatus">
              <div className="col-lg-6">
                <div className="deliverystatustime">
                  <h3>Delivery Status</h3>
                  <p>
                    Est Delivery: <span>{order.status}</span>
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <select>
                  <option>Pending</option>
                  <option>Delivered</option>
                  <option>Refund</option>
                </select>
              </div>
            </div>
            <div className="row align-items-center">
              <h3>Order Items</h3>
              {orderProduct.map((product, index) => (
                <>
                  <div className="col-lg-9" key={index}>
                    <div className="product-image">
                      <div className="image">
                        <img src={product.media[0].name} />
                      </div>
                      <div className="prd-details">
                        <h5>{product.name}</h5>
                        <p>${product.producttotal}</p>
                        {/* <p className='size-color'><span>Size:</span> {product.size} <span>Color:</span> {product.color}</p> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <h5 className="qunty">
                      Quantity :<span>{product.quantity}</span>
                    </h5>
                  </div>
                </>
              ))}
            </div>
            <div className="order-price-detail">
              <p className="order-price-detail-list">
                <div>Subtotal ( {order.totalItems} item )</div>
                <div>{order.subtotal}$</div>
              </p>
              <p className="order-price-detail-list">
                <div>Shipping</div>
                <div>{order.shippingcost}$</div>
              </p>
              {/* <p className='order-price-detail-list'>
                <div>Discount</div>
                <div>{product.discount}$</div>
            </p>
            <p className='order-price-detail-list ordertotal'>
                <div>Order Total</div>
                <div>{product.orderTotal}$</div>
            </p> */}
            </div>
            {/* <div className='not-order-detail'>
            <h3>Note</h3>
            <div className='ord-note'>
                <p>{product.note}</p>
            </div>
        </div> */}
            <button className="backbutton-account" onClick={goBack}>
              <img src={Backimage} /> Back
            </button>

            {/* <Link style={{ textDecoration: "unset" }}>
              <button className="updteordr">Updated Order</button>
            </Link> */}
          </div>
        </>
      )}
    </>
  );
};

const PendingOrderManagement = () => {
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [ordersummary, setOrderSummary] = useState({ data: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [orderStatus, setOrderStatus] = useState({}); // State to hold selected status for each order
    const [rejectReason, setRejectReason] = useState(""); // State to hold reject reason
    const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  
    const handleViewDetails = (orderId) => {
      setSelectedOrderId(orderId);
    };
  
    const updateOrderStatus = (orderId, status) => {
      // Handle different actions based on selected status
      if (status === "1") {
        // Accept Order
        // Show popup for accepted orders
        setShowPopup(true);
      } else if (status === "2") {
        // Reject Order
        // Prompt for reason
        if (!rejectReason) {
          alert("Please provide a reason for rejecting the order.");
          return;
        }
        // Call the API to update order status with reason
        OrderServices.updateOrderStatus({ order_id: orderId, status, reason: rejectReason })
          .then((response) => {
            // Handle success response
            console.log("Order status updated successfully:", response);
            getOrderSummary(); // Refresh order summary after updating status
          })
          .catch((error) => {
            // Handle error
            console.error("Error updating order status:", error);
            toast.error("Failed to update order status.");
          });
      }
    };
  
    const getOrderSummary = () => {
      OrderServices.sellerOngoingOrders()
        .then((response) => {
          setOrderSummary(response);
          setIsLoading(false);
        })
        .catch((e) => {
          toast.error(e.message);
          setIsLoading(false);
        });
    };
  
    const goBackToOrders = () => {
      setSelectedOrderId(null);
    };
  
    // Filter out the selected order from the ongoing orders list
    const filteredOrders = ordersummary.data.filter(
      (order) => order.order_id !== selectedOrderId
    );
  
    useEffect(() => {
      getOrderSummary();
    }, []);
  
    // Function to handle status change
    const handleStatusChange = (orderId, status) => {
      // Update the status in the state
      setOrderStatus({ ...orderStatus, [orderId]: status });
      // Trigger API call directly
      updateOrderStatus(orderId, status);
    };

  return (
    <div className="ongoing ordmangemnt">
      <h3>Pending Orders</h3>
      {isLoading ? (
        <div className="loader-container text-center">
          <Spinner animation="border" role="status" />
        </div>
      ) : selectedOrderId ? (
        // Display order details when an order is selected
        <DetailedProductInfo
          orderId={selectedOrderId}
          goBack={goBackToOrders}
        />
      ) : filteredOrders.length === 0 ? (
        // Display message if there are no ongoing orders
        <div>No Ongoing Products</div>
      ) : (
        // Display list of ongoing orders
        filteredOrders.map((order, index) => (
          <div className="row align-items-center" key={index}>
            <div className="col-lg-8">
              <div className="product-image">
                <div className="image">
                  <img src={Prdimage3} alt="Product" />
                </div>
                <div className="prd-details">
                  <h5>
                    Order # : <b>{order.orderid}</b>
                  </h5>
                  <h3>{order.fullname}</h3>
                  <h6 style={{ color: "#0688FF" }}>{order.status}</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="rightarrow viedeails">
              <select
                  className="selectorStatus"
                  value={orderStatus[order.order_id] || ""}
                  onChange={(e) =>
                    handleStatusChange(order.order_id, e.target.value)
                  }
                >
                  <option value="">Pending</option>
                  <option value="1">Accept Order</option>
                  <option value="2">Reject Order</option>
                </select>
                {/* <button onClick={() => handleViewDetails(order.order_id)}>
                  View Details
                </button> */}
              </div>
            </div>
            <hr />
          </div>
        ))
      )}
      {showPopup && (
        <Popup
          title="Order Accepted"
          message="Your order has been accepted."
          onClose={() => {
            setShowPopup(false);
            getOrderSummary(); // Refresh order summary after accepting order
          }}
        />
      )}
    </div>
  );
};

export default PendingOrderManagement;
