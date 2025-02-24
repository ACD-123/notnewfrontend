import React, { useEffect, useState } from 'react';
import TransactionServices from "../../../services/API/TransactionServices";
import NoDataFound from '../../Shared/NoDataFound';
import LoadingComponents from '../../Shared/LoadingComponents';
import { toast } from 'react-toastify';
import { Modal } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import SellerServices from "../../../services/API/SellerServices";

const MyTransactions = () => {
  const [transactions, setTransactions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const seller_guid = localStorage.getItem('seller_guid');
  const [withdrawData, setWithdrawData] = useState({
    amount: ''
  });

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setWithdrawData(prev => ({ ...prev, [name]: checked }));
    } else {
      setWithdrawData(prev => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setInputError(true);
    const formData = new FormData();
    formData.append("amount", withdrawData?.amount);
    if (withdrawData.amount != '' && withdrawData.amount < (+transactions?.availableBalance)) {
      setFormLoading(true);
      SellerServices.createSellerWithdraw(seller_guid, formData)
        .then((res) => {
          setFormLoading(false);
          setShowWithdraw(false);
          toast.success(res.message);
          getTransactions();
          setWithdrawData({ amount: '' })
        })
        .catch(() => {
          setFormLoading(false);
        });
    }
  }
  return (
    <>
      {isLoading ?
        <LoadingComponents />
        :
        <div className="seller-new-transaction">

          <div className="seller-desh">
            <div className="title">Transactions</div>
            <button onClick={() => { setShowWithdraw(true) }}>Withdraw</button>
          </div>
          <div className="seller-new-transaction-one" style={{ minWidth: 'auto', flexWrap: 'wrap' }}>
            <div className="s-n-d-o-o">
              <p>${transactions?.availableBalance}</p>
              <h4>Available Balance</h4>
            </div>
            <div className="s-n-d-o-t">
              <p>${transactions?.earned}</p>
              <h4>Total earning this month</h4>
              <div className="d-d"></div>
            </div>
          </div>
          <div className="seller-new-transaction-two">
            <div className="two-title">Transactions History</div>
            <div className="s-n-t-t-transaction-listing-wrap">
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
                      <NoDataFound title={'No data Found'} />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      <Modal show={showWithdraw} size="lg" className="report-modal-wrap" onHide={setShowWithdraw} backdrop="static">
        <div className="modal-body">
          <span className="close" onClick={() => { setShowWithdraw(false) }}><RxCross2 /></span>
          <form onSubmit={onSubmit}>
            <h2>Withdraw</h2>
            <div className="input">
              <label htmlFor="">Withdraw Amount</label>
              <input type="text" name="amount" value={withdrawData?.amount} onChange={handleChange} placeholder="Enter withdraw amount" />
              {withdrawData.amount === "" && inputError &&
                <div className="error-input">Withdraw amount is required</div>
              }
              {withdrawData.amount != "" && inputError && withdrawData.amount > (+transactions?.availableBalance) &&
                <div className="error-input">Withdraw amount can't be more then ${transactions?.availableBalance} </div>
              }
            </div>

            <div className="button">
              <button disabled={formLoading}>{formLoading ? 'Loading...' : 'Submit'}</button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default MyTransactions;
