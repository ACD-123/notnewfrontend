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
import AllProductListing from '../../Elements/AllProductListing';
import { toast } from 'react-toastify';

const AllNewProducts = ({cartFullResponse}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(6); // Change this value to adjust items per page
  const [products, setProductData] = useState([]);
  const [categories, setCategoryData] = useState([]);

  // Logic to paginate product cards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const getProduct = () => {
    ProductServices.all()
      .then((response) => {
        setProductData(response); // Make sure response is an array
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };
  
  const renderProductCards = () => {
    // return currentCards.map((product) => {
      return(
        <>
        <AllProductListing  />
        </>
      )
    // }
    // );
  };

  // Logic to handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const  handleCetegoryCallback = (childData) => {
    if(childData == 'all'){
      getProduct();
    }else{
      ProductServices.getbycategory(childData)
      .then((response) => {
        if(response.status){
          setProductData(response.data);
        }
      })
    }
  }
  const  handlePriceCallback = (childData) => {
    ProductServices.getByPriceRange(childData[0], childData[1])
    .then((response) => {
      if(response.status){
          if(response.data.length > 0){
            setProductData(response.data);
          }else{
            setProductData([]);
          }
      }
    })
  }
  const handleSizeCallback =(childData) => {
    ProductServices.getProductbySize(childData)
    .then((response) => {
      // if(response.status){
      //     if(response.data.length > 0){
      //       setProductData(response.data);
      //     }else{
      //       setProductData([]);
      //     }
      // }
    })
  }
  const handleSearchCallback = (childData) => {
    if(childData === ""){
      ProductServices.all()
      .then((response) => {
        setProductData(response);
      })
    }else{
      let data ={
        'query': childData
      }
      ProductServices.search(data)
      .then((response) => {
        if(response.status){
          setProductData(response.data);
        }
      })
    }
  }
  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / cardsPerPage);
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <Header cartFullResponse={cartFullResponse}/>
      <section id='AllProducts'>
        <div className='container'>
          <div className='row'>
            
            <div className='col-lg-3'>
                <div id='all-filters'>
                    <Search parentCallback={handleSearchCallback} />
                    <br />
                    <h3 style={{color: "#000"}}>Filters</h3>
                    <SubcategoriesList parentCallback={handleCetegoryCallback} />
                    <SizeToggle parentCallback={handleSizeCallback} />
                    <PriceRange parentCallback={handlePriceCallback} />
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

export default AllNewProducts;
