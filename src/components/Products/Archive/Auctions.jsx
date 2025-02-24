import React, { useEffect, useState } from 'react'
import Footer from '../../../components/Footer';
import Header from "../../../components/Header";
import ProductSkeletonLoader from '../../../components/Shared/ProductSkeletonLoader';
import HomeService from '../../../services/API/HomeService';
import ProductCard from '../../../components/Shared/Cards/ProductCard';
import GetSurprisedBanner from '../../../components/Elements/GetSurprisedBanner';
import NoDataFound from '../../Shared/NoDataFound';
import { toast } from 'react-toastify';

const PageNumbers = ({
    totalPages,
    getAuctionProducts,
    pageSize,
    pagination,
    loggedInUserId }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  
    return (
      <div className='all-pages'>
        <ul>
          {pageNumbers.map(number => (
            <li key={number}
              className={`${(+pagination?.page) === number ? 'active' : ''}`}
              onClick={() => {
                getAuctionProducts(
                  loggedInUserId,
                  1,
                  number,
                  pageSize)
              }}>
              {number}
            </li>
          ))}
        </ul>
      </div>
    );
  };

const Auctions = ({cartFullResponse , notificationCount}) => {
    const [auctionProducts, setAuctionProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [Loader, setLoader] = useState(true)
    const user_id = localStorage.getItem('user_id');
    const pageSize = 12;
    const getAuctionProducts = (user_id , underage , page , page_size) => {
        HomeService.getAuctionProducts(user_id , underage , page , page_size)
            .then((response) => {
                setAuctionProducts(response?.data?.auctioned)
                setLatestProducts(response?.data?.latest)
                setPagination(response?.data?.pagination)
                setLoader(false)
            })
            .catch((error) => {
                setLoader(false)
                toast.error(error?.response?.data?.message)
            });
    };

    useEffect(() => {
        getAuctionProducts(user_id , 1 , 1 , pageSize)
    }, [])

    const handleToggleFavouriteAuction = (index) => {
        const updatedProducts = [...auctionProducts];
        updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
        setAuctionProducts(updatedProducts);
    };

    const handleToggleFavouriteLatest = (index) => {
        const updatedProducts = [...auctionProducts];
        updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
        setAuctionProducts(updatedProducts);
    };
    return (
        <>
            <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount}/>
            <div className="top-sellers">
                <div className="top-sellers-wrap" id='productcard'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="title">Latest Auctions</h1>
                            </div>
                            {Loader ?
                                <>
                                    <div className="col-lg-3 col-md-6 col-sm-12">
                                        <ProductSkeletonLoader />
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12" id='hide-on-mobile-768'>
                                        <ProductSkeletonLoader />
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12" id="hide-on-mobile-991">
                                        <ProductSkeletonLoader />
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12" id="hide-on-mobile-991">
                                        <ProductSkeletonLoader />
                                    </div>
                                </>
                                :
                                (latestProducts?.length > 0 ?
                                    latestProducts?.map((data, index) => {
                                        return (
                                            <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                                                <ProductCard data={data} handleToggleFavourite={handleToggleFavouriteLatest} index={index} />
                                            </div>
                                        )
                                    })
                                    :
                                    <NoDataFound title={'No Data Found'} />
                                )
                            }
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="title">Auctions</h1>
                            </div>
                            {Loader ?
                                <>
                                    <div className="col-lg-3 col-md-6 col-sm-12">
                                        <ProductSkeletonLoader />
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12" id='hide-on-mobile-768'>
                                        <ProductSkeletonLoader />
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12" id="hide-on-mobile-991">
                                        <ProductSkeletonLoader />
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12" id="hide-on-mobile-991">
                                        <ProductSkeletonLoader />
                                    </div>
                                </>
                                :
                                (auctionProducts?.length > 0 ?
                                    auctionProducts?.map((data, index) => {
                                        return (
                                            <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                                                <ProductCard data={data} handleToggleFavourite={handleToggleFavouriteAuction} index={index} />
                                            </div>
                                        )
                                    })
                                    :
                                    <NoDataFound title={'No Data Found'} />
                                )
                            }
                        </div>
                        <div className="row">
                        {pagination?.total_pages > 1 &&
                  <div className="page-pagination">
                    <div className="previous-page"
                      style={{ pointerEvents: (+pagination?.page) === 1 ? 'none' : 'auto' }}
                      onClick={() => {
                        getAuctionProducts(
                          user_id,
                          1,
                          (+pagination?.page) - 1,
                          pageSize)
                      }}
                    >Previous</div>
                    {pagination?.total_pages > 10 ?
                      <div className="all-pages">
                        <ul>
                          <li className={`${(+pagination?.page) === 1 ? 'active' : ''}`}
                            onClick={() => {
                              getAuctionProducts(
                                user_id,
                                1,
                                1,
                                pageSize
                            )
                            }}
                          >1</li>
                          <li className={`${(+pagination?.page) === 2 ? 'active' : ''}`}
                            onClick={() => {
                              getAuctionProducts(
                                user_id,
                                1,
                                2,
                                pageSize
                            )
                            }}
                          >2</li>
                          <li className={`${(pagination?.page) === 3 ? 'active' : ''}`}
                            onClick={() => {
                              getAuctionProducts(
                                user_id,
                                1,
                                3,
                                pageSize
                            )
                            }}
                          >3</li>
                          <li>
                            <svg width="33" height="3" viewBox="0 0 33 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.39853 3V0.202939H2.61842V3H0.39853ZM5.38461 3V0.202939H7.6045V3H5.38461ZM10.3707 3V0.202939H12.5906V3H10.3707ZM15.3568 3V0.202939H17.5767V3H15.3568ZM20.3429 3V0.202939H22.5627V3H20.3429ZM25.3289 3V0.202939H27.5488V3H25.3289ZM30.315 3V0.202939H32.5349V3H30.315Z" fill="#A7A7A7" />
                            </svg>
                          </li>
                          <li className={`${(+pagination?.page) === pagination?.total_pages ? 'active' : ''}`}
                            onClick={() => {
                              getAuctionProducts(
                                user_id,
                                1,
                                pagination?.total_pages,
                                pageSize
                            )
                            }}
                          >{pagination?.total_pages}</li>
                        </ul>
                      </div>
                      :
                      <PageNumbers
                        totalPages={pagination?.total_pages}
                        getAuctionProducts={getAuctionProducts}
                        loggedInUserId={user_id}
                        pageSize={pageSize}
                        pagination={pagination}
                      />
                    }
                    <div className="next-page"
                      style={{ pointerEvents: (pagination?.page) === pagination?.total_pages ? 'none' : 'auto' }}
                      onClick={() => {
                        getAuctionProducts(
                          user_id,
                          1,
                          (+pagination?.page) + 1,
                          pageSize
                        )
                      }}
                    >Next</div>
                  </div>
                }
                        </div>
                    </div>
                </div>
            </div>
            <GetSurprisedBanner />
            <Footer />
        </>
    )
}

export default Auctions