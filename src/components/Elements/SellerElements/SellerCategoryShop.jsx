import React, { useState } from 'react';
import ProductCard from "../../Elements/CategoryProductListing";
import Header from "../../Header";
import Footer from "../../Footer";
import GetSurprisedBanner from "../../Elements/GetSurprisedBanner"
import SubcategoriesList from "../../Elements/FilterAttributes/SubcategoriesList"
import Search from "../../Elements/FilterAttributes/Search"
import PriceRange from "../../Elements/FilterAttributes/PriceRange"
import SizeToggle from "../../Elements/FilterAttributes/Size"

const SellerCategoryShop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6); // Change this value to adjust items per page

  // Mock data for products (replace this with your actual data)
  const products = [
    { id: 1, name: 'Product 1', description: 'Description for Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', description: 'Description for Product 2', price: 19.99 },
    { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 14.99 },
    { id: 4, name: 'Product 4', description: 'Description for Product 4', price: 9.99 },
    { id: 5, name: 'Product 5', description: 'Description for Product 5', price: 24.99 },
    { id: 6, name: 'Product 6', description: 'Description for Product 6', price: 29.99 },
    { id: 7, name: 'Product 7', description: 'Description for Product 7', price: 12.99 },
    { id: 8, name: 'Product 8', description: 'Description for Product 8', price: 17.99 },
    { id: 9, name: 'Product 9', description: 'Description for Product 9', price: 21.99 },
    // Add more mock products as needed
  ];

  // Logic to paginate product cards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = products.slice(indexOfFirstCard, indexOfLastCard);

  const renderProductCards = () => {
    return currentCards.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  // Logic to handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / cardsPerPage);

  return (
    <>
   
      <section id='singlecategory'
      style={{
        padding:"30px 0px"
      }}
      >
        <div className='container'>
          <h2>Men Running Shoes</h2>
          <div className='row'>
            
            <div className='col-lg-3'>
                <div id='all-filters'>
                    <h3 style={{color: "#000"}}>Filters</h3>
                    <SubcategoriesList />
                    <Search />
                    <PriceRange />
                    <SizeToggle />
                </div>
            </div>
            <div className='col-lg-9'>
              {renderProductCards()}
              {/* Pagination */}
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button onClick={() => paginate(index + 1)} className="page-link">
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
              {/* Pagination */}
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default SellerCategoryShop;
