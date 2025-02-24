import React, { useEffect, useState } from 'react';
import ProductServices from '../../services/API/ProductServices';
import SellerProductCard from '../Shared/Cards/SellerProductCard';
import LoadingComponents from '../Shared/LoadingComponents';
import NoDataFound from '../Shared/NoDataFound';
import { toast } from 'react-toastify';

const ProductCard = ({ setSubmitted, setProductId }) => {
  const [activeProducts, setActiveProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const activeProductData = async () => {
    try {
      const res = await ProductServices.sellerActiveProducts();
      setActiveProducts(res.data);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error(error?.response?.data?.message)
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
            <LoadingComponents />
          ) : (
            <>
              {activeProducts?.length === 0 ? (
                <NoDataFound title={'No data Products'} />
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
