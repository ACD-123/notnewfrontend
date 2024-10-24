import React from 'react'
import Header from '../Header';
import Footer from '../Footer';
import Tabs from './Tabs';
const MainDashboard = ({cartFullResponse , notificationCount}) => {
  return (
    <>
    <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount}/>
    <section id='main-dashboard'>
    <div className='container'>
        <div className='row'><Tabs /></div>
    </div>
    </section>
    </>
  )
}

export default MainDashboard