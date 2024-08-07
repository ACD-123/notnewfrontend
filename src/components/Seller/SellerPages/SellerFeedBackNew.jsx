import React, { useEffect, useState } from 'react'
import SellerFeedback from '../SellerFeedback'
import CustomerReviews from '../../Elements/SellerElements/CustomerReviews'
import ReviewSection from '../ReviewSection'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import SellerServices from '../../../services/API/SellerServices'
import OrderServices from '../../../services/API/OrderServices'
import blankuser from '../../../assets/Images/User/blankuser.jpg'
import { BASE_URL } from '../../../services/Constant'
import NoDataFound from '../../Shared/NoDataFound'
import LoadingComponents from '../../Shared/LoadingComponents'
import { toast } from 'react-toastify'

const SellerFeedbackNew = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sellerShopId, setSellerShopId] = useState(null); // Changed initial state to null
  const { pathname } = window.location;
  const shopId = pathname.split("/").pop();

  const getUserOffersCount = () => {
    OrderServices.getuserbidscount()
      .then((res) => {
        setIsLoading(false);
        setSellerShopId(res.data.seller_guid);
        getFeedbacks(res.data.seller_guid);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error?.response?.data?.message)
      });
  };

  const getFeedbacks = (sellerShopId) => {
    // const seller_guid = localStorage.getItem('seller_guid')

    SellerServices.getShopDetailFeedback(sellerShopId)
      .then((res) => {
        setIsLoading(false);
        setFeedbacks(res.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUserOffersCount();
  }, []);

  useEffect(() => {
    
  }, []);
  return (
    <>
      {isLoading ?
        <div className="seller-profile-feedback-loader">
          <LoadingComponents />
        </div>
        :
        <div className='seller-profile-feedback'>
          <div className='seller-profile-feedback-wrap'>
            <div className="s-p-f-w-1">
              <div className="s-p-f-w-1-l">
                Feedback ratings
              </div>
              <div className="s-p-f-w-1-r">
                Last 12 Months
              </div>
            </div>
            <div className="s-p-f-w-2">
              <div className="seller-new-transaction" style={{ marginTop: '30px' }}>
                <h2 className='s-f-h'>Customer Feedback Stats</h2>
                <p className='s-f-d'>LAST 12 MONTHS</p>
                <div className="seller-new-transaction-five">
                  <div className="s-n-t-f-l">
                    <ul>
                      <li>
                        <ul>
                          <li><div className="heading">Descriptions Accuracy</div></li>
                          <li>
                            <div className="bar"><div style={{ background: (+feedbacks?.description_accuracy) > 3 ? '#56c79c' : '#db0020', width: (+feedbacks?.description_accuracy) * 20 + '%' }} className="bar-wrap"></div></div>
                          </li>
                          <li><div className="rating">{feedbacks?.description_accuracy}</div></li>
                        </ul>
                      </li>
                      <li>
                        <ul>
                          <li><div className="heading">Shipping Cost</div></li>
                          <li>
                            <div className="bar"><div style={{ background: (+feedbacks?.shipping_cost) > 3 ? '#56c79c' : '#db0020', width: (+feedbacks?.shipping_cost) * 20 + '%' }} className="bar-wrap"></div></div>
                          </li>
                          <li><div className="rating">{feedbacks?.shipping_cost}</div></li>
                        </ul>
                      </li>
                      <li>
                        <ul>
                          <li><div className="heading">Positive</div></li>
                          <li>
                            <div className="bar"><div style={{ background: (+feedbacks?.positive) > 3 ? '#56c79c' : '#db0020', width: (+feedbacks?.positive) + '%' }} className="bar-wrap"></div></div>
                          </li>
                          <li><div className="rating">{feedbacks?.positive?.slice(0, 3)}</div></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="s-n-t-f-r">
                    <ul>
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
                          <li><div className="heading">Customer care</div></li>
                          <li>
                            <div className="bar"><div style={{ background: (+feedbacks?.customer_care) > 3 ? '#56c79c' : '#db0020', width: (+feedbacks?.customer_care) * 20 + '%' }} className="bar-wrap"></div></div>
                          </li>
                          <li><div className="rating">{feedbacks?.customer_care}</div></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="seller-new-transaction-six">
                  <div className="s-n-t-s-1">
                    <div className="s-n-t-s-1-l" style={{ marginBottom: '30px' }}>  <h2>Seller Feedback ({feedbacks?.feedback?.length})</h2></div>
                  </div>
                  <div className="row">
                    {feedbacks?.feedback?.length > 0 ?
                      feedbacks?.feedback?.map((data, index) => {
                        return (
                          <div className="col-lg-6" key={index}>
                            <div className="s-n-t-s-3">
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
                                <p>Product : {data?.product?.name}</p>
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
                          </div>
                        )
                      })
                      :
                      <NoDataFound title={'No feedback Found'} />
                    }
                  </div>
                </div>
              </div>
            </div>
            {/* <SellerFeedback /> */}
          </div>
        </div>
      }
    </>
  )
}

export default SellerFeedbackNew