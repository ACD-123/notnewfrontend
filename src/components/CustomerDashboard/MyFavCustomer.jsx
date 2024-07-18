import React, { useState } from 'react';
import CustomerSellerShops from '../CustomerMyFav/CustomerSellerShops';
import CustomerActiveProducts from '../CustomerMyFav/CustomerActiveProducts';
import CustomerInActiveProducts from '../CustomerMyFav/CustomerInActiveProducts';

const MyFavCustomer = () => {
    const [tab, setTab] = useState(0);

    return (
        <>
            <div className="seller-new-transaction">
                <>
                    <div className="title">My Favourites</div>
                    <div className="seller-new-transaction-four">
                        <div className="s-n-t-f-tabs">
                            <ul>
                                <li onClick={() => { setTab(0) }} className={`${tab === 0 ? 'active' : ''}`}>Seller Shops</li>
                                <li onClick={() => { setTab(1) }} className={`${tab === 1 ? 'active' : ''}`}>Active Products</li>
                                <li onClick={() => { setTab(2) }} className={`${tab === 2 ? 'active' : ''}`}>In Active Products</li>
                            </ul>
                        </div>
                    </div>
                </>
                {tab === 0 && <CustomerSellerShops />}
                {tab === 1 && <CustomerActiveProducts />}
                {tab === 2 && <CustomerInActiveProducts />}
            </div>
        </>
    );
};

export default MyFavCustomer;
