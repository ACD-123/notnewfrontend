import React from 'react'
import Banner from "../../assets/Images/Getsurprisedbanner/getsurprisedbanner.png"
import Arrow from '../../assets/Images/Getsurprisedbanner/arrowblue.png'
var Getsurprised = {
    backgroundImage: `url(${Banner})`,
    backgroundSize: "cover",
    borderRadius: "20px",
  };


const GetSurprisedBanner = () => {
  return (
   <>
   <section id='getsurpriseprice'
   style={{padding: "0px 0px 30px 0px"}}
   >
    <div className='container'>
        <div className='row'
        style={Getsurprised}
        >
            <div className='text-button'>
                <h1>Get<br />Surprised <br />by the price</h1>
                <a href="#"><button className='dark'>Shop Now <img src={Arrow} /></button></a>
            </div>
        </div>
    </div>
   </section>
   </>
  )
}

export default GetSurprisedBanner