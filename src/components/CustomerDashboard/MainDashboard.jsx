import React from 'react'
import Header from '../Header';
import Footer from '../Footer';
import Tabs from './Tabs';
const MainDashboard = () => {
  return (
    <>
    <Header />
    <section id='main-dashboard'>

    <div className='container'>
        <div className='row'>
            <Tabs />
        </div>
    </div>

    </section>
    <Footer />
    </>
  )
}

export default MainDashboard