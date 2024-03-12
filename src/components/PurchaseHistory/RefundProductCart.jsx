import React, { useEffect, useState} from 'react';
import  { Link } from 'react-router-dom'
import Productimage from "../../assets/Images/Productcard/1.png";
import OrderServices from "../../services/API/OrderServices"; //~/services/API/OrderServices

const RefundProductCart = (props) => {
  const [images, setImages] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderitems, setOrderItems] = useState([]);
  let orderId = localStorage.getItem('orderid');
  let imgFiles = props.images;
  // const orderItems = orders.orderItems  
  const getOrders =() =>{
      OrderServices.getbyid(orderId)
      .then((response) => {
        setOrders(response)
        if(response){
          let orderItems = JSON.parse(JSON.parse(response.orderItems));
          setOrderItems(orderItems)
        }
      })
      .catch((e) => {
        console.log('error', e)
      });
  }

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
    {orders ? (
      <>
       <section id="cart-details" style={{ padding: "30px 0px" }}>
        <div className="container">
          <div className="row align-items-center">
          {/* <h3 id="storetitle">Seller: NOT NEW_Official store</h3> */}
            <div className="col-lg-7">
              <div className="order-details">
                <div className="row">
                    <div className="product-detail">
                      {orderitems.length > 0 ?(<>
                        {orderitems.map((orderitem, index) => {
                          let attributes = JSON.parse(orderitem.attributes);
                          return(
                            <>
                              <div className="product-image">
                                <img src={Productimage} />
                              </div>
                              <div className="product-order-details">
                                <h5>{orderitem.name}</h5>
                                {attributes.length > 0 ?(
                                  <>
                                  {attributes.map((attribute, index) => {
                                    return(
                                      <>
                                      <span>
                                        {attribute.size ? (<>
                                          Size : {attribute.size}
                                         </>):('')}
                                        {attribute.color ? (<>
                                          , Color: {attribute.color}
                                        </>):('')}
                                      </span>
                                      {attribute.quantity ? (<>
                                        <div className="quantitypadding">
                                          <p>
                                            <b>
                                              <span>QTY: {attribute.quantity}</span>
                                            </b>
                                          </p>
                                        </div>
                                      </>):('')}
                                      </>
                                    )})}
                                  </>
                                ):('')}
                              </div>
                            </>
                          )
                        })}
                      </>):('')}
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
                    <td className="totalthtextbold">$ { orders.order_total + orders.shipping_cost}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    ):('')}
    </>
  )
}

export default RefundProductCart