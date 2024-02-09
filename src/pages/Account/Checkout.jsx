import React, { useState, useEffect } from "react";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Productimage from '../../assets/Images/Categorylisting/1.png';
import { Modal, Button } from 'react-bootstrap';
import Payment from "../../assets/Images/Shoppingcart/payment.png"
import Checkpay from "../../assets/Images/check-pay.png"
import { Link } from 'react-router-dom';
import ShippingServices from "../../services/API/ShippingServices"; //~/services/API/ShippingServices
import UserServices from "../../services/API/UserServices"; //~/services/API/UserServices
import CartServices from "../../services/API/CartServices"; //~/services/API/CartServices
import PriceServices from "../../services/API/PriceServices"; //~/services/API/PriceServices

const Checkout = () => {
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState({});
    const [userdetails, setUserDetails] = useState({});
    const [discountcode, setdiscountCode] = useState("");
    const [cart, setCart] = useState({});
    const [cartitem, setCartItems] = useState(0);
    const [prices, setPrices] = useState({});
    const [subTotal, setsubTotal] = useState(0);
    const [shippingprice, setShippingPrice] = useState(0);
    const [amountaddingprices, setAmountAddingPrices] = useState(0);
    const [discountPrices, setDiscountPrices] = useState(0);
    const [adminprices, setAdminPrices] = useState(0);
  
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const getSelf =()=>{
      ShippingServices.self().then((response) => {
        setUserDetails(response);
      });
    }
    const getUser =() =>{
      UserServices.self().then((response) => {
        setUser(response);
      });
    }
    const getCart = () => {
      CartServices.self().then((response) => {
        console.log('cart response', response)
        setCart(response);
      });
    };
    const getPrices = () => {
      PriceServices.all().then((response) => {
        setPrices(response);
      });
    };
  
    const handlePrices = () => {
      var cartPrice = [];
      var shippingPrice = [];
      var allPrices = [];
      if(cart.length > 0){
        cart.map((cat) => {
          cartPrice.push(cat.price)
          shippingPrice.push(cat.products.shipping_price);
        })
      }
      if(prices.length > 0){
        prices.map((price) => {
          if(price.name !== 'Discount'){
            allPrices.push(price.value)
          }else if(price.name === 'Discount'){
            setDiscountPrices(price.value)
          }
        })
      }
      setsubTotal(cartPrice.reduce((a,v) =>  a = a + v , 0 ));
      setShippingPrice(shippingPrice.reduce((a,v) =>  a = a + v , 0 ));
      setAdminPrices(allPrices.reduce((a,v) => a = a + v , 0 ))
      var amountAfterDiscount = subTotal - discountPrices;
      var amountbyaddingprices = amountAfterDiscount + adminprices;
      setAmountAddingPrices(amountbyaddingprices);
    };
    
    useEffect(() => {
      setdiscountCode(localStorage.getItem('discountCode'));
      getSelf();
      getUser();
      getCart();
      getPrices();
      handlePrices();
    }, []);
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
                        <span class="tabstop">{userdetails?.street_address}</span>
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
                              <td class="boldthtotallight">{user.name}</td>
                            </tr>
                            <tr>
                              <th class="boldthtotallight">Phone :</th>
                              <td>{user.phone}</td>
                            </tr>
                            <tr>
                              <th class="boldthtotallight">Address :</th>
                              <td>{userdetails?.street_address}</td>
                            </tr>
                            <tr>
                              <th>Discount Code</th>
                              <td>{discountcode}</td>
                            </tr>
                          </table>
                          <p class="gradienttextcolor">Change Address</p>
                        </div>
                    </div>
                    <div class="order-details">
                      {cart.length > 0 ? (
                                <>
                          {cart.map((cat, index) => {
                          let attributes = JSON.parse(cat.attributes);
                          return (
                            <>
                            <h3 id="storetitle">Seller: {cat.shop?.fullname}</h3>
                                <div class="row">
                            <div class="col-lg-9">
                                <div class="product-detail">
                                    <div class="product-image">
                                        <img src={Productimage} />
                                    </div>
                                    <div class="product-order-details">
                                        <h5>{cat.products?.name}</h5>
                                        {/* <span>Size : 9.5 , Color: Red</span> */}
                                        {attributes.length > 0 ? (
                                    <>
                                      {attributes.map((attribute, index) => {
                                        return (
                                          <>
                                            {attribute.color}
                                            <span>
                                              {attribute.size ? (
                                                <>Size : {attribute.size}</>
                                              ) : (
                                                ""
                                              )}{" "}
                                              {attribute.color ? (
                                                <>
                                                  Color:{" "}
                                                  <div
                                                    style={{
                                                      background:
                                                        attribute.color,
                                                    }}
                                                  >
                                                    &nbsp;
                                                  </div>
                                                </>
                                              ) : (
                                                ""
                                              )}
                                            </span>
                                          </>
                                        );
                                      })}
                                    </>
                                  ) : (
                                    ""
                                  )}
                                        <div class="quantitypadding"><p><b><span>QTY: {cat.quantity}</span></b></p></div>
                                        <span class="unter">International<br /> Shipping from<br />{cat.products?.location}</span>
                                    </div>
                                      
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="prices-order-details">
                                <h4>US $ {cat.products?.price}</h4>
                                <span>
                                  +US $
                                  {cat.products?.price + cat.products?.shipping_price}
                                </span>
                                </div>
                            </div>
                        </div>
                        {/* <hr class="dashed" /> */}
                    {/* <div class="buttonright">
                    <button class="btn btn-info btn-lg transparent" type="button"  >Save for later</button>   
                    <button class="btn btn-info btn-lg danger" type="button"  >Save for later</button>  
                    </div> */}
                            </>
                          )})}
                        
                                </>):('')}
                        
                </div>

                </div>
                <div class="col-lg-4">
                {cart.length > 0 ? (
                <>
                  <div className="order-details" id="totalordervalue">
                    <h3>Order Total</h3>
                    <table style={{ width: "100%" }}>
                      <tr>
                        <th className="boldthtotal">
                          Subtotal ( {cartitem} items )
                        </th>
                        <td className="boldthtotal">$ {subTotal}</td>
                      </tr>
                      <tr>
                        <th>Shipping</th>
                        <td>$ {shippingprice}</td>
                      </tr>
                      {/* <tr>
                            <th>Income Tax</th>
                            <td>$ 4.0</td>
                          </tr> */}

                      {prices.length > 0 ? (
                        <>
                          {prices.map((price, index) => {
                            return (
                              <>
                                <tr>
                                  <th>{price.name}</th>
                                  <td>$ {(price.name == 'Discount') ? (<>
                                    - {price.value}
                                  </>):(price.value)}</td>
                                </tr>
                              </>
                            );
                          })}
                        </>
                      ) : (
                        ""
                      )}
                      <tr>
                        <th className="totalthtextbold">Order Total</th>
                        <td className="totalthtextbold">
                          $ {amountaddingprices}
                        </td>
                      </tr>
                    </table>
                    <div className="imgtoop">
                      <img src={Payment} alt="" />
                      <Link to="/checkout">
                      <button class="btn btn-info btn-lg gradientbtncolor" onClick={handleShow} type="button">
                        Confirm & Pay
                      </button>
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="order-details" id="totalordervalue">
                    <h3>Order Total</h3>
                    <table style={{ width: "100%" }}>
                      <tr>
                        <th className="boldthtotal">Subtotal</th>
                        <td className="boldthtotal">$00.00</td>
                      </tr>
                      <tr>
                        <th className="totalthtextbold">Order Total</th>
                        <td className="totalthtextbold">$ 00.00</td>
                      </tr>
                    </table>
                    <div className="imgtoop">
                      <img src={Payment} alt="" />
                    </div>
                  </div>
                </>
              )}
          {/* <button class="btn btn-info btn-lg gradientbtncolor" onClick={handleShow} type="button">
            Confirm & Pay
          </button> */}

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