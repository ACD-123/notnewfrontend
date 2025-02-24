import React, { useState } from "react";
import OrderServices from "../../services/API/OrderServices";
import { Modal, Button } from "react-bootstrap";
import Checkpay from "../../assets/Images/check-pay.png";
import { Link } from "react-router-dom";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
 
const Stripe = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const stripes = useStripe();
  let elements = useElements();

  const handleStripeSubmit = async (event) => {
    setIsLoading(true);
    setEnabled(true);
    event.preventDefault();

    if (elements == null) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }
    let loggedInUsers;
    let loggedInUser = localStorage.getItem("user_details");
    const user_id = localStorage.getItem('user_id');
    if (loggedInUser) {
        loggedInUsers = JSON.parse(loggedInUser);
    }
    var cartItems = [];
    let carts;
    if(props.orderType === 'bids'){
      cartItems.push(props.bidcart);
    }else{
      carts = props.cart;
      carts?.map((cart) => {
        let data;
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

    let data ={
        "buyer_id" : user_id,
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
      toast.error(error?.response?.data?.message)
        setIsLoading(false);
        setEnabled(false);
    });
  };
  return (
    <>
      <form onSubmit={handleStripeSubmit}>
        <PaymentElement />
        <div className="confirm-paybutton">
            <div className="imgtoop">
                <button type="submit" className="btn btn-info btn-lg gradientbtncolor"  disabled={enabled || !stripes || !elements}>
                {isLoading ? "loading.." : "Confirm & Pay"}
              </button>
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
              <Link to="/cart">
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
          </Modal.Footer>
        </Modal>
    </>
  );
}
export default Stripe;
