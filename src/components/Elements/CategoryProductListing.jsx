import React,{useState, useEffect} from 'react';
import ProductImage1 from "../../assets/Images/Categorylisting/1.png"
import ProductImage2 from "../../assets/Images/Categorylisting/2.png";
import ProductImage3 from "../../assets/Images/Categorylisting/3.png";
import ProductImage4 from "../../assets/Images/Categorylisting/4.png";
import ProductImage5 from "../../assets/Images/Categorylisting/5.png";
import {Link} from 'react-router-dom'
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
//     price: 50,
//     salePrice: 40,
//     image: ProductImage2,
//     discount: 50,
//   },

//   {
//     id: 3,
//     title: 'Zapatillas De Baloncesto Unisex Soft Sole ',
//     price: 50,
//     salePrice: 40,
//     image: ProductImage3,
//     discount: 50,
//     auction: false,
//   },

//   {
//     id: 4,
//     title: 'Zapatillas De Baloncesto Unisex Soft Sole ',
//     price: 50,
//     salePrice: 40,
//     image: ProductImage4,
//     discount: 50,
//     auction: true,
//   },
//   {
//     id: 5,
//     title: 'Zapatillas De Baloncesto Unisex Soft Sole ',
//     price: 50,
//     salePrice: 40,
//     image: ProductImage5,
//     discount: 50,
//     auction: true,
//   },
  
// ];

const CategoryProductListing = () => {
  const categoryFilter = 'Cell Phones & Smart Phones';
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
      try {
        ProductServices.all()
        .then((response) => {
          // console.log('mobiles products', response.filter(product => product.category === categoryFilter))
        const filteredProducts = response.filter(product => product.category === categoryFilter);
        setProductData(filteredProducts.slice(0, 5)); // Limit to the first 5 products
        })
      }catch (error) {
        console.error('Error fetching product data:', error);
        setError('Error fetching product data. Please try again later.');
      } finally {
        setLoading(false);
      }

  }, [categoryFilter]);
  return (
    <>
      <section id='productcard' style={{ padding: "10px 0px" }}>
        <div className='container'>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className='row'>
              {productData.map((product) => (
                <div className='col col-lg-3' key={product.id}>
                  <div className='productlist'>
                    {product.auction ? (
                      <Link to={`/auctionproduct`}>
                        <img src={ProductImage1} alt={ProductImage1} />
                      </Link>
                    ) : (
                      <Link to={`/singleproduct/${product.guid}`}>
                        <img src={ProductImage1} alt={ProductImage1} />
                      </Link>
                    )}
                    {product.auction && <span className='auction-badge'>Auction</span>}
                    <div className='px-2'>
                      {product.auction ? (
                        <Link to={`/auctionproduct`}>
                          <h4>{product.description}</h4>
                        </Link>
                      ) : (
                        <Link to={`/singleproduct/${product.guid}`}>
                          <h4>{product.description}</h4>
                        </Link>
                      )}
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CategoryProductListing;
