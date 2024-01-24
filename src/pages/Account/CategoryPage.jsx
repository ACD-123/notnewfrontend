import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Categorylistimage1 from "../../assets/Images/Categorylist/1.png"
import Categorylistimage2 from "../../assets/Images/Categorylist/2.png"
import Categorylistimage3 from "../../assets/Images/Categorylist/3.png"
import Categorylistimage4 from "../../assets/Images/Categorylist/4.png"
import Categorylistimage5 from "../../assets/Images/Categorylist/5.png"
import Categorylistimage6 from "../../assets/Images/Categorylist/6.png"
import Categorylistimage7 from "../../assets/Images/Categorylist/7.png"
import Categorylistimage8 from "../../assets/Images/Categorylist/8.png"
import Categorylistimage9 from "../../assets/Images/Categorylist/9.png"
import Categorylistimage10 from "../../assets/Images/Categorylist/10.png"
import Categorylistimage11 from "../../assets/Images/Categorylist/11.png"
import Categorylistimage12 from "../../assets/Images/Categorylist/12.png"
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Category from "../../services/API/Category"; //~/services/API/Category
import { BASE_URL } from "../../services/Constant";
const CategoryPage = () => {
  const [categories, setCategoryData] = useState({});
  const getCategory = () => {
    Category.all()
    .then((response) => {
      setCategoryData(response)
    })
  }
  useEffect(() => {
    getCategory()
  }, [])
// const productData = [
//     {
//       id: 1,
//       title: 'Auto Parts',
//       image: Categorylistimage1,
//       subcategories: [
//         { name: 'Accessories', url: '/singlecategory' },
//         { name: 'Dresses', url: '/singlecategory' },
//         { name: 'Jumpers', url: '/singlecategory' },
//         { name: 'Jumpsuits & Overalls', url: '/singlecategory' },
//         { name: 'Mens Underwear', url: '/singlecategory' },
//         { name: 'View all in Auto Parts & Accessories', url: '/shop' }  
//       ],
//     },
//     {
//       id: 2,
//       title: 'Furniture',
//       image: Categorylistimage2,
//       subcategories: [
//         { name: 'Accessories', url: '/singlecategory' },
//           { name: 'Dresses', url: '/singlecategory' },
//           { name: 'Jumpers', url: '/singlecategory' },
//           { name: 'Jumpsuits & Overalls', url: '/singlecategory' },
//           { name: 'Mens Underwear', url: '/singlecategory' },
//           { name: 'View all in Auto Parts & Accessories', url: '/shop' }    
//       ],
//     },
//     {
//         id: 3,
//         title: 'Jewelry',
//         image: Categorylistimage3,
//         subcategories: [
//           { name: 'Accessories', url: '/singlecategory' },
//           { name: 'Dresses', url: '/singlecategory' },
//           { name: 'Jumpers', url: '/singlecategory' },
//           { name: 'Jumpsuits & Overalls', url: '/singlecategory' },
//           { name: 'Mens Underwear', url: '/singlecategory' },
//           { name: 'View all in Auto Parts & Accessories', url: '/shop' }   
//         ],
//       },
//       {
//         id: 4,
//         title: 'Shoes',
//         image: Categorylistimage4,
//         subcategories: [
//           { name: 'Accessories', url: '/singlecategory' },
//           { name: 'Dresses', url: '/singlecategory' },
//           { name: 'Jumpers', url: '/singlecategory' },
//           { name: 'Jumpsuits & Overalls', url: '/singlecategory' },
//           { name: 'Mens Underwear', url: '/singlecategory' },
//           { name: 'View all in Auto Parts & Accessories', url: '/shop' }   
//         ],
//       },
//       {
//         id: 5,
//         title: 'Clothing',
//         image: Categorylistimage5,
//         subcategories: [
//           { name: 'Accessories', url: '/singlecategory' },
//           { name: 'Dresses', url: '/singlecategory' },
//           { name: 'Jumpers', url: '/singlecategory' },
//           { name: 'Jumpsuits & Overalls', url: '/singlecategory' },
//           { name: 'Mens Underwear', url: '/singlecategory' },
//           { name: 'View all in Auto Parts & Accessories', url: '/shop' }  
//         ],
//       },
//       {
//         id: 6,
//         title: 'Gaming',
//         image: Categorylistimage6,
//         subcategories: [
//           { name: 'Accessories', url: '/singlecategory' },
//           { name: 'Dresses', url: '/singlecategory' },
//           { name: 'Jumpers', url: '/singlecategory' },
//           { name: 'Jumpsuits & Overalls', url: '/singlecategory' },
//           { name: 'Mens Underwear', url: '/singlecategory' },
//           { name: 'View all in Auto Parts & Accessories', url: '/shop' }   
//         ],
//       },
//       {
//         id: 7,
//         title: 'Computer & Accessories',
//         image: Categorylistimage7,
//         subcategories: [
//           { name: 'Accessories', url: '/singlecategory' },
//           { name: 'Dresses', url: '/singlecategory' },
//           { name: 'Jumpers', url: '/singlecategory' },
//           { name: 'Jumpsuits & Overalls', url: '/singlecategory' },
//           { name: 'Mens Underwear', url: '/singlecategory' },
//           { name: 'View all in Auto Parts & Accessories', url: '/shop' }  
//         ],
//       },
//       {
//         id: 8,
//         title: 'Books',
//         image: Categorylistimage8,
//         subcategories: [
//           { name: 'Accessories', url: '/singlecategory' },
//           { name: 'Dresses', url: '/singlecategory' },
//           { name: 'Jumpers', url: '/singlecategory' },
//           { name: 'Jumpsuits & Overalls', url: '/singlecategory' },
//           { name: 'Mens Underwear', url: '/singlecategory' },
//           { name: 'View all in Auto Parts & Accessories', url: '/shop' }  
//         ],
//       },
//       {
//         id: 9,
//         title: 'Vintage',
//         image: Categorylistimage9,
//         subcategories: [
//           { name: 'Accessories', url: '/singlecategory' },
//           { name: 'Dresses', url: '/singlecategory' },
//           { name: 'Jumpers', url: '/singlecategory' },
//           { name: 'Jumpsuits & Overalls', url: '/singlecategory' },
//           { name: 'Mens Underwear', url: '/singlecategory' },
//           { name: 'View all in Auto Parts & Accessories', url: '/shop' }  
//         ],
//       },
//       {
//         id: 10,
//         title: 'Electonics',
//         image: Categorylistimage10,
//         subcategories: [
//           { name: 'Accessories', url: '/singlecategory' },
//           { name: 'Dresses', url: '/singlecategory' },
//           { name: 'Jumpers', url: '/singlecategory' },
//           { name: 'Jumpsuits & Overalls', url: '/singlecategory' },
//           { name: 'Mens Underwear', url: '/singlecategory' },
//           { name: 'View all in Auto Parts & Accessories', url: '/shop' }  
//         ],
//       },
//       {
//         id: 11,
//         title: 'Camera & Footage',
//         image: Categorylistimage11,
//         subcategories: [
//           { name: 'Accessories', url: '/singlecategory' },
//           { name: 'Dresses', url: '/singlecategory' },
//           { name: 'Jumpers', url: '/singlecategory' },
//           { name: 'Jumpsuits & Overalls', url: '/singlecategory' },
//           { name: 'Mens Underwear', url: '/singlecategory' },
//           { name: 'View all in Auto Parts & Accessories', url: '/shop' }  
//         ],
//       },
//       {
//         id: 12,
//         title: 'Antique Items',
//         image: Categorylistimage12,
//         subcategories: [
//           { name: 'Accessories', url: '/singlecategory' },
//           { name: 'Dresses', url: '/singlecategory' },
//           { name: 'Jumpers', url: 'singlecategory' },
//           { name: 'Jumpsuits & Overalls', url: 'singlecategory' },
//           { name: 'Mens Underwear', url: 'singlecategory' },
//           { name: 'View all in Auto Parts & Accessories', url: '/shop' } 
//         ],
//       },
//   ];
  return (
    <>
    <Header />
    <section id='category-page-main'>
        <div className='container'>
            <div className='row'
            style={{padding:"30px 0px"}}
            >
                <div className='col-lg-3'>
                    <div className='all-ct'>
                        <h3>All Categories</h3>
                        <ul>
                        {categories.length > 0 ?(
                          <>
                          {categories?.map((category) => (
                            <Link to={`/categorykeyword/${category.guid}`}><li>{category.name}</li></Link>
                          ))}
                          </>
                        ):('')}
                            {/* <Link to="/categorykeyword"><li>Collectibles & Art</li></Link>
                            <Link to="/categorykeyword"><li>Electronics</li></Link>
                            <Link to="/categorykeyword"><li>Baby Essentials</li></Link>
                            <Link to="/categorykeyword"><li>Pet Supplies</li></Link>
                            <Link to="/categorykeyword"><li>Business & Industrial </li></Link>
                            <Link to="/categorykeyword"><li>Health & Beauty</li></Link>
                            <Link to="/categorykeyword"><li>Toys & Hobbies</li></Link>
                            <Link to="/categorykeyword"><li>Home & Garden</li></Link>
                            <Link to="/categorykeyword"><li>Sporting Goods</li></Link> */}
                        </ul>
                    </div>
                </div>
                <div className='col-lg-9'>
                    <div className='all-catergylisting'>
                      <div className='row'>
                        {categories.length > 0 ?(
                          <>
                            {categories?.map((product) => (
                                <div className='col' key={product.id}>
                                  <div className='productlist'>
                                  <h3
                                  style={{
                                    width: '100%',
                                    height: '70px'
                                  }}
                                  >{product.name}</h3>
                                  <hr />
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
                                      <img src={Categorylistimage2} alt={product.name} />
                                    )
                                    }
                                    <ul>
                                      {product.children_recursive.map((subcategory, index) => (
                                        <li key={index}>
                                          <a href={subcategory.url}>{subcategory.name}</a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              ))}
                          </>
                        ):('')}
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer />
    </>
  )
}

export default CategoryPage