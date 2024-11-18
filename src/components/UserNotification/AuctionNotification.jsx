import React, { useEffect, useState } from 'react'
import ProductServices from '../../services/API/ProductServices';
import { BASE_URL } from '../../services/Constant';
import NoDataFound from '../Shared/NoDataFound';
import LoadingComponents from '../Shared/LoadingComponents';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Images/logo.png'
const PageNumbers = ({
  totalPages,
  pageSize,
  getNotification,
  notification }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className='all-pages'>
      <ul>
        {pageNumbers.map(number => (
          <li key={number}
            className={`${(+notification?.pagination?.page) === number ? 'active' : ''}`}
            onClick={() => {
              getNotification(
                pageSize,
                number)
            }}>
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const AuctionNotification = ({ getNotificationCount }) => {
  let user_details = JSON.parse(localStorage.getItem('user_details'));
  const user_id = localStorage.getItem('user_id');
  const [notification, setNotification] = useState([])
  const [loading, setLoading] = useState(true)
  const pageSize = 10;
  const naviage = useNavigate()

  const getNotification = async (page, size) => {
    try {
      const res = await ProductServices.getNotification(user_id, 'auction', page, size);
      setNotification(res?.data)
      setLoading(false)
      getNotificationCount()
    } catch (error) {
      setLoading(false)
      toast.error(error?.response?.data?.message)
    }
  };

  useEffect(() => {
    getNotification(pageSize, 1)
  }, [])
  return (
    <>
      {loading ?
        <div className="notification-loading">
          <LoadingComponents />
        </div>
        :
        <div className="notification-listing">
          <div className="row">
            {notification?.notifications?.length > 0 ?
              (notification?.notifications?.map((data, index) => {
                return (
                  data?.auction_status === 1 ?
                    <div className="col-lg-6 col-md-6 col-12" key={index} onClick={() =>{naviage(`/auctionproduct/${data?.product_guid}`)}}>
                      <div className="n-l-d">
                        <div className="n-l-d-w">
                          <div className="n-l-d-w-l">
                            <div className="n-l-d-w-l-l">
                              <img src={logo} />
                            </div>
                            <div className="n-l-d-w-l-r">
                              <h2>{data?.title}</h2>
                              <p>{data?.message}</p>
                            </div>
                          </div>
                          <div className="n-l-d-w-r">{data?.created_at?.slice(0, 10)}</div>
                        </div>
                      </div>
                    </div>
                    :
                    <div className="col-lg-6 col-md-6 col-12" key={index} onClick={() =>{toast.error('Auction is ended')}}>
                      <div className="n-l-d">
                        <div className="n-l-d-w">
                          <div className="n-l-d-w-l">
                            <div className="n-l-d-w-l-l">
                              <img src={logo} />
                            </div>
                            <div className="n-l-d-w-l-r">
                              <h2>{data?.title}</h2>
                              <p>{data?.message}</p>
                            </div>
                          </div>
                          <div className="n-l-d-w-r">{data?.created_at?.slice(0, 10)}</div>
                        </div>
                      </div>
                    </div>
                )
              }))
              :
              <NoDataFound title={'No Data Found'} />
            }
          </div>
          {notification?.pagination?.total_pages > 1 &&
            <div className="page-pagination">
              <div className="previous-page"
                style={{ pointerEvents: (+notification?.pagination?.page) === 1 ? 'none' : 'auto' }}
                onClick={() => {
                  getNotification(
                    pageSize,
                    (+notification?.pagination?.page) - 1)
                }}
              >Previous</div>
              {notification?.pagination?.total_pages > 10 ?
                <div className="all-pages">
                  <ul>
                    <li className={`${(+notification?.pagination?.page) === 1 ? 'active' : ''}`}
                      onClick={() => {
                        getNotification(
                          pageSize,
                          1)
                      }}
                    >1</li>
                    <li className={`${(+notification?.pagination?.page) === 2 ? 'active' : ''}`}
                      onClick={() => {
                        getNotification(
                          pageSize,
                          2)
                      }}
                    >2</li>
                    <li className={`${(+notification?.pagination?.page) === 3 ? 'active' : ''}`}
                      onClick={() => {
                        getNotification(
                          pageSize,
                          3)
                      }}
                    >3</li>
                    <li>
                      <svg width="33" height="3" viewBox="0 0 33 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.39853 3V0.202939H2.61842V3H0.39853ZM5.38461 3V0.202939H7.6045V3H5.38461ZM10.3707 3V0.202939H12.5906V3H10.3707ZM15.3568 3V0.202939H17.5767V3H15.3568ZM20.3429 3V0.202939H22.5627V3H20.3429ZM25.3289 3V0.202939H27.5488V3H25.3289ZM30.315 3V0.202939H32.5349V3H30.315Z" fill="#A7A7A7" />
                      </svg>
                    </li>
                    <li className={`${(+notification?.pagination?.page) === notification?.pagination?.total_pages ? 'active' : ''}`}
                      onClick={() => {
                        getNotification(
                          pageSize,
                          notification?.pagination?.total_pages)
                      }}
                    >{notification?.pagination?.total_pages}</li>
                  </ul>
                </div>
                :
                <PageNumbers
                  totalPages={notification?.pagination?.total_pages}
                  pageSize={pageSize}
                  getNotification={getNotification}
                  notification={notification}
                />
              }
              <div className="next-page"
                style={{ pointerEvents: (+notification?.pagination?.page) === notification?.pagination?.total_pages ? 'none' : 'auto' }}
                onClick={() => {
                  getNotification(
                    pageSize,
                    (+notification?.pagination?.page) + 1)
                }}
              >Next</div>
            </div>
          }
        </div>
      }
    </>
  )
}

