import React, { useState, useEffect } from 'react';
import Categoryimage1 from "../../../assets/Images/MainCategories/Category1.png"
import Categoryimage2 from "../../../assets/Images/MainCategories/Category2.png"
import Categoryimage3 from "../../../assets/Images/MainCategories/Category3.png"
import Categoryimage4 from "../../../assets/Images/MainCategories/Category4.png"
import Categoryimage5 from "../../../assets/Images/MainCategories/Category5.png"
import Categoryimage6 from "../../../assets/Images/MainCategories/Category6.png"
import Categoryimage7 from "../../../assets/Images/MainCategories/Category7.png"
import { Link } from "react-router-dom";
import CategoryServicies from '../../../services/API/Category'; //~/services/API/Category
import { BASE_URL } from "../../../services/Constant";
const CategoryList = () => {
  const [productData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
    // const productData = [
    //     {
    //       id: 1,
    //       title: 'Antique Item',
    //       image: Categoryimage1,
    //     },
      
    //     {
    //       id: 2,
    //       title: 'Camera & Video ',
    //       image: Categoryimage2,
    //     },
      
    //     {
    //       id: 3,
    //       title: 'Electronic',
    //       image: Categoryimage3,
    //     },
      
    //     {
    //       id: 4,
    //       title: 'Vintage Item',
    //       image: Categoryimage4,
    //     },
    //     {
    //       id: 5,
    //       title: 'Books',
    //       image: Categoryimage5,
    //     },
    //     {
    //         id: 6,
    //         title: 'Computer/Laptops',
    //         image: Categoryimage6,
    //       },
    //       {
    //         id: 7,
    //         title: 'Gaming',
    //         image: Categoryimage7,
    //       },
    //   ];
    const fetchProductData = async () => {
      try {
        CategoryServicies.all()
        .then((response) => {
          setCategoryData(response.slice(0, 5)); // Limit to the first 5 products
        })
      }catch (error) {
        console.error('Error fetching product data:', error);
        setError('Error fetching product data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchProductData();
    }, []);
  return (
   <>
   <section id='product-recents-viewed'>
        <div className='container'>
          <div className='row'>
            <div className='headings'>
              <h3>Explore Known Categories <span><Link to="/allcategories">View More</Link></span></h3>
            </div>
          </div>
        </div>
        <section id='productcard' style={{ padding: "30px 0px" }}>
          <div className='container'>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className='row'>
                {productData.map((product) => (
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
                          <img src={Categoryimage1} alt={Categoryimage1} />
                        )
                        }
                      {/* Use appropriate images dynamically based on product */}
                      {/* {product.id === 1 && <img src={Categoryimage1} alt={Categoryimage1} />}
                      {product.id === 2 && <img src={Categoryimage2} alt={Categoryimage2} />}
                      {product.id === 3 && <img src={Categoryimage3} alt={Categoryimage3} />}
                      {product.id === 4 && <img src={Categoryimage4} alt={Categoryimage4} />}
                      {product.id === 5 && <img src={Categoryimage5} alt={Categoryimage5} />}
                      {product.id === 6 && <img src={Categoryimage6} alt={Categoryimage6} />}
                      {product.id === 7 && <img src={Categoryimage7} alt={Categoryimage7} />} */}
                      </div>
                      <Link to="/singlecategory"><h5 style={{ textAlign: "center", padding: "20px 0px" }}>{product.name}</h5></Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </section>
   </>
  )
}

export default CategoryList