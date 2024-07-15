import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import auctionImage from '../../../assets/Images/auctionproductsicon.png'
import topSellerImage from '../../../assets/Images/topsellersicon.png'
import { toast } from 'react-toastify';
import Home from '../../../pages/Home';
import HomeService from '../../../services/API/HomeService';
import { BASE_URL } from "../../../services/Constant"
import { Link } from 'react-router-dom';
import Skeleton from 'react-skeleton-loader';

function HomeCategorySlider() {
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    var settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    const fetchCategoryData = async () => {
        HomeService.recursiveCategories()
            .then((res) => {
                setCategoryData(res);
                setLoading(false);
            }).catch(error => {
                toast.error('Error fetching product data:', error);
                setLoading(false);
            }).finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCategoryData();
    }, []);
    return (
        <div className="home-category-slider">
            <div className="home-category-slider-wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {loading ? 
                            <Slider {...settings}>
                                <div className='h-c-s-slider'>
                                    <Link>
                                        <div className='h-c-s-slider-w' style={{backgroundColor : 'transparent'}}>
                                        <Skeleton/>
                                        </div>
                                    </Link>
                                </div>
                                <div className='h-c-s-slider'>
                                    <Link>
                                        <div className='h-c-s-slider-w' style={{backgroundColor : 'transparent'}}>
                                        <Skeleton/>
                                        </div>
                                    </Link>
                                </div>
                                <div className='h-c-s-slider'>
                                    <Link>
                                        <div className='h-c-s-slider-w' style={{backgroundColor : 'transparent'}}>
                                        <Skeleton/>
                                        </div>
                                    </Link>
                                </div>
                                <div className='h-c-s-slider'>
                                    <Link>
                                        <div className='h-c-s-slider-w' style={{backgroundColor : 'transparent'}}>
                                        <Skeleton/>
                                        </div>
                                    </Link>
                                </div>
                            </Slider>
                            :
                            <Slider {...settings}>
                                <div className='h-c-s-slider active'>
                                    <Link to={'/auctions'}>
                                        <div className='h-c-s-slider-w'>
                                            <img src={auctionImage} alt="" />
                                            <h3>Auction Products</h3>
                                        </div>
                                    </Link>
                                </div>
                                <div className='h-c-s-slider'>
                                <Link to={'/top-sellers'}>
                                    <div className='h-c-s-slider-w'>
                                        <img src={topSellerImage} alt="" />
                                        <h3>Top Sellers</h3>
                                    </div>
                                </Link>
                                </div>
                                {categoryData?.length > 0 &&
                                    (categoryData?.map((data, index) => {
                                        return (
                                            <div className='h-c-s-slider' key={index}>
                                                 <Link to={`/category?category-id=${data?.id}`}>
                                                <div className='h-c-s-slider-w'>
                                                    <img src={`${BASE_URL}/image/category/${data?.media?.[0]?.name}`} alt="" />
                                                    <h3>{data?.name}</h3>
                                                </div>
                                                 </Link>
                                            </div>
                                        )
                                    }))
                                }
                            </Slider>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeCategorySlider