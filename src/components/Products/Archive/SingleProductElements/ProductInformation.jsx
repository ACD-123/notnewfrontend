import React,{useState, useEffect} from 'react'
import Attribute from './Attributes'
import ShippingPolicyData from "./ShippingPolicyData"
import { Link } from 'react-router-dom'
import ProductServices from '../../../../services/API/ProductServices'; //~/services/API/ProductServices
import SellerServices from '../../../../services/API/SellerServices'; //~/services/API/SellerServices
import CartServices from '../../../../services/API/CartServices'; //~/services/API/CartServices
import { toast } from "react-toastify";
import {useDispatch, useSelector} from 'react-redux'
import {saveCupon, deleteCupon} from '../../../../store/slices/cupon'
import EditListingForm from '../../../AccountsSetting/SellerSetup/EditListingForm'

const ProductInformation = () => {
  const dispatch = useDispatch()
  const [productData, setProductData] = useState([]);
  const [gettags, setTags] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { pathname } = window.location;
  const id = pathname.split("/").pop();
  let loggedInUser = localStorage.getItem("user_details");
  const loggedInUsers = JSON.parse(loggedInUser);
    
  const saveRecentView = () => {
    let data ={
      'id': id
    }
    SellerServices.createRecent(data)
      .then((response) => {
        console.log('response',response)
      }) 
  };
  const getProduct =() =>{
    ProductServices.get(id)
      .then((res) => {
        setProductData(res)
        let tags = JSON.parse(JSON.parse(res.tags));
        let allTags = [];
        {tags.map((tag, index) => (
          allTags.push(tag.tag)
        ))}
        setTags(allTags);
      }) 
  }
  const addByNow =(e)=>{
    e.preventDefault();
    // window.location.href = '/notfound'
    setIsLoading(true);
    setEnabled(true);
      let arributes = localStorage.getItem('arributes');
      arributes =JSON.parse(arributes);
      let quanity = "";
      // if(arributes.quantity){
      //   quanity = arributes.quantity;
      // }
      let inputData ={
        "price": productData.price,
        "quantity":  1,
        "product_id": productData.id,
        "attributes": arributes,
        "shop_id": productData.shop?.id,
      }
      CartServices.save(inputData)
      .then((response) => {
        if(response.success){
          CartServices.count()
            .then((response) => {
              dispatch(saveCupon(response));
            })
          // window.location.href=`/checkouts/${productData.guid}`;
        }else{
          toast.error(response.message);
        }
      })
      .catch((e) => {
        toast.error(e.message);
        setIsLoading(false);
        setEnabled(false);
      })
      .then(() => {
        setIsLoading(false);
        setEnabled(false);
      });
  }
  const addToCart = (e) =>{
      e.preventDefault();
      // window.location.href = '/notfound'
      setIsLoading(true);
      setEnabled(true);
        let arributes = localStorage.getItem('arributes');
        arributes =JSON.parse(arributes);
        let quanity = "";
        // if(arributes.quantity){
        //   quanity = arributes.quantity;
        // }
        let inputData ={
          "price": productData.price,
          "quantity":  quantity,
          "product_id": productData.id,
          "attributes": arributes,
          "shop_id": productData.shop?.id,
        }
        CartServices.save(inputData)
        .then((response) => {
          if(response.success){
            CartServices.count()
            .then((response) => {
              dispatch(saveCupon(response));
            })
            toast.success(response.message);
          }else{
            toast.error(response.message);
          }
        })
        .catch((e) => {
          toast.error(e.message);
          setIsLoading(false);
          setEnabled(false);
        })
        .then(() => {
          setIsLoading(false);
          setEnabled(false);
        });
  }
  const handleDropdownItemClick = (componentName) => {
    // Here, you can navigate to the 'Activity' component and pass the selected component name as a query parameter or state
    // For example, using query parameter
    // window.location.href = `/customerdashboard?component=${componentName}`;
  };
  const hanldeWishList = (guid) =>{
    ProductServices.saved(guid,productData)
    .then((response) => {
      if(response.status){
        toast.success(response.message);
      }
    })
    .catch((e) => {
      console.log(e)
    });
  }
  const handleQuantity = (e) =>{
    e.preventDefault();
    setQuantity(e.target.value)
  }
  const handleEdit =(e)=>{
    e.preventDefault();
    setShowPopup(true)
    // localStorage.setItem('editproduct', true);
    // window.location.href="http://localhost:3000/customerdashboard?component=component"
  }
  useEffect(() => {
    saveRecentView();
    getProduct();
  }, []);
  return (
    <>
    <div className='product-info'>
      {/* {productData.length > 0 ?(
        <> */}
          <h3>{productData.name}</h3>
          {(() => {
            if (productData.shipping_price === 0) {
              return (
                <p>Free Shipping and Returns</p>
              )
            } else {
              return (
                <div>
                  <p>Shipment Cost : $ {productData.shipping_price}</p>
                </div>
              )
            }
          })()}
          {/* <Attribute /> */}
          Quantity: <input type="number" min="1" value={quantity} onChange={handleQuantity} />
          <hr />
          <div className='price-product'>
              <h5>Price: <span>$ {productData.price}</span></h5>
          </div>
          {loggedInUsers ? (<>
            {(() => {
            
            if (productData.user_id === loggedInUsers.id) {
              return (
                <div className='pay-buttons'>
              <button onClick={handleEdit}>
                Edit
              </button>
              {/* <Link onClick={() => handleDropdownItemClick('component')}><button>Edit</button></Link> */}
          </div>
              );
            } else if (productData.user_id !== loggedInUsers.id){
              return (
                <div className='pay-buttons'>
              {/* <Link to={`/checkouts/${productData.guid}`}> */}
                <button onClick={addByNow}>Buy It Now</button>
                {/* </Link> */}
              <button onClick={addToCart}  disabled={enabled}>
                {isLoading ? "loading.." : "Add to Cart"}
              </button>
              {/* <Link to="/shoppingcart"><button>Add to Cart</button></Link> */}
              {/* <Link onClick={() => handleDropdownItemClick('componentC')}><button>Add to Wishlist</button></Link> */}
              <Link onClick={() => hanldeWishList(productData.guid)}><button>Add to Wishlist</button></Link>
          </div>
              );
            }
          })()}
          </>):(<>
            <div className='pay-buttons'>
              {/* <Link to={`/checkouts/${productData.guid}`}> */}
                <button onClick={addByNow}>Buy It Now</button>
                {/* </Link> */}
              <button onClick={addToCart}  disabled={enabled}>
                {isLoading ? "loading.." : "Add to Cart"}
              </button>
              {/* <Link to="/shoppingcart"><button>Add to Cart</button></Link> */}
              {/* <Link onClick={() => handleDropdownItemClick('componentC')}><button>Add to Wishlist</button></Link> */}
              <Link onClick={() => hanldeWishList(productData.guid)}><button>Add to Wishlist</button></Link>
          </div></>)}
          
          
          <br />
          <h3>Tags</h3>
          <ul className='tagsList'>
            {gettags.map((tag) => {
              return (
                <>
                <li>{tag}</li>
                </>
              );
            })}
          </ul>
          <br />
          <br />
          <h3>Descriptions</h3>
          {productData.description}
          <ShippingPolicyData />
        {/* </>
      ):('')} */}
        <div className="popup">
          {/* Popup for successful product activation */}
          {showPopup && (
            <div className="listing-activated">
              <div className="innerlisting-activated">
                <EditListingForm />
                <button onClick={() => setShowPopup(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
    </div>
    </>
  )
}

export default ProductInformation

