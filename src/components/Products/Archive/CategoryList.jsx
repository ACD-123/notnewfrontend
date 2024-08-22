import React, { useState, useEffect } from 'react';
import Categoryimage1 from "../../../assets/Images/MainCategories/Category1.png"
import Categoryimage2 from "../../../assets/Images/MainCategories/Category2.png"
import Categoryimage3 from "../../../assets/Images/MainCategories/Category3.png"
import Categoryimage4 from "../../../assets/Images/MainCategories/Category4.png"
import Categoryimage5 from "../../../assets/Images/MainCategories/Category5.png"
import Categoryimage6 from "../../../assets/Images/MainCategories/Category6.png"
import Categoryimage7 from "../../../assets/Images/MainCategories/Category7.png"
import blank from "../../../assets/Images/Productcard/blank.jpg";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../services/Constant";
import LoadingComponents from '../../Shared/LoadingComponents';
import HomeService from '../../../services/API/HomeService';
import Skeleton from 'react-skeleton-loader';
const CategoryList = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loadingDots, setLoadingDots] = useState('...'); // State to control loading dots

  const fetchCategoryData = async () => {
    HomeService.recursiveCategories()
      .then((res) => {
        setCategoryData(res.slice(0, 6)); // Limit to the first 6 products
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
      <section id='product-recents-viewed' className='explore-category'>
        <>
          <div className='container'>
            <div className='row'>
              <div className='headings'>
                <h3>Explore Known Categories <span><Link to="/top-category">View More</Link></span></h3>
              </div>
            </div>
          </div>
          <section id='productcard'>
            <div className='container'>
              <div className='row'>
                {loading ? (
                  <>
                    <div className='col col-lg-2'>
                      <div className='category-loading'>
                        <div><Skeleton /></div>
                        <h5><Skeleton /></h5>
                      </div>
                    </div>
                    <div className='col col-lg-2'>
                      <div className='category-loading'>
                        <div><Skeleton /></div>
                        <h5><Skeleton /></h5>
                      </div>
                    </div>
                    <div className='col col-lg-2'>
                      <div className='category-loading'>
                        <div><Skeleton /></div>
                        <h5><Skeleton /></h5>
                      </div>
                    </div>
                    <div className='col col-lg-2'>
                      <div className='category-loading'>
                        <div><Skeleton /></div>
                        <h5><Skeleton /></h5>
                      </div>
                    </div>
                    <div className='col col-lg-2'>
                      <div className='category-loading'>
                        <div><Skeleton /></div>
                        <h5><Skeleton /></h5>
                      </div>
                    </div>
                    <div className='col col-lg-2'>
                      <div className='category-loading'>
                        <div><Skeleton /></div>
                        <h5><Skeleton /></h5>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {categoryData.map((category , index) => {
                      return (
                        <div className='col col-lg-2' key={index}>
                          <Link to={`/category?category-id=${category?.id}`}>
                            <div className='category' key={category?.id}>
                              <div>
                                {category?.media?.length > 0 ? (
                                  <>
                                    {category?.media?.map((media , index) => {
                                      return (
                                        <>
                                          <img src={`${BASE_URL}/image/category/${media?.name}`} alt={media?.name} key={index}/>
                                        </>
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
    </>
  )
}

export default CategoryList