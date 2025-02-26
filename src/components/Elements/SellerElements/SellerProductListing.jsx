import React, { useState } from 'react';
import ProductCard from '../ProductCard';


const SellerProductListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6);

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
  ];

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = products.slice(indexOfFirstCard, indexOfLastCard);

  const renderProductCards = () => {
    return currentCards.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(products.length / cardsPerPage);

  return (
    <>
   

      <section id='singlecategory'>
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
      </section>

    </>
  );
};

export default SellerProductListing;
