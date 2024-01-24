import React from 'react'
import ProductCard from "../Elements/ProductCard"
import { Link } from "react-router-dom";

const RecentViewedItems = () => {
  return (
    <>
    <section id='product-recents-viewed'>
        <div className='container'>
            <div className='row'>
                <div className='headings'>
                <h3>Explore Known Categories <span><Link to="/singlecategory">View More</Link></span></h3>
                </div>
            </div>
        </div>
        <ProductCard />
    </section>
    </>
  )
}

export default RecentViewedItems