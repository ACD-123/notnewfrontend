import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SellerServices from '../../services/API/SellerServices';
import LoadingComponents from '../Shared/LoadingComponents';
import NoDataFound from '../Shared/NoDataFound';

const PrivacyPolicy = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [privacys, setPrivacys] = useState([])


    const getPrivacy = (type) => {
        SellerServices.getFaqs(type)
            .then((res) => {
                setPrivacys(res.data);
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message)
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getPrivacy('privacy')
    }, [])

    return (
        <>
            {isLoading ?
                <LoadingComponents />
                :
                <div className="seller-new-transaction">
                    <div className="title">Privacy Policy</div>
                    <div className="h-a-s">
                        <div className="h-a-s-p-p">
                            {privacys?.length > 0 ?
                            <ul>
                                {privacys.map((privacy, index) => {
                                    return (
                                        <li key={index}>
                                            <div className="h-a-s-p-p-w">
                                                <div className="h-a-s-p-p-q">
                                                    <div>
                                                        {privacy?.heading}
                                                    </div>
                                                </div>
                                                <div className="h-a-s-p-p-a">
                                                    {privacy?.description}
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                            :
                            <NoDataFound title={'No Data Found'}/>
                            }
                        </div>

                    </div>
                </div>
            }
        </>
    );
};

export default PrivacyPolicy;
