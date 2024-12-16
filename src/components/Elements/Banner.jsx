import React, { useEffect } from 'react'
import Arrow from '../../assets/Images/Elements/arrow.png'
import { Link } from 'react-router-dom'
import Skeleton from 'react-skeleton-loader';

const Banner = ({ data, loading }) => {

  return (
    <>
      {loading ?
        <div id="carouselExampleIndicators">
          <Skeleton  />
        </div>
        :
        data?.length > 0 ?
          <section id='banners'>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
              {loading ?
                <Skeleton />
                :
                <>
                  <div className="carousel-inner">
                    {data?.map((item, index) => {
                      return (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`}
                          style={{
                            backgroundImage: `linear-gradient(rgba(108, 94, 159, 0.5), rgba(108, 94, 159, 0.5)), url(${item?.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                          }}
                          key={index}
                        >
                          <div className="container">
                            <div className='banner-text-button'>
                              <h1>Best Deals <br></br>In Town</h1>
                              <p>There are many variations of passages of Lorem Ipsum available</p>
                              <Link to="/product-filter"><button className='dark'>Shop Now <img src={Arrow} /></button></Link>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="carousel-indicators">
                    {data?.map((item, index) => {
                      return (
                        <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={`${index === 0 ? 'active' : ''}`} aria-current="true" aria-label={`Slide ${index + 1}"`}></button>
                      )
                    })}
                  </div>
                </>
              }
            </div>
          </section>
          :
          null
      }
    </>
  )
}

export default Banner