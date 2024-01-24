import React from 'react'
import BidCheck from '../../assets/Images/bidcheck.png'
const PlaceYourBid = () => {
  return (
    <>
    <section id='placeyourbid'>
        <h3>Place your bid</h3>
        <p>$0.01 + $3.99 shipping</p>
        <h4><b>02 Bids</b> <span>Time Left : <em style={{color: "#DE0023", fontStyle: "unset"}}>23:20:53</em></span></h4>
        <h5><img src={BidCheck} />Your current bid puts on the top in the lead </h5>
        <h2>Your max bid: $ 2.00</h2>
    </section>
    </>
  )
}

export default PlaceYourBid