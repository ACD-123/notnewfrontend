import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RightArrow from '../../assets/Images/rightarrow.png';
import Prdimage from '../../assets/Images/Singleproduct/prdimage.png';
import OrderServices from '../../services/API/OrderServices';
import { toast } from 'react-toastify';

const CompleteOrders = () => {
  const [customerOrders, setCustomerOrders] = useState([]);

  const getCustomerOrder = () => {
    OrderServices.customerRefundOrders()
      .then((response) => {
        console.log("refund", response);
        setCustomerOrders(response.data); // Assuming response.data contains the array of orders
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const renderOrderBlock = (order) => {
    return (
      <div className='row align-items-center' key={order.id}>
        <div className='col-lg-8'>
          <div className='product-image'>
            <div className='image'>
              <img src={Prdimage} alt={`Product`} />
            </div>
            <div className='prd-details'>
              <h5>Order # : <b>{order.orderid}</b></h5>
              <h3>{order.fullname}</h3>
            </div>
          </div>
        </div>

        <div className='col-lg-2'>
          <div className='delivery-bttn'>
            <Link to=''>
              {order.status == "Refund" ? (
                <>
                  <span style={{ color: "green" }}>Refund Order</span>
                </>
              ) : (
                ""
              )}
            </Link>
          </div>
        </div>
        <div className='col-lg-2'>
          <div className='rightarrow'>
            <Link to='/singleproduct'>
              <img src={RightArrow} alt='Right Arrow' />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getCustomerOrder();
  }, []);

  return (
    <>
      <div className='ongoing'>
        {customerOrders.map((order, index) => (
          <React.Fragment key={index}>
            {renderOrderBlock(order)}
            {index !== customerOrders.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default CompleteOrders;
