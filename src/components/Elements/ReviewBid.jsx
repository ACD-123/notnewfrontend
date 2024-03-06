import React, { useState, useEffect } from "react";
import ProductServices from "../../services/API/ProductServices"; //~/services/API/ProductServices
import { toast } from "react-toastify";
import moment from "moment";

const ReviewBid = (props) => {
  const [currentbid, setCurrentBid] = useState({});
  const [productDatas, setProductData] = useState([]);
  const [shippingprice, setShippingPrice] = useState(0);
  const [shippingaddress, setShippingAddress] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinutes] = useState("");
  const [currenttime, setCurrentTime] = useState("");
  const [productData, setProduct] = useState({
    CurrentBid: "00.00", //'89.00',
    YourMaxBid: "00.00",
    Timeleft: "",
    ShippingPrice: "$ 00.00",
    ShippingLocation: "No Address",
    ImportCharges: "00.00",
    EstimatedTotal: "$ 00.00",
    note: "*This item may be subject to duties and taxes upon delivery. *Applicable tax and other charges may be added at checkout.",
  });

  const { pathname } = window.location;
  const id = pathname.split("/").pop();
  if (props.bids) {
    let data = {
      CurrentBid: props.bids.max_bids, //'89.00',
      YourMaxBid: "24",
      Timeleft: currenttime,
      ShippingPrice: "$ " + shippingprice,
      ShippingLocation: shippingaddress ? shippingaddress : "No Address",
      ImportCharges: "89.00",
      EstimatedTotal: "$ " + props.bids.estimated_total,
      note: "*This item may be subject to duties and taxes upon delivery. *Applicable tax and other charges may be added at checkout.",
    };
    setProduct(data);
  } else {
    let datab = {
      CurrentBid: "00.00", //'89.00',
      YourMaxBid: "00.00",
      Timeleft: "",
      ShippingPrice: "$ 00.00",
      ShippingLocation: "No Address",
      ImportCharges: "00.00",
      EstimatedTotal: "$ 00.00",
      note: "*This item may be subject to duties and taxes upon delivery. *Applicable tax and other charges may be added at checkout.",
    };
    setProduct(datab);
  }
  const getProduct = () => {
    ProductServices.get(id).then((response) => {
      setProductData(response);
      setShippingPrice(response.shipping_price);
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
      const currDate = hour + " hrs :" + minute + " mins";
      setCurrentTime(currDate);
    });
  };

  useEffect(() => {
    setCurrentBid(props.bids);
    getProduct();
    let user = JSON.parse(localStorage.getItem("user_details"));
    setShippingAddress(user.address);
  }, []);
  return (
    <>
      <section id="reviewbid">
        <div className="container">
          <h3>Review your bid</h3>
          <div className="row">
            {productData ? (
              <>
                {productData.map((product) => (
                  <div className="col" key={product.id}>
                    <div className="review-bids-list">
                      <ul>
                        <li>
                          <span>Current Bid:</span>{" "}
                          <em>{product.CurrentBid}</em>
                        </li>
                        <li>
                          <span>Your Max Bid:</span>{" "}
                          <em>{product.YourMaxBid}</em>
                        </li>
                        <li>
                          <span>Time left:</span>{" "}
                          <em style={{ color: "red" }}>{product.Timeleft}</em>
                        </li>
                        <li>
                          <span>Shipping Price:</span>{" "}
                          <em>{product.ShippingPrice}</em>
                        </li>
                        <li>
                          <span>Shipping Location:</span>{" "}
                          <em>{product.ShippingLocation}</em>
                        </li>
                        <li>
                          <span>Import Charges:</span>{" "}
                          <em>{product.ImportCharges}</em>
                        </li>
                        <li>
                          <span>Estimated Total:</span>{" "}
                          <em>{product.EstimatedTotal}</em>
                        </li>
                        <li>
                          <em>{product.note}</em>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ReviewBid;
