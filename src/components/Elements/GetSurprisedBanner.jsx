import React from 'react'
import Banner from "../../assets/Images/Getsurprisedbanner/getsurprisedbanner.png"
import Arrow from '../../assets/Images/Getsurprisedbanner/arrowblue.png'
import Slider from "react-slick";

const GetSurprisedBanner = ({ featureBanners }) => {

  var settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      {featureBanners?.length > 0 ?
        <section id='getsurpriseprice'>
          <div className='container'>
            <div className='row'>
              <div className="col-lg-12">
                <Slider {...settings}>
                  {featureBanners?.map((data, index) => {
                    return (
                      <div key={index}>
                        <div
                          style={{
                            backgroundImage: `linear-gradient(rgba(108, 94, 159, 0.5), rgba(108, 94, 159, 0.5)), url(${data?.imageUrl})`,
                            backgroundSize: "cover",
                            borderRadius: "20px",
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'

                          }}>
                          <div className='text-button'>
                            <h1>Get<br />Surprised <br />by the price</h1>
                            <a href={`${data?.url}`}><button className='dark'>Shop Now <img src={Arrow} /></button></a>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </section>
        :
        null
      }
    </>
  )
}

export default GetSurprisedBanner