import React, { useState, useEffect } from "react";
import ProductServices from "../../services/API/ProductServices";
import UserServices from "../../services/API/UserServices";
import moment from "moment";
import BidCheck from '../../assets/Images/bidcheck.png'

const PlaceYourBid = (props) => {
  const [productData, setProductData] = useState([]);
  const [totalbids, setTotalBids] = useState(0);
  const [hour, setHour] = useState("");
  const [currenttime, setCurrentTime] = useState("");
  const [minutes, setMinutes] = useState("");
  const { pathname } = window.location;
  const id = pathname.split("/").pop();

  const getProduct = () => {
    ProductServices.get(id).then((response) => {
      setProductData(response);
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
        setHour(hours);
        setMinutes(minutes);
      }
      const currDate = new Date();
      setCurrentTime(moment(currDate).format('hh:mm A'))
    });
  };
  const getTotalBids = () => {
    UserServices.getBid(id).then((response) => {
      if(response.satus){
        setTotalBids(response.data?.max_bids);
      }
    });
  };

  useEffect(() => {
    getProduct();
    getTotalBids();
  }, []);

  return (
    <>
    <section id='placeyourbid'>
        <h3>Place your bid</h3>
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
              <em style={{color: "#DE0023", fontStyle: "unset"}}>
                {hour} hrs :{minutes} Minutes :53 Seconds
              </em>
            </span>
          </h4>

        <h5><img src={BidCheck} />Your current bid puts on the top in the lead </h5>
        <h2>Your max bid: $ {totalbids}</h2>
    </section>
    </>
  )
}

export default PlaceYourBid