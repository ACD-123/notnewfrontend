import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ImportentNotification } from '../components/UserNotification/ImportentNotification'
import { SellingNotification } from '../components/UserNotification/SellingNotification'
import { AuctionNotification } from '../components/UserNotification/AuctionNotification'
import { BuyingNotification } from '../components/UserNotification/BuyingNotification'
import laravelEcho from '../socket'
import HomeService from '../services/API/HomeService'
import { toast } from 'react-toastify'

export const UserNotification = ({getNotificationCount , notificationCount}) => {
    const [tab, setTab] = useState(0);


    return (
        <>
            <Header notificationCount={notificationCount}/>
            <div className="notification-Page">
                <div className="notification-Page-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                {/* <div className="title">Notifications</div> */}
                                <div className="tab-buttons">
                                    <div className="t-b-b">
                                        <button className={`${tab === 0 ? 'active' : ''}`} onClick={() => { setTab(0) }}>Important ({notificationCount.important ? notificationCount.important : 0})</button>
                                        <button className={`${tab === 1 ? 'active' : ''}`} onClick={() => { setTab(1) }}>Selling ({notificationCount.selling ? notificationCount.selling : 0})</button>
                                        <button className={`${tab === 2 ? 'active' : ''}`} onClick={() => { setTab(2) }}>Auctions ({notificationCount.auction ? notificationCount.auction : 0})</button>
                                        <button className={`${tab === 3 ? 'active' : ''}`} onClick={() => { setTab(3) }}>Buying ({notificationCount.buying ? notificationCount.buying : 0})</button>
                                    </div>
                                    <div className="t-b-w">Notifications</div>
                                </div>
                                {tab === 0 && <ImportentNotification getNotificationCount={getNotificationCount}/>}
                                {tab === 1 && <SellingNotification getNotificationCount={getNotificationCount}/>}
                                {tab === 2 && <AuctionNotification getNotificationCount={getNotificationCount}/>}
                                {tab === 3 && <BuyingNotification getNotificationCount={getNotificationCount}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
