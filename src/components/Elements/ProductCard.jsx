import React, { useState, useEffect } from 'react';
import ProductImage1 from "../../assets/Images/Productcard/1.png";
import ProductImage2 from "../../assets/Images/Productcard/2.png";
import ProductImage3 from "../../assets/Images/Productcard/3.png";
import ProductImage4 from "../../assets/Images/Productcard/4.png";
import ProductImage5 from "../../assets/Images/Productcard/5.png";
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
const ProductCard = () => {
  const [productData, setProductData] = useState([]);
  const fetchProductData = async () => {
    try {
      ProductServices.all()
      .then((response) => {
      setProductData(response.slice(0, 6)); // Limit to the first 5 products
    })
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchProductData();
  }, []);
  return (
    <>
      <section id='productcard' style={{ padding: "15px 0px" }}>
        <div className='container'>
          <div className='row'>
             {productData.map((product) => (
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
                          {product.sale_price !== null && (
                            <li className='price'>${product.sale_price}</li>
                          )}
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
                        </ul>
                      </p>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCard;
