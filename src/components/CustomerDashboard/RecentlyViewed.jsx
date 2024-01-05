import React, { useState } from 'react';
import ProductCard from '../Elements/ProductCard';

const RecentlyViewed = () => {
  const [products, setProducts] = useState([
    // Initial list of products (you can add your products here)
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    // Add more products as needed
  ]);

  // Function to clear all products
  const clearAllProducts = () => {
    setProducts([]); // Set the products array to an empty array
  };

  return (
    <>
      <section id='recentviewed'>
        <div className='row'>
        <div className='rencddl'>
        <div><h3>Recently Viewed</h3></div>
        <div><button onClick={clearAllProducts}>Clear All</button></div>
        </div>
        </div>
        {/* Render the list of products */}
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}

        {/* Button to clear all products */}
      </section>
    </>
  );
};

export default RecentlyViewed;
