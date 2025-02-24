import React, { useState, useEffect } from "react";
import ProductServices from "../../services/API/ProductServices";
import BidsServices from "../../services/API/BidsServices";
import moment from "moment";

const BidPlacement = (props) => {
  const [totalBid, setTotalBid] = useState(0);
  const [productData, setProductData] = useState([]);
  const [bidone, setBidOne] = useState(0);
  const [bidtwo, setBidTwo] = useState(0);
  const [bidthree, setBidThree] = useState(0);
  const [totalbids, setTotalBids] = useState(0);
  const [hour, setHour] = useState("");
  const [currenttime, setCurrentTime] = useState("");
  const [minutes, setMinutes] = useState("");
  const { pathname } = window.location;
  const id = pathname.split("/").pop();

  const handleBidClick = (amount) => {
    props.parentCallback(amount)
    setTotalBid(`${amount}`);
  };
  const getProduct = () => {
    ProductServices.get(id).then((response) => {
      setProductData(response);
      setBidOne(parseFloat(response.bids) * 5);
      setBidTwo(parseFloat(response.bids) * 10);
      setBidThree(parseFloat(response.bids) * 15);
      var date = new Date();
      var date1 = moment(date).format('MM/DD/YYYY');
      var date2 = moment(response.auction_listing).format('MM/DD/YYYY');
      if(date1 === date2){
        var startTime = moment(response.auction_listing).format("hh:mm:ss a");
        var endTime =  moment(response.auction_End_listing).format("hh:mm:ss a");
        var startTime1 = moment(startTime, 'HH:mm:ss a');
        var endTime1 = moment(endTime, 'HH:mm:ss a');
        var duration = moment.duration(endTime1.diff(startTime1));
        var hours = parseInt(duration.asHours());
        var minutes = parseInt(duration.asMinutes()) % 60;
    
      }

      setHour(hours);
      setMinutes(minutes);
      const currDate = new Date();
      setCurrentTime(moment(currDate).format('hh:mm A'))
    });
  };
  const getTotalBids = () => {
    BidsServices.getProductBids(id).then((response) => {
      if(response.satus){
        setTotalBids(response.data);
      }
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
            <b>{totalbids == 0 ? (
              <></>
            ):(
              <>{totalbids} Bids</>
            )} </b>{" "} <b>{props.maxbids ? (<>
             : {props.maxbids} Max Bids
             <br />
              <br />
            </>):(<></>)}</b> 
            <span>
              <b>Time Left :</b>{" "}
              <em>
                {hour} hrs :{minutes} Minutes :53 Seconds
              </em>
            </span>
          </h4>
          <div className="bidding-buttons-crease">
            <button onClick={() => handleBidClick({bidone})}>bid $ {bidone}</button>
            <button onClick={() => handleBidClick({bidtwo})}>bid $ {bidtwo}</button>
            <button onClick={() => handleBidClick({bidthree})}>bid $ {bidthree}</button>
          </div>
          <hr />
        </div>
      </section>
    </>
  );
};

export default BidPlacement;
