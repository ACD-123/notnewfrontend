import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RightArrow from '../../assets/Images/rightarrow.png';
import Prdimage from '../../assets/Images/Singleproduct/prdimage.png';
import OrderServices from '../../services/API/OrderServices';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import NoDataFound from '../../assets/Images/do-data-found.png';

const OngoingOrders = ({ isLoading, setIsLoading }) => {
  const [customerOrders, setCustomerOrders] = useState([]);

  const getCustomerOrder = () => {
    OrderServices.customerOngoingOrders()
      .then((response) => {
        setCustomerOrders(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCustomerOrder();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader-container text-center">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : (
        <div className='ongoing'>
          {customerOrders?.length === 0 ? (
            <div className='no-data-found'>
              <img src={NoDataFound} alt="" />
              <p>Orders Not  Found</p>
            </div>
          ) : (
            <>
              {customerOrders.map((order, index) => (
                <>
                  <div className='row align-items-center' key={order?.id}>
                    <div className='col-lg-8'>
                      <div className='product-image'>
                        <div className='image'>
                          <img src={Prdimage} alt={`Product`} />
                        </div>
                        <div className='prd-details'>
                          <h5>Order # : <b>{order?.orderid}</b></h5>
                          <h3>{order?.fullname}</h3>
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
                        <img src={RightArrow} alt='Right Arrow' />
                      </div>
                    </div>
                  </div>
                  {index !== customerOrders?.length - 1 && <hr />}
                </>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default OngoingOrders;
