import React,{useEffect, useState} from 'react'
import Secureimage1 from '../../../../assets/Images/Singleproduct/Sidebar/1.png'
import Secureimage2 from '../../../../assets/Images/Singleproduct/Sidebar/2.png'
import Secureimage3 from '../../../../assets/Images/Singleproduct/Sidebar/3.png'
import Secureimage4 from '../../../../assets/Images/Singleproduct/Sidebar/4.png'
import Image from '../../../../assets/Images/Singleproduct/Sidebar/notnew.png'
import Heart from '../../../../assets/Images/Singleproduct/Sidebar/heart.png'
import { Link } from 'react-router-dom'
import ProductServices from "../../../../services/API/ProductServices"; //~/services/API/ProductServices
import SellerServices from "../../../../services/API/SellerServices"; //~/services/API/SellerServices
import Home from "../../../../services/API/Home"; //~/services/API/Home
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../services/Constant";

const SingleProductSidebar = () => {
    const [productData, setProductData] = useState([]);
    const [shopData, setShopData] = useState([]);
    const [trendingProduct, setTrendingProduct] = useState(0);
    const [savedseller, setSavedSeller] = useState("");
    let loggedIn = localStorage.getItem("user_details");
    let logedIn;
    if(loggedIn){
        logedIn = JSON.parse(loggedIn);
    }

    const { pathname } = window.location;
    const id = pathname.split("/").pop();
    const getProduct = () => {
        ProductServices.get(id).then((res) => {
            setProductData(res);
            getSellerSavedData(res?.shop_id);
            Home.getshopData(res?.shop_id)
            .then((response) => {
                if(response.status){
                    setShopData(response.data)
                }
            }).catch((e) => {
                console.log(e)
            }); 
        }).catch((e) => {
            console.log(e)
        });;
    };
    const getTrending = () => {
        ProductServices.getTrendingProduct(id).then((res) => {
            setTrendingProduct(res)
        });
    };
      
     const handleDropdownItemClick = (componentName) => {
        // Here, you can navigate to the 'Activity' component and pass the selected component name as a query parameter or state
        // For example, using query parameter
        window.location.href = `/customerdashboard?component=${componentName}`;
      };
      const handleSellerServices = (e) =>{
        e.preventDefault();
        if(logedIn){
            let data ={
                shop_id: productData.shop_id
            }
            SellerServices.saveSeller(data)
            .then((response) => {
                toast.success(response);
                getSellerSavedData(productData.shop.id);
            }).catch((e) => {
                console.log('Error:', e)
            }); 
        }else{
            window.location.href="/signin";
        }
      }
      const getSellerSavedData = (shop_id) =>{
        ProductServices.getSavedSellerDetails(shop_id)
        .then((response) => {
            setSavedSeller(response.shop_id)
        }).catch((e) => {
            console.log(e)
        }); 
      }
      useEffect(() => {
        getProduct();
        getTrending();
      }, []);
  return (
   <>
   <div className='singleproduct-sidebar'>
    
    <div className='secure'>
        {trendingProduct ? (
            <>  
                <div className='image'>
                    <img src={Secureimage1} />
                </div>
                <div className='text-secure'>
                    <h4>Trending Product</h4>
                    <p>{trendingProduct} Products has been Sold.</p>
                </div>
            </>
        ):('')}
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
    {shopData ? (<>
        <div className='store'>
    
    <img width="150" height="100" src={`${BASE_URL}/${shopData.cover_image}`} />
    
    <h2>{shopData.fullname}</h2>
    </div>
    <div className='storecontactdetails'>
        <ul>
            {/* <li onClick={() => handleDropdownItemClick('componentH')}><Link><img src={Heart} /> Save this Seller</Link></li> */}
            {savedseller ? (
                <>
                <li ><Link><img src={Heart} /> Seller has been Saved!</Link></li>
                </>
            ) :(<>
                <li onClick={(e) => handleSellerServices(e)}><Link><img src={Heart} /> Save this Seller</Link></li>
            </>)}
            
            <li><a href={`tel:${shopData.phone}`} >{shopData.phone}</a></li>
            <li><Link to={`/sellershop/${shopData.guid}`}>Visit Seller Shop</Link></li>
            <li><Link to="#">View Other Products</Link></li>
        </ul>
    </div>
    </>):(<></>)}
    
    
   </div>
   </>
  )
}

export default SingleProductSidebar