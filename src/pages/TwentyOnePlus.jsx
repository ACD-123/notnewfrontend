import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Banners from '../components/TwentyOnePlus/Banners'
import Category from '../components/TwentyOnePlus/Category'
import NewArrival from '../components/TwentyOnePlus/NewArrival'
import TopSelling from '../components/TwentyOnePlus/TopSelling'
import ExploreAll from '../components/TwentyOnePlus/ExploreAll'
import GetSurprisedBanner from '../components/Elements/GetSurprisedBanner'
import { useNavigate } from 'react-router-dom'
import Auction from '../components/TwentyOnePlus/Auction'
import UsedProducts from '../components/TwentyOnePlus/UsedProducts'
import BrandNewProducts from '../components/TwentyOnePlus/BrandNewProducts'
import HomeService from '../services/API/HomeService'
import { toast } from 'react-toastify'

const TwentyOnePlus = ({ cartFullResponse, notificationCount }) => {
  const navigate = useNavigate()
  const [featureBanners, setFeatureBanners] = useState([]);
  const user_id = localStorage.getItem('user_id');
  useEffect(() => {
    const underage = localStorage.getItem('underage');
    if (underage == 1) {

    } else {
      navigate('/')
    }
  }, [])

  const getUnderAgeBanners = (id) => {
    HomeService.getUnderAgeBanners(id)
      .then((response) => {
        setFeatureBanners(response?.data?.featuredBanners)
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };

  useEffect(() => {
    getUnderAgeBanners(user_id)
  }, [])
  return (
    <>
      <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount} />
      <Category />
      <NewArrival title={'New Arrivals'} />
      <UsedProducts />
      <TopSelling title={'Top Selling'} />
      <ExploreAll title={'Explore All'} />
      <Auction type={0} title={'Latest Auctions'} />
      <GetSurprisedBanner featureBanners={featureBanners} />
      <Footer />
    </>
  )
}

export default TwentyOnePlus

