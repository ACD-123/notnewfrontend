import React, {useState, useEffect} from 'react'
import SellerProductImage1 from '../../../assets/Images/Categorylisting/1.png'
import SellerProductImage2 from '../../../assets/Images/Categorylisting/2.png'
import SellerProductImage3 from '../../../assets/Images/Categorylisting/3.png'
import SellerProductImage4 from '../../../assets/Images/Categorylisting/4.png'
import SellerProductImage5 from '../../../assets/Images/Categorylisting/5.png'
import UserServices from "../../../services/API/UserServices"; //~/services/API/AuthService
import { toast } from "react-toastify";
import { setUserDetails, isLoggedin, getUserDetails } from "../../../services/Auth"; // ~/services/Auth

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
  const [user, setUser] = useState({});

const getUser = () => {
  UserServices.detail()
    .then((response) => {
      setUserDetails(response);
      setUser(response);
    })
    .catch((e) => {
      toast.error(e.message);
    });
};

useEffect(() => {
    getUser();
}, []);

  return (
    <>
    <section id='selleng-dashbaord'>
      
      <h3>Hi {user ? (<>
        {
          user.name
        }
      </>):('Seller')},</h3>
        <div className='row minndabb'>
            <div className='col-lg-4 col'>
              <div className='dabb'>
                <h4>Completed Orders</h4>
                <h1>20</h1>
                <select style={{ width: "100%"}}>
                    <option value="">Select Year</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                </select>

                <select style={{ width: "100%", marginTop: "10px"}}>
                  <option value="">Select Month</option>
                    <option value="1">January</option>
                    <option value="2">Febuary</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                </div>
            </div>
            <div className='col-lg-4 col'>
            <div className='dabb'>
                <h4>Offers</h4>
                <h1>20</h1>
                <select style={{ width: "100%"}}>
                    <option value="">Select Year</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                </select>

                <select style={{ width: "100%", marginTop: "10px"}}>
                  <option value="">Select Month</option>
                    <option value="1">January</option>
                    <option value="2">Febuary</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
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