import React,{useState, useEffect} from 'react'
import Attribute from './Attributes'
import ShippingPolicyData from "./ShippingPolicyData"
import { Link } from 'react-router-dom'
import ProductServices from '../../../../services/API/ProductServices'; //~/services/API/ProductServices
import CartServices from '../../../../services/API/CartServices'; //~/services/API/CartServices
import { toast } from "react-toastify";
import {useDispatch, useSelector} from 'react-redux'
import {saveCupon, deleteCupon} from '../../../../store/slices/cupon'

const ProductInformation = () => {
  const dispatch = useDispatch()
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const { pathname } = window.location;
  const id = pathname.split("/").pop();
  const saveRecentView = () => {
    let data ={
      'id': id
    }
    ProductServices.createRecent(data)
      .then((response) => {
        console.log('response',response)
      }) 
  };
  const getProduct =() =>{
    ProductServices.get(id)
      .then((response) => {
        setProductData(response)
      }) 
  }
  const addByNow =(e)=>{
    e.preventDefault();
    setIsLoading(true);
    setEnabled(true);
      let arributes = localStorage.getItem('arributes');
      arributes =JSON.parse(arributes);
      let quanity = "";
      if(arributes.quantity){
        quanity = arributes.quantity;
      }
      let inputData ={
        "price": productData.price,
        "quantity":  quanity ? quanity: 1,
        "product_id": productData.id,
        "attributes": arributes,
        "shop_id": productData.shop?.id,
      }
      CartServices.save(inputData)
      .then((response) => {
        if(response.success){
          dispatch(saveCupon(response));
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
      setIsLoading(true);
      setEnabled(true);
        let arributes = localStorage.getItem('arributes');
        arributes =JSON.parse(arributes);
        let quanity = "";
        if(arributes.quantity){
          quanity = arributes.quantity;
        }
        let inputData ={
          "price": productData.price,
          "quantity":  quanity ? quanity: 1,
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
    window.location.href = `/customerdashboard?component=${componentName}`;
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
          <Attribute />
          <hr />
          <div className='price-product'>
              <h5>Price: <span>$ {productData.price}</span></h5>
          </div>
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
          <ShippingPolicyData />
        {/* </>
      ):('')} */}
        
    </div>
    </>
  )
}

export default ProductInformation

