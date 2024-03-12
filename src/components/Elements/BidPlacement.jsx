import React, { useState, useEffect } from "react";
import ProductServices from "../../services/API/ProductServices"; //~/services/API/ProductServices
import BidsServices from "../../services/API/BidsServices"; //~/services/API/BidsServices
import { toast } from "react-toastify";
import moment from "moment";

const BidPlacement = (props) => {
  const [totalBid, setTotalBid] = useState(0); // State to hold the total bid value
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
    setTotalBid(`${amount}`); // Update the total bid value when a button is clicked
  };
  const getProduct = () => {
    ProductServices.get(id).then((response) => {
      setProductData(response);
      setBidOne(parseFloat(response.bids) * 5);
      setBidTwo(parseFloat(response.bids) * 10);
      setBidThree(parseFloat(response.bids) * 15);
      // var date = new Date();
      // var date1 = moment(date, "MM/DD/YYYY");
      // var date2 = moment(
      //   moment(response.auction_listing).toDate(),
      //   "MM/DD/YYYY"
      // );
      // var duration = moment.duration(date2.diff(date1));
      // var hours = duration.asHours();
      // // var minutes = duration.asMinutes();
      // // console.log('minutes', remianing.toString().split(".")[1])
      // var minutes = hours.toFixed(2);
      // setHour(hours.toString().split(".")[0]);
      // setMinutes(minutes.toString().split(".")[1]);
      // const currDate = new Date(); //.toLocaleTimeString;
      // setCurrentTime(moment(currDate).format("hh:mm A"));
      var date = new Date();
      var date1 = moment(date).format('MM/DD/YYYY');
      var date2 = moment(response.auction_listing).format('MM/DD/YYYY');//moment(moment(response.auction_listing).toDate(), 'MM/DD/YYYY'); 
      if(date1 === date2){
        console.log('auction_listing', response.auction_listing)
        console.log('auction_End_listing', response.auction_End_listing)
        //for date difference
        // console.log('diff', moment(response.auction_listing).diff(response.auction_End_listing, 'days'))
        // var startTime1 = moment('12:16:59 am', 'HH:mm:ss a');
        // var endTime1 = moment('06:12:07 pm', 'HH:mm:ss a');
        var startTime = moment(response.auction_listing).format("hh:mm:ss a");
        var endTime =  moment(response.auction_End_listing).format("hh:mm:ss a");
        var startTime1 = moment(startTime, 'HH:mm:ss a');
        var endTime1 = moment(endTime, 'HH:mm:ss a');
        console.log('startTime', startTime)
        console.log('endTime', endTime)
        console.log('startTime1', startTime1)
        console.log('endTime1', endTime1)
        // calculate total duration
        var duration = moment.duration(endTime1.diff(startTime1));
        // duration in hours
        var hours = parseInt(duration.asHours());

        // duration in minutes
        var minutes = parseInt(duration.asMinutes()) % 60;

        console.log(hours + ' hour and ' + minutes + ' minutes.');      
      }
      // console.log('aucrtioned Product', moment(response.auction_listing).format('MM/DD/YYYY'))
      // console.log('date', moment(date).format('MM/DD/YYYY'))
      
      // var duration = moment.duration(date2.diff(date1));
      // var hours = duration.asHours(); 
      // // var minutes = duration.asMinutes(); 
      // // console.log('minutes', remianing.toString().split(".")[1]) 
      // var minutes = hours.toFixed(2);
      // setHour(hours.toString().split(".")[0]);
      setHour(hours);
      // setMinutes(minutes.toString().split(".")[1]);
      setMinutes(minutes);
      const currDate = new Date();//.toLocaleTimeString;
      setCurrentTime(moment(currDate).format('hh:mm A'))
    });
  };
  const getTotalBids = () => {
    BidsServices.getProductBids(id).then((response) => {
      if(response.satus){
        console.log('aa', response.data)
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
