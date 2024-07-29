import React, { useState, useEffect } from 'react';
import Prdimage from '../../../assets/Images/Seller/Refundimages/1.png';
import Prdimage1 from '../../../assets/Images/Seller/Refundimages/2.png';
import Prdimage2 from '../../../assets/Images/Seller/Refundimages/3.png';
import Prdimage3 from '../../../assets/Images/Seller/Refundimages/4.png'
import UserServices from "../../../services/API/UserServices"; //~/services/API/UserServices
import BidsServices from "../../../services/API/BidsServices"; //~/services/API/BidsServices
import { BASE_URL } from "../../../services/Constant";
import blank from "../../../assets/Images/Productcard/blank.jpg";
import Location from '../../../assets/Images/map.png'
import icon1 from '../../../assets/Images/icons/1.png'
import icon2 from '../../../assets/Images/icons/2.png'
import icon3 from '../../../assets/Images/icons/3.png'
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import LoadingComponents from '../../Shared/LoadingComponents';
import NoDataFound from '../../Shared/NoDataFound';
import { IoIosArrowBack } from "react-icons/io";

const DetailedProductInfo = ({ bid, product }) => {
  const handleAccept = (e, id, proId) => {
    e.preventDefault();
    let data = {
      'user_id': id,
      'product_id': proId
    }
    BidsServices.acceptBids(data)
      .then((response) => {
        if (response.status) {
          toast.success(response.data)
        }
      })

  }
  const handleReject = (e, id, proId) => {
    e.preventDefault();
    let data = {
      'user_id': id,
      'product_id': proId
    }
    BidsServices.rejectBids(data)
      .then((response) => {
        if (response.status) {
          toast.success(response.data)
        }
      })

  }
  return (
    <>
      {bid.length > 0 ? (
        <>
          <div className='detaild-product-infi'>
            <h3>Auction Details</h3>

            <div className='row align-items-center'>
              <div className='col-lg-4'>
                <div className='prd-imgg'>
                  <div><img src={`${BASE_URL}/image/product/${bid[0].product.media[0].name}`} alt={bid[0].product.media[0].name} /></div>
                </div>
              </div>
              <div className='col-lg-8'>
                <h5>{bid[0].product.name}</h5>
                <div className='bidders-results'>
                  <div>Ends In <br />
                    {bid[0].endsIn}
                  </div>
                  <div>Current Bid <br /> $ {bid[0].currentbid.max_bids}
                  </div>
                  <div>Total Bids <br /> {bid[0].bidsno}</div>
                </div>
              </div>
            </div>
            <div className='row biddata'>
              <table>
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Bidders</th>
                    <th>Bids</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bid[0].totalbids.length > 0 ? (
                    <>
                      {bid[0].totalbids?.map((bid, index) => {
                        let sno = 1;
                        return (
                          <tr key={index}>
                            <td>
                              {sno++}
                            </td>
                            <td>
                              {bid.user?.email}
                              <br />
                              {bid.time_bids}
                            </td>
                            <td>$ {bid.max_bids}</td>
                            <td>
                              <a href="#" onClick={(e) => handleAccept(e, bid.user?.id, bid.product?.id)} style={{ color: "green" }}>Accept</a>
                              |
                              <a href="#" onClick={(e) => handleReject(e, bid.user?.id, bid.product?.id)} style={{ color: "red" }}>Reject</a>
                            </td>
                          </tr>
                        )
                      })}

                    </>
                  ) : (
                    <>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const BidsNoffers = () => {
  let loggedInUser = JSON.parse(localStorage.getItem('user_details'));
  let seller_guid = localStorage.getItem('seller_guid');
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [activeTab, setActiveTab] = useState('rr1');
  const [tab, setTab] = useState(0);
  const [showAuctionDetail, setShowAuctionDetail] = useState(false);
  const [auctionDetail, setAuctionDetail] = useState([]);
  const [type, setType] = useState('');
  const [inputTimeMicros, setInputTimeMicros] = useState(''); // State to hold user input for time in microseconds
  const [remainingTimeMicros, setRemainingTimeMicros] = useState(0); // State to hold remaining time in microseconds
  const [remainingTimeSeconds, setRemainingTimeSeconds] = useState(0); // State to hold remaining time in seconds
  const [countdown, setCountdown] = useState(''); // State to hold formatted countdown string


  const [biddata, setBidData] = useState([]);

  const getSellerBid = () => {
    UserServices.getSellerActiveBid(loggedInUser?.id)
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
    getAuctionDetails(data.id, data.guid)
  };

  // Function to convert microseconds to seconds
  const convertMicrosToSeconds = (microseconds) => {
    return microseconds / 1000000;
  };

  // Function to format seconds into HH:MM:SS
  const formatTime = (totalSeconds) => {
    if (isNaN(totalSeconds) || totalSeconds < 0) {
      return '00:00:00'; // Handle invalid input gracefully
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Function to start the countdown
  const startCountdown = () => {
    if (!inputTimeMicros) {
      alert('Please enter a valid time in microseconds.');
      return;
    }
    const microseconds = parseInt(inputTimeMicros, 10);
    setRemainingTimeMicros(microseconds);
  };

  // Effect to convert microseconds to seconds when inputTimeMicros changes
  useEffect(() => {
    if (inputTimeMicros) {
      startCountdown();
    }
  }, [inputTimeMicros]);

  // Effect to update countdown display every second
  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTimeSeconds > 0) {
        setRemainingTimeSeconds(prevTime => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTimeSeconds]);

  // Effect to format remainingTimeSeconds into countdown format
  useEffect(() => {
    setCountdown(formatTime(remainingTimeSeconds));
  }, [remainingTimeSeconds]);

  const getAuctionDetails = (productid, guid) => {
    setIsLoading(true)
    UserServices.getSellerActiveDetails(productid, seller_guid)
      .then((response) => {
        setIsLoading(false)
        setCountdown(formatTime(response?.data?.product?.auction_remainig_time));
        setRemainingTimeSeconds(response?.data?.product?.auction_remainig_time)
        setAuctionDetail(response.data)
      }).catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false)
      })
  }
  const acceptAuctionBid = (bidId) => {
    setIsLoading(true)
    UserServices.acceptSellerActiveBid({id : bidId})
      .then((response) => {
        setShowAuctionDetail(false)
        getSellerBid()
      }).catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false)
      })
  }
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
                              <img src={data?.media?.[0]?.name} alt="" srcset="" />
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
                      <NoDataFound title={'No Active Auction Found'} />
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
                              <img src={data?.media?.[0]?.name} alt="" srcset="" />
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
                      <NoDataFound title={'No Inactive Auction Found'} />
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
                      {/* <p>{auctionDetail?.product?.auction_remainig_time}</p> */}
                    </li>
                    <li>
                      <h2>Bid</h2>
                      <p>${auctionDetail?.product?.bids}</p>
                    </li>
                    <li>
                      <h2>Total Bids</h2>
                      <p>${auctionDetail?.product?.total_bids}</p>
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
                                    <img src={data?.media?.[1]?.name} alt="" />
                                  </div>
                                  <div className="b-s-r">
                                    <h2>{data?.name} {data?.last_name}</h2>
                                    <p>{data?.created_at?.slice(0, 10)}</p>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="price">${data?.bid_amount}</div>
                                {type === 'active'&& index === 0 && <div onClick={() =>{acceptAuctionBid(data?.bid_id)}} className="action">Accept Bid</div>}

                              </li>
                            </ul>
                          )
                        })
                        :
                        <NoDataFound title={'No Auction Bids Found'} />
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
