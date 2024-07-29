import React, { useState, useEffect }  from 'react';
import NotificationSettingsServices from "../../../services/API/NotificationSettingsServices"; //~/services/API/NotificationSettingsServices


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
  
  const  handlePersonalizedRecomendations =() =>{
    setPersonalizedRecomendations(!personalizedRecomendations)
    let data ={
      "selling_presonalized_recomendations": personalizedRecomendations,
      "selling_rewards_offers": rewardsOffers,
      "selling_general_promotions": generalPromotions,
    }
    NotificationSettingsServices.notificationSaveSettings(data)
    .then((response) => {
      
    })
  }
  const handleRewardOffer =() =>{
    setRewardsOffers(!rewardsOffers) 
    let data ={
      "selling_presonalized_recomendations": personalizedRecomendations,
      "selling_rewards_offers": rewardsOffers,
      "selling_general_promotions": generalPromotions,
    }
    NotificationSettingsServices.notificationSaveSettings(data)
    .then((response) => {
      
    })
  }
  const handleGeneralPromotions =() =>{
    setGeneralPromotions(!generalPromotions)
    let data ={
      "selling_presonalized_recomendations": personalizedRecomendations,
      "selling_rewards_offers": rewardsOffers,
      "selling_general_promotions": generalPromotions,
    }
    NotificationSettingsServices.notificationSaveSettings(data)
    .then((response) => {
      
    })
  }
  useEffect(() => {
    NotificationSettingsServices.show()
    .then((response) => {
      if(response.selling_presonalized_recomendations === "0"){
        setPersonalizedRecomendations(false);
      }else{
        setPersonalizedRecomendations(true);
      }
      if(response.selling_rewards_offers === "0"){
        setRewardsOffers(false);
      }else{
        setRewardsOffers(true);
      }
      if(response.selling_general_promotions === "0"){
        setGeneralPromotions(false);
      }else{
        setGeneralPromotions(true);
      }
    })
  }, []);
  return (
    <>
      <h3>Selling Notifications</h3>
      <section id='general-notifications'>

        <hr />
        <SellingNotificationSettings
          title="Presonalized Recomendations"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={personalizedRecomendations}
          onChange={() => handlePersonalizedRecomendations()}
        />
        <hr />
        <SellingNotificationSettings
          title="Rewards and offers"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={rewardsOffers}
          onChange={() => handleRewardOffer()}
        />
        <hr />
        <SellingNotificationSettings
          title="General Promotions"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={generalPromotions}
          onChange={() => handleGeneralPromotions()}
        />
      </section>
    </>
  );
};

export default SellingNotifications;
