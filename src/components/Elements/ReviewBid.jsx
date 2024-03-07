import React, { useState, useEffect } from "react";
import ProductServices from "../../services/API/ProductServices"; //~/services/API/ProductServices
import { toast } from "react-toastify";
import moment from "moment";

const ReviewBid = (props) => {
  const [currentbid, setCurrentBid] = useState(props.bids);
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
      let user = JSON.parse(localStorage.getItem("user_details"));
      setShippingAddress(user.address);
    });
  };
  const getBids = () => {
    if (props.bids) {
      let data = {
        CurrentBid: "$ " + props.bids.max_bids, //'89.00',
        YourMaxBid: "$ " + props.maxbids,
        Timeleft: currenttime,
        ShippingPrice: "$ " + props.shippingprice,
        ShippingLocation: shippingaddress ? shippingaddress : "No Address",
        ImportCharges: "$ 89.00",
        EstimatedTotal: "$ " + props.bids.estimated_total,
        note: "*This item may be subject to duties and taxes upon delivery. *Applicable tax and other charges may be added at checkout.",
      };
      setProduct(data);
    } else {
      let datab = {
        CurrentBid: "$ 00.00", //'89.00',
        YourMaxBid: "$ 00.00",
        Timeleft: "",
        ShippingPrice: "$ 00.00",
        ShippingLocation: "No Address",
        ImportCharges: "$ 00.00",
        EstimatedTotal: "$ 00.00",
        note: "*This item may be subject to duties and taxes upon delivery. *Applicable tax and other charges may be added at checkout.",
      };
      setProduct(datab);
    }
  };
  useEffect(() => {
    getProduct();
    getBids();
  }, []);
  return (
    <>
      <section id="reviewbid">
        <div className="container">
          <h3>Review your bid</h3>
          <div className="row">
            {productData ? (
              <>
                {/* {productData.map((product) => ( */}
                <div className="col">
                  <div className="review-bids-list">
                    <ul>
                      {productData.CurrentBid ? (
                        <>
                          <li>
                            <span>Current Bid:</span>{" "}
                            <em>{productData.CurrentBid}</em>
                          </li>
                        </>
                      ) : (
                        ""
                      )}
                      {productData.YourMaxBid ? (
                        <>
                          <li>
                            <span>Your Max Bid:</span>{" "}
                            <em>{productData.YourMaxBid}</em>
                          </li>
                        </>
                      ) : (
                        ""
                      )}
                      {productData.Timeleft ? (
                        <>
                          <li>
                            <span>Time left:</span>{" "}
                            <em style={{ color: "red" }}>
                              {productData.Timeleft}
                            </em>
                          </li>
                        </>
                      ) : (
                        ""
                      )}
                      {productData.ShippingPrice ? (
                        <>
                          <li>
                            <span>Shipping Price:</span>{" "}
                            <em>{productData.ShippingPrice}</em>
                          </li>
                        </>
                      ) : (
                        ""
                      )}
                      {productData.ShippingLocation ? (
                        <>
                          <li>
                            <span>Shipping Location:</span>{" "}
                            <em>{productData.ShippingLocation}</em>
                          </li>
                        </>
                      ) : (
                        ""
                      )}
                      {productData.ImportCharges ? (
                        <>
                          <li>
                            <span>Import Charges:</span>{" "}
                            <em>{productData.ImportCharges}</em>
                          </li>
                        </>
                      ) : (
                        ""
                      )}
                      {productData.EstimatedTotal ? (
                        <>
                          <li>
                            <span>Estimated Total:</span>{" "}
                            <em>{productData.EstimatedTotal}</em>
                          </li>
                        </>
                      ) : (
                        ""
                      )}
                      {productData.note ? (
                        <>
                          <li>
                            <em>{productData.note}</em>
                          </li>
                        </>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                </div>
                {/* ))} */}
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
