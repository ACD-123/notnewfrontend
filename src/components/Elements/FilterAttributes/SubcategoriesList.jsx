import React from 'react';
import { Link } from 'react-router-dom';

const SubcategoriesList = (props) => {
  const products = props.product;
  const handleCategory  = (e, catId) =>{
    e.preventDefault();
    console.log(catId)
  }
  return (
    <>
      <div className='subcategory-list'>
        {/* <h4>Antiques</h4> */}
        {products.length > 0 ? (<>
          <ul>
          {products.map((product, index) => {
            return(
              <>
                <li key={index}>
                  <a href="#" onClick={(e) =>
                  handleCategory(e,product.category_id)
                  }>{product.category}</a>
                </li>
              </>
            )
          })}
          </ul>
        </>):('')}

        <ul>
          {/* <li><Link to="#">Basketball Shoes</Link></li>
          <li><Link to="#">Boots</Link></li>
          <li><Link to="#">Football Shoes</Link></li>
          <li><Link to="#">Gym & Training Shoes</Link></li>
          <li><Link to="#">Heels & Pumps</Link></li>
          <li><Link to="#">Lace Boots</Link></li>
          <li><Link to="#">Low Shoes</Link></li>
          <li><Link to="#">Outdoor Slippers</Link></li>
          <li><Link to="#">Running Shoes</Link></li> */}
        </ul>
      </div>
    </>
  );
};

export default SubcategoriesList;
