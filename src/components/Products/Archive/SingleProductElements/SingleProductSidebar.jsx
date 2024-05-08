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
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import UserServices from "../../../../services/API/UserServices"; //~/services/API/AuthService
import { setUserDetails, isLoggedin, getUserDetails } from "../../../../services/Auth"; // ~/services/Auth

const SingleProductSidebar = () => {
    const { pathname } = window.location;
    const id = pathname.split("/").pop();
  
    const [productData, setProductData] = useState([]);
    const [shopData, setShopData] = useState([]);
    const [shopGuid, setShopGuid] = useState([]);
    // console.log('shopdata',shopData)
    // const [trendingProduct, setTrendingProduct] = useState(0);
    const [isLoading, setIsLoading] = useState(0);
    const [savedseller, setSavedSeller] = useState("");
    const [favData, setFavData] = useState([]);
    const [user, setUser] = useState({});
    
    let loggedIn = localStorage.getItem("user_details");
    let logedIn;
    if(loggedIn){
        logedIn = JSON.parse(loggedIn);
    }

    const getProduct = () => {
        ProductServices.get(id)
          .then((res) => {
              setShopData(res.data.seller);
              console.log('shop guidr',res.data.shop);
              setProductData(res.data);
              setShopGuid(res.data.shop);
              console.log('shopdata',res.data.seller);
            let tags = JSON.parse(res.data.tags);
            let allTags = [];
            // {
            //   tags.map((tag, index) => allTags.push(tag.tag));
            // }
            // setTags(allTags);
          })
          .finally(() => {
            // Set isLoading to false once data fetching is complete
            setIsLoading(false);
          });
      };
    // const getTrending = () => {
    //     ProductServices.getTrendingProduct(id).then((res) => {
    //         setTrendingProduct(res)
    //     });
    // };
      
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
      const getUser = () => {
        UserServices.detail()
          .then((response) => {
          console.log('login',response.id);
          setUserDetails(response);
          setUser(response.id);
          localStorage.setItem('user_details', JSON.parse(response));
          })
          .catch((e) => {
          console.log('error', e)
          // toast.error(e.message);
          });
        };
      const addToFavorites = async (productId) => {
        try {
            const data = {
                favourite_against_id: productId,
                user_id: user,
                type: "2"
            };
            console.log('hit',data)
            const res = await ProductServices.isFavorite(data);
            if (res.status) {
                // Optionally, update UI or show a success message
                toast.success("Product added to favorites!");
                // Update favorites data if necessary
                setFavData(res.data);
            }
        } catch (error) {
            console.error("Error adding to favorites:", error);
            toast.error("Failed to add product to favorites.");
        }
    };
      useEffect(() => {
        getProduct();
        // getTrending();
      }, []);
      useEffect(() => {
        if (isLoggedin()) {
          getUser();
          // let cartItems = localStorage.getItem('cupon');
        }
        }, []);
  return (
   <>
   <div className='singleproduct-sidebar'>
    
   
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
    
    <img width="150" height="100" src={`${shopData.sellerImage}`} />
    
    <h2>{productData.fullname}</h2>
    </div>
        <div className='storecontactdetails'>
            <ul>
                {/* <li onClick={() => handleDropdownItemClick('componentH')}><Link><img src={Heart} /> Save this Seller</Link></li> */}
            
                    <li> <div onClick={() => addToFavorites(productData.guid)} >
                                                        {shopData.is_favourite === true ? (
                                                            <FaHeart/>
                                                        ) : (
                                                            <FaRegHeart/>
                                                        )
                                                        }
                                                        </div>Save this Seller</li>
            
                {/* {productData.id} */}
                <li><a href={`tel:${shopData.phone}`} >{shopData.phone}</a></li>
                <li><Link to={`/sellershop/${shopGuid.guid}`}>Visit Seller Shop</Link></li>
                <li><Link to="#">View Other Products</Link></li>
            </ul>
        </div>
    
    
   </div>
   </>
  )
}

export default SingleProductSidebar