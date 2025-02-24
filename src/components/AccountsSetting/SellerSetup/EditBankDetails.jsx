import React, { useState, useEffect } from 'react';
import SellerServices from "../../../services/API/SellerServices";
import UserServices from "../../../services/API/UserServices";
import { toast } from "react-toastify";
import Select from 'react-select'
import LoadingComponents from '../../Shared/LoadingComponents';


const EditBankDetails = () => {
  const [bankList, setBankList] = useState([]);
  const [inputErrors, setInputErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const [bankForm, setBankForm] = useState({
    bank_id: null,
    accountName: '',
    accountNumber: '',
    bic_swift: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setBankForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setBankForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputErrors(true)
    if (bankForm.bank_id === null) {
      return
    }
    if (bankForm.accountName === '') {
      return
    }
    if (bankForm.accountNumber === '') {
      return
    }
    if (bankForm.bic_swift === '') {
      return
    }
    setIsLoading(true);
    setEnabled(true);
    const formData = {
      bank_id: bankForm.bank_id.value,
      accountName: bankForm?.accountName,
      accountNumber: bankForm?.accountNumber,
      bic_swift: bankForm?.bic_swift,
    }
    SellerServices.updateBank(formData)
      .then((response) => {
        UserServices.detail()
          .then((responce) => {
            toast.success(response.data);
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message)
          });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false);
        setEnabled(false);
      })
      .then(() => {
        setIsLoading(false);
        setEnabled(false);
      });
  };

  const getBanks = () => {
    SellerServices.getBanks()
      .then((response) => {
        let bank = [];
        for (let i = 0; i < response.length; i++) {
          bank.push({ label: response[i].fullname, value: response[i].id })
        }
        setBankList(bank)
        setIsLoading(false)

      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(error?.response?.data?.message)
      });
  };

  const getBankDetail = () => {
    setIsLoading(true)
    SellerServices.getBankDetails().then((response) => {
      setBankForm({
        bank_id: { label: response.data.bank?.fullname, value: response.data.bank?.id },
        accountName: response.data.accountName,
        accountNumber: response.data.accountNumber,
        bic_swift: response.data.bic_swift,
      })
      getBanks();
    }).catch((error) => {
      toast.error(error?.response?.data?.message)
      setIsLoading(false)
    });
  }

  useEffect(() => {
    getBankDetail()
  }, []);
  
  return (
    <>

      <section id='letsconnectbank' className='seller-bank-detail'>
        {isLoading ?
          <LoadingComponents />
          :
          <form onSubmit={handleSubmit}>
            <div className="s-b-d-i-f">
              <Select
                value={bankForm?.bank_id}
                onChange={(e) => { setBankForm((prev) => ({ ...prev, bank_id: e })) }}
                options={bankList}
                placeholder={'Select bank'}
              />
              {inputErrors && bankForm.bank_id === null && <p className="error">Bank is required</p>}
            </div>
            <div className="s-b-d-i-f">
              <input
                type="text"
                name='accountName'
                value={bankForm?.accountName}
                onChange={handleChange}
                placeholder="Account Name"
              />
              {inputErrors && bankForm.accountName === '' && <p className="error">Account name is required</p>}
            </div>
            <div className="s-b-d-i-f">
              <input
                type="text"
                name='accountNumber'
                value={bankForm?.accountNumber}
                onChange={handleChange}
                placeholder="Account Number"
              />
              {inputErrors && bankForm.accountNumber === '' && <p className="error">Account number is required</p>}
            </div>
            <div className="s-b-d-i-f">
              <input
                type="text"
                name='bic_swift'
                value={bankForm?.bic_swift}
                onChange={handleChange}
                placeholder="Account Name"
              />
              {inputErrors && bankForm.bic_swift === '' && <p className="error">Bic swift is required</p>}
            </div>
            <div className="s-b-d-i-f-b">
              <button type="submit" className='savee' disabled={enabled}>
                {isLoading ? "loading.." : "Update"}
              </button>
            </div>
          </form>
        }
      </section>


    </>
  );
};

export default EditBankDetails;
