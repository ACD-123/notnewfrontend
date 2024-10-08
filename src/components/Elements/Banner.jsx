import React, { useEffect } from 'react'
import Bannerimage from '../../assets/Images/Elements/banner.png'
import Bannerimage1 from '../../assets/Images/Elements/banner2.png'
import Arrow from '../../assets/Images/Elements/arrow.png'
import notFound from '../../pages/NotFound'
import { Link } from 'react-router-dom'
import Skeleton from 'react-skeleton-loader';

const Banner = ({ data, loading}) => {

  return (
    <>
      <section id='banners'>
        <div className='container'>
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
            {loading ?
            <Skeleton/>
          :
          <>
            <div className="carousel-inner">
              {data?.map((item, index) => {
                return (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`}
                    style={{
                      backgroundImage: `url(${item?.image})`,
                      backgroundSize: `cover`
                    }}
                    key={index}
                  >
                    <div className='banner-text-button'>
                      <h1>Best Deals <br></br>In Town</h1>
                      <p>There are many variations of passages of Lorem Ipsum available</p>
                      <Link to="/product-filter"><button className='dark'>Shop Now <img src={Arrow} /></button></Link>
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
        </div>
      </section>
    </>
  )
}

export default Banner