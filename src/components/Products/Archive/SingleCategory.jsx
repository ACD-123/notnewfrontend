import React, { useEffect, useState } from 'react';
import Header from "../../Header";
import Footer from "../../Footer";
import GetSurprisedBanner from "../../Elements/GetSurprisedBanner"
import SubcategoriesList from "../../Elements/FilterAttributes/SubcategoriesList"
import Search from "../../Elements/FilterAttributes/Search"
import PriceRange from "../../Elements/FilterAttributes/PriceRange"
import SizeToggle from "../../Elements/FilterAttributes/Size"
import Category from '../../../services/API/Category';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductCard from '../../Shared/Cards/ProductCard';
import ProductServices from '../../../services/API/ProductServices';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SingleCategory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6); // Change this value to adjust items per page
  const [categoryProducts, setCategoryProducts] = useState([])
  const [categorySubCategories, setCategoryProductCategories] = useState([]);
  const [categoryAttributes, setCategoryAttributes] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
  const query = useQuery();
  const category_id = query.get('category-id');

  const getCategoryProductsById = () => {
    Category.getCategoryProductsById(category_id)
      .then((response) => {
        setCategoryProducts(response?.data);
        getCategorySubCategoryById(category_id)
        console.log(response?.data, 'category product');
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  const getCategorySubCategoryById = (category_id) => {
    Category.getCategorySubCategoryById(category_id)
      .then((response) => {
        setCategoryProductCategories(response?.data);
        handelCategoryChange(category_id)
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const handelCategoryChange = (id) => {
    Category.productAttributes(id)
      .then((res) => {
console.log();


      }
      )
      .catch((error) => {
        console.log(error);
        setIsLoading(false)
      });


  }


  const handleToggleFavourite = (index) => {
    const updatedProducts = [...categoryProducts];
    updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
    setCategoryProducts(updatedProducts);
  };

  useEffect(() => {
    getCategoryProductsById()
  }, [])

  return (
    <>
      <Header />
      <div className="category-page">
        <div className="category-page-wrap">
          <div className="container">
            <div className="breadcrem">
              Home / Category / <span>{categorySubCategories?.category?.name}</span>
            </div>
            <div className="title">{categorySubCategories?.category?.name}</div>
            <div className="filter-product">
              <div className="d-p-l">
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
              </div>
              <div className="d-p-r">
                <div id="productcard">
                  <div className="row">
                    {categoryProducts?.map((data, index) => {
                      return (
                        <div className="col-lg-3">
                          <ProductCard data={data} handleToggleFavourite={handleToggleFavourite} index={index} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <section id='singlecategory'>
        <div className='container'>
          <h2>Men Running Shoes</h2>
          <div className='row'>

            <div className='col-lg-3'>
              <div id='all-filters'>
                <h3 style={{ color: "#000" }}>Filters</h3>
                <SubcategoriesList />
                <Search />
                <PriceRange />
                <SizeToggle />
              </div>
            </div>
            <div className='col-lg-9'>
              {renderProductCards()}
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button onClick={() => paginate(index + 1)} className="page-link">
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="main-category">
        <div className="main-category-wrap">

        </div>
      </div> */}
      <GetSurprisedBanner />
      <Footer />
    </>
  );
};

export default SingleCategory;
