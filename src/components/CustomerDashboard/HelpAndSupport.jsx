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
            subject: '',
            message: '',
            file: []
        }
    );
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleImageFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setHASFromData(prev => ({ ...prev, file: [...prev.file, ...selectedFiles] }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setInputError(true)
        if (hASFromData.reason != "" && hASFromData.message != "" && hASFromData.file.length > 0) {
            setIsLoading(true)
            const formData = new FormData();
            hASFromData.file.forEach((image_file) => {
                formData.append("file[]", image_file);
            });
            formData.append("user_id", user_id);
            formData.append("subject", hASFromData?.subject);
            formData.append("message", hASFromData?.message);
            OrderServices.postHelpAndSupport(formData)
                .then((response) => {
                    setIsLoading(false);
                    setImage('')
                    setMessage('')
                    setInputError(false)
                    toast.success("Message send successfully");
                    setHASFromData({
                        subject: '',
                        message: '',
                        file: []
                    })
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
                            <div className="h-a-s-i">
                                <label>Subject</label>
                                <input type="text" value={hASFromData?.subject} placeholder='Enter your subject' onChange={(e) => { setHASFromData((prev) => ({ ...prev, subject: e.target.value })) }} />
                                {message === "" && inputError && <p className='error-input'>Description is required</p>}
                            </div>
                            <div className="h-a-s-i">
                                <label>Reason</label>
                                <textarea type="text" value={hASFromData?.message} placeholder='Enter your message' onChange={(e) => { setHASFromData((prev) => ({ ...prev, message: e.target.value })) }} />
                                {message === "" && inputError && <p className='error-input'>Description is required</p>}
                            </div>
                            <div className="p-m-i-u">
                                <div className="p-m-i-u-wrap">
                                    <div className="upload-box" onClick={handleUploadClick}>
                                        <svg width="96" height="97" viewBox="0 0 96 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M29.8004 48.4615H66.1696M47.985 66.6462V30.2769M47.985 93.9231C72.9888 93.9231 93.4465 73.4654 93.4465 48.4615C93.4465 23.4577 72.9888 3 47.985 3C22.9811 3 2.52344 23.4577 2.52344 48.4615C2.52344 73.4654 22.9811 93.9231 47.985 93.9231Z" stroke="#BBBBBB" stroke-width="4.54615" strokeLinecap="round" stroke-linejoin="round" />
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
                                {hASFromData?.file?.length > 0 ?
                                    <div className="selected-images">
                                        <div className="row">
                                            {hASFromData?.file?.map((image, index) => {
                                                return (

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
