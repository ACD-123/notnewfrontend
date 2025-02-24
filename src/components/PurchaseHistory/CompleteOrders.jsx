import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RightArrow from "../../assets/Images/rightarrow.png";
import Prdimage from "../../assets/Images/Singleproduct/prdimage.png";
import Prdimage1 from "../../assets/Images/Singleproduct/Product1.png";
import Prdimage2 from "../../assets/Images/Singleproduct/Product2.png";
import Checkpay from "../../assets/Images/check-pay.png";
import RefundPopup from "./RedundPopup";
import OrderServices from "../../services/API/OrderServices";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import NoDataFound from '../../assets/Images/do-data-found.png';

const CompleteOrders = () => {
  const [refundDetailsVisible, setRefundDetailsVisible] = useState({});
  const [requestSentVisible, setRequestSentVisible] = useState({});
  const [customerOrders, setCustomerOrders] = useState([]);
  const [refundOrders, setRefundOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCustomerOrder = () => {
    OrderServices.customerCompletedOrders()
      .then((response) => {
        setCustomerOrders(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false);
      });
  };
  const renderOrderBlock = (order) => {
    const refundOrder = (order) => {
      OrderServices.getbyid(order.id)
        .then((response) => {
          setRefundOrders(response.data);
          handleRefundClick(order.id);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message)
        });
    };

    const handleRefundClick = (orderId) => {
      setRefundDetailsVisible({
        ...refundDetailsVisible,
        [orderId]: true,
      });
    };

    const handleCloseRequestSent = (orderIndex, index) => {
      setRequestSentVisible({
        ...requestSentVisible,
        [orderIndex]: false,
      });
    };

    return (
      <div className="row align-items-center" key={order.id}>
        <div className="col-lg-8">
          <div className="product-image">
            <div className="image">
              <img src={Prdimage} alt={`Product`} />
            </div>
            <div className="prd-details">
              <h5>
                Order # : <b>{order.orderid}</b>
              </h5>
              <h3>{order.fullname}</h3>
            </div>
          </div>
        </div>

        <div className="col-lg-2">
          <div className="delivery-bttn">
            <Link to="">
              {order.status == "Delivered" ? (
                <>
                  <span style={{ color: "green" }}>Order Completed</span>
                </>
              ) : (
                ""
              )}
            </Link>
          </div>
        </div>
        <div className="col-lg-2">
          <div className="refund-reorder">
            <button className="refund" onClick={() => refundOrder(order)}>
              Want Refund
            </button>
            <Link to="/cart">
              <button>Re order</button>
            </Link>
          </div>
        </div>
        {refundDetailsVisible[order.id] && (
          <div className="refund-popup">
            <div className="refund-popup-inner">
              <div className="refunddetailss">
                <RefundPopup orderId={order.id} />
              </div>
            </div>
          </div>
        )}

        {requestSentVisible[order.id] && (
          <div className="request-sent-popup">
            <div className="request-sent-inner">
              <img src={Checkpay} />
              <h2>Request Sent</h2>
              <p>Your Refund request send sucessfully</p>
              <button onClick={() => handleCloseRequestSent(order.id)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    getCustomerOrder();
  }, []);

  return (
    <>
      <div className="ongoing">
        {isLoading ? (
          <div className="loader-container text-center">
            <Spinner animation="border" role="status">
            </Spinner>
          </div>
        ) : (
          <>
            {customerOrders.length === 0 ? (
              <div className='no-data-found'>
                <img src={NoDataFound} alt="" />
                <p>Orders Not  Found</p>
              </div>
            ) : (
              <>
                {customerOrders.map((order, index) => (
                  <React.Fragment key={index}>
                    {renderOrderBlock(order)}
                    {index !== customerOrders.length - 1 && <hr />}
                  </React.Fragment>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CompleteOrders;
