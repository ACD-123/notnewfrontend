// import React, { useState } from 'react';
// import ProductCard from "../../Elements/CategoryProductListing";
// import Header from "../../Header";
// import Footer from "../../Footer";
// import GetSurprisedBanner from "../../Elements/GetSurprisedBanner"
// import SubcategoriesList from "../../Elements/FilterAttributes/SubcategoriesList"
// import Search from "../../Elements/FilterAttributes/Search"
// import PriceRange from "../../Elements/FilterAttributes/PriceRange"
// import SizeToggle from "../../Elements/FilterAttributes/Size"

// const Auctions = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [cardsPerPage] = useState(6);

//   const products = [
//     { id: 1, name: 'Product 1', description: 'Description for Product 1', price: 10.99 },
//     { id: 2, name: 'Product 2', description: 'Description for Product 2', price: 19.99 },
//     { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 14.99 },
//     { id: 4, name: 'Product 4', description: 'Description for Product 4', price: 9.99 },
//     { id: 5, name: 'Product 5', description: 'Description for Product 5', price: 24.99 },
//     { id: 6, name: 'Product 6', description: 'Description for Product 6', price: 29.99 },
//     { id: 7, name: 'Product 7', description: 'Description for Product 7', price: 12.99 },
//     { id: 8, name: 'Product 8', description: 'Description for Product 8', price: 17.99 },
//     { id: 9, name: 'Product 9', description: 'Description for Product 9', price: 21.99 },
//   ];

//   const indexOfLastCard = currentPage * cardsPerPage;
//   const indexOfFirstCard = indexOfLastCard - cardsPerPage;
//   const currentCards = products.slice(indexOfFirstCard, indexOfLastCard);

//   const renderProductCards = () => {
//     console.log('currentCards', currentCards)
//     return currentCards.map((product) => (
//       <ProductCard key={product.id} product={product} />
//     ));
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const totalPages = Math.ceil(products.length / cardsPerPage);

//   return (
//     <>
//       <Header />

//       <section id='Auctions'>
//         <div className='container'>
//           <h2>Auctions Items</h2>
//           <div className='row'>
//             <div className='col-lg-3'>
//                 <div id='all-filters'>
//                     <h3 style={{color: "#000"}}>Filters</h3>
//                     <SubcategoriesList />
//                     <Search />
//                     <PriceRange />
//                     <SizeToggle />
//                 </div>
//             </div>
//             <div className='col-lg-9'>
//               {renderProductCards()}
//               <ul className="pagination">
//                 {Array.from({ length: totalPages }, (_, index) => (
//                   <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
//                     <button onClick={() => paginate(index + 1)} className="page-link">
//                       {index + 1}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>
//       <GetSurprisedBanner />
//       <Footer />
//     </>
//   );
// };

// export default Auctions;

import React, { useEffect, useState } from 'react'
import Footer from '../../../components/Footer';
import Header from "../../../components/Header";
import ProductSkeletonLoader from '../../../components/Shared/ProductSkeletonLoader';
import HomeService from '../../../services/API/HomeService';
import ProductCard from '../../../components/Shared/Cards/ProductCard';
import GetSurprisedBanner from '../../../components/Elements/GetSurprisedBanner';

const Auctions = () => {
    const [hotProducts, setHotProducts] = useState([]);
    const [Loader, setLoader] = useState(true)
    const user_details = JSON.parse(localStorage.getItem('user_details'));
    const getTopSellers = (id) => {
        HomeService.getTopSelling()
            .then((response) => {
                console.log(response?.data, 'topseller');
                setHotProducts(response?.data?.hot)
                setLoader(false)
            })
            .catch((e) => {
                setLoader(false)
                console.log('error', e)
            });
    };

    useEffect(() => {
        getTopSellers(user_details?.id)
    }, [])

    const handleToggleFavourite = (index) => {
        const updatedProducts = [...hotProducts];
        updatedProducts[index].is_favourite = !updatedProducts[index].is_favourite;
        setHotProducts(updatedProducts);
      };
    return (
        <>
            <Header />
            <div className="top-sellers">
                <div className="top-sellers-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="title">Auctions</h1>
                            </div>
                            {Loader ?
                                <>
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
                                :
                                hotProducts?.map((data, index) => {
                                    return (
                                        <div className="col-lg-3" key={index}>
                                            <ProductCard data={data} handleToggleFavourite={handleToggleFavourite} index={index}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <GetSurprisedBanner />
            <Footer />
        </>
    )
}

export default Auctions