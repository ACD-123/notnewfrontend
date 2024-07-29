import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import RightArrow from '../../assets/Images/rightarrow.png';
import Prdimage from '../../assets/Images/Singleproduct/prdimage.png';
import Prdimage1 from '../../assets/Images/Singleproduct/Product1.png';
import Prdimage2 from '../../assets/Images/Singleproduct/Product2.png';
import Search from '../Elements/FilterAttributes/Search';
import OrderServices from "../../services/API/OrderServices"; //~/services/API/OrderServices
import icon1 from "../../assets/Images/icons/1.png";
import icon2 from "../../assets/Images/icons/2.png";
import icon3 from "../../assets/Images/icons/3.png";
import SellerProductImage2 from "../../assets/Images/Categorylisting/2.png";
import { toast } from "react-toastify";
import StarRating from "../OrderManagement/StarRating";
import Location from "../../assets/Images/map.png";

const DetailedProductInfo = ({ order }) => {
  const [orderitems, setOrderItems] = useState({});
  const [estDelivery, setEstDelivery] = useState('');
  const [orderstatus, setOrderStatus] = useState('');
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const handleEstDelivery = (event) => {
    setEstDelivery(event.target.value);
  };
  const handleOrderStatus = (e) =>{
    e.preventDefault();
    setOrderStatus(e.target.value);
  }
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
                {orderitems.map((items , index) => {
                  let attributes = JSON.parse(items.attributes);
                  return (
                    <>
                      <div className="row align-items-center" key={index}>
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
                                  {attributes?.map((attribute , index) => {
                                    return (
                                      <>
                                        <p className="size-color" key={index}>
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
                              {attributes?.map((attribute , index) => {
                                return (
                                  <>
                                    <h5 className="qunty" key={index}>
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
              <div className="ord-note">
                {order.order.admin_notes}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};
const BuyAgain = () => {
  const [refundDetailsVisible, setRefundDetailsVisible] = useState({});
  const [requestSentVisible, setRequestSentVisible] = useState({});

  const handleRefundClick = (orderIndex) => {
    setRefundDetailsVisible({
      ...refundDetailsVisible,
      [orderIndex]: true,
    });
  };

  const handleSubmitDetails = (orderIndex) => {
    setRefundDetailsVisible({
      ...refundDetailsVisible,
      [orderIndex]: false,
    });
    setRequestSentVisible({
      ...requestSentVisible,
      [orderIndex]: true,
    });
  };

  const handleCloseRequestSent = (orderIndex) => {
    setRequestSentVisible({
      ...requestSentVisible,
      [orderIndex]: false,
    });
  };
  const orderDetails = (index, id) => {
    OrderServices.getSingleOrderSummary(id)
      .then((response) => {
        setSelectedOrder(response);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
    setSelectedProduct(index);
  };
  const renderOrderBlock = (orderData) => {
    // const { orderNumber, productName, images } = orderData;
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
          <div  className="review">
              {/* Display star rating based on review.rating */}
              <div className="stars-values">
                <StarRating value="2" />
                <div>{`${2}`}</div>
              </div>
              <div className="customer-reviews">
                <h3>Customer Review</h3>
                <p style={{color: 'black'}}><textarea placeholder="Comment" style={{ width: "100%", background: 'none', border: 'none'}}></textarea></p>
              </div>
              <Link style={{ textDecoration: "unset" }}>
                <button className="updteordr">Save</button>
              </Link>
            </div>
          {/* ))} */}
          </div>
        </div>
        </>
      ):(
        <>
        {orderData ?(
        <>
        <div className='row align-items-center' key={orderData.id}>
        <div className='col-lg-8'>
          <div className='product-image'>
            <div className='col-lg-3 image'>
              {/* {images.map((image, idx) => (
                <img key={idx} src={image} alt={`Product ${idx + 1}`} />
              ))} */}
              <img src={Prdimage1} alt='' />
            </div>
            <div className='col-lg-5 prd-details'>
              <h5>Order # : <b>{orderData.order.orderid}</b></h5>
              <h3>{orderData.product.name}</h3>
              <h4>Attributes:</h4>
              {(JSON.parse(orderData.product.attributes)).map((attribute, index) => {
                return(
                  <>
                  <ul style={{ listStyle: "none", padding : 0}} key={index}>
                    <li>
                      <b>Size:</b> {attribute.size}
                    </li>
                    <li>
                      <b>Color:</b> <div style={{ backgroundColor: attribute.color}}>&nbsp;</div>
                    </li>
                    <li>
                      <b>Quantity:</b> {attribute.quantity}
                    </li>
                  </ul>
                  </>
                )
              }
                  // <img key={imgIndex} src={image} alt={`Product ${imgIndex + 1}`} />
                )}
            </div>
          </div>
        </div>
        <div className='col-lg-2'>
          <div className='orderdeliver-bttn'>
            <Link to=''>Order {orderData.order.status}</Link>
          </div>
        </div>
        <div className='col-lg-2'>
    <div className='buyagin-buttons'>
        <Link to={`/singleproduct/${orderData.product.guid}`}><button>Buy Again</button></Link>
        {/* <Link to=""><button>Add to Cart</button></Link> */}
    </div>
        </div>
      </div>
          
      {/* <hr /> */}
        </>
      ):(          
        'No Orders Exits'
      )}
        </>
      )}
      
      </>
    );
  };


  const ordersData = [
    {
      orderNumber: '15s5d8e1',
      productName: "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394",
      images: [Prdimage],
    },
    {
      orderNumber: '15s5d8e2',
      productName: "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394",
      images: [Prdimage1],
    },
    {
      orderNumber: '15s5d8e2',
      productName: "Adidas Originals Men's Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394",
      images: [Prdimage2],
    },
  ];

  const purchaseDate = new Date('20-july-2023'); // Replace this with your actual purchase date
  const [customerorders, setCustomerOrders] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState({});

  const getCustomerOrder = () =>{
    OrderServices.customerBuyAgainOrders()
    .then((response) => {
      setCustomerOrders(response.data)
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message)
    });
  }
  useEffect(() => {
    getCustomerOrder();
  }, []);

  return (
    <div>
      <section id='buyagain'>
        <h3>Buy Again</h3>
        <div className='row align-items-center first-row'>
          <div className='col-lg-7'>
            <div className="keyword-filter-list buyagain-filterbuttons">
              <ul>
                <li> <a href="#">All Listings</a></li>
                <li> <a href="#">Auctions</a></li>
                {/* <li> <a href="/categorykeyword">Buy it now</a></li> */}
                <li> <a href="#">Local seller</a></li>
              </ul>
            </div>
          </div>
          <div className='col-lg-5'>
            <Search />
          </div>
        </div>
      </section>

      <div className='ongoing'>
        {/* {ordersData.map((order, idx) => (
          <React.Fragment key={idx}>
            {renderOrderBlock(order, idx)}
            {idx !== ordersData.length - 1 && <hr />}
          </React.Fragment>
        ))} */}
      </div>
      <section id='purchaseDate'>
        <hr />
        {customerorders.length > 0?(
          <>
          <div className='ongoing'>
          <h3>{purchaseDate.toDateString()}</h3>
            {customerorders.map((order, idx) => {
              return(
                <>
                  <React.Fragment key={idx}>
                    {renderOrderBlock(order, idx)}
                    {idx !== customerorders.length - 1 && <hr />}
                  </React.Fragment>
                </>
            )})}

            {/* {ordersData.map((order, idx) => (
              <React.Fragment key={idx}>
                {renderOrderBlock(order, idx)}
                {idx !== ordersData.length - 1 && <hr />}
              </React.Fragment>
            ))} */}
          </div>
          </>
        ):('')}
        
      </section>
    </div>
  );
};

export default BuyAgain;
