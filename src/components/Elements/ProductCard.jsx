import React, { useState, useEffect } from 'react';
import ProductImage1 from "../../assets/Images/Productcard/1.png";
import ProductImage2 from "../../assets/Images/Productcard/2.png";
import ProductImage3 from "../../assets/Images/Productcard/3.png";
import ProductImage4 from "../../assets/Images/Productcard/4.png";
import ProductImage5 from "../../assets/Images/Productcard/5.png";
import closeImg from "../../assets/Images/close.png";
import ListingForm from '../AccountsSetting/SellerSetup/ListingForm';
import { Link } from 'react-router-dom';
import ProductServices from '../../services/API/ProductServices'; //~/services/API/ProductServices
import { toast } from "react-toastify";
// const productData = [
//   {
//     id: 1,
//     title: 'Zapatillas De Baloncesto Unisex Soft Sole ',
//     price: 50,
//     salePrice: 40,
//     image: ProductImage1,
//     discount: 50,
//     auction: true,
//   },
//   {
//     id: 2,
//     title: 'Zapatillas De Baloncesto Unisex Soft Sole ',
//     price: 60,
//     salePrice: 50,
//     image: ProductImage2,
//     discount: 50,
//     auction: false,
//   },
//   {
//     id: 3,
//     title: 'Zapatillas De Baloncesto Unisex Soft Sole ',
//     price: 60,
//     salePrice: 50,
//     image: ProductImage3,
//     discount: 50,
//     auction: false,
//   },
//   {
//     id: 4,
//     title: 'Zapatillas De Baloncesto Unisex Soft Sole ',
//     price: 60,
//     salePrice: 50,
//     image: ProductImage4,
//     discount: 50,
//     auction: false,
//   },
//   {
//     id: 5,
//     title: 'Zapatillas De Baloncesto Unisex Soft Sole ',
//     price: 60,
//     salePrice: 50,
//     image: ProductImage5,
//     discount: 50,
//     auction: true,
//   },
  
//   // Add more products as needed
// ];
const ProductCard = (props) => {
  let status = props.status;
  let edit = props.edit;
  const [productData, setProductData] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup
  const [editform, setEditForm] = useState(false); // State for showing the popup
  const [guid, setGuid] = useState(""); // State for showing the popup
  const [submitted, setSubmitted] = useState(false);

  const fetchProductData = async () => {
    // console.log('status',status)
    try {
      if(status == 'active'){
        ProductServices.selfValue(status)
        .then((response) => {
          if(response.data.length > 0){
            setProductData(response.data.slice(0, 6)); // Limit to the first 5 products
          }
        }) 
      }else if(status == 'inactive'){
        ProductServices.selfValue(status)
        .then((response) => {
          if(response.data.length > 0){
            setProductData(response.data.slice(0, 6)); // Limit to the first 5 products
          }
        }) 
      }else if(status == 'scheduled'){
        ProductServices.selfValue(status)
        .then((response) => {
          if(response.data.length > 0){
            setProductData(response.data.slice(0, 6)); // Limit to the first 5 products
          }
        }) 
      }else if(props.products){
        if(props.products?.length > 0){
          setProductData(props.products.slice(0, 6));
        }
        // ProductServices.get(props.id)
        // .then((response) => {
        //   console.log('get pro', response)
        //   setProductData(
        //   // if(response.data.length > 0){
        //   //   setProductData(response.data.slice(0, 6)); // Limit to the first 5 products
        //   // }
        // }) 
      }else{
        ProductServices.all()
        .then((response) => {
          if(response.data){
            setProductData(response.data.slice(0, 6)); // Limit to the first 5 products
          }
        })        
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const confirmDelete = (e, val) =>{
    setShowPopup(true);
    setGuid(val)
  }
  const deleteProduct = (e, val) =>{
    e.preventDefault();
    try {
    ProductServices.destroy(val)
        .then((response) => {
          toast.error(response.message);
          setShowPopup(false);    
          fetchProductData();
        }) 
    } catch (error) {
      toast.error(error);
    }
  }
  const editProduct =(e, val)=>{
    e.preventDefault();
    props.parentCallback('Edit', val);
  }

  useEffect(() => {
    fetchProductData();
  }, []);
  return (
    <>
    <section id='productcard' style={{ padding: "15px 0px" }}>
    <div className='container'>
      <div className='row'>
        {productData.length > 0 ?(
          <>
          {productData.map((product) => {
            return(
              <>
                <div className='col col-lg-2' key={product.guid}>
            <div className='productlist'>
                {product.auctioned ? (
                  // <Link to={`/auctionproduct/${product.id}`}>
                  <Link to={`/auctionproduct/${product.guid}`}>
                    <img src={ProductImage1} alt={ProductImage1} />
                    {/* <img src={product.cover_image} alt={product.name} /> */}
                  </Link>
                ) : (
                  // <Link to={`/singleproduct/${product.id}`}>
                  <Link to={`/singleproduct/${product.guid}`}>
                    <img src={ProductImage1} alt={ProductImage1} />
                    {/* <img src={product.cover_image} alt={product.name} /> */}
                  </Link>
                )}
                {product.auctioned ?(<span className='auction-badge'>Auction</span>) : ('')}
                <div className='px-2'>
                  {product.auctioned ? (
                    <Link to={`/auctionproduct/${product.guid}`}>
                      <h4>{product.description}</h4>
                    </Link>
                  ) : (
                    <Link to={`/singleproduct/${product.guid}`}>
                    <h4>{product.description}</h4>
                    </Link>
                  )}
                  <p>
                    <p>
                      <ul>
                        {/* {product.sale_price !== null && (
                          <li className='price'>${product.sale_price}</li>
                        )} */}
                        {product.price !== null && product.sale_price !== null && (
                          <li className='sale'>
                            <del>${product.price}</del>
                          </li>
                        )}
                        {product.price !== null && product.sale_price !== null && (
                          <li className='discount'>
                            {((product.price - product.sale_price) / product.price * 100).toFixed(2)}% OFF
                          </li>
                        )}
                          {(() => {
                              if (edit == 'edit') {
                                return (
                                  <li>
                                    <nav>
                                      <a href="#" onClick={(e) => editProduct(e, product.guid)}>Edit</a> | <a href="#" onClick={(e) => confirmDelete(e, product.guid)} style={{color: "red"}}>Delete</a>
                                    </nav>
                                  </li>
                                )
                              } else {
                                return (
                                  <div>&nbsp;</div>
                                )
                              }
                            })()}
                      </ul>
                      <div className="popup">
                          {/* Popup for successful product activation */}
                          {showPopup && (
                            <div className="listing-activated">
                            <div className="innerlisting-activated">
                                <img src={closeImg} style={{ width:"100px", height:"100px" }}/>
                                <h2>Are you sure you want to Delete?</h2>
                                  <table style={{ width: "30%", margin: "0px auto"}}>
                                    <tr>
                                      <td>
                                      
                                        <input type="submit"  value="Delete" onClick={(e) => deleteProduct(e, guid)}/>
                                      </td>
                                      <td>
                                        <input type="button"  value="Cancel" onClick={() => setShowPopup(false)} />
                                      </td>
                                    </tr>
                                  </table>
                                <button onClick={() => setShowPopup(false)}>Close</button>
                              </div>
                            </div>
                          )}
                      </div>
                    </p>
                  </p>
                </div>
              </div>
            </div>
              </>
            )})}
          </>
        ):('No Product Exists')}
      </div>
    </div>
  </section>
    </>
  );
};

export default ProductCard;
