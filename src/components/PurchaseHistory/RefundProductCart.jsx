import React from 'react'
import  { Link } from 'react-router-dom'
import Productimage from "../../assets/Images/Productcard/1.png";
const RefundProductCart = () => {
  return (
    <>
    <section id="cart-details" style={{ padding: "30px 0px" }}>
        <div className="container">
          <div className="row align-items-center">
          <h3 id="storetitle">Seller: NOT NEW_Official store</h3>
            <div className="col-lg-7">
              <div className="order-details">
                <div className="row">
                    <div className="product-detail">
                      <div className="product-image">
                        <img src={Productimage} />
                      </div>
                      <div className="product-order-details">
                        <h5>adidas Adizero SL Running Shoes Men's</h5>
                        <span>Size : 9.5 , Color: Red</span>
                        <div className="quantitypadding">
                          <p>
                            <b>
                              <span>QTY: 01</span>
                            </b>
                          </p>
                        </div>
                      </div>
                    </div>

                </div>
              </div>

            </div>
            <div className="col-lg-5">
              <div className="order-details" id="totalordervalue">
                <table style={{ width: "100%" }}>
                  <tr>
                    <th className="boldthtotal">Order Amount Paid</th>
                    <td className="boldthtotal">$58.88</td>
                  </tr>
                  <tr>
                    <th>Shipping</th>
                    <td>$56.00</td>
                  </tr>
                  <tr>
                    <th>Import Tax</th>
                    <td>$5.00</td>
                  </tr>
                  <tr>
                    <th className="totalthtextbold">Refund amount</th>
                    <td className="totalthtextbold">$ 103.00</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default RefundProductCart