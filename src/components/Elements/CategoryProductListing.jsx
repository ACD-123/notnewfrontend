import React,{useState, useEffect} from 'react';
import ProductImage1 from "../../assets/Images/Categorylisting/1.png"
import {Link} from 'react-router-dom'
import ProductServices from '../../services/API/ProductServices';

const CategoryProductListing = () => {
  const categoryFilter = 'Cell Phones & Smart';
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
        ProductServices.all()
        .then((response) => {
          if(response.status){
            const filteredProducts = response.data.filter(product => product.category === categoryFilter);
            setProductData(filteredProducts.slice(0, 5));
          }
        }).catch(error => setError('Error fetching product data. Please try again later.'))
        .finally( setLoading(false));
  }, [categoryFilter]);
  return (
    <>
    {productData > 0 ? (
      <>
      <div className='container'>
            <div className='row'>
                <div className='headings'>
                <h3>Cell Phones & Smart  Phones <span><Link to="/category">View More</Link></span></h3>
                    
                </div>
            </div>
        </div>
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
    ):('')}
    </>
  );
};

export default CategoryProductListing;
