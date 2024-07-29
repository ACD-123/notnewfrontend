import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Productimage from "../../assets/Images/Productcard/1.png";
import OrderServices from "../../services/API/OrderServices"; //~/services/API/OrderServices
import blank from "../../assets/Images/Productcard/blank.jpg";
import { toast } from "react-toastify";

const RefundProductCart = (props) => {
  const [images, setImages] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderitems, setOrderItems] = useState([]);
  // const [products, setProducts] = useState([]);
  let orderId = localStorage.getItem("orderid");
  let imgFiles = props.images;
  // const orderItems = orders.orderItems
  const getOrders = () => {
    OrderServices.getbyid(orderId)
      .then((response) => {
        setOrders(response);
        if (response) {
          let orderItems = JSON.parse(JSON.parse(response.orderItems));
          setOrderItems(orderItems);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };
  const handleCheckBox = (e) => {
    const { value, checked } = e.target;
    if (checked == true) {
      if (value !== "") {
        props.productIdCallBack(value, orderId);
      }
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      {orders ? (
        <>
          <section id="cart-details">
            <div className="container">
              <div className="row align-items-center">
                <h3 id="storetitle">Seller: NOT NEW_Official store</h3>
                <div className="col-lg-7">
                  <div className="order-details">
                    <div className="row">
                      <div className="product-detail">
                        {orderitems.length > 0 ? (
                          <>
                            {orderitems.map((orderitem, index) => {
                              let attributes = JSON.parse(orderitem.attributes);
                              let media = orderitem.media;
                              return (
                                <>
                                  <div key={index}>
                                    <input
                                      type="checkbox"
                                      onChange={handleCheckBox}
                                      value={orderitem.id}
                                    />
                                  </div>
                                  {media.length > 0 ? (
                                    <>
                                      {orderitems.map((orderitem, index) => {
                                        return (
                                          <>
                                            <div className="product-image" key={index}>
                                              <img src={Productimage} />
                                            </div>
                                          </>
                                        );
                                      })}
                                    </>
                                  ) : (
                                    <>
                                      <div className="product-image">
                                        <img
                                          src={blank}
                                          alt="blank"
                                          width="150"
                                          height="150"
                                        />
                                      </div>
                                    </>
                                  )}
                                  <div className="product-order-details">
                                    <h5>{orderitem.name}</h5>
                                    {attributes.length > 0 ? (
                                      <>
                                        {attributes.map((attribute, index) => {
                                          return (
                                            <>
                                              <span key={index}>
                                                {attribute.size ? (
                                                  <>Size : {attribute.size}</>
                                                ) : (
                                                  ""
                                                )}
                                                {attribute.color ? (
                                                  <>
                                                    , Color: {attribute.color}
                                                  </>
                                                ) : (
                                                  ""
                                                )}
                                              </span>
                                              {attribute.quantity ? (
                                                <>
                                                  <div className="quantitypadding">
                                                    <p>
                                                      <b>
                                                        <span>
                                                          QTY:{" "}
                                                          {attribute.quantity}
                                                        </span>
                                                      </b>
                                                    </p>
                                                  </div>
                                                </>
                                              ) : (
                                                ""
                                              )}
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
                            })}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="order-details" id="totalordervalue">
                    <table style={{ width: "100%" }}>
                      <tr>
                        <th className="boldthtotal">Order Amount Paid</th>
                        <td className="boldthtotal">${orders.order_total}</td>
                      </tr>
                      <tr>
                        <th>Shipping</th>
                        <td>${orders.shipping_cost}</td>
                      </tr>
                      {/* <tr>
                    <th>Import Tax</th>
                    <td>$5.00</td>
                  </tr> */}
                      <tr>
                        <th className="totalthtextbold">Refund amount</th>
                        <td className="totalthtextbold">
                          $ {orders.order_total + orders.shipping_cost}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default RefundProductCart;
