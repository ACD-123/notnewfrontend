import React,{useState, useEffect} from 'react'
import ProductCard from "../../Elements/ProductListing";
import Header from "../../Header";
import Footer from "../../Footer";
import GetSurprisedBanner from "../../Elements/GetSurprisedBanner"
import SubcategoriesList from "../../Elements/FilterAttributes/SubcategoriesList"
import Search from "../../Elements/FilterAttributes/Search"
import PriceRange from "../../Elements/FilterAttributes/PriceRange"
import SizeToggle from "../../Elements/FilterAttributes/Size"
import ProductServices from '../../../services/API/ProductServices'; //~/services/API/ProductServices

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6); // Change this value to adjust items per page
  const [products, setProductData] = useState([]);

  // Logic to paginate product cards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = products.slice(indexOfFirstCard, indexOfLastCard);
  const getProduct =() =>{
    ProductServices.all()
      .then((response) => {
        setProductData(response)
      }) 
  }
  const renderProductCards = () => {
    return currentCards.map((product) => {
      return(
        <>
        <ProductCard product={product} />
        </>
      )
    }
    );
  };

  // Logic to handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / cardsPerPage);
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {/* Header */}
      <Header />
      {/* Header */}

      <section id='AllProducts'
      style={{
        padding:"30px 0px"
      }}
      >
        <div className='container'>
          <div className='row'>
            
            <div className='col-lg-3'>
                <div id='all-filters'>
                    <Search />
                    <br />
                    <h3 style={{color: "#000"}}>Filters</h3>
                    <SubcategoriesList product={products} />
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
      {/* GetSurprisedBanner */}
      <GetSurprisedBanner />
      {/* GetSurprisedBanner */}
      {/* Footer */}
      <Footer />
      {/* Footer */}
    </>
  );
};

export default AllProducts;
