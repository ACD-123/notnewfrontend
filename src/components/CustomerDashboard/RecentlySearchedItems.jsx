import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import OrderServices from '../../services/API/OrderServices';
import NoDataFound from '../Shared/NoDataFound';
import ProductSkeletonLoader from '../Shared/ProductSkeletonLoader';
import RecentlySearchCard from '../Shared/Cards/RecentlySearchCard';

const RecentlySearchedItems = () => {
    const [recentlySearchedItemsList, setRecentlySearchedItemsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user_id = localStorage.getItem('user_id');

    const getRecentlySearchedItems = () => {
        OrderServices.getRecentlySearchedItems(user_id)
            .then((response) => {
                setRecentlySearchedItemsList(response?.data);
                setIsLoading(false);

            })
            .catch((error) => {
                toast.error(error?.response?.data?.message);
                setIsLoading(false);
            });

    };

    const removeProductFromSearchList = (productId) => {
        setIsLoading(true);
        OrderServices.removeProductFromSearchList({id: productId })
            .then((response) => {
                getRecentlySearchedItems()

            })
            .catch((error) => {
                toast.error(error?.response?.data?.message);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getRecentlySearchedItems()
    }, [])

    return (
        <>
            <div className="seller-new-transaction" id='productcard'>
                <>
                    <div className="title">Recently Searched Items</div>
                    <div className="h-a-s">
                        {!isLoading ?
                            (
                                recentlySearchedItemsList?.products?.length > 0 ?
                                    <div className="row">
                                        {recentlySearchedItemsList?.products?.map((data, index) => {
                                            return (
                                                <div className="col-lg-4" key={index}>
                                                    <RecentlySearchCard data={data} removeProductFromSearchList={removeProductFromSearchList} index={index} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    :
                                    <NoDataFound title={'No Recently SearchedItems found'} />
                            )
                            :
                            <>
                                <div className="h-a-s-b-a-o">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <ProductSkeletonLoader />
                                        </div>
                                        <div className="col-lg-4">
                                            <ProductSkeletonLoader />
                                        </div>
                                        <div className="col-lg-4">
                                            <ProductSkeletonLoader />
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </>
            </div>
        </>
    );
};

export default RecentlySearchedItems;
