import React, { useState, useEffect } from "react";
import ProductServices from "../../services/API/ProductServices"; //~/services/API/ProductServices
import SellerServices from "../../services/API/SellerServices"; //~/services/API/SellerServices
import CheckoutServices from "../../services/API/CheckoutServices"; //~/services/API/CheckoutServices
import CartServices from "../../services/API/CartServices"; //~/services/API/CartServices
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { saveCupon, deleteCupon } from "../../store/slices/cupon";
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Productimage from '../../assets/Images/Categorylisting/1.png';
import { Modal, Button } from 'react-bootstrap';
import Payment from "../../assets/Images/Shoppingcart/payment.png"
import Checkpay from "../../assets/Images/check-pay.png"
import UserServices from "../../services/API/UserServices";

const CheckoutBuyNow = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [productShopData, setProductShopData] = useState([]);
  console.log('productData',productData)
  const [gettags, setTags] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Set initial value to true
  const [enabled, setEnabled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userDetails, setUserDetails] = useState(null); // State to store user details

  const { pathname } = window.location;
  const id = pathname.split("/").pop();
  let loggedInUser = localStorage.getItem("user_details");
  const loggedInUsers = JSON.parse(loggedInUser);
  const navigate = useNavigate();

  let incNum = () => {
    if (quantity < 10) {
      setQuantity(Number(quantity) + 1);
    }
  };
  let decNum = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  // let handleQuantity = (e) => {
    useEffect(() => {
        // Fetch user details when the component mounts
        const fetchUserDetails = async () => {
          try {
            const response = await UserServices.detail();
            console.log('user Data:', response); // Log the checkout data
            setUserDetails(response);
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
        };
        
    
        fetchUserDetails();
      }, []); // Empty dependency array to run the effect only once when the component mounts
  // };

  const saveRecentView = () => {
    let data = {
      id: id,
    };
    SellerServices.createRecent(data).then((response) => {
      console.log("response", response);
    });
  };
  const getProduct = () => {
    ProductServices.get(id)
      .then((res) => {
        console.log('res',res)
        setProductData(res.data);
        setProductShopData(res.data.shop);
        let tags = JSON.parse(res.data.tags);
        let allTags = [];
        // {
        //   tags.map((tag, index) => allTags.push(tag.tag));
        // }
        setTags(allTags);
      })
      .finally(() => {
        // Set isLoading to false once data fetching is complete
        setIsLoading(false);
      });
  };
  const calculateTotalPrice = () => {
    if (productData) {
      const subtotal = productData.price;
      const shipping = productData.shipping_price;
      return subtotal + shipping;
    }
    return 0;
  };
  const addByNow = (e) => {
    e.preventDefault();
    if (!loggedInUsers) {
      // User is not logged in, navigate to the sign-in page
      navigate("/signin");
      return;
    }
    setIsLoading(true);
    setEnabled(true);
    navigate("/checkout-buynow/"+productData.guid);
    let arributes = localStorage.getItem("arributes");
    arributes = JSON.parse(arributes);
    let inputData = {
      product_id: productData.id,
      quantity: 1,
      // price: productData.price,
      // quantity: 1,
      // product_id: productData.id,
      // attributes: arributes,
      // shop_id: productData.shop?.id,
    };
    // console.log(productData.id)
    CheckoutServices.save(inputData)
      .then((response) => {
        console.log(response)
        if(response.success){
          toast.success('buy now added')
        }

        // if (response.success) {
        //   CartServices.count().then((response) => {
        //     dispatch(saveCupon(response));
        //   });
        // } else {
        //   toast.error(response.message);
        // }
      })
      .catch((e) => {
        toast.error(e.message);
      })
      .finally(() => {
        setIsLoading(false);
        setEnabled(false);
      });
  };
  const addToCart = (e) => {
    e.preventDefault();
    if (!loggedInUsers) {
      // User is not logged in, navigate to the sign-in page
      navigate("/signin");
      return;
    }

    setIsLoading(true);
    setEnabled(true);
    let arributes = localStorage.getItem("arributes");
    arributes = JSON.parse(arributes);
    let inputData = {
      price: productData.price,
      quantity: quantity,
      product_id: productData.id,
      attributes: arributes,
      shop_id: productData.shop?.id,
    };
    CartServices.save(inputData)
      .then((response) => {
        if (response.success) {
          CartServices.count().then((response) => {
            dispatch(saveCupon(response));
          });
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      })
      .catch((e) => {
        toast.error(e.message);
      })
      .finally(() => {
        setIsLoading(false);
        setEnabled(false);
      });
  };
  const handleDropdownItemClick = (componentName) => {};
  const hanldeWishList = (guid) => {
    ProductServices.saved(guid, productData)
      .then((response) => {
        if (response.status) {
          toast.success(response.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
    e.preventDefault();
    setQuantity(e.target.value);
  };
  const handleEdit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };
  useEffect(() => {
    saveRecentView();
    getProduct();
  }, []);
  return (
    <>
    <Header />
    
    <section id="cart-details">
        <div class="container">
            <h1>Checkout</h1>
            
            <div class="row">
                
                <div class="col-lg-8">
                <div class="order-details" id="order-detailsid">
                <h3>Pay with</h3>
                <h6>Credit or Debit card</h6>
                <span>
                  Your payements are secured, Your Details are confedentials
                </span>
                
                {userDetails?.address ? (<>
                  <p>Billing Address</p>
                <span class="tabstop">{userDetails?.address}</span>

                </>):(<></>)}
                {/* <div class="tabs-check">
                 
                <Elements stripe={stripePromise} options={options}>
                    <Stripe
                      changeAdds={changeAdds}
                      parentCallback={handleCallback}
                      zip={zip}
                      subtotal={subTotal}
                      secondAddress={secondaddress}
                      cart={cart}
                      bidcart={bidcart}
                      orderType={ordertype}
                      adminprices={adminprices}
                      shippingprice={shippingprice}
                      total={amountaddingprices}
                      changeaddress={changeAdds}
                      ordertype={ordertyp}
                      address={userDetails?.street_address}
                    />
                  </Elements>
                </div> */}
              </div>
                    <div class="order-details" id="order-detailsid">
                        <h3>Shipping Details</h3>
                        <div class="shipping-details">
                       
                        <table style={{width: "100%"}}>
                            <tr>
                              <th class="boldthtotallight">Full Name :</th>
                              <td class="boldthtotallight">Sallu Roy</td>
                            </tr>
                            <tr>
                              <th class="boldthtotallight">Phone :</th>
                              <td>02184548845</td>
                            </tr>
                            <tr>
                              <th class="boldthtotallight">Address :</th>
                              <td>{productData.postal_address}</td>
                            </tr>
                          </table>
                          <p class="gradienttextcolor">Change Address</p>
                        </div>
                    </div>
                    <div class="order-details">
                        <h3 id="storetitle">Seller: {productShopData.fullname}</h3>
                        <div class="row mt-2">
                            <div class="col-lg-9">
                                <div class="product-detail">
                                   
                                <div className="product-image" style={{ width: '35%' }}>
  {productData.media && productData.media.length > 0 && (
    <img
      src={productData.media[0].name}
      alt="Product Image"
      style={{ width: '100%', objectFit: 'contain' }}
    />
  )}
</div>

                                    <div class="product-order-details">
                                        <h5>{productData.name}</h5>
                                        <span>Size : 9.5 , Color: Red</span>
                                        <div class="quantitypadding"><p><b><span>QTY: 01</span></b></p></div>
                                        <span class="unter">{productShopData.address}</span>
                                    </div>
                                      
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="prices-order-details">
                                    <h4>US ${productData.price}</h4>
                                    <span>+US ${productData.shipping_price}</span>
                                </div>
                            </div>
                        </div>
                        <hr class="dashed" />
                    {/* <div class="buttonright">
                    <button class="btn btn-info btn-lg transparent" type="button"  >Save for later</button>   
                    <button class="btn btn-info btn-lg danger" type="button"  >Save for later</button>  
                    </div> */}
                     
                        
                </div>

                </div>
                <div class="col-lg-4">
                <div class="order-details" id="totalordervalue">
                <h3>Order Total</h3>
                    <table style={{width: "100%"}}>
                        <tr>
                            <th class="boldthtotal">Subtotal ( 1 item )</th>
                            <td class="boldthtotal">${productData.price}</td>
                            </tr>
                            <tr>
                            <th>Shipping</th>
                            <td>${productData.shipping_price}</td>
                            </tr>
                            <tr>
                            <th class="totalthtextbold">Order Total</th>
                            <td class="totalthtextbold">$ {calculateTotalPrice()}</td>
                        </tr>
                      </table>
                      <div class="imgtoop">
          <img src={Payment} alt="" />
          <button class="btn btn-info btn-lg gradientbtncolor"  type="button">
            Confirm & Pay
          </button>
        </div>
                </div>

            </div> 
         
        </div>
        
            </div>
            
    </section>
    <Footer />
    </>
  )
}

export default CheckoutBuyNow