import React from 'react'
import ProductCard from "../../Elements/ProductCard"
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
const FeaturedProducts = () => {
  return (
    <>
    <section id='featuredproduct'>
        <div className='container noenCon'>
            <div className='row'>
                <div className='headings pr-auto'>
                    <h3 style={{color:'white',paddingLeft:'50px',}}>Electra Store  Featured Products 
                        <span style={{float: 'right',paddingLeft: '58px',fontSize: '18px',color: 'white',background: '#723780',paddingRight: '10px',}}>
                            Sponsored
                        </span>
                    </h3>
                </div>
            </div>
            <div className='row render'>
                <ProductCard />
            </div>
            <div className='row'>
                <Link to="/topcategory" style={{textDecoration: "unset"}}><button className='btnFeature'>
                View More
                </button></Link>
            </div>
        </div>
        
    </section>
    </>
  )
}

export default FeaturedProducts