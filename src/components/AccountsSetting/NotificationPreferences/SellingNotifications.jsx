import React, { useState } from 'react';


const SellingNotificationSettings = ({ title, description, checked, onChange }) => {
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

const SellingNotifications = () => {

  const [personalizedRecomendations, setPersonalizedRecomendations] = useState(false);
  const [rewardsOffers, setRewardsOffers] = useState(false);
  const [generalPromotions, setGeneralPromotions] = useState(false);

  return (
    <>
      <h3>Selling Notification</h3>
      <section id='general-notifications'>

        <hr />
        <SellingNotificationSettings
          title="Presonalized Recomendations"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={personalizedRecomendations}
          onChange={() => setPersonalizedRecomendations(!personalizedRecomendations)}
        />
        <hr />
        <SellingNotificationSettings
          title="Rewards and offers"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={rewardsOffers}
          onChange={() => setRewardsOffers(!rewardsOffers)}
        />
        <hr />
        <SellingNotificationSettings
          title="General Promotions"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={generalPromotions}
          onChange={() => setGeneralPromotions(!generalPromotions)}
        />
      </section>
    </>
  );
};

export default SellingNotifications;
