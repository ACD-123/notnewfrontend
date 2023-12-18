import React, { useState } from 'react';


const NotificationSetting = ({ title, description, checked, onChange }) => {
  return (
    <div className='row'>
      <div className='stepverification'>
        <div>
          <h6>{title}</h6>
          <p>{description}</p>
        </div>
        <div>
          <label className="switch">
            <input
              type="checkbox"
              checked={checked}
              onChange={onChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

const GeneralNotifications = () => {
  const [stepVerification, setStepVerification] = useState(false);
  const [itemEnding, setItemEnding] = useState(false);
  const [itemUpdates, setItemUpdates] = useState(false);
  const [auctionUpdates, setAuctionUpdates] = useState(false);
  const [offerUpdates, setOfferUpdates] = useState(false);
  const [cartUpdates, setCartUpdates] = useState(false);
  const [personalizedRecomendations, setPersonalizedRecomendations] = useState(false);
  const [rewardsOffers, setRewardsOffers] = useState(false);
  const [generalPromotions, setGeneralPromotions] = useState(false);

  return (
    <>
      <h3>General Notifications</h3>
      <section id='general-notifications'>
        {/* Order Updates */}
        <NotificationSetting
          title="Order Updates"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={stepVerification}
          onChange={() => setStepVerification(!stepVerification)}
        />
        <hr />
        <h3>Shopping Updates</h3>
        <hr />
        <NotificationSetting
          title="Item ending"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={itemEnding}
          onChange={() => setItemEnding(!itemEnding)}
        />
        <hr />
        <NotificationSetting
          title="Item updates"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={itemUpdates}
          onChange={() => setItemUpdates(!itemUpdates)}
        />
        <hr />
        <NotificationSetting
          title="Auction updates"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={auctionUpdates}
          onChange={() => setAuctionUpdates(!auctionUpdates)}
        />
        <hr />
        
        <NotificationSetting
          title="Offer updates"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={offerUpdates}
          onChange={() => setOfferUpdates(!offerUpdates)}
        />
        <hr />
        <NotificationSetting
          title="Cart updates"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={cartUpdates}
          onChange={() => setCartUpdates(!cartUpdates)}
        />
        <hr />
        
        <h3>Recomendations and Rewards</h3>
        <hr />
        <NotificationSetting
          title="Presonalized Recomendations"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={personalizedRecomendations}
          onChange={() => setPersonalizedRecomendations(!personalizedRecomendations)}
        />
        <hr />
        <NotificationSetting
          title="Rewards and offers"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={rewardsOffers}
          onChange={() => setRewardsOffers(!rewardsOffers)}
        />
        <hr />
        <NotificationSetting
          title="General Promotions"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={generalPromotions}
          onChange={() => setGeneralPromotions(!generalPromotions)}
        />
      </section>
    </>
  );
};

export default GeneralNotifications;
