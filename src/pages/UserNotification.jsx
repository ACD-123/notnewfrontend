import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ImportentNotification } from '../components/UserNotification/ImportentNotification'
import { SellingNotification } from '../components/UserNotification/SellingNotification'
import { AuctionNotification } from '../components/UserNotification/AuctionNotification'
import { BuyingNotification } from '../components/UserNotification/BuyingNotification'
import { ChatNotification } from '../components/UserNotification/ChatNotification'
import { useNavigate } from 'react-router-dom'

export const UserNotification = ({ getNotificationCount, notificationCount, cartFullResponse }) => {
    const [tab, setTab] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        const access_token = localStorage.getItem('access_token')
        if (access_token) {
        } else {
            navigate('/')
        }
    }, [])

    return (
        <>
            <Header cartFullResponse={cartFullResponse} notificationCount={notificationCount} />
            <div className="notification-Page">
                <div className="notification-Page-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="noti-tab">
                                    <div className="tab-buttons">
                                        <div className="t-b-b">
                                            <button className={`${tab === 0 ? 'active' : ''}`} onClick={() => { setTab(0) }}>Important {notificationCount.important > 0 ? `(${notificationCount.important})` : null}</button>
                                            <button className={`${tab === 1 ? 'active' : ''}`} onClick={() => { setTab(1) }}>Chat {notificationCount.chats > 0 ? `(${notificationCount.chats})` : null}</button>
                                            <button className={`${tab === 2 ? 'active' : ''}`} onClick={() => { setTab(2) }}>Selling {notificationCount.selling > 0 ? `(${notificationCount.selling})` : null}</button>
                                            <button className={`${tab === 3 ? 'active' : ''}`} onClick={() => { setTab(3) }}>Auctions {notificationCount.auction > 0 ? notificationCount.auction : null}</button>
                                            <button className={`${tab === 4 ? 'active' : ''}`} onClick={() => { setTab(4) }}>Buying {notificationCount.buying > 0 ? `(${notificationCount.buying})` : null}</button>
                                        </div>
                                    </div>
                                </div>
                                {tab === 0 && <ImportentNotification getNotificationCount={getNotificationCount} />}
                                {tab === 1 && <ChatNotification getNotificationCount={getNotificationCount} />}
                                {tab === 2 && <SellingNotification getNotificationCount={getNotificationCount} />}
                                {tab === 3 && <AuctionNotification getNotificationCount={getNotificationCount} />}
                                {tab === 4 && <BuyingNotification getNotificationCount={getNotificationCount} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
