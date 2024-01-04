import React from 'react'
import SellerProductImage1 from '../../../assets/Images/Categorylisting/1.png'
import SellerProductImage2 from '../../../assets/Images/Categorylisting/2.png'
import SellerProductImage3 from '../../../assets/Images/Categorylisting/3.png'
import SellerProductImage4 from '../../../assets/Images/Categorylisting/4.png'
import SellerProductImage5 from '../../../assets/Images/Categorylisting/5.png'

const products = [
  {
    id: 1,
    title: 'Adidas Originals Mens Stan Smith Kris Andrew Pride Sneaker Cream US 7 #GX6394',
    image: SellerProductImage1,
    status: 'Pending',
    orderId: 'ORDER#45543',
  },
  {
    id: 2,
    title: 'Adidas Originals Mens Stan Smith',
    image: SellerProductImage2,
    status: 'Pending',
    orderId: 'ORDER#634333',
  },
  {
    id: 3,
    title: 'Adidas Originals Mens Stan Smith',
    image: SellerProductImage3,
    status: 'Pending',
    orderId: 'ORDER#23235',
  },
  {
    id: 4,
    title: 'Adidas Originals Mens Stan Smith',
    image: SellerProductImage4,
    status: 'Pending',
    orderId: 'ORDER#5636',
  },
  {
    id: 5,
    title: 'Adidas Originals Mens Stan Smith',
    image: SellerProductImage5,
    status: 'Pending',
    orderId: 'ORDER#12242',
  },
];
const SellingDetailsDashBoard = () => {
  return (
    <>
    <section id='selleng-dashbaord'>
      <h3>Hi Seller,</h3>
        <div className='row minndabb'>
            <div className='col-lg-4 col'>
              <div className='dabb'>
                <h4>Completed Orders</h4>
                <h1>20</h1>
                <select>
                    <option>This Month</option>
                    <option>This Month</option>
                    <option>This Month</option>
                </select>
                </div>
            </div>
            <div className='col-lg-4 col'>
            <div className='dabb'>
                <h4>Offers</h4>
                <h1>20</h1>
                <select>
                    <option>This Month</option>
                    <option>This Month</option>
                    <option>This Month</option>
                </select>
                </div>
            </div>
            <div className='col-lg-4 col'>
            <div className='dabb'>
                <h4>Earnings</h4>
                <h1>$ 680.00</h1>
               <button>Withdraw</button>
                </div>
            </div>
        </div>
        <div className='order-feeds'>
          <h3>Orders Feed</h3>
        {/* Secondrow */}
        {products.map((product) => (
        <div className='row' key={product.id}>
              <div className='product-item'>
                <div className='detaildashbritemdetail'>
                  <div className='img-title'>
                <div><img src={product.image} alt={product.title} /></div>
                <div>
                <p>{product.orderId}</p>
                <h4>{product.title}</h4>
                <p>{product.status}</p>
                </div>
                </div>
                </div>
                <div className='dropdown'>
                  {/* Placeholder for the dropdown button */}
                  <button>
                    View Detail
                  </button>
                </div>
              </div>
              <hr />
            </div>
        ))}
        </div>
    </section>
    </>
  )
}

export default SellingDetailsDashBoard