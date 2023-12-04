import React, { useState } from 'react';
import Modal from './Modal';
import ProductCard from "../../Elements/CategoryProductListing";
import Header from "../../Header";
import Footer from "../../Footer";
import GetSurprisedBanner from "../../Elements/GetSurprisedBanner"
import SubcategoriesList from "../../Elements/FilterAttributes/SubcategoriesList"
import Search from "../../Elements/FilterAttributes/Search"
import PriceRange from "../../Elements/FilterAttributes/PriceRange"
import SizeToggle from "../../Elements/FilterAttributes/Size"
import Heart from "../../../assets/Images/Heart.png"
import { Link } from 'react-router-dom';
import Checkimage from "../../../assets/Images/check.png"

const CategoryKeyword = () => {

  
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6); // Change this value to adjust items per page
  const [showLocationModal, setShowLocationModal] = useState(false);

   // Function to toggle the display of the location modal
   const toggleLocationModal = () => {
    setShowLocationModal(!showLocationModal);
  };

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
      {/* Header */}
      <Header />
      {/* Header */}

      <section id='singlecategory'
      style={{
        padding:"30px 0px"
      }}
      >
        <div className='container'>
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
                <div className='related-keyword'>
                    <p>Related: <span style={{color: "#9E73F8"}}>Air Jordan shoes</span></p>
                </div>
                <div className='keyword-filter-list'>
                    <ul>
                        
                        <li> <Link to="#" >All Listings</Link></li>
                        <li> <Link to="#">Auctions</Link></li>
                        <li> <Link to="#">Buy it now</Link></li>
                        <li> <Link to="#">Local seller</Link></li>
                        <li> <Link to="#">Choose location</Link></li>
                        
                    </ul>
                </div>
                <div className='result-number'>
                    <p>3,400+ results for mj shoes <Link to="#"><span onClick={toggleLocationModal}><img src={Heart} /> Save this Search</span></Link></p>
                </div>
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
{/* Modal for location selection */}
<Modal
        show={showLocationModal}
        onClose={toggleLocationModal}
        // Other props to customize your modal, such as title, content, etc.
      >
        {/* Content for the location selection modal */}
        {/* Add input fields, dropdowns, or any UI for selecting location */}
        {/* Example: */}
       <form>
        <div className='searchkeywordpopup'>
          <img src={Checkimage} />
          <div className='fields'>
          
            <h3>Search Word Saved!</h3>
            <input type='text' placeholder='mj shoes' />
            <h4>Get alerts for new listing.</h4>
          </div>
          <div className='email-toggle'>

            <div className='toggle'>
            <div class="form-check form-switch">
            <label class="form-check-label" for="flexSwitchCheckDefault">Email</label>
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" /></div>
            </div>
            <input type='submit' value='Confirm' />
          </div>
        </div>
        </form>
      </Modal>
      {/* Modal for location selection */}
      {/* Footer */}
      <Footer />
      {/* Footer */}
    </>
  );
};

export default CategoryKeyword;
