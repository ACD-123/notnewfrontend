import React, { useEffect, useState } from 'react';
import blankuser from '../../assets/Images/User/blankuser.jpg'
import SellerServices from '../../services/API/SellerServices';
import { BASE_URL } from '../../services/Constant';
import OrderServices from '../../services/API/OrderServices';
import NoDataFound from '../Shared/NoDataFound';
import LoadingComponents from '../Shared/LoadingComponents';
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { toast } from 'react-toastify';

const SellerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sellerShopId, setSellerShopId] = useState(null);

  const getUserOffersCount = () => {
    OrderServices.getuserbidscount()
      .then((res) => {
        setIsLoading(false);
        setSellerShopId(res.data.seller_guid);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error?.response?.data?.message)
      });
  };

  const getFeedbacks = () => {
    const seller_guid = localStorage.getItem('seller_guid')

    SellerServices.getShopDetailFeedback(seller_guid)
      .then((res) => {
        setIsLoading(false);
        setFeedbacks(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUserOffersCount();
  }, []);

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <>
      {isLoading ?
        <LoadingComponents />
        :
        <div className="seller-new-transaction">
          <div className="title">Feedback's</div>
          <div className="seller-new-transaction-five">
            <div className="s-n-t-f-l">
              <h2 className='s-f-h'>Customer Feedback Stats</h2>
              <p className='s-f-d'>LAST 12 MONTHS</p>
              <ul>
                <li>
                  <ul>
                    <li><div className="heading">Positive reviews</div></li>
                    <li>
                      <div className="bar"><div className="bar-wrap"></div></div>
                    </li>
                    <li><div className="rating">4.9</div></li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li><div className="heading">Negative reviews</div></li>
                    <li>
                      <div className="bar"><div className="bar-wrap"></div></div>
                    </li>
                    <li><div className="rating">2.0</div></li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li><div className="heading">Replay timing</div></li>
                    <li>
                      <div className="bar"><div className="bar-wrap"></div></div>
                    </li>
                    <li><div className="rating">4.9</div></li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li><div className="heading">Customer care</div></li>
                    <li>
                      <div className="bar"><div style={{ background: (+feedbacks?.customer_care) > 3 ? '#56c79c' : '#db0020', width: (+feedbacks?.customer_care) * 20 + '%' }} className="bar-wrap"></div></div>
                    </li>
                    <li><div className="rating">{feedbacks?.customer_care}</div></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="s-n-t-f-r">
              <h2>Detailed Seller Ratings</h2>
              <p>LAST 12 MONTHS</p>
              <ul>
                <li>
                  <ul>
                    <li><div className="heading">Descriptions Accuracy</div></li>
                    <li>
                      <div className="bar"><div className="bar-wrap"></div></div>
                    </li>
                    <li><div className="rating">4.8</div></li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li><div className="heading">Shipping Cost</div></li>
                    <li>
                      <div className="bar"><div className="bar-wrap"></div></div>
                    </li>
                    <li><div className="rating">4.5</div></li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li><div className="heading">Delivery Speed</div></li>
                    <li>
                      <div className="bar"><div style={{ background: (+feedbacks?.delivery_speed) > 3 ? '#56c79c' : '#db0020', width: (+feedbacks?.delivery_speed) * 20 + '%' }} className="bar-wrap"></div></div>
                    </li>
                    <li><div className="rating">{feedbacks?.delivery_speed}</div></li>
                  </ul>
                </li>
                <li>
                  <ul>
                    <li><div className="heading">Description Accuracy</div></li>
                    <li>
                      <div className="bar"><div style={{ background: (+feedbacks?.description_accuracy) > 3 ? '#56c79c' : '#db0020', width: (+feedbacks?.description_accuracy) * 20 + '%' }} className="bar-wrap"></div></div>
                    </li>
                    <li><div className="rating">{feedbacks?.description_accuracy}</div></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="seller-new-transaction-six">
            <div className="s-n-t-s-1">
              <div className="s-n-t-s-1-l">  <h2>Seller Feedback ({feedbacks?.feedback?.length})</h2></div>
              <div className="s-n-t-s-1-r">
                <div className="s-n-t-s-1-r-wrap">
                  This Month
                </div>
              </div>
            </div>
            <div className="s-n-t-s-2"><p>UPDATED</p></div>
            {feedbacks?.feedback?.length > 0 ?
              feedbacks?.feedback?.map((data, index) => {
                return (
                  <div className="s-n-t-s-3" key={index}>
                    <div className="s-n-t-s-3-l">
                      {data.user.profile_image === null ? (
                        <img src={blankuser} alt='NULL' />
                      ) : (
                        <img src={`${BASE_URL}/${data.user.profile_image}`} alt={data.title} />
                      )}
                    </div>
                    <div className="s-n-t-s-3-c">
                      <h3>{data.user.name}</h3>
                      <p>{data.comments}</p>
                    </div>
                    <div className="s-n-t-s-3-r">
                      <h3>{data.created_at.slice(0, 10)}</h3>
                      <div className="stars-feedback">
                        {(+data?.ratings) === 5 &&
                          <>
                            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                          </>
                        }
                        {(+data?.ratings) === 4 &&
                          <>
                            <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar />
                          </>
                        }
                        {(+data?.ratings) === 3 &&
                          <>
                            <FaStar /><FaStar /><FaStar /><FaRegStar /><FaRegStar />
                          </>
                        }
                        {(+data?.ratings) === 2 &&
                          <>
                            <FaStar /><FaStar /><FaRegStar /><FaRegStar /><FaRegStar />
                          </>
                        }
                        {(+data?.ratings) === 1 &&
                          <>
                            <FaStar /><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar />
                          </>
                        }
                        {(+data?.ratings) === 0 &&
                          <>
                            <FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar />
                          </>
                        }
                        {(+data?.ratings) > 0 && (+data?.ratings) < 1 &&
                          <>
                            <FaStarHalfAlt /><FaRegStar /><FaRegStar /><FaRegStar /><FaRegStar />
                          </>
                        }
                        {(+data?.ratings) > 1 && (+data?.ratings) < 2 &&
                          <>
                            <FaStar /><FaStarHalfAlt /><FaRegStar /><FaRegStar /><FaRegStar />
                          </>
                        }
                        {(+data?.ratings) > 2 && (+data?.ratings) < 3 &&
                          <>
                            <FaStar /><FaStar /><FaStarHalfAlt /><FaRegStar /><FaRegStar />
                          </>
                        }
                        {(+data?.ratings) > 3 && (+data?.ratings) < 4 &&
                          <>
                            <FaStar /><FaStar /><FaStar /><FaStarHalfAlt /><FaRegStar />
                          </>
                        }
                        {(+data?.ratings) > 4 && (+data?.ratings) < 5 &&
                          <>
                            <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                          </>
                        }
                        <span>({data?.ratings})</span>
                      </div>
                    </div>
                  </div>
                )
              })
              :
              <NoDataFound title={'No data Found'} />
            }
          </div>
        </div>
      }
    </>
  );
};

export default SellerFeedback;

