import React, { useState, useEffect } from 'react';
import UserServices from "../../../services/API/UserServices";
import { toast } from "react-toastify";
import LoadingComponents from '../../Shared/LoadingComponents';
import NoDataFound from '../../Shared/NoDataFound';
import { IoIosArrowBack } from "react-icons/io";
import laravelEcho from '../../../socket';
import { BASE_URL } from "../../../services/Constant"

const BidsNoffers = () => {
  const user_id = localStorage.getItem('user_id');
  let seller_guid = localStorage.getItem('seller_guid');
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const [showAuctionDetail, setShowAuctionDetail] = useState(false);
  const [auctionDetail, setAuctionDetail] = useState([]);
  const [type, setType] = useState('');
  const [inputTimeMicros, setInputTimeMicros] = useState('');
  const [remainingTimeMicros, setRemainingTimeMicros] = useState(0);
  const [remainingTimeSeconds, setRemainingTimeSeconds] = useState(0);
  const [countdown, setCountdown] = useState('');
  const [auctionId, setAuctionId] = useState('');


  const [biddata, setBidData] = useState([]);

  const getSellerBid = () => {
    UserServices.getSellerActiveBid(user_id)
      .then((response) => {
        setIsLoading(false)
        setBidData(response.data)
      }).catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getSellerBid();
  }, []);

  const handleViewDetails = (data) => {
    setShowAuctionDetail(true)
    getAuctionDetails(data.id)
    setAuctionId(data.id)
  };

  const formatTime = (totalSeconds) => {
    if (isNaN(totalSeconds) || totalSeconds < 0) {
      return '00:00:00';
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const startCountdown = () => {
    if (!inputTimeMicros) {
      alert('Please enter a valid time in microseconds.');
      return;
    }
    const microseconds = parseInt(inputTimeMicros, 10);
    setRemainingTimeMicros(microseconds);
  };

  useEffect(() => {
    if (inputTimeMicros) {
      startCountdown();
    }
  }, [inputTimeMicros]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTimeSeconds > 0) {
        setRemainingTimeSeconds(prevTime => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTimeSeconds]);

  useEffect(() => {
    setCountdown(formatTime(remainingTimeSeconds));
  }, [remainingTimeSeconds]);

  const getAuctionDetails = (productid) => {
    setIsLoading(auctionId === "" ? true : false)
    UserServices.getSellerActiveDetails(productid, seller_guid)
      .then((response) => {
        setIsLoading(false)
        setCountdown(formatTime(response?.data?.product?.auction_remainig_time));
        setRemainingTimeSeconds(response?.data?.product?.auction_remainig_time)
        setAuctionDetail(response.data)
        setAuctionId(+response?.data?.product?.id)
      }).catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false)
      })
  }

  const acceptAuctionBid = (bidId) => {
    setIsLoading(true)
    UserServices.acceptSellerActiveBid({ id: bidId })
      .then((response) => {
        setShowAuctionDetail(false)
        getSellerBid()
      }).catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    const channel = laravelEcho.channel("bid-channel-" + auctionId);
    channel.listen(".bid-channel", (data) => {
      getAuctionDetails(auctionId)
    });

    return () => {
      channel.stopListening(".bid-channel");
    };
  }, []);

  return (
    <>
      {isLoading ?
        <LoadingComponents />
        :
        <>
          {!showAuctionDetail ?
            <div className="seller-new-transaction">
              <div className="title">Bids & Offers</div>
              <div className="seller-new-transaction-four">
                <div className="s-n-t-f-tabs">
                  <ul>
                    <li onClick={() => { setTab(0) }} className={`${tab === 0 ? 'active' : ''}`}>Active Auctions</li>
                    <li onClick={() => { setTab(1) }} className={`${tab === 1 ? 'active' : ''}`}>Inactive Auctions</li>
                  </ul>
                </div>
              </div>
              {tab === 0 ?
                <div className="seller-new-transaction-seven">
                  <ul>
                    {biddata?.active?.length > 0 ?
                      biddata?.active?.map((data, index) => {
                        return (
                          <li key={index}>
                            <div className="s-n-t-s-l">
                              <img src={data?.media?.[0]?.name} />
                            </div>
                            <div className="s-n-t-s-c">
                              <h2>{data?.name}</h2>
                              <p>Current bid : ${data?.bids}</p>
                              <span>{data?.total_bids} bids</span>
                            </div>
                            <div className="s-n-t-s-r">
                              <button onClick={() => { handleViewDetails(data); setType('active') }}>View Auction</button>
                            </div>
                          </li>
                        )
                      })
                      :
                      <NoDataFound title={'No data Found'} />
                    }
                  </ul>
                </div>
                :
                <div className="seller-new-transaction-seven">
                  <ul>
                    {biddata?.inactive?.length > 0 ?
                      biddata?.inactive?.map((data, index) => {
                        return (
                          <li key={index}>
                            <div className="s-n-t-s-l">
                              <img src={`${BASE_URL}/${data?.media?.[0]?.url}`} />
                            </div>
                            <div className="s-n-t-s-c">
                              <h2>{data?.name}</h2>
                              <p>Current bid : ${data?.bids}</p>
                              <span>{data?.total_bids} bids</span>
                            </div>
                            <div className="s-n-t-s-r">
                              <button onClick={() => { handleViewDetails(data); setType('inactive') }}>View Auction</button>
                            </div>
                          </li>
                        )
                      })
                      :
                      <NoDataFound title={'No data Found'} />
                    }
                  </ul>
                </div>

              }
            </div>
            :
            <div className="seller-new-transaction">
              <div className="title"><span onClick={() => { setShowAuctionDetail(false); setAuctionDetail([]) }}><IoIosArrowBack /></span>Auction Details</div>
              <div className="seller-new-transaction-eight">
                <div className="s-n-t-e-l">
                  <img src={auctionDetail?.product?.media?.[0]?.name} alt="" />
                </div>
                <div className="s-n-t-e-r">
                  <ul>
                    <li>
                      <h2>Name</h2>
                      <p>{auctionDetail?.product?.name}</p>
                    </li>
                    <li>
                      <h2>Ends in</h2>
                      <p>{countdown}</p>
                    </li>
                    <li>
                      <h2>Bid</h2>
                      <p>${auctionDetail?.product?.bids}</p>
                    </li>
                    <li>
                      <h2>Total Bids</h2>
                      <p>{auctionDetail?.product?.total_bids}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="seller-new-transaction-nine">
                <div className="s-n-t-t-transaction-listing">
                  <div className="s-n-t-t-titles">
                    <ul>
                      <li>Bidders</li>
                      <li>Bids</li>
                    </ul>
                  </div>
                  <div className="s-n-t-t-listing">
                    <div className="s-n-t-t-listing-wrap">
                      {auctionDetail?.bidders?.length > 0 ?
                        auctionDetail?.bidders?.map((data, index) => {
                          return (
                            <ul key={index}>
                              <li>
                                <div className="bid-user">
                                  <div className="b-s-l">
                                    <img src={`${auctionDetail?.product?.media?.[0]?.name}`} />
                                  </div>
                                  <div className="b-s-r">
                                    <h2>{data?.name} {data?.last_name}</h2>
                                    <p>{data?.created_at?.slice(0, 10)}</p>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="price">${data?.bid_amount}</div>
                                {type === 'active' && index === 0 && <div onClick={() => { acceptAuctionBid(data?.bid_id) }} className="action">Accept Bid</div>}

                              </li>
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
          }
        </>
      }

    </>
  );
};

export default BidsNoffers;
