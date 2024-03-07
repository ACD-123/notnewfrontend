import React, { useState, useEffect } from "react";
import Prdimage from "../assets/Images/Winningproduct/prdimge.png";
import UserServices from "../services/API/UserServices"; //~/services/API/UserServices
import ProductServices from "../services/API/ProductServices"; //~/services/API/ProductServices
import {BASE_URL} from "../services/Constant"
import blank from "../assets/Images/Productcard/blank.jpg";
import { toast } from "react-toastify";
import moment from "moment";

const WinningBidProduct = (props) => {
  const [bidata, setBidData] = useState({});
  const [product, setProduct] = useState({});
  const { pathname } = window.location;
  const id = pathname.split("/").pop();

  const renderOrderBlock = (orderData) => {
    const { orderNumber, productName, images, condition, ended, winningbid, shipping, location, seller } = orderData;

    return (
      <div className="row align-items-center" key={orderNumber}
      style={{padding: "40px 0px"}}
      >
        {orderData ?(
          <>
          {product ? (
            <>
              <h3>{product.name}</h3>
            </>
          ):('')}
            
          <div className="product-image">
          {product ? (
            <>
            <div className="image">
              {props.img ? (
                <>
                  <img src={`${BASE_URL}/image/product/${props.img}`} alt={product?.name} />
                </>
              ):(
                <>
                  <img src={blank} alt="blank" />
                </>
              )}
              {/* {images.map((image, index) => (
                <img key={index} src={image} alt={`Product ${index + 1}`} />
              ))} */}
            </div>
            </>):('')}
            <div className="prd-details">
            {product ? (
              <>
               <h5><b>Condition:</b> {product?.condition}</h5>
             </>):('')}
             <h5><b>Ended:</b> ended</h5>
             <h5><b>Winning bid:</b> $ {props?.totalbid}</h5>
             {product ? (
              <>
             <h5><b>Shiping Cost:</b> $ {product?.shipping_price}</h5>
                <h5><b>Located in:</b> {product.shop?.address}</h5>
                <h5><b>Seller:</b> {product.shop?.fullname}</h5>
              </>
             ):('')}
            </div>
          </div>
          </>
        ):('')}
    
      </div>
    );
  };
  const ordersData = [
    {
      orderNumber: "15s5d8e1",
      productName: "adidas Adizero SL Running Shoes Men's",
      images: [Prdimage],
      condition: "New with  box",
      ended: "Jun 12 , 2023  12:30 pm",
      winningbid: "USD $ 65.00",
      shipping: "$35.20  NOTNEW International Shipping",
      location: "Lanark, Illinois, United states",
      seller: "NotNew_OfficialStore ",
    },
    
  ];
  const getUserProductBids = () =>{
    UserServices.getBid(id).then((response) => {
      if(response.status){
        setBidData(response.data);
      }
    });
  }
  const getProduct = () =>{
    ProductServices.get(id).then((response) => {
      console.log('product', response)
      setProduct(response)
    });
  }
  useEffect(() => {
    getUserProductBids();
    getProduct();
  }, []);

  return (
    <>
      <div className="ongoing winning-bid">
        {bidata ? (
          <>
            <React.Fragment>
            {renderOrderBlock(bidata)}
            {/* {index !== ordersData.length - 1 && <hr />} */}
            </React.Fragment>
          </>
        ):('')}
        {/* {ordersData.map((order, index) => (
          <React.Fragment key={index}>
            {renderOrderBlock(order, index)} */}
            {/* {index !== ordersData.length - 1 && <hr />} */}
          {/* </React.Fragment>
        ))} */}
      </div>
    </>
  );
};

export default WinningBidProduct;
