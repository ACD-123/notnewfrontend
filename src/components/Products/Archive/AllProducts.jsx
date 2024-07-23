import React, { useEffect, useState } from 'react';
import Header from "../../Header";
import Footer from "../../Footer";
import GetSurprisedBanner from "../../Elements/GetSurprisedBanner"
import Category from '../../../services/API/Category';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductCard from '../../Shared/Cards/ProductCard';
import HomeService from '../../../services/API/HomeService';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import NoDataFound from '../../Shared/NoDataFound';
import ProductSkeletonLoader from '../../Shared/ProductSkeletonLoader';
import Select from 'react-select';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const PageNumbers = ({
  totalPages,
  getFilterProducts,
  loggedInUserId,
  selectedCategories,
  selectedBrands,
  selectedProductCondition,
  categoryAttributes,
  priceRangeMin,
  priceRangeMax,
  pageSize,
  products }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className='all-pages'>
      <ul>
        {pageNumbers.map(number => (
          <li key={number}
            className={`${(+products?.pagination?.page) === number ? 'active' : ''}`}
            onClick={() => {
              getFilterProducts(
                loggedInUserId,
                selectedCategories,
                selectedBrands,
                selectedProductCondition,
                categoryAttributes,
                priceRangeMin,
                priceRangeMax,
                pageSize,
                number)
            }}>
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
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
  const pageSize = 12;
  const [maxprice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [selectedRange, setSelectedRange] = useState([0, 0]);
  const productCondition = [
    { value: "1", label: "BrandNew" },
    { value: "2", label: "Used" },
    { value: "3", label: "Refurbished" },
    { value: "4", label: "Vintage" },
    { value: "5", label: "All Condition" }
  ];
  const [selectedProductCondition, setSelectedProductCondition] = useState(null)

  const handleSliderChange = (value) => {
    setSelectedRange(value)
  };

  const getFilterProducts = (user_id, category, brand, condition, attribute, min_price, max_price, page_size, page) => {
    if (Loading) {

    } else {
      setLoading(true)
    }
    HomeService.getFilterProducts(user_id, category, brand, condition, attribute, min_price, max_price, page_size, page)
      .then((response) => {
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
        let tempCategoryArray = []
        for (let i = 0; i < response.length; i++) {
          tempCategoryArray.push({ value: response[i].id, label: response[i].name })
        }
        setCategories(tempCategoryArray);
      })
      .catch((e) => {
        toast.error(e.message);
        setLoading(false)
      });
  };

  const getCategoryAttributes = (id) => {
    Category.productAttributes(id)
      .then((res) => {
        for (let i = 0; i < res?.data.length; i++) {
          const attributeName = res?.data?.[i]?.key;
          setShowDropdown((prev) => ({ ...showDropdown, [attributeName]: false }))
        }
        const categoryAddons = res?.data?.map(category => ({
          name: category.key,
          options: category.options.map((option, index) => ({
            id: id,
            label: option,
            check: false
          }))
        }));
        setCategoryAttributes(categoryAddons)
      }
      )
      .catch((error) => {
        console.error(error.response.data.message);
      });
  }

  const getBrands = () => {
    HomeService.getbrands()
      .then((response) => {
        let tempBrand = []
        for (let i = 0; i < response.length; i++) {
          tempBrand.push({ label: response[i].name, value: response[i].id })
        }
        setBrands(tempBrand);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  const getHigherProductPrice = () => {
    HomeService.getHigherProductPrice()
      .then((response) => {
        const max = Math.max(response?.data?.maxBidPrice, response?.data?.maxPrice, response?.data?.maxSalePrice);
        setMaxPrice(max)
        setPriceRange({ min: 0, max: max })
        setSelectedRange([0, max])
        getFilterProducts(
          loggedInUser?.id,
          selectedCategories?.value,
          selectedBrands?.value,
          selectedProductCondition?.label,
          categoryAttributes,
          0,
          max,
          pageSize,
          1)

      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  const handleToggleFavourite = (index) => {
    const updatedProducts = [...categoryProducts];
    updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
    setCategoryProducts(updatedProducts);
  };

  const handelCategoryChange = (data) => {
    getFilterProducts(
      loggedInUser?.id,
      data?.value,
      selectedBrands?.value,
      selectedProductCondition?.label,
      categoryAttributes,
      selectedRange[0],
      selectedRange[1],
      pageSize,
      1)
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
        console.error(error);
        setLoading(false)
      });

  }

  const handelBrandChange = (data) => {
    getFilterProducts(
      loggedInUser?.id,
      selectedCategories?.value,
      data?.value,
      selectedProductCondition?.label,
      categoryAttributes,
      selectedRange[0],
      selectedRange[1],
      pageSize,
      1
    )
    setSelectedBrands(data)
  }

  const handelCondtionChange = (data) => {
    getFilterProducts(
      loggedInUser?.id,
      selectedCategories?.value,
      selectedBrands?.value,
      data?.label,
      categoryAttributes,
      selectedRange[0],
      selectedRange[1],
      pageSize,
      1
    )
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
    getFilterProducts(
      loggedInUser?.id,
      selectedCategories?.value,
      selectedBrands?.value,
      selectedProductCondition?.label,
      updatedArray,
      selectedRange[0],
      selectedRange[1],
      pageSize,
      1
    )
    setCategoryAttributes(updatedArray);
  }

  useEffect(() => {
    fetchCategory()
    getHigherProductPrice()
    getBrands()
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
                      min={priceRange.min}
                      max={priceRange.max}
                      // defaultValue={[priceRange.min, priceRange.max]}
                      // step={20}
                      value={selectedRange}
                      onChange={handleSliderChange}
                    />
                  </div>
                  <div className="p-p-s-v">
                    <ul>
                      <li>${selectedRange[0]}</li>
                      <li>
                        <svg width="18" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1H17" stroke="#767676" stroke-linecap="round" />
                        </svg>
                      </li>
                      <li>${selectedRange[1]}</li>
                    </ul>
                  </div>
                </div>
                {+selectedRange[0] > 0 || +selectedRange[1] < maxprice ?
                <div className="p-p-f-b">
                  <button
                  onClick={() => {
                    getFilterProducts(
                      loggedInUser?.id,
                      selectedCategories?.value,
                      selectedBrands?.value,
                      selectedProductCondition?.label,
                      categoryAttributes,
                      selectedRange[0],
                      selectedRange[1],
                      pageSize,
                      1)
                  }}
                  >Filter</button>
                </div>
                : null
                }
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
                {products?.pagination?.total_pages > 1 &&
                  <div className="page-pagination">
                    <div className="previous-page"
                      style={{ pointerEvents: (+products?.pagination?.page) === 1 ? 'none' : 'auto' }}
                      onClick={() => {
                        getFilterProducts(
                          loggedInUser?.id,
                          selectedCategories?.value,
                          selectedBrands?.value,
                          selectedProductCondition?.label,
                          categoryAttributes,
                          selectedRange[0],
                          selectedRange[1],
                          pageSize,
                          (+products?.pagination?.page) - 1)
                      }}
                    >Previous</div>
                    {products?.pagination?.total_pages > 10 ?
                      <div className="all-pages">
                        <ul>
                          <li className={`${(+products?.pagination?.page) === 1 ? 'active' : ''}`}
                            onClick={() => {
                              getFilterProducts(
                                loggedInUser?.id,
                                selectedCategories?.value,
                                selectedBrands?.value,
                                selectedProductCondition?.label,
                                categoryAttributes,
                                selectedRange[0],
                                selectedRange[1],
                                pageSize,
                                1)
                            }}
                          >1</li>
                          <li className={`${(+products?.pagination?.page) === 2 ? 'active' : ''}`}
                            onClick={() => {
                              getFilterProducts(
                                loggedInUser?.id,
                                selectedCategories?.value,
                                selectedBrands?.value,
                                selectedProductCondition?.label,
                                categoryAttributes,
                                selectedRange[0],
                                selectedRange[1],
                                pageSize,
                                2)
                            }}
                          >2</li>
                          <li className={`${(+products?.pagination?.page) === 3 ? 'active' : ''}`}
                            onClick={() => {
                              getFilterProducts(
                                loggedInUser?.id,
                                selectedCategories?.value,
                                selectedBrands?.value,
                                selectedProductCondition?.label,
                                categoryAttributes,
                                selectedRange[0],
                                selectedRange[1],
                                pageSize,
                                3)
                            }}
                          >3</li>
                          <li>
                            <svg width="33" height="3" viewBox="0 0 33 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.39853 3V0.202939H2.61842V3H0.39853ZM5.38461 3V0.202939H7.6045V3H5.38461ZM10.3707 3V0.202939H12.5906V3H10.3707ZM15.3568 3V0.202939H17.5767V3H15.3568ZM20.3429 3V0.202939H22.5627V3H20.3429ZM25.3289 3V0.202939H27.5488V3H25.3289ZM30.315 3V0.202939H32.5349V3H30.315Z" fill="#A7A7A7" />
                            </svg>
                          </li>
                          {/* <li className={`${(+products?.pagination?.page) === products?.pagination?.total_pages - 2 ? 'active' : ''}`}
                            onClick={() => {
                              getFilterProducts(
                                loggedInUser?.id,
                                selectedCategories?.value,
                                selectedBrands?.value,
                                selectedProductCondition?.label,
                                categoryAttributes,
                                selectedRange[0],
                                selectedRange[1],
                                pageSize,
                                products?.pagination?.total_pages - 2)
                            }}
                          >{products?.pagination?.total_pages - 2}</li>
                          <li className={`${(+products?.pagination?.page) === products?.pagination?.total_pages - 1 ? 'active' : ''}`}
                            onClick={() => {
                              getFilterProducts(
                                loggedInUser?.id,
                                selectedCategories?.value,
                                selectedBrands?.value,
                                selectedProductCondition?.label,
                                categoryAttributes,
                                selectedRange[0],
                                selectedRange[1],
                                pageSize,
                                products?.pagination?.total_pages - 1)
                            }}
                          >{products?.pagination?.total_pages - 1}</li> */}
                          <li className={`${(+products?.pagination?.page) === products?.pagination?.total_pages ? 'active' : ''}`}
                            onClick={() => {
                              getFilterProducts(
                                loggedInUser?.id,
                                selectedCategories?.value,
                                selectedBrands?.value,
                                selectedProductCondition?.label,
                                categoryAttributes,
                                selectedRange[0],
                                selectedRange[1],
                                pageSize,
                                products?.pagination?.total_pages)
                            }}
                          >{products?.pagination?.total_pages}</li>
                        </ul>
                      </div>
                      :
                      <PageNumbers
                        totalPages={products?.pagination?.total_pages}
                        getFilterProducts={getFilterProducts}
                        loggedInUserId={loggedInUser?.id}
                        selectedCategories={selectedCategories?.value}
                        selectedBrands={selectedBrands?.value}
                        selectedProductCondition={selectedProductCondition?.label}
                        categoryAttributes={categoryAttributes}
                        priceRangeMin={priceRange.min}
                        priceRangeMax={priceRange.max}
                        pageSize={pageSize}
                        products={products}
                      />
                    }
                    <div className="next-page"
                      style={{ pointerEvents: (+products?.pagination?.page) === products?.pagination?.total_pages ? 'none' : 'auto' }}
                      onClick={() => {
                        getFilterProducts(
                          loggedInUser?.id,
                          selectedCategories?.value,
                          selectedBrands?.value,
                          selectedProductCondition?.label,
                          categoryAttributes,
                          priceRange.min,
                          priceRange.max,
                          pageSize,
                          (+products?.pagination?.page) + 1)
                      }}
                    >Next</div>
                  </div>
                }
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
