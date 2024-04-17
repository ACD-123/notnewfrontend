import React, { useState, useEffect } from "react";
import SellerProductImage1 from "../../../assets/Images/Categorylisting/1.png";
import SellerProductImage2 from "../../../assets/Images/Categorylisting/2.png";
import SellerProductImage3 from "../../../assets/Images/Categorylisting/3.png";
import SellerProductImage4 from "../../../assets/Images/Categorylisting/4.png";
import SellerProductImage5 from "../../../assets/Images/Categorylisting/5.png";
import UserServices from "../../../services/API/UserServices"; //~/services/API/AuthService
import OrderServices from "../../../services/API/OrderServices"; //~/services/API/OrderServices
import TransactionServices from "../../../services/API/TransactionServices"; //~/services/API/TransactionServices
import SellerServices from "../../../services/API/SellerServices"; //~/services/API/SellerServices
import { toast } from "react-toastify";
import {
  setUserDetails,
  isLoggedin,
  getUserDetails,
} from "../../../services/Auth"; // ~/services/Auth
import { Link } from "react-router-dom";
import icon1 from "../../../assets/Images/icons/1.png";
import icon2 from "../../../assets/Images/icons/2.png";
import icon3 from "../../../assets/Images/icons/3.png";
import StarRating from "../../OrderManagement/StarRating";
import Location from "../../../assets/Images/map.png";
import { Spinner } from "react-bootstrap";
const products = [
  {
    id: 1,
    title:
      "Adidas Originals Mens Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394",
    image: SellerProductImage1,
    status: "Pending",
    orderId: "ORDER#45543",
  },
  {
    id: 2,
    title: "Adidas Originals Mens Stan Smith",
    image: SellerProductImage2,
    status: "Pending",
    orderId: "ORDER#634333",
  },
  {
    id: 3,
    title: "Adidas Originals Mens Stan Smith",
    image: SellerProductImage3,
    status: "Pending",
    orderId: "ORDER#23235",
  },
  {
    id: 4,
    title: "Adidas Originals Mens Stan Smith",
    image: SellerProductImage4,
    status: "Pending",
    orderId: "ORDER#5636",
  },
  {
    id: 5,
    title: "Adidas Originals Mens Stan Smith",
    image: SellerProductImage5,
    status: "Pending",
    orderId: "ORDER#12242",
  },
];
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
                  <p>
                    <input
                      type="text"
                      placeholder="Enter Estimated Delivery..."
                      value={order.order.estimateDelivery }
                      onChange={handleEstDelivery}
                      style={{
                        border: "1px solid",
                        padding: "0 15px",
                        borderRadius: "7px",
                        marginLeft: "10px",
                      }}
                    />
                    <span></span>
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <select onChange={handleOrderStatus}>
                  <option>Pending</option>
                  <option>Delivered</option>
                  <option>Refund</option>
                </select>
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
                <div>$ <input type="text"  value={order.order.shipping_cost} style={{ border: '1px solid', padding: '0 5px', borderRadius: '7px', marginLeft: '10px'}} placeholder="Enter Shipping Price.." /></div>
              </p>
              <p className="order-price-detail-list">
                <div>Discount</div>
                <div>$ <input type="text"  value={order.order.discountcode}  style={{ border: '1px solid', padding: '0 5px', borderRadius: '7px', marginLeft: '10px'}} placeholder="Enter Discount.." /></div>
              </p>
              <p className="order-price-detail-list ordertotal">
                <div>Order Total</div>
                <div>$ {order.order.order_total}</div>
              </p>
            </div>
            <div className="not-order-detail">
              <h3>Note</h3>
              <div >
                <textarea className="ord-note" style={{ width: '700px'}}>{order.order.admin_notes}</textarea>
              </div>
            </div>
            <Link style={{ textDecoration: "unset" }}>
              <button className="updteordr">Updated Order</button>
            </Link>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};
