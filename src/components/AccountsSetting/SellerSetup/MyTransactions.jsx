import React, { useEffect, useState } from 'react';
import TransactionServices from "../../../services/API/TransactionServices";
import { Spinner } from 'react-bootstrap';
import NoDataFound from '../../Shared/NoDataFound';
import LoadingComponents from '../../Shared/LoadingComponents';
import { toast } from 'react-toastify';

const MyTransactions = () => {
  const [transactions, setTransactions] = useState({});
  let seller_guid = localStorage.getItem("seller_guid");
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading state as true

  const getTransactions = () => {
    TransactionServices.gettransactions(seller_guid)
      .then((response) => {
        setTransactions(response?.data);
        setIsLoading(false)
      }).catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false)
      })
  }
  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <>
      {isLoading ?
        <LoadingComponents/>
        :
        <div className="seller-new-transaction">
          <div className="title">Transactions</div>
          <div className="seller-new-transaction-one">
            <div className="s-n-d-o-o">
              <p>${transactions?.availableBalance}</p>
              <h4>Available Balance</h4>
            </div>
            <div className="s-n-d-o-t">
              <p>${transactions?.earned}</p>
              <h4>Total earning this month</h4>
              <div className="d-d"></div>
            </div>
            <div className="s-n-d-o-th">
            </div>
          </div>
          <div className="seller-new-transaction-two">
            <div className="two-title">Transactions History</div>
            <div className="s-n-t-t-transaction-listing">
              <div className="s-n-t-t-titles">
                <ul>
                  <li>Transaction Id</li>
                  <li>Date</li>
                  <li>Amount</li>
                  <li>Purpose</li>
                </ul>
              </div>
              <div className="s-n-t-t-listing">
                <div className="s-n-t-t-listing-wrap">
                  {transactions?.transactions?.length > 0 ?
                    transactions?.transactions?.map((data, index) => {
                      return (
                        <ul key={index}>
                          <li>{data?.id}</li>
                          <li>{data?.date?.slice(0, 10)}</li>
                          <li>${data?.amount}</li>
                          <li>{data?.type}</li>
                        </ul>
                      )
                    })
                    :
                    <NoDataFound title={'No transaction Found'}/>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default MyTransactions;
