import React, { useState } from 'react';
import LoadingComponents from '../Shared/LoadingComponents';
import { toast } from 'react-toastify';
import SellerServices from '../../services/API/SellerServices';
const ChangePassword = () => {
    const [inputError, setInputError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [changePasswordData, setChangePasswordData] = useState({
        old_password: "",
        password: "",
        password_confirmation: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setChangePasswordData(prev => ({ ...prev, [name]: checked }));
        } else {
            setChangePasswordData(prev => ({ ...prev, [name]: value }));
        }
    };


    const onSubmit = (e) => {
        e.preventDefault();
        setInputError(true);
        const formData = new FormData();
        formData.append("old_password", changePasswordData?.old_password);
        formData.append("password", changePasswordData?.password);
        formData.append("password_confirmation", changePasswordData?.password_confirmation);
        if (changePasswordData.old_password != '' &&
            changePasswordData?.password != '' &&
            changePasswordData?.password_confirmation != '' &&
            changePasswordData?.password === changePasswordData?.password_confirmation
        ) {
        setIsLoading(true);
            SellerServices.changePassword(formData)
                .then((res) => {
                    setIsLoading(false);
                    setChangePasswordData({
                        old_password: "",
                        password: "",
                        password_confirmation: ""
                    })
                    toast.success(res.message)
                    setInputError(false);
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.message) 
                    setIsLoading(false);
                    setInputError(false);
                });
        }
    }

    return (
        <>
            <div className="seller-new-transaction">
                <div className="title">Change Password</div>
                <div className="h-a-s">
                    {isLoading ?
                        <LoadingComponents />
                        :
                        <form onSubmit={onSubmit}>
                            <div className="h-a-s-i mb-3">
                                <input type="text" name='old_password' value={changePasswordData.old_password} placeholder='Enter old password' onChange={handleChange} />
                                {changePasswordData.old_password === "" && inputError && <p className='error-input'>Old password is required</p>}
                            </div>
                            <div className="h-a-s-i  mb-3">
                                <input type="text" name='password' value={changePasswordData.password} placeholder='Enter new password' onChange={handleChange} />
                                {changePasswordData.password === "" && inputError && <p className='error-input'>Description is required</p>}
                            </div>
                            <div className="h-a-s-i">
                                <input type="text" name='password_confirmation' value={changePasswordData.password_confirmation} placeholder='Confirm new password' onChange={handleChange} />
                                {changePasswordData.password_confirmation === "" && inputError && <p className='error-input'>Description is required</p>}
                                {changePasswordData.password_confirmation != "" &&
                                    changePasswordData.password_confirmation != changePasswordData.password &&
                                    inputError
                                    && <p className='error-input'>New password and confirm password should be same</p>}
                            </div>
                            <div className="h-a-s-b">
                                <button>Submit</button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </>
    );
};

export default ChangePassword;
