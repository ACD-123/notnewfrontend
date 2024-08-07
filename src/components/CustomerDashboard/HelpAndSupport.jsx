import React, { useRef, useState } from 'react';
import CustomerSellerShops from '../CustomerMyFav/CustomerSellerShops';
import CustomerActiveProducts from '../CustomerMyFav/CustomerActiveProducts';
import CustomerInActiveProducts from '../CustomerMyFav/CustomerInActiveProducts';
import { IoCamera } from "react-icons/io5";
import OrderServices from '../../services/API/OrderServices';
import LoadingComponents from '../Shared/LoadingComponents';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
const HelpAndSupport = () => {
    const [tab, setTab] = useState(0);
    const [image, setImage] = useState('')
    const [message, setMessage] = useState('')
    const [inputError, setInputError] = useState(false);
    const user_id = localStorage.getItem('user_id');
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const [hASFromData, setHASFromData] = useState(
        {
            reason: '',
            message: '',
            file: []
        }
    );
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

    const handleDeleteImage = (index) => {
        const updatedFiles = [...hASFromData.file];
        updatedFiles.splice(index, 1);
        setHASFromData(prev => ({ ...prev, file: updatedFiles }));
      };


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
                                <label>Subject</label>
                                <input type="text" value={message} placeholder='Enter your message' onChange={(e) => { setMessage(e.target.value) }} />
                                {message === "" && inputError && <p className='error-input'>Description is required</p>}
                            </div>
                            <div className="h-a-s-i">
                                <label>Reason</label>
                                <textarea type="text" value={message} placeholder='Enter your message' onChange={(e) => { setMessage(e.target.value) }} />
                                {message === "" && inputError && <p className='error-input'>Description is required</p>}
                            </div>
                            <div className="p-m-i-u">
                                <div className="p-m-i-u-wrap">
                                    <div className="upload-box" onClick={handleUploadClick}>
                                        <svg width="96" height="97" viewBox="0 0 96 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M29.8004 48.4615H66.1696M47.985 66.6462V30.2769M47.985 93.9231C72.9888 93.9231 93.4465 73.4654 93.4465 48.4615C93.4465 23.4577 72.9888 3 47.985 3C22.9811 3 2.52344 23.4577 2.52344 48.4615C2.52344 73.4654 22.9811 93.9231 47.985 93.9231Z" stroke="#BBBBBB" stroke-width="4.54615" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <span>Click here to upload images</span>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleImageFileChange}
                                            multiple  // Enable multiple file selection
                                        />
                                    </div>
                                </div>
                                {hASFromData?.file?.length === 0 && inputError && <div className="error-input">Atleast  one image is required</div>}
                                <p>
                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.39744 6.53134H10.2635V4.66524H8.39744M9.33048 16.7949C5.21574 16.7949 1.8661 13.4452 1.8661 9.33048C1.8661 5.21574 5.21574 1.8661 9.33048 1.8661C13.4452 1.8661 16.7949 5.21574 16.7949 9.33048C16.7949 13.4452 13.4452 16.7949 9.33048 16.7949ZM9.33048 0C8.10519 0 6.89189 0.24134 5.75986 0.710241C4.62784 1.17914 3.59925 1.86642 2.73284 2.73284C0.98303 4.48264 0 6.85589 0 9.33048C0 11.8051 0.98303 14.1783 2.73284 15.9281C3.59925 16.7945 4.62784 17.4818 5.75986 17.9507C6.89189 18.4196 8.10519 18.661 9.33048 18.661C11.8051 18.661 14.1783 17.6779 15.9281 15.9281C17.6779 14.1783 18.661 11.8051 18.661 9.33048C18.661 8.10519 18.4196 6.89189 17.9507 5.75986C17.4818 4.62784 16.7945 3.59925 15.9281 2.73284C15.0617 1.86642 14.0331 1.17914 12.9011 0.710241C11.7691 0.24134 10.5558 0 9.33048 0ZM8.39744 13.9957H10.2635V8.39744H8.39744V13.9957Z" fill="#989595" />
                                    </svg>
                                    Add minimum 5 images covering all angles of the item that describes well
                                </p>
                                {hASFromData?.file?.length > 0 ?
                                    <div className="selected-images">
                                        <div className="row">
                                            {hASFromData.file.map((image, index) => {
                                                return (

                                                    image?.name?.includes('http') ?
                                                        <div className="col-lg-2" key={index}>
                                                            <div className="selected-images-box">
                                                                <img src={image?.name} alt="" />
                                                                <span onClick={() => { handleDeleteImage(index) }}><MdDelete /></span>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="col-lg-2" key={index}>
                                                            <div className="selected-images-box">
                                                                <img src={URL.createObjectURL(image)} alt="" />
                                                                <span onClick={() => { handleDeleteImage(index) }}><MdDelete /></span>
                                                            </div>
                                                        </div>

                                                )
                                            })}
                                        </div>
                                    </div>
                                    : null}

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
