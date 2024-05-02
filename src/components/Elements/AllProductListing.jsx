import React,{useState, useEffect} from 'react';
import ProductImage1 from "../../assets/Images/Categorylisting/1.png"
import ProductImage2 from "../../assets/Images/Categorylisting/2.png";
import ProductImage3 from "../../assets/Images/Categorylisting/3.png";
import ProductImage4 from "../../assets/Images/Categorylisting/4.png";
import ProductImage5 from "../../assets/Images/Categorylisting/5.png";
import {Link} from 'react-router-dom'
import ProductServices from '../../services/API/ProductServices'; //~/services/API/ProductServices
import { toast } from "react-toastify";
import { BASE_URL } from "../../services/Constant";

const AllProductListing = (props) => {
    const [productData, setProductData] = useState([]);
    const fetchProductData = async () => {
        ProductServices.all()
        .then((res) => {
            console.log('resodddd',res)
          if(res.status){
            setProductData(res.data); // Limit to the first 5 products
          }
      }) .catch(error => console.log(error));
    };
    useEffect(() => {
      fetchProductData();
    }, []);
  return (
    <>
      <section id='productcard' style={{ padding: "10px 0px" }}>
        <div className='row'>
          
      {productData.map((product) => (
        <div className='col col-lg-3' key={product?.guid}>
        <div className='productlist'>
          {product?.auctioned ? (
            // <Link to={`/auctionproduct/${product.id}`}>
            <Link to={`/auctionproduct/${product?.guid}`}>
              {product.media.length > 0 ? (
                <>
                  {/* <img src={`${BASE_URL}/image/product/${product.media[0].name}`} alt={ProductImage1} /> */}
                  <img src={product.media[0].name} alt={product.media[0].name} />
                </>
              ):(
                <>
                  <h2>null</h2>
                </>
              )}
            </Link>
          ) : (
            // <Link to={`/singleproduct/${product.id}`}>
            <Link to={`/singleproduct/${product?.guid}`}>
              {product.media.length > 0 ? (
                <>
                  {/* <img src={`${BASE_URL}/image/product/${product.media[0].name}`} alt={ProductImage1} /> */}
                  <img src={product.media[0].name} alt={product.media[0].name} />
                </>
              ):(
                <>
                  <h2>null</h2>
              </>                      )}
            </Link>
          )}
          {product?.auctioned ?(<span className='auction-badge'>Auction</span>) : ('')}
          <div className='px-2'>
            {product?.auctioned ? (
              <Link to={`/auctionproduct/${product?.guid}`}>
                <b>Bids:</b> $ {product.bids}
                <h3>{product.name.substring(0, 15)}...</h3>
                <h4>{product?.description.substring(0, 25)}...</h4>
              </Link>
            ) : (
              <Link to={`/singleproduct/${product.guid}`}>
              <b>Price:</b> $ {product.price}
              <h3>{product.name.substring(0, 10)}...</h3>
              <h4>{product?.description.substring(0, 15)}...</h4>
              </Link>
            )}
            <p>
                <ul>
                  {product?.sale_price !== null || product?.sale_price !== 0 && (
                    <li className='price'>${product?.sale_price ? product?.sale_price : 0}</li>
                  )}
                  {product?.price !== null && product?.sale_price !== null || product?.sale_price !== 0 && (
                    <li className='sale'>
                      <del>${product?.price ? product?.price : 0}</del>
                    </li>
                  )}
                  {product?.price !== null && product?.sale_price !== null || product?.sale_price !== 0 && (
                    <li className='discount'>
                      {((product?.price - product?.sale_price) / product?.price * 100).toFixed(2)}% OFF
                    </li>
                  )}
                </ul>
            </p>
          </div>
        </div>
      </div>
            ))}
       </div>
      </section>
    </>
  );
};

export default AllProductListing;
