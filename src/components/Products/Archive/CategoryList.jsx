import React, { useState, useEffect } from 'react';
import Categoryimage1 from "../../../assets/Images/MainCategories/Category1.png"
import Categoryimage2 from "../../../assets/Images/MainCategories/Category2.png"
import Categoryimage3 from "../../../assets/Images/MainCategories/Category3.png"
import Categoryimage4 from "../../../assets/Images/MainCategories/Category4.png"
import Categoryimage5 from "../../../assets/Images/MainCategories/Category5.png"
import Categoryimage6 from "../../../assets/Images/MainCategories/Category6.png"
import Categoryimage7 from "../../../assets/Images/MainCategories/Category7.png"
import blank from "../../../assets/Images/Productcard/blank.jpg";
import { Link } from "react-router-dom";
// import CategoryServicies from '../../../services/API/Category'; //~/services/API/Category
import Home from '../../../services/API/Home'; //~/services/API/Home
import { BASE_URL } from "../../../services/Constant";
const CategoryList = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loadingDots, setLoadingDots] = useState('...'); // State to control loading dots

  const fetchCategoryData = async () => {
    Home.recursiveCategories()
      .then((res) => {
        setCategoryData(res.slice(0, 6)); // Limit to the first 6 products
      }).catch(error => {
        setError('Error fetching product data:', error);
      }).finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots(prev => prev === '...' ? '' : prev + '.');
    }, 500); // Change the interval time as needed
    return () => clearInterval(interval);
  }, []);
  return (
   <>
   <section id='product-recents-viewed'>
     {categoryData.length > 0 ? (
      <>
      <div className='container'>
          <div className='row'>
            <div className='headings'>
              <h3>Explore Known Categories <span><Link to="/allcategories">View More</Link></span></h3>
            </div>
          </div>
        </div>
        <section id='productcard' style={{ padding: "30px 0px" }}>
          <div className='container'>
          <div className='row'>
            {loading ? (
              // <p>Loading...</p>
              <p>&nbsp;</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <>
                {categoryData.map((category) => {
                  return (
                    <Link to={`/singlecategory/${category.guid}`}>
                    <div className='col col-lg-2' key={category.id}>
                      <div className='productlist ctrrr'>
                        <div style={{height: '140px',width: '100%'}}>
                          {category.media.length > 0 ?(
                            <>
                            {category.media?.map((media) => {
                              return(
                                <>
                                    <img src={`${BASE_URL}/image/category/${media.name}`} alt={media.name} />
                                </>
                              )
                            })}
                            </>
                          ):(
                            <Link to={`/notfound`}>
                              <img src={blank} alt="blank" />
                            </Link>
                          )
                          }
                        </div>
                         <h5 style={{ textAlign: "center", padding: "20px 0px" }}>{category.name}</h5>
                      </div>
                    </div>
                       </Link>
                  )
                })}
             </>
            )}
            </div>
          </div>
        </section>
      </>
     ):(
      <>
      <div className='container'>
        <h3>Loading{loadingDots}</h3>
      </div>
    </>
     )}
      </section>
   </>
  )
}

export default CategoryList