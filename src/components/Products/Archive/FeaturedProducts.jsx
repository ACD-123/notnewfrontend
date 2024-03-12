import React, { useState, useEffect } from 'react';
import ProductCard from "../../Elements/ProductCard"
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import SellerServices from '../../../services/API/SellerServices'; //~/services/API/SellerServices

const FeaturedProducts = () => {
    const [featured, setFeatured] = useState([]);
    const fetchFeatured = async () => {
        try {
            SellerServices.getFeatured()
          .then((response) => {
            if(response.status){
                setFeatured(response.data)
            }
          })
        }catch (error) {
          console.error('error:', error);
        }
      };
      useEffect(() => {
        fetchFeatured();
      }, []);
  return (
    <>
    {featured.length > 0 ? (<>
        <section id='featuredproduct'>
        <div className='container noenCon'>
            <div className='row'>
            {featured.map((store, index) => {
                return(
                    <>
                        <div className='headings pr-auto'>
                            <h3 style={{color:'white',paddingLeft:'50px',}}>{store.fullname}  Featured Products 
                                <span style={{float: 'right',paddingLeft: '58px',fontSize: '18px',color: 'white',background: '#723780',paddingRight: '10px',}}>
                                    Sponsored
                                </span>
                            </h3>
                        </div>
                        <div className='row render'>
                            <ProductCard />
                        </div>
                        <div className='row'>
                            <Link to="/topcategory" style={{textDecoration: "unset"}}><button className='btnFeature'>
                            View More
                            </button></Link>
                        </div>
                    </>
                )
            })}
            </div>
        </div>
    </section>
    </>):('')}
    </>
  )
}

export default FeaturedProducts