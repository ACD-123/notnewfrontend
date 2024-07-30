import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Skeleton from 'react-skeleton-loader';
import HomeService from '../../services/API/HomeService';
import { BASE_URL } from '../../services/Constant';

function Category() {
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

    const fetchCategoryUnderag = async () => {
        HomeService.fetchCategoryUnderag()
            .then((res) => {
                console.log(res, 'fetchCategoryUnderag');
                setCategoryData(res);
                setLoading(false);
            }).catch(error => {
                toast.error('Error fetching product data:', error);
                setLoading(false);
            })
    };

    useEffect(() => {
        fetchCategoryUnderag();
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
                                            <div className='h-c-s-slider-w' style={{ backgroundColor: 'transparent' }}>
                                                <Skeleton />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className='h-c-s-slider'>
                                        <Link>
                                            <div className='h-c-s-slider-w' style={{ backgroundColor: 'transparent' }}>
                                                <Skeleton />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className='h-c-s-slider'>
                                        <Link>
                                            <div className='h-c-s-slider-w' style={{ backgroundColor: 'transparent' }}>
                                                <Skeleton />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className='h-c-s-slider'>
                                        <Link>
                                            <div className='h-c-s-slider-w' style={{ backgroundColor: 'transparent' }}>
                                                <Skeleton />
                                            </div>
                                        </Link>
                                    </div>
                                </Slider>
                                :
                                <>
                                    {categoryData?.length === 1 ?
                                        <Slider {...settings}>
                                            {categoryData?.map((data, index) => {
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
                                            })}
                                            <div className='h-c-s-slider'></div>
                                            <div className='h-c-s-slider'></div>
                                            <div className='h-c-s-slider'></div>
                                        </Slider>
                                        :
                                        null
                                    }
                                    {categoryData?.length === 2 ?
                                        <Slider {...settings}>
                                            {categoryData?.map((data, index) => {
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
                                            })}
                                            <div className='h-c-s-slider'></div>
                                            <div className='h-c-s-slider'></div>
                                        </Slider>
                                        :
                                        null
                                    }
                                    {categoryData?.length === 3 ?
                                        <Slider {...settings}>
                                            {categoryData?.map((data, index) => {
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
                                            })}
                                            <div className='h-c-s-slider'></div>
                                        </Slider>
                                        :
                                        null
                                    }
                                    {categoryData?.length > 3 ?
                                        <>
                                            <Slider {...settings}>
                                                {categoryData?.map((data, index) => {
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
                                                })}
                                            </Slider>
                                        </>
                                        :
                                        null
                                    }
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category