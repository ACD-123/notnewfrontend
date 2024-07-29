import React, { useEffect, useState } from 'react';
import SellerServices from '../../../services/API/SellerServices';
import { Link } from 'react-router-dom';
import blank from "../../../assets/Images/Productcard/blank.jpg";
import { Spinner } from 'react-bootstrap';
import LoadingComponents from '../../Shared/LoadingComponents';
import ProductCard from '../../Shared/Cards/ProductCard';
import NoDataFound from '../../Shared/NoDataFound';
import ProductSkeletonLoader from '../../Shared/ProductSkeletonLoader';
import { toast } from 'react-toastify';


const SellerCategories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading state as true
  const [search, setSearch] = useState("")

  const { pathname } = window.location;
  const id = pathname.split("/").pop();


  const getProduct = (search) => {
    setIsLoading(true)
    SellerServices.getShopDetailProducts(id, search)
      .then((res) => {
        setProductData(res.data.products);
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
        setIsLoading(false);
      });
  };

  const handleToggleFavourite = (index) => {
    const updatedProducts = [...productData];
    updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
    setProductData(updatedProducts);
  };
  useEffect(() => {
    getProduct(search);
  }, []);


  return (
    <>
      {isLoading ?
        <div className="seller-profile-feedback-loader">
          <LoadingComponents />
        </div>
        :
        <section id='singlecategory'>
          <div className='row'>
            <>
              <div className="seller-product-filter" id='productcard'>
                <div className="filter">
                  <div className="search-bar-t">
                    <div className="search-icon">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27.0358 25.6218L19.4838 18.0698C21.2986 15.8911 22.2035 13.0966 22.0104 10.2677C21.8173 7.43873 20.541 4.79315 18.447 2.88128C16.353 0.969401 13.6025 -0.0615654 10.7677 0.00284618C7.93293 0.0672578 5.23211 1.22209 3.2271 3.2271C1.22209 5.23211 0.0672578 7.93293 0.00284618 10.7677C-0.0615654 13.6025 0.969401 16.353 2.88128 18.447C4.79315 20.541 7.43873 21.8173 10.2677 22.0104C13.0966 22.2035 15.8911 21.2986 18.0698 19.4838L25.6218 27.0358L27.0358 25.6218ZM2.03576 11.0358C2.03576 9.25573 2.5636 7.51567 3.55253 6.03563C4.54147 4.55559 5.94707 3.40203 7.59161 2.72084C9.23614 2.03966 11.0457 1.86143 12.7916 2.20869C14.5374 2.55596 16.141 3.41313 17.3997 4.6718C18.6584 5.93047 19.5156 7.53412 19.8628 9.27995C20.2101 11.0258 20.0319 12.8354 19.3507 14.4799C18.6695 16.1244 17.5159 17.5301 16.0359 18.519C14.5559 19.5079 12.8158 20.0358 11.0358 20.0358C8.64962 20.0331 6.36198 19.0841 4.67472 17.3968C2.98747 15.7095 2.03841 13.4219 2.03576 11.0358Z" fill="#C6C6C6"></path>
                      </svg>
                    </div>
                    <div className="input">
                      <input type="text" placeholder="Search Here Anything....." value={search} onChange={(e) => { getProduct(e.target.value); setSearch(e.target.value); }} />
                    </div>
                  </div>
                </div>
                <div className="products">
                  <div className="row">
                    {isLoading ?
                      <>
                        <div className="col-lg-3 mb-3">
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-3 mb-3">
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-3 mb-3">
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-3 mb-3">
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-3 mb-3">
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-3 mb-3">
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-3 mb-3">
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-3 mb-3">
                          <ProductSkeletonLoader />
                        </div>
                      </>
                      :
                      (productData?.length > 0 ?
                        (productData?.map((product, index) => {
                          return (
                            <div className="col-lg-3 mb-3" key={index}>
                              <ProductCard data={product} handleToggleFavourite={handleToggleFavourite} index={index} />
                            </div>
                          )
                        }))
                        :
                        <NoDataFound title={'No seller product found'} />
                      )
                    }
                  </div>
                </div>
              </div>
            </>
          </div>
        </section>
      }
    </>
  );
};

export default SellerCategories;
