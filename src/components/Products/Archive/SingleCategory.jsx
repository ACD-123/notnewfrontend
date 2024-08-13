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
              categorySubCategories?.parent_name == "" ?
              <div className="breadcrem"><Link to={'/'}>Home / </Link><span>{selectedSubCategories?.label}</span></div>
              :
              <div className="breadcrem">
                <Link to={'/'}>Home / </Link>
                <span style={{cursor:'pointer'}} onClick={() =>{getCategoryProductsById(category_id)}}>{categorySubCategories?.parent_name} / </span>
                <span>{selectedSubCategories?.label}</span></div>
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
                  onChange={handelSubCategoryChange}
                  options={subCategories}
                  placeholder={'Select sub category'}
                />
              </div>
            </div>
            <div className="filter-product">

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
