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

const AllProducts = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categoryAttributes, setCategoryAttributes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [showDropdown, setShowDropdown] = useState({ price: false, brand: false });
  const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
  const query = useQuery();
  const category_id = query.get('category-id');
  const [priceRange, setPriceRange] = useState({min: 0,max: 1000});

  const productCondition = [
    { value: "1", label: "BrandNew" },
    { value: "2", label: "Used" },
    { value: "3", label: "Refurbished" },
    { value: "4", label: "Vintage" },
    { value: "5", label: "All Condition" }
  ];

  const [selectedProductCondition, setSelectedProductCondition] = useState(null)

  const handleSliderChange = (value) => {
    console.log(value);
    getFilterProducts(loggedInUser?.id, selectedCategories?.value , selectedBrands?.value , selectedProductCondition?.label , categoryAttributes , value[0] , value[1])
    setPriceRange({
      min: value[0],
      max: value[1],
    });
  };

  const getFilterProducts = (user_id, category, brand, condition, attribute, min_price, max_price) => {
    HomeService.getFilterProducts(user_id, category, brand, condition, attribute, min_price, max_price)
      .then((response) => {
        console.log(response?.data , 'filterProduct');
        setProducts(response?.data)
        setLoading(false)
      })
      .catch((e) => {
        toast.error(e.message);
        setLoading(false)
      });
  };
  const fetchCategory = () => {
    Category.all()
      .then((response) => {
        console.log(response, 'category');
        let tempCategoryArray = []
        for (let i = 0; i < response.length; i++) {
          tempCategoryArray.push({ value: response[i].id, label: response[i].name })
        }
        setCategories(tempCategoryArray);
        getBrands()
        setLoading(false)
      })
      .catch((e) => {
        toast.error(e.message);
        setLoading(false)
      });
  };

  const getCategoryAttributes = (id) => {
    Category.productAttributes(id)
      .then((res) => {
        console.log(res, 'getCategoryAttributes');
        for (let i = 0; i < res?.data.length; i++) {
          const attributeName = res?.data?.[i]?.key;
          setShowDropdown((prev) => ({ ...showDropdown, [attributeName]: false }))
        }
        console.log(showDropdown, 'showDropdown');
        const categoryAddons = res?.data?.map(category => ({
          name: category.key,
          options: category.options.map((option, index) => ({
            id: id,
            label: option,
            check: false
          }))
        }));
        setCategoryAttributes(categoryAddons)
        console.log(categoryAddons, 'categoryAddons');
      }
      )
      .catch((error) => {
        console.log(error);
      });
  }

  const getBrands = () => {
    HomeService.getbrands()
      .then((response) => {
        console.log(response, 'brands');
        let tempBrand = []
        for (let i = 0; i < response.length; i++) {
          tempBrand.push({ label: response[i].name, value: response[i].id })
        }
        setBrands(tempBrand);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const handleToggleFavourite = (index) => {
    const updatedProducts = [...categoryProducts];
    updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
    setCategoryProducts(updatedProducts);
  };

  const handelCategoryChange = (data) => {
    getFilterProducts(loggedInUser?.id, data?.value , selectedBrands?.value , selectedProductCondition?.label , categoryAttributes , priceRange.min , priceRange.max)
    setSelectedCategories(data);
    getCategoryAttributes(data.value)
    Category.productAttributes(data.value)
      .then((res) => {
        if (res?.data?.length > 0) {
          const categoryAddons = res?.data?.map(category => ({
            name: category.key,
            selected: null,
            options: category.options.map((option, index) => ({
              value: index + 1,
              label: option
            })),
            selectToSend: []
          }));
          setCategoryAttributes(categoryAddons);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      });

  }

  const handelBrandChange = (data) => {
    getFilterProducts(loggedInUser?.id, selectedCategories?.value , data?.value , selectedProductCondition?.label , categoryAttributes , priceRange.min , priceRange.max)
    setSelectedBrands(data)
  }
  const handelCondtionChange = (data) => {
    getFilterProducts(loggedInUser?.id, selectedCategories?.value , selectedBrands?.value , data?.label , categoryAttributes , priceRange.min , priceRange.max)
    setSelectedProductCondition(data)
  }

  const handelAddonsChange = (e, data, index) => {
    const updatedArray = [...categoryAttributes];
    const labelsArray = e.label;

    updatedArray[index] = {
      name: data.name,
      selected: e,
      options: data?.options,
      selectToSend: labelsArray
    };
    console.log(updatedArray , 'updatedArray');
    getFilterProducts(loggedInUser?.id, selectedCategories?.value , selectedBrands?.value , selectedProductCondition?.label , updatedArray , priceRange.min , priceRange.max)
    setCategoryAttributes(updatedArray);
  }

  useEffect(() => {
    fetchCategory()
  }, [])
  useEffect(() => {
    getFilterProducts(loggedInUser?.id, selectedCategories?.value , selectedBrands?.value , selectedProductCondition?.label , categoryAttributes , priceRange.min , priceRange.max)
  }, [])

  return (
    <>
      <Header />
      <div className="category-page">
        <div className="category-page-wrap">
          <div className="container">
            <div className="filter-product">
              <div className="d-p-l">
                <div className="filters">Filters</div>
                <div className="p-p">
                  <div className="p-p-v-a">
                    <div className="v">Categories</div>
                    <div className="a"></div>
                  </div>
                  <div className="p-p-c-s">
                    <Select
                      defaultValue={categories?.find(option => option?.value === selectedCategories?.value)}
                      value={categories?.find(option => option?.value === selectedCategories?.value)}
                      onChange={handelCategoryChange}
                      options={categories}
                      placeholder={'Select category'}
                    />
                  </div>
                </div>
                {categoryAttributes.length > 0 ?
                  (categoryAttributes?.map((data, index) => {
                    return (
                      <div className="p-p">
                        <div className="p-p-v-a">
                          <div className="v">{data?.name}</div>
                          <div className="a"></div>
                        </div>
                        <div className="p-p-c-s">
                          <Select
                            value={data?.selected}
                            onChange={(e) => { handelAddonsChange(e, data, index) }}
                            options={categoryAttributes?.[index]?.options}
                            placeholder={`Select ${data?.name}`}
                          />
                        </div>
                      </div>
                    )
                  }))
                  : null}
                <div className="p-p">
                  <div className="p-p-v-a">
                    <div className="v">Brands</div>
                    <div className="a"></div>
                  </div>
                  <div className="p-p-b-v">
                    <Select
                      defaultValue={brands?.find(option => option?.value === selectedBrands?.value)}
                      value={brands?.find(option => option?.value === selectedBrands?.value)}
                      onChange={handelBrandChange}
                      options={brands}
                      placeholder={'Select Brand'}
                    />
                  </div>
                </div>
                <div className="p-p">
                  <div className="p-p-v-a">
                    <div className="v">Condition</div>
                    <div className="a"></div>
                  </div>
                  <div className="p-p-b-v">
                    <Select
                      defaultValue={productCondition?.find(option => option?.value === selectedProductCondition?.value)}
                      value={productCondition?.find(option => option?.value === selectedProductCondition?.value)}
                      onChange={handelCondtionChange}
                      options={productCondition}
                      placeholder={'Select Condition'}
                    />
                  </div>
                </div>
                <div className="p-p">
                  <div className="p-p-v-a">
                    <div className="v">Price</div>
                    <div className="a"></div>
                  </div>
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
                      <li>${priceRange.min}</li>
                      <li>
                        <svg width="18" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1H17" stroke="#767676" stroke-linecap="round" />
                        </svg>
                      </li>
                      <li>${priceRange.max}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="d-p-r">
                <div id="productcard">
                  <div className="row">
                    {!Loading ?
                      (
                        products?.products?.length > 0 ?
                          (products?.products?.map((data, index) => {
                            return (
                              <div className="col-lg-3">
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

export default AllProducts;
