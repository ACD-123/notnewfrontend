import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blank from '../../assets/Images/Productcard/blank.jpg';
import defaultImages from '../../assets/Images/default-image.jpg';
import ProductServices from '../../services/API/ProductServices';
import { Spinner } from 'react-bootstrap';
import SellerProductCard from '../Shared/Cards/SellerProductCard';
import { toast } from 'react-toastify';
import LoadingComponents from '../Shared/LoadingComponents';
import NoDataFound from '../Shared/NoDataFound';

const InActiveProducts = ({ setSubmitted, setProductId }) => {
  const [activeProducts, setActiveProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const activeProductData = async () => {
    try {
      const res = await ProductServices.sellerInActiveProducts();
        setActiveProducts(res.data); // Limit to the first 5 products
        setIsLoading(false)
    } catch (error) {
      toast.error(error?.response?.data?.message)
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
          {isLoading ? (
            <LoadingComponents />
          ) : (
            <>
              {activeProducts?.length == 0 ? (
                <NoDataFound title={'No inactive product founds'}/>
              ) : (
                <>
                  {activeProducts.map((product) => (
                    <div className='col-lg-3 p-0' key={product?.guid}>
                      <SellerProductCard data={product} setSubmitted={setSubmitted} setProductId={setProductId} />
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
