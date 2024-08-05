import React, { useEffect, useState } from 'react';
import Header from "../../Header";
import Footer from "../../Footer";
import GetSurprisedBanner from "../../Elements/GetSurprisedBanner"
import SubcategoriesList from "../../Elements/FilterAttributes/SubcategoriesList"
import Search from "../../Elements/FilterAttributes/Search"
import PriceRange from "../../Elements/FilterAttributes/PriceRange"
import SizeToggle from "../../Elements/FilterAttributes/Size"
import Category from '../../../services/API/Category';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductCard from '../../Shared/Cards/ProductCard';
import ProductServices from '../../../services/API/ProductServices';
import HomeService from '../../../services/API/HomeService';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FaCheck } from 'react-icons/fa';
import LoadingComponents from '../../Shared/LoadingComponents';
import NoDataFound from '../../Shared/NoDataFound';
import ProductSkeletonLoader from '../../Shared/ProductSkeletonLoader';
import Skeleton from 'react-skeleton-loader';
import Select from 'react-select';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SingleCategory = ({cartFullResponse , notificationCount}) => {
  const [cardsPerPage] = useState(6);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categorySubCategories, setCategorySubCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState(null);
  const [categoryAttributes, setCategoryAttributes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBrands, setFilteredBrands] = useState(brands);
  const [showDropdown, setShowDropdown] = useState({ price: false, brand: false });
  const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
  const user_id = localStorage.getItem('user_id');
  const query = useQuery();
  const category_id = query.get('category-id');
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 1000,
  });

  const getCategoryProductsById = (category_id) => {
    setLoading(true)
    Category.getCategoryProductsById(category_id , user_id)
      .then((response) => {
        setCategoryProducts(response?.data);
        getCategorySubCategoryById(category_id)
        // getBrands()
      })
      .catch((error) => {
        toast.error(error?.response?.data?.data);
        setCategoryProducts([])
        getCategorySubCategoryById(category_id)
        setLoading(false)
      });
  };

  const getCategorySubCategoryById = (category_id) => {
    Category.getCategorySubCategoryById(category_id)
      .then((response) => {
        const arr = []
        for (let i = 0; i < response?.data?.sub_categories.length; i++) {
          arr.push({ label: response?.data?.sub_categories?.[i]?.name, value: response?.data?.sub_categories?.[i]?.id })
        }
        setCategorySubCategories(response?.data);
        setSubCategories([{ label: response?.data?.category?.name, value: response?.data?.category?.id }, ...arr]);
        setSelectedSubCategories({ label: response?.data?.category?.name, value: response?.data?.category?.id })
        setLoading(false)
        // getCategoryAttributes(category_id)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.data);
        setLoading(false)
      });
  };

  const handleToggleFavourite = (index) => {
    const updatedProducts = [...categoryProducts];
    updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
    setCategoryProducts(updatedProducts);
  };

  const handelSubCategoryChange = (e) => {
    getCategoryProductsById(e.value)
    setSelectedSubCategories(e)
  }

  useEffect(() => {
    getCategoryProductsById(category_id)
  }, [category_id])

  return (
    <>
      <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount}/>
      <div className="category-page">
        <div className="category-page-wrap">
          <div className="container">
            {Loading ? <Skeleton />
              :
              <div className="breadcrem"><Link to={'/'}>Home / </Link><Link to={'/top-category'}>Category / </Link><span>{selectedSubCategories?.label}</span></div>
            }
            <div className="title">
              <div className="t">
                {Loading ? <Skeleton />
                  :
                  selectedSubCategories?.label
                }
              </div>
              <div className="s">
                <Select
                  defaultValue={subCategories?.find(option => option?.value === selectedSubCategories?.value)}
                  value={subCategories?.find(option => option?.value === selectedSubCategories?.value)}
                  // defaultValue={selectedSubCategories}
                  onChange={handelSubCategoryChange}
                  options={subCategories}
                  placeholder={'Select sub category'}
                />
              </div>
            </div>
            <div className="filter-product">
              {/* <div className="d-p-l">
                <div className="filters">Filters</div>
                <div className="category">{categorySubCategories?.category?.name}</div>
                <div className="sub-category">
                  <ul>
                    {categorySubCategories?.sub_categories?.map((data, index) => {
                      return (
                        <li>{data?.name}</li>
                      )
                    })}
                  </ul>
                </div>
                <div className="p-p">
                  <div className="p-p-v-a" onClick={() => {
                    if (showDropdown?.price) {
                      setShowDropdown((prev) => ({ ...prev, price: false }))
                    } else {
                      setShowDropdown((prev) => ({ ...prev, price: true }))
                    }
                  }}>
                    <div className="v">
                      Price
                    </div>
                    <div className="a">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="10" fill="#EDECEC" />
                        <path d="M7.0025 9L10.5325 12.52L14.0625 9" stroke="#141414" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                  </div>
                  {showDropdown?.price ?
                    <>
                      <div className="p-p-s">
                        <Slider
                          range
                          min={0}
                          max={1000}
                          defaultValue={[priceRange.min, priceRange.max]}
                          onChange={handleSliderChange}
                        />
                      </div>
                      <div className="p-p-s-v">
                        <ul>
                          <li>20</li>
                          <li>
                            <svg width="18" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1H17" stroke="#767676" stroke-linecap="round" />
                            </svg>
                          </li>
                          <li>20</li>
                        </ul>
                      </div>
                      <div className="p-p-d-o">
                        <ul>
                          <li>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 11C8.7615 11 11 8.7615 11 6C11 3.2385 8.7615 1 6 1C3.2385 1 1 3.2385 1 6C1 8.7615 3.2385 11 6 11Z" stroke="#858585" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M6 9C6.79565 9 7.55871 8.68393 8.12132 8.12132C8.68393 7.55871 9 6.79565 9 6C9 5.20435 8.68393 4.44129 8.12132 3.87868C7.55871 3.31607 6.79565 3 6 3C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6C3 6.79565 3.31607 7.55871 3.87868 8.12132C4.44129 8.68393 5.20435 9 6 9Z" fill="#8B2CA0" />
                            </svg>
                            <p>Up to $40</p>
                          </li>
                          <li>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 11C8.7615 11 11 8.7615 11 6C11 3.2385 8.7615 1 6 1C3.2385 1 1 3.2385 1 6C1 8.7615 3.2385 11 6 11Z" stroke="#858585" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p>$26 - $40</p>
                          </li>
                          <li>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 11C8.7615 11 11 8.7615 11 6C11 3.2385 8.7615 1 6 1C3.2385 1 1 3.2385 1 6C1 8.7615 3.2385 11 6 11Z" stroke="#858585" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p>At least $45</p>
                          </li>
                        </ul>
                      </div>
                    </>
                    : null
                  }
                </div>
                <div className="p-p">
                  <div className="p-p-v-a"
                    onClick={() => {
                      if (showDropdown?.brand) {
                        setShowDropdown((prev) => ({ ...prev, brand: false }))
                      } else {
                        setShowDropdown((prev) => ({ ...prev, brand: true }))
                      }
                    }}>
                    <div className="v">
                      Brands
                    </div>
                    <div className="a">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="10" fill="#EDECEC" />
                        <path d="M7.0025 9L10.5325 12.52L14.0625 9" stroke="#141414" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                  </div>
                  {showDropdown?.brand ?
                    <>
                      <div className="p-p-s-b">
                        <input type="text" placeholder='Find Brands' onChange={(e) => { searchBrand(e.target.value) }} />
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.8486 14.1616L12.9185 11.3219C13.8639 10.1512 14.3768 8.70546 14.3749 7.21717C14.3749 5.89173 13.9706 4.59606 13.213 3.49399C12.4554 2.39193 11.3786 1.53298 10.1188 1.02575C8.85904 0.518529 7.47279 0.385816 6.13539 0.644396C4.79798 0.902977 3.5695 1.54124 2.60529 2.47846C1.64108 3.41569 0.984442 4.60979 0.718416 5.90976C0.452391 7.20974 0.588925 8.55719 1.11075 9.78174C1.63258 11.0063 2.51626 12.0529 3.65006 12.7893C4.78385 13.5257 6.11683 13.9187 7.48043 13.9187C9.01158 13.9206 10.4989 13.4219 11.7033 12.503L14.6249 15.3512C14.705 15.4297 14.8003 15.492 14.9053 15.5345C15.0103 15.5771 15.123 15.599 15.2367 15.599C15.3505 15.599 15.4632 15.5771 15.5682 15.5345C15.6732 15.492 15.7685 15.4297 15.8486 15.3512C15.9294 15.2733 15.9935 15.1806 16.0373 15.0786C16.081 14.9765 16.1035 14.867 16.1035 14.7564C16.1035 14.6458 16.081 14.5363 16.0373 14.4342C15.9935 14.3322 15.9294 14.2395 15.8486 14.1616ZM2.30956 7.21717C2.30956 6.22309 2.61283 5.25133 3.18101 4.42479C3.74919 3.59824 4.55677 2.95402 5.50163 2.57361C6.44648 2.19319 7.48617 2.09365 8.48922 2.28759C9.49227 2.48152 10.4136 2.96022 11.1368 3.66314C11.8599 4.36606 12.3524 5.26164 12.5519 6.23662C12.7515 7.21159 12.6491 8.22219 12.2577 9.1406C11.8663 10.059 11.2036 10.844 10.3532 11.3963C9.50287 11.9485 8.50313 12.2433 7.48043 12.2433C6.10903 12.2433 4.7938 11.7138 3.82408 10.7712C2.85435 9.82861 2.30956 8.55019 2.30956 7.21717Z" fill="#8B2CA0" />
                        </svg>
                      </div>
                      <div className="p-p-b-v">
                        <ul>
                          {filteredBrands?.map((data, index) => {
                            return (
                              <li>
                                <div className={`p-p-b-v-c ${data?.check ? 'active' : ''}`} onClick={() => {
                                  const updatedBrands = filteredBrands.map(brand =>
                                    brand.id === data?.id ? { ...brand, check: !brand.check } : brand
                                  );
                                  setFilteredBrands(updatedBrands);
                                }}>
                                  <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.310127" y="0.310127" width="10.5443" height="9.92405" rx="1.55063" stroke="#757474" stroke-width="0.620253" />
                                  </svg>
                                  <FaCheck />
                                </div>
                                <div className="p-p-b-v-v">{data?.name}</div>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </>
                    : null}
                </div>
                {categoryAttributes.length > 0 &&
                  (categoryAttributes?.map((data, index) => {
                    return (
                      <div className="p-p">
                        <div className="p-p-v-a"
                          onClick={() => {
                            if (showDropdown?.[data?.name]) {
                              setShowDropdown((prev) => ({ ...prev, [data?.name]: false }))
                            } else {
                              setShowDropdown((prev) => ({ ...prev, [data?.name]: true }))
                            }
                          }}
                        >
                          <div className="v">
                            {data?.name}
                          </div>
                          <div className="a">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#EDECEC" />
                              <path d="M7.0025 9L10.5325 12.52L14.0625 9" stroke="#141414" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                          </div>
                        </div>
                        {showDropdown?.[data?.name] ?
                          <>
                            <div className="p-p-s-b">
                              <input type="text" placeholder={`Find ${data?.name}`} />
                              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.8486 14.1616L12.9185 11.3219C13.8639 10.1512 14.3768 8.70546 14.3749 7.21717C14.3749 5.89173 13.9706 4.59606 13.213 3.49399C12.4554 2.39193 11.3786 1.53298 10.1188 1.02575C8.85904 0.518529 7.47279 0.385816 6.13539 0.644396C4.79798 0.902977 3.5695 1.54124 2.60529 2.47846C1.64108 3.41569 0.984442 4.60979 0.718416 5.90976C0.452391 7.20974 0.588925 8.55719 1.11075 9.78174C1.63258 11.0063 2.51626 12.0529 3.65006 12.7893C4.78385 13.5257 6.11683 13.9187 7.48043 13.9187C9.01158 13.9206 10.4989 13.4219 11.7033 12.503L14.6249 15.3512C14.705 15.4297 14.8003 15.492 14.9053 15.5345C15.0103 15.5771 15.123 15.599 15.2367 15.599C15.3505 15.599 15.4632 15.5771 15.5682 15.5345C15.6732 15.492 15.7685 15.4297 15.8486 15.3512C15.9294 15.2733 15.9935 15.1806 16.0373 15.0786C16.081 14.9765 16.1035 14.867 16.1035 14.7564C16.1035 14.6458 16.081 14.5363 16.0373 14.4342C15.9935 14.3322 15.9294 14.2395 15.8486 14.1616ZM2.30956 7.21717C2.30956 6.22309 2.61283 5.25133 3.18101 4.42479C3.74919 3.59824 4.55677 2.95402 5.50163 2.57361C6.44648 2.19319 7.48617 2.09365 8.48922 2.28759C9.49227 2.48152 10.4136 2.96022 11.1368 3.66314C11.8599 4.36606 12.3524 5.26164 12.5519 6.23662C12.7515 7.21159 12.6491 8.22219 12.2577 9.1406C11.8663 10.059 11.2036 10.844 10.3532 11.3963C9.50287 11.9485 8.50313 12.2433 7.48043 12.2433C6.10903 12.2433 4.7938 11.7138 3.82408 10.7712C2.85435 9.82861 2.30956 8.55019 2.30956 7.21717Z" fill="#8B2CA0" />
                              </svg>
                            </div>
                            <div className="p-p-b-v">
                              <ul>
                                {data?.options?.map((data, index) => {
                                  return (
                                    <li>
                                      <div className="p-p-b-v-c">
                                        <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <rect x="0.310127" y="0.310127" width="10.5443" height="9.92405" rx="1.55063" stroke="#757474" stroke-width="0.620253" />
                                        </svg>
                                        <FaCheck />
                                      </div>
                                      <div className="p-p-b-v-v">{data?.label}</div>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                          </>
                          : null}
                      </div>
                    )
                  }))
                }
              </div> */}
              <div className="d-p-r">
                <div id="productcard">
                  <div className="row">
                    {!Loading ?
                      (
                        categoryProducts.length > 0 ?
                          (categoryProducts?.map((data, index) => {
                            return (
                              <div className="col-lg-3" key={index}>
                                <ProductCard data={data} handleToggleFavourite={handleToggleFavourite} index={index} />
                              </div>
                            )
                          }))
                          :
                          <NoDataFound title={'No products found'} />
                      )
                      :
                      <>
                        <div className="col-lg-3 mb-4">
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-3 mb-4">
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-3 mb-4">
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-3 mb-4">
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-3">
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-3">
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-3">
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-3">
                          <ProductSkeletonLoader />
                        </div>
                      </>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GetSurprisedBanner />
      <Footer />
    </>
  );
};

export default SingleCategory;