const SellingDetailsDashBoard = (props) => {
  const [user, setUser] = useState({});
  const [ordersummary, setOrderSummary] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [ordercount, setOrderCount] = useState(0);
  const [orderoffer, setOfferCount] = useState(0);
  const [transaction, setTransaction] = useState(0.0);
  const [shopdata, setShopData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const getShopData=()=>{
    SellerServices.getShopDetails()
    .then((response) => {
      if(response.status){
        setShopData(response.data);
      }
    })
    .catch((e) => {
      console.log(e.message);
    });
  }
  const getUser = () => {
    UserServices.detail()
      .then((response) => {
        setUserDetails(response);
        setUser(response);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const getUserCompletedCount = () => {
    OrderServices.getusercompletedcount()
      .then((res) => {
        if(res.length > 0){
          setOrderCount(res); 
        }else{
          setOrderCount(0); 
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const getUserOffersCount = () => {
    console.log('offers')
    OrderServices.getuserbidscount()
      .then((res) => {
          setOfferCount(res); 
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const getOrderSummary = () => {
    setIsLoading(true); // Start loading
    OrderServices.ordersummary()
      .then((response) => {
        setOrderSummary(response);
        setIsLoading(false); // Stop loading when data is fetched
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const orderDetails = (index, id) => {
    //props.parentCallback('sellings1')
    OrderServices.getSingleOrderSummary(id)
      .then((response) => {
        setSelectedOrder(response);
      })
      .catch((e) => {
        console.log(e.message);
      });
    setSelectedProduct(index);
  };
  const getTransactions = () => {
    TransactionServices.usertransaction()
      .then((response) => {
        setTransaction(response);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    getUser();
    getUserCompletedCount();
    getOrderSummary();
    getTransactions();
    getShopData();
    getUserOffersCount();
  }, []);

  return (
    <>
    {isLoading ? ( // Show loader while fetching cart items
                <div className="loader-container">
                  <Spinner animation="border" role="status" />
                </div>
              ) : (
                <>
{selectedProduct ? (
        <>
          <div className="reviews-view-ordrmngment">
            <DetailedProductInfo order={selectedOrder} />
          </div>
        </>
      ) : (
        <>
          <section id="selleng-dashbaord">
            <h3>Hi {shopdata ? <>{shopdata.fullname}</> : "Seller"},</h3>
            <h3>
              {/* {shopdata ? (
                <>
              <Link to={`/sellershop/${shopdata.guid}`}>
                My Shop
              </Link></>
            ):(
                <></>
              )} */}
</h3>
            <div className="row minndabb">
              <div className="col-lg-4 col">
                <div className="dabb">
                  <h4>Completed Orders</h4>
                  <h1>{ordercount}</h1>
                  <select style={{ width: "100%" }}>
                    <option value="">Select Year</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>

                  <select style={{ width: "100%", marginTop: "10px" }}>
                    <option value="">Select Month</option>
                    <option value="1">January</option>
                    <option value="2">Febuary</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 col">
                <div className="dabb">
                  <h4>Offers</h4>
                  <h1>{orderoffer}</h1>
                  <select style={{ width: "100%" }}>
                    <option value="">Select Year</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>

                  <select style={{ width: "100%", marginTop: "10px" }}>
                    <option value="">Select Month</option>
                    <option value="1">January</option>
                    <option value="2">Febuary</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4 col">
                <div className="dabb">
                  <h4>Earnings</h4>
                  <h1>$ {transaction}</h1>
                  <button>Withdraw</button>
                </div>
              </div>
            </div>
            <div className="order-feeds">
              <h3>Orders Feed</h3>
              {/* Secondrow */}
              {ordersummary.length > 0 ? (
                <>
                  {ordersummary.map((summary) => {
                    return (
                      <>
                        <div className="row" key={summary.id}>
                          <div className="product-item">
                            <div className="detaildashbritemdetail">
                              <div className="img-title">
                                {/* <div>
                                  <img
                                    src={SellerProductImage1}
                                    alt={summary?.product.name}
                                  />
                                </div> */}
                                <div>
                                  <p>ORDER#{summary.order.orderid}</p>
                                  <h4>{summary?.product.name}</h4>
                                  <p>{summary.order.status}</p>
                                </div>
                              </div>
                            </div>
                            <div className="dropdown">
                              <a
                                href="#"
                                onClick={(e) =>
                                  orderDetails(e, summary?.order.id)
                                }
                              >
                                {/* <Link to={`/completedorder/${summary.order.orderid}`}> */}
                                <button>View Detail</button>
                              </a>
                              {/* </Link> */}
                            </div>
                          </div>
                          {/* <hr /> */}
                        </div>
                      </>
                    );
                  })}
                </>
              ) : (
                "No Order Exists"
              )}
            </div>
          </section>
        </>
      )}
                </>
              )}
      
    </>
  );
};

export default SellingDetailsDashBoard;
