import React, { useState, useEffect } from "react";
import OrderServices from "../../../services/API/OrderServices";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";


const SellingDetailsDashBoard = () => {
  const [dashboard, setDashboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const getDashboardData = () => {
    OrderServices.getDashboardData()
      .then((response) => {
        setDashboard(response);
        setIsLoading(false)
        localStorage.setItem('seller_guid', response?.sellerGuid)
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(error?.response?.data?.message)
      });
  };


  useEffect(() => {
    getDashboardData();
  }, []);



  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <>
          <>
            <div className="seller-new-dashboard">
              <div className="seller-desh">
                <div className="title">Hi {dashboard?.SellerName},</div>
              </div>
              <div className="seller-new-dashboard-one">
                <div className="s-n-d-o-o">
                  <h4>Today Sales</h4>
                  <p>${dashboard?.totalSum}</p>
                </div>
                <div className="s-n-d-o-t">
                  <h4>Completed Orders</h4>
                  <p>{dashboard?.totalOrder}</p>
                </div>
              </div>
            </div>

           
          </>
        </>
      )}

    </>
  );
};

export default SellingDetailsDashBoard;
