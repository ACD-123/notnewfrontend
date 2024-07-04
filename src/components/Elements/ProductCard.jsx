import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blank from '../../assets/Images/Productcard/blank.jpg';
import ProductServices from '../../services/API/ProductServices';
import { Spinner } from 'react-bootstrap';
import SellerProductCard from '../Shared/Cards/SellerProductCard';

const ProductCard = ({setSubmitted , setProductId}) => {
  const [activeProducts, setActiveProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(setSubmitted , 'setSubmitted');

  const activeProductData = async () => {
    try {
      const res = await ProductServices.sellerActiveProducts();
      if (res.status) {
        setActiveProducts(res.data);
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.error("Error fetching product data:", error);
    }
  };
  useEffect(() => {
    activeProductData();
  }, []);

  return (
    <section id='productcard' style={{ padding: "15px 0px" }}>
      <div className='container'>
        <div className='row'>
          {isLoading ? (
            <div className="loader-container text-center">
              <Spinner animation="border" role="status">
              </Spinner>
            </div>
          ) : (
            <>
              {activeProducts.length === 0 ? (
                <div>No Active Products</div>
              ) : (
                <>
                  {activeProducts.map((product) => (
                    <div className='col-lg-3 col' key={product?.guid}>
                      <SellerProductCard data={product} setSubmitted={setSubmitted} setProductId={setProductId}/>
                      {/* <div className='productlist'>
                        {product.auction ? (
                          <Link to={`/auctionproduct/${product.guid}`}>
                            <img src={product.media[0].name} alt={product.media[0].name} />
                          </Link>
                        ) : (
                          <Link to={`/singleproduct/${product.guid}`}>
                            <img src={product.media[0].name} alt={product.media[0].name} />
                          </Link>
                        )}
                        {product.auction && <span className='auction-badge'>Auction</span>}
                        <div className='px-2'>
                          {product.auction ? (
                            <Link to={`/auctionproduct/${product.guid}`}>
                              <h4>{product.name}</h4>
                            </Link>
                          ) : (
                            <Link to={`/singleproduct/${product.guid}`}>
                              <h4>{product.name}</h4>
                            </Link>
                          )}
                          <p>
                            <ul>
                              <li className='price'>${product.price} </li>
                              <li className='sale'><del>${product.sale_price}</del> </li>
                            </ul>
                          </p>
                        </div>
                      </div> */}
                    </div>
                  ))}
                </>
              )}
            </>
          )}

        </div>
      </div>
    </section>
  );
};

export default ProductCard;
