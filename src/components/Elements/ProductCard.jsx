import React, { useEffect, useState } from 'react';
import ProductServices from '../../services/API/ProductServices';
import { Spinner } from 'react-bootstrap';
import SellerProductCard from '../Shared/Cards/SellerProductCard';

const ProductCard = ({ setSubmitted, setProductId }) => {
  const [activeProducts, setActiveProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(setSubmitted, 'setSubmitted');

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

  const deleteSellerProduct = async (id) => {
    setIsLoading(true)
    ProductServices.deleteSellerProduct(id).then((res) => {
        setActiveProducts(res.data);
        activeProductData();
      }).catch((error) => {
        setIsLoading(false)
      })
  }
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

export default ProductCard;
