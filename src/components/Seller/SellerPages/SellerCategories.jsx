import React, { useEffect, useState } from 'react';
import ProductCard from '../../Elements/ProductCard';
import SellerServices from '../../../services/API/SellerServices';
import { Link } from 'react-router-dom';
import blank from "../../../assets/Images/Productcard/blank.jpg";
import { Spinner } from 'react-bootstrap';


const SellerCategories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading state as true

  const { pathname } = window.location;
  const id = pathname.split("/").pop();


  const getProduct = () => {
    SellerServices.getShopDetailProducts(id)
      .then((res) => {
        console.log('Shop Products',res.data.products);
        setProductData(res.data.products);
        setIsLoading(false)
        // let tags = JSON.parse(res.data.tags);
        // let allTags = [];
        // {
        //   tags.map((tag, index) => allTags.push(tag.tag));
        // }
        // setTags(allTags);
      })
      .finally(() => {
        // Set isLoading to false once data fetching is complete
        setIsLoading(false);
      });
  };
  // Mock data for products (replace this with your actual data)
  useEffect(() => {
    getProduct();
    // getTrending();
  }, []);

  // Logic to paginate product cards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = productData.slice(indexOfFirstCard, indexOfLastCard);

  const renderProductCards = () => {
    if (!Array.isArray(productData)) {
      return <p>No products found.</p>;
    }
  
    return productData.map((product) => (
      <>
      
      <ProductCard key={product.guid} productData={product} />
      </>
     
    ));
  };
  

  // Logic to handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(productData.length / cardsPerPage);

  return (
    <>
   

      <section id='singlecategory'
      style={{
        padding:"30px 0px"
      }}
      >
        <div className='container'>
            <div className='row'>
                <div className='col-lg-6'>
                <h2>All Listed Products</h2>
                </div>
                <div className='col-lg-6'>
                    <div className='sorting-sellerapge'>
                        <div className='title'>
                        Sort by:
                        </div>
                        <div className='sorting'>
                            <select>
                                <option>Ascending</option>
                                <option>
                                    Deascending
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
          

          <div className='row'>
          {isLoading ? ( // Render loader if isLoading is true
        <div className="loader-container text-center">
          <Spinner animation="border" role="status">
            {/* <span className="sr-only">Loading...</span> */}
          </Spinner>
        </div>
      ) : (
          <>
              {renderProductCards()}
              </>
      )}
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
      </section>

    </>
  );
};

export default SellerCategories;
