import React, { useState, useEffect } from 'react';
import UserService from "../../services/API/UserServices";
import { toast } from "react-toastify";

const RecentlyViewed = () => {
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
  const clearAllProducts = () => {
    UserService.deleteRecentUser()
    .then((error) => {
      toast.error(error?.response?.data?.message)
      getRecent();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message)
    });
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
