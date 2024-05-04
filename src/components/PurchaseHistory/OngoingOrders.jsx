import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RightArrow from '../../assets/Images/rightarrow.png';
import Prdimage from '../../assets/Images/Singleproduct/prdimage.png';
import OrderServices from '../../services/API/OrderServices';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

const OngoingOrders = () => {
  const [customerOrders, setCustomerOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading state as true

  const getCustomerOrder = () => {
    OrderServices.customerOngoingOrders()
      .then((response) => {
        console.log("customer", response);
        setCustomerOrders(response.data); // Assuming response.data contains the array of orders
        setIsLoading(false); // Set isLoading to false when data is fetched
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false); // Set isLoading to false even if there's an error
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
            <Link to=''>Delivery in Process</Link>
          </div>
        </div>
        <div className='col-lg-2'>
          <div className='rightarrow'>
            {/* <Link to='/singleproduct'> */}
              <img src={RightArrow} alt='Right Arrow' />
            {/* </Link> */}
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
      {isLoading ? ( // Render loader if isLoading is true
        <div className="loader-container text-center">
          <Spinner animation="border" role="status">
            {/* <span className="sr-only">Loading...</span> */}
          </Spinner>
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
      </div>
    </>
  );
};

export default OngoingOrders;
