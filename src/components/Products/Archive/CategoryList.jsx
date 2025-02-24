import React, { useState, useEffect } from 'react';
import blank from "../../../assets/Images/Productcard/blank.jpg";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../services/Constant";
import HomeService from '../../../services/API/HomeService';
import Skeleton from 'react-skeleton-loader';
const CategoryList = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCategoryData = async () => {
    HomeService.recursiveCategories()
      .then((res) => {
        setCategoryData(res.slice(0, 6));
      }).catch(error => {
        setError('Error fetching product data:', error);
      }).finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);


  return (
    <>
      {categoryData?.length > 0 &&
        <section id='product-recents-viewed' className='explore-category'>
          <>
            <div className='container'>
              <div className='row'>
                <div className='headings'>
                  <h3>Explore Categories <span><Link to="/top-category">View More</Link></span></h3>
                </div>
              </div>
            </div>
            <section id='productcard'>
              <div className='container'>
                <div className='row'>
                  {loading ? (
                    <>
                      <div className='col-lg-2 col-md-4 col-sm-6 col-6'>
                        <div className='category-loading'>
                          <div><Skeleton /></div>
                          <h5><Skeleton /></h5>
                        </div>
                      </div>
                      <div className='col-lg-2 col-md-4 col-sm-6 col-6'>
                        <div className='category-loading'>
                          <div><Skeleton /></div>
                          <h5><Skeleton /></h5>
                        </div>
                      </div>
                      <div className='col-lg-2 col-md-4 col-sm-6 col-6'>
                        <div className='category-loading'>
                          <div><Skeleton /></div>
                          <h5><Skeleton /></h5>
                        </div>
                      </div>
                      <div className='col-lg-2 col-md-4 col-sm-6 col-6'>
                        <div className='category-loading'>
                          <div><Skeleton /></div>
                          <h5><Skeleton /></h5>
                        </div>
                      </div>
                      <div className='col-lg-2 col-md-4 col-sm-6 col-6'>
                        <div className='category-loading'>
                          <div><Skeleton /></div>
                          <h5><Skeleton /></h5>
                        </div>
                      </div>
                      <div className='col-lg-2 col-md-4 col-sm-6 col-6'>
                        <div className='category-loading'>
                          <div><Skeleton /></div>
                          <h5><Skeleton /></h5>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {categoryData.map((category, index) => {
                        return (
                          <div className='col-lg-2 col-md-4 col-sm-6 col-6' key={index}>
                            <Link to={`/category?category-id=${category?.id}`}>
                              <div className='category' key={category?.id}>
                                <div>
                                  {category?.media?.length > 0 ? (
                                    <>
                                      {category?.media?.map((media, index) => {
                                        return (
                                            <img src={`${BASE_URL}/image/category/${media?.name}`} alt={media?.name} key={index} />
                                        )
                                      })}
                                    </>
                                  ) : (
                                    <img src={blank} alt="blank" />
                                  )
                                  }
                                </div>
                                <h5 style={{ textAlign: "center" }}>{category.name}</h5>
                              </div>
                            </Link>
                          </div>
                        )
                      })}
                    </>
                  )}
                </div>
              </div>
            </section>
          </>
        </section>
      }
    </>
  )
}

export default CategoryList