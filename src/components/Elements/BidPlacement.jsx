import React, { useState } from 'react';

const BidPlacement = () => {

    const [totalBid, setTotalBid] = useState('$0.01'); // State to hold the total bid value

    const handleBidClick = (amount) => {
      setTotalBid(`${amount}`); // Update the total bid value when a button is clicked
    };
  
  return (
    <>
    <section id='increaseyourbids'>
        <div className='details'>
            <h3>Increase your bid</h3>
            <p>{totalBid} + $3.99 shipping</p>
            <h4><b>02 Bids</b> <span>Time Left : <em>23:20:53</em></span></h4>
            <div className='bidding-buttons-crease'>
      <button onClick={() => handleBidClick('$10')}>bid $ 10</button>
      <button onClick={() => handleBidClick('$12')}>bid $ 12</button>
      <button onClick={() => handleBidClick('$14')}>bid $ 14</button>
    </div>
    <hr />
        </div>
    </section>
    </>
  )
}

export default BidPlacement