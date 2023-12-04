import React from 'react'
import Bannerimage from '../../assets/Images/Elements/banner.png'
import Bannerimage1 from '../../assets/Images/Elements/banner2.png'
import Arrow from '../../assets/Images/Elements/arrow.png'
import { Link } from 'react-router-dom'

var Bannerbg = {
    backgroundImage: `url(${Bannerimage})`,
    backgroundSize: `cover`
  };
  var Bannerbgs = {
    backgroundImage: `url(${Bannerimage1})`,
    backgroundSize: `cover`
  };

const Banner = () => {
  return (
    <>
    <section id='banners'>
        <div className='container'>
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">

  <div class="carousel-inner">
    <div class="carousel-item active"
    style={Bannerbg}
    >
      <div className='banner-text-button'>
        <h1>Best Deals <br></br>In Town</h1>
        <p>There are many variations of passages of Lorem Ipsum available</p>
        <Link to="/singlecategory"><button className='dark'>Shop Now <img src={Arrow} /></button></Link>
      </div>
    </div>
    <div class="carousel-item"
    style={Bannerbgs}
    >
      <div className='banner-text-button'>
        <h1>Best Deals <br></br>In Town</h1>
        <p>There are many variations of passages of Lorem Ipsum available</p>
        <Link to="/singlecategory"><button className='dark'>Shop Now <img src={Arrow} /></button></Link>
      </div>
    </div>
    <div class="carousel-item"
    style={Bannerbg}
    >
      <div className='banner-text-button'>
        <h1>Best Deals <br></br>In Town</h1>
        <p>There are many variations of passages of Lorem Ipsum available</p>
        <Link to="/singlecategory"><button className='dark'>Shop Now <img src={Arrow} /></button></Link>
      </div>
    </div>
  </div>
  
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
</div>
</div>
</section>
    </>
  )
}

export default Banner