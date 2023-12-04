import React from 'react'
import Secureimage1 from '../../../../assets/Images/Singleproduct/Sidebar/1.png'
import Secureimage2 from '../../../../assets/Images/Singleproduct/Sidebar/2.png'
import Secureimage3 from '../../../../assets/Images/Singleproduct/Sidebar/3.png'
import Secureimage4 from '../../../../assets/Images/Singleproduct/Sidebar/4.png'
import Image from '../../../../assets/Images/Singleproduct/Sidebar/notnew.png'
import Heart from '../../../../assets/Images/Singleproduct/Sidebar/heart.png'
import { Link } from 'react-router-dom'
const SingleProductSidebar = () => {
  return (
   <>
   <div className='singleproduct-sidebar'>
    
    <div className='secure'>
        <div className='image'>
            <img src={Secureimage1} />
        </div>
        <div className='text-secure'>
            <h4>Trending Product</h4>
            <p>591 Products has been Sold.</p>
        </div>
    </div>

    <div className='secure'>
        <div className='image'>
            <img src={Secureimage2} />
        </div>
        <div className='text-secure'>
            <h4>Safe payments</h4>
            <p>It is a long established fact that a reader will be distracted </p>
        </div>
    </div>

    <div className='secure'>
        <div className='image'>
            <img src={Secureimage3} />
        </div>
        <div className='text-secure'>
            <h4>Security & privacy</h4>
            <p>It is a long established fact that a reader will be distracted </p>
        </div>
    </div>

    <div className='secure'>
        <div className='image'>
            <img src={Secureimage4} />
        </div>
        <div className='text-secure'>
            <h4>Buyer Protection</h4>
            <p>It is a long established fact that a reader will be distracted </p>
        </div>
    </div>
    <hr />
    <div className='store'>
    <img src={Image} />
    <h2>NotNew_Official Store</h2>
    </div>
    <div className='storecontactdetails'>
        <ul>
            <li><Link to="#"><img src={Heart} /> Save this Seller</Link></li>
            <li><Link to="#">Contact Seller</Link></li>
            <li><Link to="#">Visit Seller Shop</Link></li>
            <li><Link to="#">View Other Products</Link></li>
        </ul>
    </div>
   </div>
   </>
  )
}

export default SingleProductSidebar