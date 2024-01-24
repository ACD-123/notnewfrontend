import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Productimage from '../../assets/Images/Categorylisting/1.png';
import { Modal, Button } from 'react-bootstrap';
import Payment from "../../assets/Images/Shoppingcart/payment.png"
import Checkpay from "../../assets/Images/check-pay.png"
import { Link } from 'react-router-dom';
const Checkout = () => {

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
  
  return (
    <>
    <Header />
    <section id="cart-details">
        <div class="container">
            <h1>Checkout</h1>
            
            <div class="row">
                
                <div class="col-lg-8">
                    <div class="order-details" id="order-detailsid">
                        <h3>Pay with</h3>
                        <h6>Credit or Debit card</h6>
                        <span>Your payements are secured, Your Details are confedentials</span>
                        <input type="text" placeholder="Card Number" class="form-control" id="card-number" />
                        <div class="rowcol">
                            <input type="text" placeholder="Expiration Date" class="form-control" id="card-number" />
                            <input type="text" placeholder="Security Code" class="form-control" id="card-number" />
                        </div>
                        <div class="rowcol">
                            <input type="text" placeholder="First Name" class="form-control" id="card-number" />
                            <input type="text" placeholder="Last Name" class="form-control" id="card-number" />
                        </div>
                        <div id="flexCheckDefault">
                            <input class="form-check-input" type="checkbox" value=""  id="coloring" />
                            <p>&nbsp; Remember this card for the future</p>
                        </div>
                        <p>Billing Address</p>
                        <span class="tabstop">John Doe, 13101 SOUTHAMPTON ST DETROIT MI 48213-3700 USA</span>
                        <div class="tabs-check">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Paypal
                                </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"  />
                                <label class="form-check-label" for="flexCheckChecked">
                                    Google pay
                                </label>
                            </div>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"  />
                              <label class="form-check-label" for="flexCheckChecked">
                                    Apple pay
                              </label>
                              </div>
                            
                        
                            </div>
                    </div>
                    <div class="order-details" id="order-detailsid">
                        <h3>Shipping Details</h3>
                        <div class="shipping-details">
                       
                        <table style={{width: "100%"}}>
                            <tr>
                              <th class="boldthtotallight">Full Name :</th>
                              <td class="boldthtotallight">Sallu Roy</td>
                            </tr>
                            <tr>
                              <th class="boldthtotallight">Phone :</th>
                              <td>02184548845</td>
                            </tr>
                            <tr>
                              <th class="boldthtotallight">Address :</th>
                              <td>13101 SOUTHAMPTON ST DETROIT MI 48213-3700 USA</td>
                            </tr>
                          </table>
                          <p class="gradienttextcolor">Change Address</p>
                        </div>
                    </div>
                    <div class="order-details">
                        <h3 id="storetitle">Seller: NOT NEW_Official store</h3>
                        <div class="row">
                            <div class="col-lg-9">
                                <div class="product-detail">
                                   
                                    <div class="product-image">
                                        <img src={Productimage} />
                                    </div>
                                    <div class="product-order-details">
                                        <h5>adidas Adizero SL Running Shoes Men's</h5>
                                        <span>Size : 9.5 , Color: Red</span>
                                        <div class="quantitypadding"><p><b><span>QTY: 01</span></b></p></div>
                                        <span class="unter">International<br /> Shipping from<br /> United Kingdom</span>
                                    </div>
                                      
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="prices-order-details">
                                    <h4>US $ 38.99</h4>
                                    <span>+US $29.99</span>
                                </div>
                            </div>
                        </div>
                        <hr class="dashed" />
                    <div class="buttonright">
                    <button class="btn btn-info btn-lg transparent" type="button"  >Save for later</button>   
                    <button class="btn btn-info btn-lg danger" type="button"  >Save for later</button>  
                    </div>
                     
                        
                </div>

                </div>
                <div class="col-lg-4">
                <div class="order-details" id="totalordervalue">
                <h3>Order Total</h3>
                    <table style={{width: "100%"}}>
                        <tr>
                          <th class="boldthtotal">Subtotal ( 1 item )</th>
                          <td class="boldthtotal">$58.88</td>
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
                            <th class="totalthtextbold">Order Total</th>
                            <td class="totalthtextbold">$ 103.00</td>
                        </tr>
                      </table>
                      <div class="imgtoop">
          <img src={Payment} alt="" />
          <button class="btn btn-info btn-lg gradientbtncolor" onClick={handleShow} type="button">
            Confirm & Pay
          </button>
        </div>
                </div>

            </div> 
         
        </div>
        
            </div>
            <Modal show={showModal} onHide={handleClose}>
          <Modal.Body>
            <div className='checkpay'>
                <img src={Checkpay} />
                <h1>Order Success!</h1>
                <p>Your Order has been Sucessfully  placed!</p>
                <Link to="#"><button className='genrate-invoice'>Generate invoice</button></Link>
                <Link to="/shoppingcart"><button className='order-detail-btun'>Order Details</button></Link>
                <Link to="/"><button className='home-button'>Back To Home</button></Link>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* Add your payment processing logic or redirection here */}
            
          </Modal.Footer>
        </Modal>
    </section>
    <Footer />
    </>
  )
}

export default Checkout