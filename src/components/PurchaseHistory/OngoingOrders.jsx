import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RightArrow from "../../assets/Images/rightarrow.png";
import Prdimage from "../../assets/Images/Singleproduct/prdimage.png";
import Prdimage1 from "../../assets/Images/Singleproduct/Product1.png";
import Prdimage2 from "../../assets/Images/Singleproduct/Product2.png";
import OrderServices from "../../services/API/OrderServices"; //~/services/API/OrderServices
import icon1 from "../../assets/Images/icons/1.png";
import icon2 from "../../assets/Images/icons/2.png";
import icon3 from "../../assets/Images/icons/3.png";
import blank from "../../assets/Images/Productcard/blank.jpg";
import SellerProductImage2 from "../../assets/Images/Categorylisting/2.png";
import { toast } from "react-toastify";
import StarRating from "../OrderManagement/StarRating";
import Location from "../../assets/Images/map.png";
import { BASE_URL } from "../../services/Constant";

const DetailedProductInfo = ({ order }) => {
  console.log('order', order)
  const [orderitems, setOrderItems] = useState({});
  const [estDelivery, setEstDelivery] = useState("");
  const [orderstatus, setOrderStatus] = useState("");
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const handleEstDelivery = (event) => {
    setEstDelivery(event.target.value);
  };
  const handleOrderStatus = (e) => {
    e.preventDefault();
    setOrderStatus(e.target.value);
  };
  const getOrderItems = () => {
    if (order.order) {
      setOrderItems(JSON.parse(JSON.parse(order.order.orderItems)));
    }
  };
  // Modify this component to display detailed product information as per your needs
  return (
    <>
      {order.order ? (
        <>
          <div className="detailed-product-info">
            <h3>Order Details</h3>
            <h4>Order #: {order.order.orderid}</h4>
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
                    <img src={icon1} /> {order.order.billing_address}
                  </p>
                  <p>
                    <img src={icon2} /> {order.order.phone}
                  </p>
                  <p>
                    <img src={icon3} /> {order.buyer.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="row align-items-center deliverystatus">
              <div className="col-lg-6">
                <div className="deliverystatustime">
                  <h3>Delivery Status</h3>
                  Est. Delivery
                  <span>{order.order.estimateDelivery}</span>
                </div>
              </div>
              <div className="col-lg-6">
                <span>{order.order.status}</span>
              </div>
            </div>
            {orderitems.length > 0 ? (
              <>
                {orderitems.map((items) => {
                  let attributes = JSON.parse(items.attributes);
                  return (
                    <>
                      <div className="row align-items-center">
                        <h3>Order Items</h3>
                        <div className="col-lg-9">
                          <div className="product-image">
                            <div className="image">
                              <img src={SellerProductImage2} />
                            </div>
                            <div className="prd-details">
                              <h5>{items.name}</h5>
                              <p>${items.price}</p>
                              {attributes.length > 0 ? (
                                <>
                                  {attributes?.map((attribute) => {
                                    return (
                                      <>
                                        <p className="size-color">
                                          <span>Size:</span>
                                          {attribute.size} <span>Color:</span>{" "}
                                          <div
                                            style={{
                                              width: "40px",
                                              background: "red",
                                            }}
                                          >
                                            &nbsp;
                                          </div>{" "}
                                        </p>
                                      </>
                                    );
                                  })}
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          {attributes.length > 0 ? (
                            <>
                              {attributes?.map((attribute) => {
                                return (
                                  <>
                                    <h5 className="qunty">
                                      Quantity :
                                      <span>{attribute.quantity}</span>
                                    </h5>
                                  </>
                                );
                              })}
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              ""
            )}
            <div className="order-price-detail">
              <p className="order-price-detail-list">
                <div>Subtotal ( {orderitems.length} )</div>
                <div>$ {order.order.subtotal_cost}</div>
              </p>
              <p className="order-price-detail-list">
                <div>Shipping</div>
                <div>$ {order.order.shipping_cost}</div>
              </p>
              <p className="order-price-detail-list">
                <div>Discount</div>
                <div>$ {order.order.discountcode} </div>
              </p>
              <p className="order-price-detail-list ordertotal">
                <div>Order Total</div>
                <div>$ {order.order.order_total}</div>
              </p>
            </div>
            <div className="not-order-detail">
              <h3>Note</h3>
              <div className="ord-note">{order.order.admin_notes}</div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};
const OngoingOrders = () => {
  const [customerorders, setCustomerOrders] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState({});
  const getCustomerOrder = () => {
    OrderServices.customerOngoingOrders().then((response) => {
      setCustomerOrders(response);
    });
  };
  const orderDetails = (index, id) => {
    OrderServices.getSingleOrderSummary(id)
      .then((response) => {
        setSelectedOrder(response);
      })
      .catch((e) => {
        toast.error(e.message);
      });
    setSelectedProduct(index);
  };
  const renderOrderBlock = (orderData) => {
    // const { orderNumber, productName, images } = orderData;
    const orderProducts = JSON.parse(JSON.parse(orderData.orderItems));
    return (
      <>
        {selectedProduct ? (
          <>
            {/* <div className="reviews-view-ordrmngment">
            <DetailedProductInfo order={selectedOrder} />
          </div> */}
            <div className="reviews-view-ordrmngment">
              <DetailedProductInfo order={selectedOrder} />
              <h3>Ratingss</h3>
              {/* Render reviews for the selected product */}
              <div className="review-section">
                {/* Map through selectedOrder.reviews */}
                {/* {selectedOrder.reviews.map((review, index) => ( */}
                <div className="review">
                  {/* Display star rating based on review.rating */}
                  <div className="stars-values">
                    <StarRating value="2" />
                    <div>{`${2}`}</div>
                  </div>
                  <div className="customer-reviews">
                    <h3>Customer Review</h3>
                    <p style={{ color: "black" }}>
                      <textarea
                        placeholder="Comment"
                        style={{
                          width: "100%",
                          background: "none",
                          border: "none",
                        }}
                      ></textarea>
                    </p>
                  </div>
                  <Link style={{ textDecoration: "unset" }}>
                    <button className="updteordr">Save</button>
                  </Link>
                </div>
                {/* ))} */}
              </div>
            </div>
          </>
        ) : (
          <>
            {orderData ? (
              <>
                <div className="row align-items-center" key="1">
                  <div className="col-lg-8">
                    <div className="product-image">
                      <div className="image">
                        {/* {images.map((image, index) => (
                          <img key={index} src={image} alt={`Product ${index + 1}`} />
                        ))} */}
                        {/* <img src={Prdimage1} alt='' /> */}
                      </div>
                      <div className="prd-details">
                        <h5>
                          Order # : <b>{orderData.orderid}</b>
                        </h5>
                        {orderProducts.length > 0 ? (
                          <>
                            {orderProducts.map((product, index) => {
                              let attributes = JSON.parse(product.attributes);
                              return (
                                <>
                                  <ul
                                    style={{
                                      listStyle: "none",
                                      padding: "0px",
                                      margin: "0px",
                                    }}
                                  >
                                    <li>
                                      <div className="image">
                                        {product.media?.length > 0 ? (
                                          <>
                                            {product.media.map((image, index) => {
                                              if(index === 0){
                                                return(
                                                  <>
                                                    <img key={index} src={`${BASE_URL}/image/product/${image.name}`} alt={image.name} />
                                                  </>
                                                  // <img key={index} src={image} alt={`Product ${index + 1}`} />
                                                )
                                              }
                                            })}
                                          </>
                                        ) : (
                                          <>
                                            <img src={blank} alt="blank" />
                                          </>
                                        )}
                                      </div>
                                    </li>
                                    <li key={index}>Name: {product.name}</li>
                                    {attributes.length > 0 ? (
                                      <>
                                        <li>
                                          Attributes:
                                          <ul style={{ listStyle: "none" }}>
                                            {attributes.map(
                                              (attribute, index) => {
                                                return (
                                                  <>
                                                    <li key={index}>
                                                      {attribute.size ? (
                                                        <>
                                                          Size: {attribute.size}
                                                        </>
                                                      ) : (
                                                        ""
                                                      )}
                                                      {attribute.quantity ? (
                                                        <>
                                                          &nbsp;&nbsp;|
                                                          Quantity:{" "}
                                                          {attribute.quantity}
                                                        </>
                                                      ) : (
                                                        ""
                                                      )}{" "}
                                                      {attribute.colors ? (
                                                        <>
                                                          | Color:{" "}
                                                          <div
                                                            style={{
                                                              width: "50px",
                                                              background:
                                                                attribute.colors,
                                                            }}
                                                          >
                                                            {attribute.colors}
                                                          </div>
                                                        </>
                                                      ) : (
                                                        ""
                                                      )}
                                                    </li>
                                                  </>
                                                );
                                              }
                                            )}
                                          </ul>
                                        </li>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </ul>

                                  {/* <div className='col' key={index}>
                      <img src={path} style={{ width: '100%' }} alt={`Image ${index + 1}`} />
                    </div> */}
                                </>
                              );
                            })}
                          </>
                        ) : (
                          ""
                        )}
                        {/* <h3>{productName}</0h3> */}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-2">
                    <div className="delivery-bttn">
                      {orderData.status == "ordered" ? (
                        <>
                          <span>Delivery in Process</span>
                        </>
                      ) : (
                        ""
                      )}
                      {orderData.status == "pending" ? (
                        <>
                          <span>Delivery in Process</span>
                        </>
                      ) : (
                        ""
                      )}
                      {orderData.status == "DELIVERED" ? (
                        <>
                          <span style={{ color: "green" }}>Delivered</span>
                        </>
                      ) : (
                        ""
                      )}
                      {orderData.status == "COMPLETED" ? (
                        <>
                          <span style={{ color: "green" }}>
                            Order Completed
                          </span>
                        </>
                      ) : (
                        ""
                      )}
                      {orderData.status == "REFUND" ? (
                        <>
                          <span>Order Refund</span>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="refund-reorder">
                      <a
                        href="#"
                        onClick={(e) => orderDetails(e, orderData.id)}
                      >
                        {/* <Link to='/singleproduct'> */}
                          <button>View Details</button>
                        {/* <img src={RightArrow} alt="Right Arrow" /> */}
                        {/* </Link> */}
                      </a>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              "No Orders Exits"
            )}
          </>
        )}
      </>
    );
  };

  const ordersData = [
    {
      orderNumber: "15s5d8e1",
      productName:
        "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394",
      images: [Prdimage],
    },
    {
      orderNumber: "15s5d8e2",
      productName:
        "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394",
      images: [Prdimage1],
    },
    {
      orderNumber: "15s5d8e2",
      productName:
        "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394",
      images: [
        Prdimage2, // Add more image URLs here for the first order
        // Add more image URLs for the first order as needed
      ],
    },
  ];
  useEffect(() => {
    getCustomerOrder();
  }, []);
  return (
    <>
      <div className="ongoing">
        {customerorders.length > 0 ? (
          <>
            {customerorders?.map((order, index) => {
              return (
                <>
                  <React.Fragment key={index}>
                    {renderOrderBlock(order)}
                    {index !== customerorders.length - 1 && <hr />}
                  </React.Fragment>
                </>
              );
            })}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default OngoingOrders;
