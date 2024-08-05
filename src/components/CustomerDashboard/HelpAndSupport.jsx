import React, { useRef, useState } from 'react';
import CustomerSellerShops from '../CustomerMyFav/CustomerSellerShops';
import CustomerActiveProducts from '../CustomerMyFav/CustomerActiveProducts';
import CustomerInActiveProducts from '../CustomerMyFav/CustomerInActiveProducts';
import { IoCamera } from "react-icons/io5";
import OrderServices from '../../services/API/OrderServices';
import LoadingComponents from '../Shared/LoadingComponents';
import { toast } from 'react-toastify';
const HelpAndSupport = () => {
    const [tab, setTab] = useState(0);
    const [image, setImage] = useState('')
    const [message, setMessage] = useState('')
    const [inputError, setInputError] = useState(false);
    const user_id = localStorage.getItem('user_id');
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleImageFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setInputError(true)
        setIsLoading(true)
        if (image != "" && message != "") {
            OrderServices.postHelpAndSupport(
                {
                    user_id: user_id,
                    message: message,
                    file: image
                }
            )
                .then((response) => {
                    setIsLoading(false);
                    setImage('')
                    setMessage('')
                    setInputError(false)
                    toast.success("Message send successfully");
                })
                .catch((error) => {
                    toast.error(error?.response?.data.message);
                    setIsLoading(false);
                });
        }
    }

    return (
        <>
            <div className="seller-new-transaction">
                <div className="title">Help And Support</div>
                <div className="h-a-s">
                    {isLoading ?
                        <LoadingComponents />
                        :
                        <form onSubmit={handleFormSubmit}>
                            <div className="h-a-s-i-u" onClick={handleUploadClick}>
                                <div className="h-a-s-i-u-w">
                                    {image === "" ?
                                        <IoCamera />
                                        :
                                        (
                                            <img src={URL.createObjectURL(image)} alt="" />
                                        )
                                    }
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageFileChange}
                                    />
                                </div>
                                {image === "" && inputError && <p className='error-input'>Image is required</p>}
                            </div>
                            <div className="h-a-s-i">
                                <textarea type="text" value={message} placeholder='Enter your message' onChange={(e) => { setMessage(e.target.value) }} />
                                {message === "" && inputError && <p className='error-input'>Description is required</p>}
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

export default HelpAndSupport;
