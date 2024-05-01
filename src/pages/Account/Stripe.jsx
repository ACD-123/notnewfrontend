import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { BASE_API } from "../../services/Constant";
import StripeService from "../../services/API/StripeService"; //~/services/API/StripeService
import OrderServices from "../../services/API/OrderServices"; //~/services/API/OrderServices
import { Modal, Button } from "react-bootstrap";
import Payment from "../../assets/Images/Shoppingcart/payment.png";
import Checkpay from "../../assets/Images/check-pay.png";
import { Link } from "react-router-dom";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
 
const Stripe = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const stripes = useStripe();
  let elements = useElements();

  const handleStripeSubmit = async (event) => {
    setIsLoading(true);
    setEnabled(true);
    event.preventDefault();
    // if(!props.changeAdds){
    //     props.parentCallback(false) 
    //     return;  
    // }
    if (elements == null) {
      return;
    }
    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }
    let loggedInUsers;
    let loggedInUser = localStorage.getItem("user_details");
    if (loggedInUser) {
        loggedInUsers = JSON.parse(loggedInUser);
    }
    var cartItems = [];
    let carts;
    console.log('carts', props.orderType)
    if(props.orderType === 'bids'){
      cartItems.push(props.bidcart);
    }else{
      carts = props.cart;
      carts?.map((cart) => {
        let data;
        // console.log('sss', cart.attributes)
        if(cart.attributes !== 'null'){
          data ={
            "product_id": cart.product_id,
            "quantity": cart.quantity,
            "price": parseFloat(cart.price) * parseInt(cart.quantity),
            "attributes": cart.attributes
          }
        }else{
          data ={
            "product_id": cart.product_id,
            "quantity": cart.quantity,
            "price": parseFloat(cart.price) * parseInt(cart.quantity),
            "attributes": []
          }
        }
          cartItems.push(data);
      })
    }
    console.log(JSON.stringify(cartItems))

    let data ={
        "buyer_id" : loggedInUsers.id,
        "payment_type": 'Stripe',
        "discountcode": localStorage.getItem('discountcode'),
        "orderItems": JSON.stringify(JSON.stringify(cartItems)),
        "subtotal_cost": props.subtotal,
        "actual_cost": props.subtotal,
        "shipping_cost": props.shippingprice,
        "prices": props.adminprices,
        "order_total": props.total,
        "Curency": "$",
        'secondaddress': props.secondAddress,
        "other_address":props.changeaddress,
        "zip": props.zip ? props.zip : "",
        "order_type": props.orderType,
        "address": props.address
    }
    OrderServices.save(data)
    .then(res => {
      if(res.status){
        setIsLoading(false);
        setEnabled(false);
        // handleShow(true);
        toast.success(res.data);
        localStorage.removeItem('bid_product');
        localStorage.removeItem('cupon');
      }else{
        toast.error(res.data);
      }
    })
    .catch(error => {
        console.log("ERROR:: ", error);
        setIsLoading(false);
        setEnabled(false);
    });

    // console.log('stripe responbce', client_secret)
    // const {client_secret: clientSecret} = await client_secret;
  };
  return (
    <>
      <form onSubmit={handleStripeSubmit}>
        <PaymentElement />
        <div className="confirm-paybutton">
          {/* <button type="submit" class="btn" disabled={!stripes || !elements}>
            Pay
          </button> */}
            <div className="imgtoop">
                {/* <img src={Payment} alt="" /> */}
                {/* <Link to="/checkout"> */}
                {/* <button
                    disabled={!stripes || !elements}
                    type="submit"
                    class="btn btn-info btn-lg gradientbtncolor"
                    // onClick={handleShow}
                >
                    Confirm & Pay
                </button> */}
                <button type="submit" class="btn btn-info btn-lg gradientbtncolor"  disabled={enabled || !stripes || !elements}>
                {isLoading ? "loading.." : "Confirm & Pay"}
              </button>
                {/* </Link> */}
            </div>
        </div>
      </form>
      <Modal show={showModal} onHide={handleClose}>
          <Modal.Body>
            <div className="checkpay">
              <img src={Checkpay} />
              <h1>Order Success!</h1>
              <p>Your Order has been Sucessfully placed!</p>
              <Link to="#">
                <button className="genrate-invoice">Generate invoice</button>
              </Link>
              <Link to="/shoppingcart">
                <button className="order-detail-btun">Order Details</button>
              </Link>
              <Link to="/">
                <button className="home-button">Back To Home</button>
              </Link>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* Add your payment processing logic or redirection here */}
          </Modal.Footer>
        </Modal>
    </>
  );
}
export default Stripe;
