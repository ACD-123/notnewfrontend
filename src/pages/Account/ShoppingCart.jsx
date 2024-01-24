import React, { useState } from 'react';
import Payment from "../../assets/Images/Shoppingcart/payment.png";
import Productimage from "../../assets/Images/Productcard/1.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Category from "../../components/Products/Archive/Category";
import Arrowright from "../../assets/Images/Shoppingcart/arrowright.png";
import { Link } from "react-router-dom";

const ShoppingCart = () => {

  const [showDiscountField, setShowDiscountField] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  const toggleDiscountField = () => {
    setShowDiscountField(!showDiscountField);
  };

  const handleDiscountSubmit = () => {
    // Logic to handle applying the discount code
    console.log("Discount code applied:", discountCode);
    // You can implement further logic like API calls or validation here
  };

  const handleRemoveSection = () => {
    const sectionToRemove = document.getElementById('sectionToRemove');
    if (sectionToRemove) {
      sectionToRemove.remove();
    }
    // You might want to add further logic, such as updating the cart state, etc.
  };
  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}
      <section id="cart-details" style={{ padding: "20px 0px" }}>
        <div className="container">
          <h2>Shopping Cart</h2>

          <div className="row">
            <div className="col-lg-8">
              <div className="order-details" id="sectionToRemove">
                <h3 id="storetitle">Seller: NOT NEW_Official store</h3>
                <div className="row">
                  <div className="col-lg-9">
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
                        <span className="unter">
                          International
                          <br /> Shipping from
                          <br /> United Kingdom
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="prices-order-details">
                      <h4>US $ 38.99</h4>
                      <span>+US $29.99</span>
                    </div>
                  </div>
                </div>
                <hr className="dashed" />
                <div className="buttonright">
                  <button
                    className="btn btn-info btn-lg transparent"
                    type="button"
                  >
                    Save for later
                  </button>
                  <button
            className="btn btn-info btn-lg danger"
            type="button"
            onClick={handleRemoveSection} // Call the function to remove the section
          >
            Remove
          </button>
                </div>
              </div>
              <div className="order-details" id="border-order-details">
          <h5 onClick={toggleDiscountField}>Applied Discount <div id="iconrightaligin"> <img src={Arrowright} /></div></h5>
          {showDiscountField && (
            <div className='discountfields'>
              <input
                type="text"
                placeholder="Enter discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button onClick={handleDiscountSubmit}>Apply</button>
            </div>
          )}
     
        </div>
            </div>
            <div className="col-lg-4">
              <div className="order-details" id="totalordervalue">
                <h3>Order Total</h3>
                <table style={{ width: "100%" }}>
                  <tr>
                    <th className="boldthtotal">Subtotal ( 1 item )</th>
                    <td className="boldthtotal">$58.88</td>
                  </tr>
                  <tr>
                    <th>Shipping</th>
                    <td>$56.00</td>
                  </tr>
                  <tr>
                    <th>Discount </th>
                    <td>-$5.00</td>
                  </tr>
                  <tr>
                    <th>Import Tax</th>
                    <td>$5.00</td>
                  </tr>
                  <tr>
                    <th className="totalthtextbold">Order Total</th>
                    <td className="totalthtextbold">$ 103.00</td>
                  </tr>
                </table>
                <div className="imgtoop">
                  <img src={Payment} alt="" />
                  <Link to="/checkout">
                    <button
                      className="btn btn-info btn-lg gradientbtncolor"
                      type="button"
                    >
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Include */}
      <Category />
      {/* Category Include */}

      {/* Footer */}
      <Footer />
      {/* Footer */}
    </>
  );
};

export default ShoppingCart;
