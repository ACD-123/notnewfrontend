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
          <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
            {loading ?
            <Skeleton/>
          :
          <>
            <div class="carousel-inner">
              {data?.map((item, index) => {
                return (
                  <div class={`carousel-item ${index === 0 ? 'active' : ''}`}
                    style={{
                      backgroundImage: `url(${item?.image})`,
                      backgroundSize: `cover`
                    }}
                  >
                    <div className='banner-text-button'>
                      <h1>Best Deals <br></br>In Town</h1>
                      <p>There are many variations of passages of Lorem Ipsum available</p>
                      <Link to="/notFound"><button className='dark'>Shop Now <img src={Arrow} /></button></Link>
                    </div>
                  </div>
                )
              })}
            </div>

            <div class="carousel-indicators">
              {data?.map((item, index) => {
                return (
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} class={`${index === 0 ? 'active' : ''}`} aria-current="true" aria-label={`Slide ${index + 1}"`}></button>
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