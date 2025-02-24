import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import blank from "../../assets/Images/Productcard/blank.jpg";
import Footer from '../../components/Footer'
import HomeService from "../../services/API/HomeService";
import { BASE_URL } from "../../services/Constant";
import { Spinner } from 'react-bootstrap';
const CategoryPage = ({cartFullResponse, notificationCount}) => {
  const [categories, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getCategory = () => {
    HomeService.getrecursive()
      .then((res) => {
        setIsLoading(false);
        setCategoryData(res)
      })
  }
  useEffect(() => {
    getCategory()
  }, [])
  return (
    <>
      <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount}/>
      <section id='category-page-main'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-3'>
              <div className='all-ct'>
                <h3>All Categories</h3>
                <ul>
                  {categories?.length > 0 ? (
                    <>
                      {categories?.map((category , index) => (
                        <Link to={`/notFound`} key={index}><li>{category.name}</li></Link>
                      ))}
                    </>
                  ) : ('')}
                </ul>
              </div>
            </div>
            <div className='col-lg-9'>
              <div className='all-catergylisting'>
                <div className='row'>
                  {isLoading ? (
                    <div className="loader-container">
                      <Spinner animation="border" role="status">
                      </Spinner>
                    </div>
                  ) : (
                    <>

                      {categories?.length > 0 ? (
                        <>
                          {categories?.map((product) => (
                            <div className='col' key={product.id}>
                              <div className='productlist gradient'>
                                <h3>{product.name}</h3>
                                {product?.media?.length > 0 ? (
                                  <>
                                    {product?.media?.map((media , index) => {
                                      return (
                                        <>
                                          <img src={`${BASE_URL}/image/category/${media?.name}`} alt={media?.name} key={index} />
                                        </>
                                      )
                                    })}
                                  </>
                                ) : (
                                  <img src={blank} alt={product?.name} />
                                )
                                }
                                <ul>
                                  {product?.children_recursive.map((subcategory, index) => (
                                    <li key={index}>
                                      <a href={subcategory?.url}>{subcategory?.name}</a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : ('')}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default CategoryPage