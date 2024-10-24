import React, { useEffect, useState } from 'react'
import HomeService from '../services/API/HomeService';
import Header from '../components/Header';
import ProductSkeletonLoader from '../components/Shared/ProductSkeletonLoader';
import NoDataFound from '../components/Shared/NoDataFound';
import GetSurprisedBanner from '../components/Elements/GetSurprisedBanner';
import Footer from '../components/Footer';
import ProductCard from '../components/Shared/Cards/ProductCard';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PageNumbers = ({
    totalPages,
    getHotUnderAge,
    loggedInUserId,
    pageSize,
    pagination }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className='all-pages'>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number}
                        className={`${(+pagination?.page) === number ? 'active' : ''}`}
                        onClick={() => {
                            getHotUnderAge(
                                loggedInUserId,
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

const ExploreAll21Plus = ({ cartFullResponse, notificationCount }) => {
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);
    const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
    const user_id = localStorage.getItem('user_id');
    const pageSize = 12;

    const getHotUnderAge = (user_id, page_size, page) => {
        HomeService.getHotUnderAge(user_id, page_size, page)
            .then((response) => {
                setTopSellingProducts(response?.data?.products)
                setPagination(response?.data?.pagination)
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
            .catch((error) => {
                setLoading(false)
                toast.error(error?.response?.data?.message)
            });
    };
    const navigate = useNavigate()
    useEffect(() => {
        const underage = localStorage.getItem('underage');
        if (underage == 1) {
            getHotUnderAge(user_id, pageSize, 1)
        } else {
          navigate('/')
        }
      }, [])

    const handleToggleFavourite = (index) => {
        const updatedProducts = [...topSellingProducts];
        updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
        setTopSellingProducts(updatedProducts);
    };

    return (
        <>
            <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount} />
            <div className="top-sellers" id='productcard'>
                <div className="top-sellers-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="title">Explore All Products</h1>
                            </div>
                            {loading ?
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
                                (topSellingProducts?.length > 0 ?
                                    topSellingProducts?.map((data, index) => {
                                        return (
                                            <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                                                <ProductCard data={data} handleToggleFavourite={handleToggleFavourite} index={index} />
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
                                            getHotUnderAge(
                                                user_id,
                                                pageSize,
                                                (+pagination?.page) - 1)
                                        }}
                                    >Previous</div>
                                    {pagination?.total_pages > 10 ?
                                        <div className="all-pages">
                                            <ul>
                                                <li className={`${(+pagination?.page) == 1 ? 'active' : ''}`}
                                                    onClick={() => {
                                                        getHotUnderAge(
                                                            user_id,
                                                            pageSize,
                                                            1)
                                                    }}
                                                >1</li>
                                                <li className={`${(+pagination?.page) == 2 ? 'active' : ''}`}
                                                    onClick={() => {
                                                        getHotUnderAge(
                                                            user_id,
                                                            pageSize,
                                                            2)
                                                    }}
                                                >2</li>
                                                <li className={`${(+pagination?.page) == 3 ? 'active' : ''}`}
                                                    onClick={() => {
                                                        getHotUnderAge(
                                                            user_id,
                                                            pageSize,
                                                            3)
                                                    }}
                                                >3</li>
                                                <li>
                                                    <svg width="33" height="3" viewBox="0 0 33 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.39853 3V0.202939H2.61842V3H0.39853ZM5.38461 3V0.202939H7.6045V3H5.38461ZM10.3707 3V0.202939H12.5906V3H10.3707ZM15.3568 3V0.202939H17.5767V3H15.3568ZM20.3429 3V0.202939H22.5627V3H20.3429ZM25.3289 3V0.202939H27.5488V3H25.3289ZM30.315 3V0.202939H32.5349V3H30.315Z" fill="#A7A7A7" />
                                                    </svg>
                                                </li>
                                                <li className={`${(+pagination?.page) == pagination?.total_pages ? 'active' : ''}`}
                                                    onClick={() => {
                                                        getHotUnderAge(
                                                            user_id,
                                                            pageSize,
                                                            pagination?.total_pages)
                                                    }}
                                                >{pagination?.total_pages}</li>
                                            </ul>
                                        </div>
                                        :
                                        <PageNumbers
                                            totalPages={pagination?.total_pages}
                                            getHotUnderAge={getHotUnderAge}
                                            loggedInUserId={user_id}
                                            pageSize={pageSize}
                                            pagination={pagination}
                                        />
                                    }
                                    <div className="next-page"
                                        style={{ pointerEvents: (+pagination?.page) == pagination?.total_pages ? 'none' : 'auto' }}
                                        onClick={() => {
                                            getHotUnderAge(
                                                user_id,
                                                pageSize,
                                                (+pagination?.page) + 1)
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

export default ExploreAll21Plus