import React, { useState, useEffect } from "react";
import ProductServices from "../../../../services/API/ProductServices"; //~/services/API/ProductServices
import Payment from '../../../../assets/Images/Shoppingcart/payment.png'
import moment from "moment";
const ShippingPolicyData = () => {
  const [productData, setProductData] = useState([]);
  const [days, setDays] = useState(0);
  const { pathname } = window.location;
  const id = pathname.split("/").pop();
  const [isLoading, setIsLoading] = useState(true);
  let now,end,duration;
  const getProduct = () => {
    setIsLoading(true);

    ProductServices.get(id).then((response) => {
      setProductData(response.data);
      now = moment(response.data.shipping_end); 
      end = moment(response.data.shipping_start); 
      duration = moment.duration(now.diff(end));
      setIsLoading(false);

      setDays(Math.round(duration.asDays()));
    });
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
    {isLoading ? (
          <div>Loading...</div>
        ) : (
      <div className="shippingpolicy">
        <h4>Shipping:</h4>
        <p>
          US ${productData.shipping_price ? productData.shipping_price : 0} Expedited International Shipping. See details for shipping
          International shipment of items may be subject to customs processing
          and additional charges. Located in: {productData.location}
        </p>
        <h4>Delivery:</h4>
        <p>
        Expedited International Shipping Estimated between {moment(productData.shipping_start).format("ll")} and {moment(productData.shipping_end).format("ll")} to {productData.zip}
        Seller  {days?(<>{days}</>):(0)} days after receiving cleared payment.
        Please allow additional time if international delivery is subject to customs processing.
        </p>
        <h4>
        Returns:
        </h4>
        <p>{productData.return_ship_duration_limt ? (<>{productData.return_ship_duration_limt} days returns. Buyer pays for return shipping. See details- for more information about returns</>):('')} </p>
        <h4>Payments: <img src={Payment} /></h4>
      </div>
        )}
    </>
  );
};

export default ShippingPolicyData;
