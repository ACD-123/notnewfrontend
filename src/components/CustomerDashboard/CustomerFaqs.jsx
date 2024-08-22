import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SellerServices from '../../services/API/SellerServices';
import { toast } from 'react-toastify';
import LoadingComponents from '../Shared/LoadingComponents';

const CustomerFaqs = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState(0)
    const [faqs, setFaqs] = useState([])

    const changeTab = (number) => {
        if (number === activeTab) {
            setActiveTab(0)
        } else {
            setActiveTab(number)
        }
    }

    const getFaqs = (type) => {
        SellerServices.getFaqs(type)
            .then((res) => {
                setFaqs(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getFaqs('faq')
    }, [])

    return (
        <>
            {isLoading ?
                <LoadingComponents />
                :
                <div className="seller-new-transaction">
                    <div className="title">Faqs</div>
                    <div className="h-a-s">
                        <div className="h-a-s-f-a-q">
                            <ul>
                                {faqs.map((faq, index) => {
                                    return (
                                        <li onClick={() => { changeTab(index) }} key={index}>
                                            <div className="h-a-s-f-a-q-w">
                                                <div className="h-a-s-f-a-q-q" style={{ paddingBottom: activeTab === index ? '2px' : '0px' }}>
                                                    <div>
                                                        {faq?.question}
                                                        {activeTab === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                                    </div>
                                                </div>
                                                {activeTab === index &&
                                                    <div className="h-a-s-f-a-q-a">
                                                        {faq?.answer}
                                                    </div>
                                                }
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        {/* {isLoading ?
                                <LoadingComponents />
                                : */}
                        {/* } */}
                    </div>
                </div>
            }
        </>
    );
};

export default CustomerFaqs;
