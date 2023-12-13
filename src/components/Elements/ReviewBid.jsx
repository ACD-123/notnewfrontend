import React from 'react'


const productData = [
    {
    CurrentBid: '89.00',
    YourMaxBid: '24',
    Timeleft: '23:20:53',
    ShippingPrice: '35.20',
    ShippingLocation: 'NOTNEW International Shipping',
    ImportCharges: '89.00',
    EstimatedTotal: '59.20',
    note: '*This item may be subject to duties and taxes upon delivery. *Applicable tax and other charges may be added at checkout.',
    },
  ];
const ReviewBid = () => {
  return (
    <>
    <section id='reviewbid'>
        <div className='container'>
            <h3>
            Review your bid
            </h3>
            <div className='row'>
            {productData.map((product) => (
              <div className='col' key={product.id}>
                <div className='review-bids-list'>
                <ul>
                  <li><span>Current Bid:</span> <em>{product.CurrentBid}</em></li>
                  <li><span>Your Max Bid:</span> <em>{product.YourMaxBid}</em></li>
                  <li><span>Time left:</span> <em style={{color: "red"}}>{product.Timeleft}</em></li>
                  <li><span>Shipping Price:</span> <em>{product.ShippingPrice}</em></li>
                  <li><span>Shipping Location:</span> <em>{product.ShippingLocation}</em></li>
                  <li><span>Import Charges:</span> <em>{product.ImportCharges}</em></li>
                  <li><span>Estimated Total:</span> <em>{product.EstimatedTotal}</em></li>
                  <li><em>{product.note}</em></li>
                </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
    </>
  )
}

export default ReviewBid