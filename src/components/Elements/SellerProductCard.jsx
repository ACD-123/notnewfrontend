import React, { useEffect, useState } from 'react';
import ProductServices from '../../services/API/ProductServices';
import { Spinner } from 'react-bootstrap';
import SellerProductCard from '../Shared/Cards/SellerProductCard';

const SellerProductCard = ({ setSubmitted, setProductId }) => {
  const [activeProducts, setActiveProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = window.location;
  const id = pathname.split("/").pop();

  const getProduct = () => {
    SellerServices.getShopDetailProducts(id)
      .then((res) => {
        console.log('Shop Products', res.data.products);
        setActiveProducts(res.data.products);
        setIsLoading(false)
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getProduct();
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
                      <SellerProductCard data={product} setSubmitted={setSubmitted} setProductId={setProductId} deleteSellerProduct={deleteSellerProduct} />
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

export default SellerProductCard;