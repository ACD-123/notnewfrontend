import React, { useState } from "react";
import Prdimage from "../assets/Images/Winningproduct/prdimge.png";

const WinningBidProduct = () => {

  const renderOrderBlock = (orderData, index) => {
    const { orderNumber, productName, images, condition, ended, winningbid, shipping, location, seller } = orderData;

 
    return (
      <div className="row align-items-center" key={orderNumber}
      style={{padding: "40px 0px"}}
      >
<h3>{productName}</h3>
          <div className="product-image">
          
            <div className="image">
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Product ${index + 1}`} />
              ))}
            </div>
            <div className="prd-details">
             <h5><b>Condition:</b> {condition}</h5>
             <h5><b>Ended:</b> {ended}</h5>
             <h5><b>Winning bid:</b> {winningbid}</h5>
             <h5><b>Shipping:</b> {shipping}</h5>
             <h5><b>Located in:</b> {location}</h5>
             <h5><b>Seller:</b> {seller}</h5>
            </div>
          </div>

      </div>
    );
  };

  const ordersData = [
    {
      orderNumber: "15s5d8e1",
      productName:
        "adidas Adizero SL Running Shoes Men's",
      images: [Prdimage],
      condition: "New with  box",
      ended: "Jun 12 , 2023  12:30 pm",
      winningbid: "USD $ 65.00",
      shipping: "$35.20  NOTNEW International Shipping",
      location: "Lanark, Illinois, United states",
      seller: "NotNew_OfficialStore ",
    },
    
  ];

  return (
    <>
      <div className="ongoing winning-bid">
        {ordersData.map((order, index) => (
          <React.Fragment key={index}>
            {renderOrderBlock(order, index)}
            {/* {index !== ordersData.length - 1 && <hr />} */}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default WinningBidProduct;
