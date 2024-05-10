import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blank from '../../assets/Images/Productcard/blank.jpg';
import ProductServices from '../../services/API/ProductServices';
import { Spinner } from 'react-bootstrap';

const InActiveProducts = () => {
  const [activeProducts, setActiveProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const activeProductData = async () => {
    try {
      const res = await ProductServices.sellerInActiveProducts();
      if (res.status) {
        setActiveProducts(res.data); // Limit to the first 5 products
        setIsLoading(false)

        console.log("activeProducts", res.data);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      setIsLoading(false)

    }
  };
  useEffect(() => {
    activeProductData();
  }, []);

  return (
    <section id='productcard' style={{ padding: "15px 0px" }}>
        <div className='container'>
          <div className='row'>
          {isLoading ? ( // Render loader if isLoading is true
        <div className="loader-container text-center">
          <Spinner animation="border" role="status">
            {/* <span className="sr-only">Loading...</span> */}
          </Spinner>
        </div>
      ) : (
        <>
         {activeProducts.length === 0 ? (
           <div>No Inactive Products</div>
          ) : (
          <>
          {activeProducts.map((product) => (
  <div className='col-lg-3 col' key={product?.guid}>
    <div className='productlist'>
      {/* Conditional rendering of Link based on auction property */}
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
      {product.recurring === 0 && <span className='auction-sold'>Sold Out</span>}
      {product.recurring === 1 && <span className='auction-sold'>Out Of Stock</span>}
      <div className='px-2'>
        {/* Conditional rendering of Link based on auction property */}
        {product.auction ? (
          <Link to={`/auctionproduct/${product.guid}`}>
            <h4>{product.title}</h4>
          </Link>
        ) : (
          <Link to={`/singleproduct/${product.guid}`}>
            <h4>{product.title}</h4>
          </Link>
        )}
        <p>
          <ul>
            <li className='price'>${product.price} </li>
            <li className='sale'><del>${product.sale_price}</del> </li>
            {/* <li className='discount'>{product.discount}% OFF</li> */}
          </ul>
        </p>
      </div>
    </div>
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

export default InActiveProducts;
