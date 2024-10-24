import React, { useEffect, useState } from 'react';
import Header from "../../Header";
import Footer from "../../Footer";
import GetSurprisedBanner from "../../Elements/GetSurprisedBanner"
import Category from '../../../services/API/Category';
import { toast } from 'react-toastify';
import ProductCard from '../../Shared/Cards/ProductCard';
import HomeService from '../../../services/API/HomeService';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import NoDataFound from '../../Shared/NoDataFound';
import ProductSkeletonLoader from '../../Shared/ProductSkeletonLoader';
import Select from 'react-select';
import { GiHamburgerMenu } from "react-icons/gi";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { RxCross2 } from "react-icons/rx";


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
  products,
  usedCondition,
  underage,
  auctioned }) => {
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
                number,
                usedCondition,
                underage,
                auctioned)
            }}>
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AllProducts21Plus = ({ cartFullResponse, notificationCount }) => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categoryAttributes, setCategoryAttributes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [showDropdown, setShowDropdown] = useState({ price: false, brand: false });
  const user_id = localStorage.getItem('user_id');
  const pageSize = 12;
  const [maxprice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [selectedRange, setSelectedRange] = useState([0, 0]);
  const productCondition = [
    { value: 1, label: "BrandNew" },
    { value: 2, label: "Used" }
  ];

  const productUserCondition = [
    { value: 1, label: "Brand Used" },
    { value: 2, label: "Good" },
    { value: 3, label: "Fair" },
    { value: 4, label: "Acceptable" }
  ];

  const underage = [
    { value: 0, label: "Yes" },
    { value: 1, label: "No" }
  ];
  const sellingType = [
    { value: 1, label: "Auction" },
    { value: 0, label: "Sell It Now" }
  ];
  const [selectedProductCondition, setSelectedProductCondition] = useState(null)
  const [selectedUsedProductCondition, setSelectedUsedProductCondition] = useState(null)
  const [selectedUnderage, setSelectedUnderage] = useState(null)
  const [selectedSellingType, setSelectedSellingType] = useState(null)

  const handleSliderChange = (value) => {
    setSelectedRange(value)
  };

  const getFilterProducts = (user_id, category, brand, condition, attribute, min_price, max_price, page_size, page, usedCondition, underage, auctioned) => {
    if (Loading) {

    } else {
      setLoading(true)
    }
    HomeService.getFilterProducts21Plus(user_id, category, brand, condition, attribute, min_price, max_price, page_size, page, usedCondition, underage, auctioned)
      .then((response) => {
        setProducts(response?.data)
        setLoading(false)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
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
      .catch((error) => {
        toast.error(error?.response?.data?.message)
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
        toast.error(error?.response?.data?.message)
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
      .catch((error) => {
        toast.error(error?.response?.data?.message)
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
          user_id,
          selectedCategories?.value,
          selectedBrands?.value,
          selectedProductCondition?.label,
          categoryAttributes,
          0,
          max,
          pageSize,
          1,
          selectedUsedProductCondition?.label,
          selectedSellingType?.value
        )

      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };

  const handleToggleFavourite = (index) => {
    const updatedProducts = [...categoryProducts];
    updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
    setCategoryProducts(updatedProducts);
  };

  const handelCategoryChange = (data) => {
    getFilterProducts(
      user_id,
      data?.value,
      selectedBrands?.value,
      selectedProductCondition?.label,
      categoryAttributes,
      selectedRange[0],
      selectedRange[1],
      pageSize,
      1,
      selectedUsedProductCondition?.label,
      selectedSellingType?.value
    )
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
        toast.error(error?.response?.data?.message)
        setLoading(false)
      });

  }

  const handelBrandChange = (data) => {
    getFilterProducts(
      user_id,
      selectedCategories?.value,
      data?.value,
      selectedProductCondition?.label,
      categoryAttributes,
      selectedRange[0],
      selectedRange[1],
      pageSize,
      1,
      selectedUsedProductCondition?.label,
      selectedSellingType?.value
    )
    setSelectedBrands(data)
  }

  const handelSellingType = (data) => {
    getFilterProducts(
      user_id,
      selectedCategories?.value,
      selectedBrands?.value,
      selectedProductCondition?.label,
      categoryAttributes,
      selectedRange[0],
      selectedRange[1],
      pageSize,
      1,
      selectedUsedProductCondition?.label,
      data.value
    )
    setSelectedSellingType(data)
  }

  const handelCondtionChange = (data) => {
    getFilterProducts(
      user_id,
      selectedCategories?.value,
      selectedBrands?.value,
      data?.label,
      categoryAttributes,
      selectedRange[0],
      selectedRange[1],
      pageSize,
      1,
      selectedUsedProductCondition?.label,
      selectedSellingType?.value
    )
    setSelectedProductCondition(data)
  }

  const handelUsedCondtionChange = (data) => {
    getFilterProducts(
      user_id,
      selectedCategories?.value,
      selectedBrands?.value,
      selectedProductCondition?.label,
      categoryAttributes,
      selectedRange[0],
      selectedRange[1],
      pageSize,
      1,
      data?.label,
      selectedSellingType?.value
    )
    setSelectedUsedProductCondition(data)
  }

  const handelUnderage = (data) => {
    getFilterProducts(
      user_id,
      selectedCategories?.value,
      selectedBrands?.value,
      selectedProductCondition?.label,
      categoryAttributes,
      selectedRange[0],
      selectedRange[1],
      pageSize,
      1,
      selectedUsedProductCondition?.label,
      data?.value,
      selectedSellingType?.value
    )
    setSelectedUnderage(data)
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
      user_id,
      selectedCategories?.value,
      selectedBrands?.value,
      selectedProductCondition?.label,
      updatedArray,
      selectedRange[0],
      selectedRange[1],
      pageSize,
      1,
      selectedUsedProductCondition?.label,
      selectedSellingType?.value
    )
    setCategoryAttributes(updatedArray);
  }

  useEffect(() => {
    fetchCategory()
    getHigherProductPrice()
    getBrands()
  }, [])

  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <>
      <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount} />
      <div className="category-page">
        <div className="category-page-wrap">
          <div className="container">
            <div className="filter-product">
              <div className="d-p-l" id='d-p-l-hide-on-mobile'>
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
                {categoryAttributes?.length > 0 ?
                  (categoryAttributes?.map((data, index) => {
                    return (
                      <div className="p-p" key={index}>
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
                {selectedProductCondition?.label === "Used" &&
                  <div className="p-p">
                    <div className="p-p-v-a">
                      <div className="v">Used Condition</div>
                      <div className="a"></div>
                    </div>
                    <div className="p-p-b-v">
                      <Select
                        defaultValue={productUserCondition?.find(option => option?.value === selectedUsedProductCondition?.value)}
                        value={productUserCondition?.find(option => option?.value === selectedUsedProductCondition?.value)}
                        onChange={handelUsedCondtionChange}
                        options={productUserCondition}
                        placeholder={'Select Used Condition'}
                      />
                    </div>
                  </div>
                }
                <div className="p-p">
                  <div className="p-p-v-a">
                    <div className="v">Selling Type</div>
                    <div className="a"></div>
                  </div>
                  <div className="p-p-b-v">
                    <Select
                      defaultValue={selectedSellingType}
                      onChange={handelSellingType}
                      options={sellingType}
                      placeholder={'Select Selling Type'}
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
                      <li>$
                        <input type="number" value={selectedRange[0]} onChange={(e) => { setSelectedRange([e.target.value, selectedRange[1]]) }} />
                      </li>
                      <li>
                        <svg width="18" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1H17" stroke="#767676" strokeLinecap="round" />
                        </svg>
                      </li>
                      <li>$
                        <input type="number" value={selectedRange[1]} onChange={(e) => { setSelectedRange([selectedRange[0], e.target.value]) }} />
                      </li>
                    </ul>
                  </div>
                </div>
                {+selectedRange[0] > 0 || +selectedRange[1] < maxprice ?
                  <div className="p-p-f-b">
                    <button
                      onClick={() => {
                        getFilterProducts(
                          user_id,
                          selectedCategories?.value,
                          selectedBrands?.value,
                          selectedProductCondition?.label,
                          categoryAttributes,
                          selectedRange[0],
                          selectedRange[1],
                          pageSize,
                          1,
                          selectedUsedProductCondition?.label,
                          selectedSellingType?.value)
                      }}
                    >Filter</button>
                  </div>
                  : null
                }
              </div>
              <div className="d-p-r">
                <div className="monile-filter-toggle" onClick={toggleDrawer}>
                  <GiHamburgerMenu />
                </div>
                <div id="productcard">
                  <div className="row">
                    {!Loading ?
                      (
                        products?.products?.length > 0 ?
                          (products?.products?.map((data, index) => {
                            return (
                              <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                                <ProductCard data={data} handleToggleFavourite={handleToggleFavourite} index={index} />
                              </div>
                            )
                          }))
                          :
                          <NoDataFound title={'No Data Found'} />
                      )
                      :
                      <>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" id='hide-on-mobile-768'>
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" id="hide-on-mobile-991">
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" id="hide-on-mobile-991">
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12" id="hide-on-mobile-991">
                          <ProductSkeletonLoader />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12" id="hide-on-mobile-991">
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
                          user_id,
                          selectedCategories?.value,
                          selectedBrands?.value,
                          selectedProductCondition?.label,
                          categoryAttributes,
                          selectedRange[0],
                          selectedRange[1],
                          pageSize,
                          (+products?.pagination?.page) - 1,
                          selectedUsedProductCondition?.label,
                          selectedSellingType?.value)
                      }}
                    >Previous</div>
                    {products?.pagination?.total_pages > 10 ?
                      <div className="all-pages">
                        <ul>
                          <li className={`${(+products?.pagination?.page) === 1 ? 'active' : ''}`}
                            onClick={() => {
                              getFilterProducts(
                                user_id,
                                selectedCategories?.value,
                                selectedBrands?.value,
                                selectedProductCondition?.label,
                                categoryAttributes,
                                selectedRange[0],
                                selectedRange[1],
                                pageSize,
                                1,
                                selectedUsedProductCondition?.label,
                                selectedSellingType?.value)
                            }}
                          >1</li>
                          <li className={`${(+products?.pagination?.page) === 2 ? 'active' : ''}`}
                            onClick={() => {
                              getFilterProducts(
                                user_id,
                                selectedCategories?.value,
                                selectedBrands?.value,
                                selectedProductCondition?.label,
                                categoryAttributes,
                                selectedRange[0],
                                selectedRange[1],
                                pageSize,
                                2,
                                selectedUsedProductCondition?.label,
                                selectedSellingType?.value)
                            }}
                          >2</li>
                          <li className={`${(+products?.pagination?.page) === 3 ? 'active' : ''}`}
                            onClick={() => {
                              getFilterProducts(
                                user_id,
                                selectedCategories?.value,
                                selectedBrands?.value,
                                selectedProductCondition?.label,
                                categoryAttributes,
                                selectedRange[0],
                                selectedRange[1],
                                pageSize,
                                3,
                                selectedUsedProductCondition?.label,
                                selectedSellingType?.value)
                            }}
                          >3</li>
                          <li>
                            <svg width="33" height="3" viewBox="0 0 33 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.39853 3V0.202939H2.61842V3H0.39853ZM5.38461 3V0.202939H7.6045V3H5.38461ZM10.3707 3V0.202939H12.5906V3H10.3707ZM15.3568 3V0.202939H17.5767V3H15.3568ZM20.3429 3V0.202939H22.5627V3H20.3429ZM25.3289 3V0.202939H27.5488V3H25.3289ZM30.315 3V0.202939H32.5349V3H30.315Z" fill="#A7A7A7" />
                            </svg>
                          </li>
                          <li className={`${(+products?.pagination?.page) === products?.pagination?.total_pages ? 'active' : ''}`}
                            onClick={() => {
                              getFilterProducts(
                                user_id,
                                selectedCategories?.value,
                                selectedBrands?.value,
                                selectedProductCondition?.label,
                                categoryAttributes,
                                selectedRange[0],
                                selectedRange[1],
                                pageSize,
                                products?.pagination?.total_pages,
                                selectedUsedProductCondition?.label,
                                selectedSellingType?.value)
                            }}
                          >{products?.pagination?.total_pages}</li>
                        </ul>
                      </div>
                      :
                      <PageNumbers
                        totalPages={products?.pagination?.total_pages}
                        getFilterProducts={getFilterProducts}
                        loggedInUserId={user_id}
                        selectedCategories={selectedCategories?.value}
                        selectedBrands={selectedBrands?.value}
                        selectedProductCondition={selectedProductCondition?.label}
                        categoryAttributes={categoryAttributes}
                        priceRangeMin={priceRange.min}
                        priceRangeMax={priceRange.max}
                        pageSize={pageSize}
                        products={products}
                        usedCondition={selectedUsedProductCondition?.label}
                        auctioned={selectedSellingType?.value}

                      />
                    }
                    <div className="next-page"
                      style={{ pointerEvents: (+products?.pagination?.page) === products?.pagination?.total_pages ? 'none' : 'auto' }}
                      onClick={() => {
                        getFilterProducts(
                          user_id,
                          selectedCategories?.value,
                          selectedBrands?.value,
                          selectedProductCondition?.label,
                          categoryAttributes,
                          priceRange.min,
                          priceRange.max,
                          pageSize,
                          (+products?.pagination?.page) + 1,
                          selectedUsedProductCondition?.label,
                          selectedSellingType?.value)
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
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='left'
        className='mobile-product-filter'
        size={'90%'}
      >

        <div className="d-p-l">
          <div className="filters">Filters <span onClick={toggleDrawer}><RxCross2 /></span></div>
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
          {categoryAttributes?.length > 0 ?
            (categoryAttributes?.map((data, index) => {
              return (
                <div className="p-p" key={index}>
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
          {selectedProductCondition?.label === "Used" &&
            <div className="p-p">
              <div className="p-p-v-a">
                <div className="v">Used Condition</div>
                <div className="a"></div>
              </div>
              <div className="p-p-b-v">
                <Select
                  defaultValue={productUserCondition?.find(option => option?.value === selectedUsedProductCondition?.value)}
                  value={productUserCondition?.find(option => option?.value === selectedUsedProductCondition?.value)}
                  onChange={handelUsedCondtionChange}
                  options={productUserCondition}
                  placeholder={'Select Used Condition'}
                />
              </div>
            </div>
          }
          <div className="p-p">
            <div className="p-p-v-a">
              <div className="v">Selling Type</div>
              <div className="a"></div>
            </div>
            <div className="p-p-b-v">
              <Select
                defaultValue={selectedSellingType}
                onChange={handelSellingType}
                options={sellingType}
                placeholder={'Select Selling Type'}
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
                <li>$
                  <input type="number" value={selectedRange[0]} onChange={(e) => { setSelectedRange([e.target.value, selectedRange[1]]) }} />
                </li>
                <li>
                  <svg width="18" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1H17" stroke="#767676" strokeLinecap="round" />
                  </svg>
                </li>
                <li>$
                  <input type="number" value={selectedRange[1]} onChange={(e) => { setSelectedRange([selectedRange[0], e.target.value]) }} />
                </li>
              </ul>
            </div>
          </div>
            <div className="p-p-f-b">
              <button
                onClick={() => {
                  getFilterProducts(
                    user_id,
                    selectedCategories?.value,
                    selectedBrands?.value,
                    selectedProductCondition?.label,
                    categoryAttributes,
                    selectedRange[0],
                    selectedRange[1],
                    pageSize,
                    1,
                    selectedUsedProductCondition?.label,
                    selectedSellingType?.value);
                    toggleDrawer()
                }}
              >Filter</button>
            </div>
        </div>
      </Drawer>
    </>
  );
};

export default AllProducts21Plus;
