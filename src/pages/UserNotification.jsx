import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ImportentNotification } from '../components/UserNotification/ImportentNotification'
import { SellingNotification } from '../components/UserNotification/SellingNotification'
import { AuctionNotification } from '../components/UserNotification/AuctionNotification'
import { BuyingNotification } from '../components/UserNotification/BuyingNotification'

export const UserNotification = () => {
    const [tab, setTab] = useState(0)
    return (
        <>
            <Header />
            <div className="notification-Page">
                <div className="notification-Page-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                {/* <div className="title">Notifications</div> */}
                                <div className="tab-buttons">
                                    <div className="t-b-b">
                                        <button className={`${tab === 0 ? 'active' : ''}`} onClick={() => { setTab(0) }}>Important</button>
                                        <button className={`${tab === 1 ? 'active' : ''}`} onClick={() => { setTab(1) }}>Selling</button>
                                        <button className={`${tab === 2 ? 'active' : ''}`} onClick={() => { setTab(2) }}>Auctions</button>
                                        <button className={`${tab === 3 ? 'active' : ''}`} onClick={() => { setTab(3) }}>Buying</button>
                                    </div>
                                    <div className="t-b-w">Notifications</div>
                                </div>
                                {tab === 0 && <ImportentNotification />}
                                {tab === 1 && <SellingNotification />}
                                {tab === 2 && <AuctionNotification />}
                                {tab === 3 && <BuyingNotification />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
