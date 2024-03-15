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
import CategoryServicies from '../../../services/API/Category'; //~/services/API/Category
import { BASE_URL } from "../../../services/Constant";
const CategoryList = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
    const fetchCategoryData = async () => {
      try {
        CategoryServicies.all()
        .then((response) => {
          console.log('catgeories', response)
          setCategoryData(response.slice(0, 6)); // Limit to the first 6 products
        })
      }catch (error) {
        console.error('Error fetching product data:', error);
        setError('Error fetching product data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchCategoryData();
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
                {categoryData.map((product) => {
                  return (
                    <div className='col col-lg-2' key={product.id}>
                      <div className='productlist ctrrr'>
                        <div style={{height: '140px',width: '100%'}}>
                          {product.media.length > 0 ?(
                            <>
                            {product.media?.map((media) => {
                              return(
                                <>
                                  <img src={`${BASE_URL}/image/category/${media.name}`} alt={media.name} />
                                </>
                              )
                            })}
                            </>
                          ):(
                            <img src={blank} alt="blank" />
                          )
                          }
                        </div>
                        <Link to="/singlecategory"><h5 style={{ textAlign: "center", padding: "20px 0px" }}>{product.name}</h5></Link>
                      </div>
                    </div>
                  )
                })}
             </>
            )}
            </div>
          </div>
        </section>
      </>
     ):('')}
      </section>
   </>
  )
}

export default CategoryList