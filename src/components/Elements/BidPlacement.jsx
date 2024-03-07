import React, { useState, useEffect } from "react";
import ProductServices from "../../services/API/ProductServices"; //~/services/API/ProductServices
import BidsServices from "../../services/API/BidsServices"; //~/services/API/BidsServices
import { toast } from "react-toastify";
import moment from "moment";

const BidPlacement = (props) => {
  const [totalBid, setTotalBid] = useState(0); // State to hold the total bid value
  const [productData, setProductData] = useState([]);
  const [totalbids, setTotalBids] = useState(0);
  const [hour, setHour] = useState("");
  const [currenttime, setCurrentTime] = useState("");
  const [minutes, setMinutes] = useState("");
  const { pathname } = window.location;
  const id = pathname.split("/").pop();

  const handleBidClick = (amount) => {
    props.parentCallback(amount)
    setTotalBid(`${amount}`); // Update the total bid value when a button is clicked
  };
  const getProduct = () => {
    ProductServices.get(id).then((response) => {
      setProductData(response);
      var date = new Date();
      var date1 = moment(date, "MM/DD/YYYY");
      var date2 = moment(
        moment(response.auction_listing).toDate(),
        "MM/DD/YYYY"
      );
      var duration = moment.duration(date2.diff(date1));
      var hours = duration.asHours();
      // var minutes = duration.asMinutes();
      // console.log('minutes', remianing.toString().split(".")[1])
      var minutes = hours.toFixed(2);
      setHour(hours.toString().split(".")[0]);
      setMinutes(minutes.toString().split(".")[1]);
      const currDate = new Date(); //.toLocaleTimeString;
      setCurrentTime(moment(currDate).format("hh:mm A"));
    });
  };
  const getTotalBids = () => {
    BidsServices.getProductBids(id).then((response) => {
      setTotalBids(response);
    });
  };

  useEffect(() => {
    getProduct();
    getTotalBids();
  }, []);
  return (
    <>
      <section id="increaseyourbids">
        <div className="details">
          {props.bidsPlaced ? (
            <h3>Increase your bid</h3>
          ):(
            <h3>Place your bid</h3>
          )}
          <p>
            $ {productData.bids} + $ {productData.shipping_price} shipping
          </p>
          <h4>
            <b>{totalbids} Bids</b>{" "}: <b>{props.maxbids} Max Bids</b> 
            <br />
            <br />
            <span>
              <b>Time Left :</b>{" "}
              <em>
                {hour} hrs :{minutes} Minutes :53 Seconds
              </em>
            </span>
          </h4>
          <div className="bidding-buttons-crease">
            <button onClick={() => handleBidClick("10")}>bid $ 10</button>
            <button onClick={() => handleBidClick("12")}>bid $ 12</button>
            <button onClick={() => handleBidClick("14")}>bid $ 14</button>
          </div>
          <hr />
        </div>
      </section>
    </>
  );
};

export default BidPlacement;
