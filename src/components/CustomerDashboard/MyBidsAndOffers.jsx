import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import OrderServices from '../../services/API/OrderServices';
import NoDataFound from '../Shared/NoDataFound';
import BidsSkeletonLoader from '../Shared/Loaders/BidsSkeletonLoader';

const CountdownTimer = ({ initialTimeMicroseconds }) => {
    const [remainingTime, setRemainingTime] = useState(initialTimeMicroseconds);

    useEffect(() => {
        if (remainingTime > 0) {
            const timerId = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [remainingTime]);

    const convertSecondsToTime = (seconds) => {
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        seconds = seconds % 60;
        minutes = minutes % 60;

        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');

        return `${hours} : ${minutes} : ${seconds}`;
    }

    const timeString = convertSecondsToTime(remainingTime);

    return (
        <p>{timeString}</p>
    );
}

const MyBidsAndOffers = () => {
    const [myBidsAndOffersList, setMyBidsAndOffersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let user_details = JSON.parse(localStorage.getItem('user_details'));

    const getMyBidsAndOffers = () => {
        OrderServices.getMyBidsAndOffers(user_details.id)
            .then((response) => {
                setMyBidsAndOffersList(response?.data);
                setIsLoading(false);

            })
            .catch((error) => {
                toast.error(error?.response?.data?.message);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getMyBidsAndOffers()
    }, [])

    return (
        <>
            <div className="seller-new-transaction">
                <>
                    <div className="title">My Bids And Offers</div>
                    <div className="h-a-s">
                        {!isLoading ?
                            (
                                myBidsAndOffersList?.length > 0 ?
                                    <div className="h-a-s-b-a-o">
                                        {myBidsAndOffersList?.map((data, index) => {
                                            return (
                                                <div className="h-a-s-b-a-o-l" key={index}>
                                                    <div className="h-a-s-b-a-o-l-l">
                                                        <img src={data?.product?.media?.[0]?.name} alt="" />
                                                    </div>
                                                    <div className="h-a-s-b-a-o-l-r">
                                                        <div className="h-a-s-b-a-o-l-r-t">
                                                            <h4>{data?.product?.name}</h4>
                                                        </div>
                                                        <div className="h-a-s-b-a-o-l-r-b">
                                                            <ul>
                                                                <li>
                                                                    <h5>Your Bid</h5>
                                                                    <p>${data?.bid_amount}</p>
                                                                </li>
                                                                <li>
                                                                    <h5>Max Bid</h5>
                                                                    <p>${data?.product?.max_bid}</p>
                                                                </li>
                                                                <li>
                                                                    <h5>End in</h5>
                                                                    <CountdownTimer initialTimeMicroseconds={data?.product?.auction_remainig_time} />
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    :
                                    <NoDataFound title={'No bid and offer found'} />
                            )
                            :
                            <>
                                <div className="h-a-s-b-a-o">
                                    <BidsSkeletonLoader />
                                    <BidsSkeletonLoader />
                                    <BidsSkeletonLoader />
                                </div>
                            </>
                        }
                    </div>
                </>
            </div>
        </>
    );
};

export default MyBidsAndOffers;
