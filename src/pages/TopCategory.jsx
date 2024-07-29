import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Elements/Banner"
import CategoriesListing from "../components/Elements/CategoriesListing"
import HomeService from '../services/API/HomeService';
import GetSurprisedBanner from '../components/Elements/GetSurprisedBanner';
import { toast } from 'react-toastify';

const TopCategory = ({cartFullResponse}) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTopSelling = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user_details"));
    HomeService.getTopSelling(loggedInUser?.id)
      .then((response) => {
        setBanners(response?.data?.banners)
        setTimeout(() => {
          setLoading(false)
        }, 1000);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };

  useEffect(() => {
    getTopSelling()
  }, [])
  return (
    <>
      <Header cartFullResponse={cartFullResponse}/>
      <div className="top-category">
        <div className="top-category-wrap">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <Banner data={banners} loading={loading} />
                <CategoriesListing />
                <GetSurprisedBanner />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TopCategory