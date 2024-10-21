import React, { useEffect } from 'react'
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

const TwentyOnePlus = ({ cartFullResponse, notificationCount }) => {
  const navigate = useNavigate()
  useEffect(() => {
    const underage = localStorage.getItem('underage');
    if (underage == 1) {

    } else {
      navigate('/')
    }
  }, [])
  return (
    <>
      <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount} />
      <Banners />
      <Category />
      <NewArrival title={'New Arrivals'} />
      <UsedProducts />
      <BrandNewProducts />
      <TopSelling title={'Top Selling'} />
      <ExploreAll title={'Explore All'} />
      <Auction type={0} title={'Latest Auctions'} />
      <Footer />
    </>
  )
}

export default TwentyOnePlus

