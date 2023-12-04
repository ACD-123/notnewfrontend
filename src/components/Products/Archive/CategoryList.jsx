import React from 'react'
import Categoryimage1 from "../../../assets/Images/MainCategories/Category1.png"
import Categoryimage2 from "../../../assets/Images/MainCategories/Category2.png"
import Categoryimage3 from "../../../assets/Images/MainCategories/Category3.png"
import Categoryimage4 from "../../../assets/Images/MainCategories/Category4.png"
import Categoryimage5 from "../../../assets/Images/MainCategories/Category5.png"
import Categoryimage6 from "../../../assets/Images/MainCategories/Category6.png"
import Categoryimage7 from "../../../assets/Images/MainCategories/Category7.png"
import { Link } from "react-router-dom";
const CategoryList = () => {
    const productData = [
        {
          id: 1,
          title: 'Antique Item',
          image: Categoryimage1,
        },
      
        {
          id: 2,
          title: 'Camera & Video ',
          image: Categoryimage2,
        },
      
        {
          id: 3,
          title: 'Electronic',
          image: Categoryimage3,
        },
      
        {
          id: 4,
          title: 'Vintage Item',
          image: Categoryimage4,
        },
        {
          id: 5,
          title: 'Books',
          image: Categoryimage5,
        },
        {
            id: 6,
            title: 'Computer/Laptops',
            image: Categoryimage6,
          },
          {
            id: 7,
            title: 'Gaming',
            image: Categoryimage7,
          },
      ];


  return (
   <>
   <section id='product-recents-viewed'>
        <div className='container'>
            <div className='row'>
                <div className='headings'>
                    <h3>Explore Known Categories <span><Link to="/topcategory">View More</Link></span></h3>
                </div>
            </div>
        </div>
        <section id='productcard'
        style={{padding: "30px 0px"}}
        >
            <div className='container'>
          <div className='row'>
            {productData.map((product) => (
              <div className='col' key={product.id}>
                <div className='productlist'>
                <img src={product.image} alt={product.title} />
                <Link to="/singlecategory"><h5 style={{textAlign: "center", padding: "20px 0px"}}>{product.title}</h5></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        </section>
    </section>
   </>
  )
}

export default CategoryList