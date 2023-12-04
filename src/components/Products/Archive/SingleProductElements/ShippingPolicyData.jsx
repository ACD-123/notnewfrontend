import React from "react";
import Payment from '../../../../assets/Images/Shoppingcart/payment.png'
const ShippingPolicyData = () => {
  return (
    <>
      <div className="shippingpolicy" style={{ padding: "30px 0px" }}>
        <h4>Shipping:</h4>
        <p>
          US $22.00 Expedited International Shipping. See details for shipping
          International shipment of items may be subject to customs processing
          and additional charges. Located in: Michigan, United States
        </p>
        <h4>Delivery:</h4>
        <p>
        Expedited International Shipping Estimated between Thu, Jul 20 and Thu, Jul 27 to 75960
Seller ships within 3 days after receiving cleared payment.
Please allow additional time if international delivery is subject to customs processing.
        </p>
        <h4>
        Returns:
        </h4>
        <p>30 days returns. Buyer pays for return shipping. See details- for more information about returns</p>
        <h4>Payments: <img src={Payment} /></h4>
      </div>
    </>
  );
};

export default ShippingPolicyData;
