import React, { useState, useEffect } from "react";
import OrderServices from "../../../services/API/OrderServices"; //~/services/API/OrderServices
import { Spinner } from "react-bootstrap";
import Select from 'react-select';
import { toast } from "react-toastify";

const SellingDetailsDashBoard = () => {
  const [dashboard, setDashboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const Months = [
    {
      value: 1, label: 'January'
    },
    {
      value: 2, label: 'February'
    },
    {
      value: 3, label: 'March'
    },
    {
      value: 4, label: 'April'
    },
    {
      value: 5, label: 'May'
    },
    {
      value: 6, label: 'June'
    },
    {
      value: 7, label: 'July'
    },
    {
      value: 8, label: 'August'
    },
    {
      value: 9, label: 'September'
    },
    {
      value: 10, label: 'October'
    },
    {
      value: 11, label: 'November'
    },
    {
      value: 12, label: 'December'
    }]
  const [month, setMonth] = useState(null)

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
              <div className="title">Hi {dashboard?.SellerName},</div>
              <div className="seller-new-dashboard-one">
                <div className="s-n-d-o-o">
                  <h4>Today Sales</h4>
                  <p>${dashboard?.totalSum}</p>
                  <div className="d-d">
                    <Select
                      value={month}
                      onChange={setMonth}
                      options={Months}
                      placeholder={'Select month'}
                    />
                  </div>
                </div>
                <div className="s-n-d-o-t">
                  <h4>Completed Orders</h4>
                  <p>{dashboard?.totalOrder}</p>
                  <div className="d-d">
                    <Select
                      value={month}
                      onChange={setMonth}
                      options={Months}
                      placeholder={'Select month'}
                    />
                  </div>
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
