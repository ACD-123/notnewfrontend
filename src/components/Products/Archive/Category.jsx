import React from 'react'
import CategoryProductListing from "../../Elements/CategoryProductListing"
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <>
    <section id='product-recents-viewed'>
        <div className='container'>
            <div className='row'>
                <div className='headings'>
                <h3>Cell Phones & Smart  Phones <span><Link to="/singlecategory">View More</Link></span></h3>
                    
                </div>
            </div>
        </div>
        <CategoryProductListing />
    </section>
    </>
  )
}

export default Category