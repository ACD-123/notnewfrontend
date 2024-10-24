import React, { useState, useEffect } from 'react';
import ProductCard from '../Elements/ProductCard';
import UserService from "../../services/API/UserServices"; //~/services/API/UserService
import { toast } from "react-toastify";

const RecentlyViewed = () => {
  // const [products, setProducts] = useState([
  //   // Initial list of products (you can add your products here)
  //   { id: 1, name: 'Product 1' },
  //   { id: 2, name: 'Product 2' },
  //   // Add more products as needed
  // ]);
  const [products, setProducts] = useState([]);
  const getRecent = () =>{
    UserService.recentUserView()
    .then((response) => {
      if(response.status){
        setProducts(response.data)
      }else{
        setProducts([]);
      }
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message)
      setProducts([]);
    });
  }
  // Function to clear all products
  const clearAllProducts = () => {
    UserService.deleteRecentUser()
    .then((error) => {
      toast.error(error?.response?.data?.message)
      getRecent();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message)
    });
    // setProducts([]); // Set the products array to an empty array
  };
  useEffect(() => {
    getRecent();
  }, []);
  return (
    <>
      <section id='recentviewed'>
        <div className='row'>
        <div className='rencddl'>
        <div><h3>Recently Viewed</h3></div>
        <div><button onClick={clearAllProducts}>Clear All</button></div>
        </div>
        </div>
        {products?.length > 0 ?(<>
        </>):('Not Product Exists!')}
      </section>
    </>
  );
};

export default RecentlyViewed;
