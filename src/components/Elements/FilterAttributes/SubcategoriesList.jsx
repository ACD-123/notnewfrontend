import React from 'react';
import { Link } from 'react-router-dom';

const SubcategoriesList = () => {
  return (
    <>
      <div className='subcategory-list'>
        <h4>Antiques</h4>
        <ul>
          <li><Link to="#">Basketball Shoes</Link></li>
          <li><Link to="#">Boots</Link></li>
          <li><Link to="#">Football Shoes</Link></li>
          <li><Link to="#">Gym & Training Shoes</Link></li>
          <li><Link to="#">Heels & Pumps</Link></li>
          <li><Link to="#">Lace Boots</Link></li>
          <li><Link to="#">Low Shoes</Link></li>
          <li><Link to="#">Outdoor Slippers</Link></li>
          <li><Link to="#">Running Shoes</Link></li>
        </ul>
      </div>
    </>
  );
};

export default SubcategoriesList;
