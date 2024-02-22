import React, { useState, useEffect } from 'react';
import NotificationSettingsServices from "../../../services/API/NotificationSettingsServices"; //~/services/API/NotificationSettingsServices
import { toast } from "react-toastify";

const NotificationSetting = ({ id, name, title, description, checked, onChange }) => {

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
  const handleStepVerification =() =>{
    setStepVerification(!stepVerification)
    let data ={
      "order_updates" : stepVerification,
      "item_ending": itemEnding,
      "item_updates": itemUpdates,
      "auction_updates": auctionUpdates,
      "offer_updates": offerUpdates,
      "presonalized_recomendations": personalizedRecomendations,
      "rewards_offers": rewardsOffers,
      "general_promotions": generalPromotions,
    }
    NotificationSettingsServices.notificationSaveSettings(data)
    .then((response) => {
    })
  }
  const handleItemEnding =()=>{
    setItemEnding(!itemEnding)
    let data ={
      "order_updates" : stepVerification,
      "item_ending": itemEnding,
      "item_updates": itemUpdates,
      "auction_updates": auctionUpdates,
      "offer_updates": offerUpdates,
      "presonalized_recomendations": personalizedRecomendations,
      "rewards_offers": rewardsOffers,
      "general_promotions": generalPromotions,
    }
    NotificationSettingsServices.notificationSaveSettings(data)
    .then((response) => {
    })
  }
  const handleItemUpdates =()=>{
    setItemUpdates(!itemUpdates)
    let data ={
      "order_updates" : stepVerification,
      "item_ending": itemEnding,
      "item_updates": itemUpdates,
      "auction_updates": auctionUpdates,
      "offer_updates": offerUpdates,
      "presonalized_recomendations": personalizedRecomendations,
      "rewards_offers": rewardsOffers,
      "general_promotions": generalPromotions,
    }
    NotificationSettingsServices.notificationSaveSettings(data)
    .then((response) => {
    })
  }
  const handleAuctionUpdates =()=>{
    setAuctionUpdates(!auctionUpdates)
    let data ={
      "order_updates" : stepVerification,
      "item_ending": itemEnding,
      "item_updates": itemUpdates,
      "auction_updates": auctionUpdates,
      "offer_updates": offerUpdates,
      "presonalized_recomendations": personalizedRecomendations,
      "rewards_offers": rewardsOffers,
      "general_promotions": generalPromotions,
    }
    NotificationSettingsServices.notificationSaveSettings(data)
    .then((response) => {
    })
  }
  const handleOfferUpdates =()=>{
    setOfferUpdates(!offerUpdates)
    let data ={
      "order_updates" : stepVerification,
      "item_ending": itemEnding,
      "item_updates": itemUpdates,
      "auction_updates": auctionUpdates,
      "offer_updates": offerUpdates,
      "presonalized_recomendations": personalizedRecomendations,
      "rewards_offers": rewardsOffers,
      "general_promotions": generalPromotions,
    }
    NotificationSettingsServices.notificationSaveSettings(data)
    .then((response) => {
    })
  }
  const handleCartUpdates =()=>{
    setCartUpdates(!cartUpdates)
    let data ={
      "order_updates" : stepVerification,
      "item_ending": itemEnding,
      "item_updates": itemUpdates,
      "auction_updates": auctionUpdates,
      "offer_updates": offerUpdates,
      "presonalized_recomendations": personalizedRecomendations,
      "rewards_offers": rewardsOffers,
      "general_promotions": generalPromotions,
    }
    NotificationSettingsServices.notificationSaveSettings(data)
    .then((response) => {
    })
  }
  const handlePersonRecomend =() =>{
    setPersonalizedRecomendations(!personalizedRecomendations)
    let data ={
      "order_updates" : stepVerification,
      "item_ending": itemEnding,
      "item_updates": itemUpdates,
      "auction_updates": auctionUpdates,
      "offer_updates": offerUpdates,
      "presonalized_recomendations": personalizedRecomendations,
      "rewards_offers": rewardsOffers,
      "general_promotions": generalPromotions,
    }
    NotificationSettingsServices.notificationSaveSettings(data)
    .then((response) => {
    })
  }
  const handleRewardsOffers =()=>{
    setRewardsOffers(!rewardsOffers)
    let data ={
      "order_updates" : stepVerification,
      "item_ending": itemEnding,
      "item_updates": itemUpdates,
      "auction_updates": auctionUpdates,
      "offer_updates": offerUpdates,
      "presonalized_recomendations": personalizedRecomendations,
      "rewards_offers": rewardsOffers,
      "general_promotions": generalPromotions,
    }
    NotificationSettingsServices.notificationSaveSettings(data)
    .then((response) => {
    })
  }
  const handleGeneralPromotion = () =>{
    setGeneralPromotions(!generalPromotions)
    let data ={
      "order_updates" : stepVerification,
      "item_ending": itemEnding,
      "item_updates": itemUpdates,
      "auction_updates": auctionUpdates,
      "offer_updates": offerUpdates,
      "presonalized_recomendations": personalizedRecomendations,
      "rewards_offers": rewardsOffers,
      "general_promotions": generalPromotions,
    }
    NotificationSettingsServices.notificationSaveSettings(data)
    .then((response) => {
    })
  }
  useEffect(() => {
    NotificationSettingsServices.show()
    .then((response) => {
      if(response.auction_updates === "0"){
        setStepVerification(false);
      }else{
        setStepVerification(true);
      }
      if(response.item_ending === "0"){
        setItemEnding(false);
      }else{
        setItemEnding(true);
      }
      if(response.item_updates === "0"){
        setItemUpdates(false);
      }else{
        setItemUpdates(true);
      }
      if(response.auction_updates === "0"){
        setAuctionUpdates(false);
      }else{
        setAuctionUpdates(true);
      }
      if(response.offer_updates === "0"){
        setOfferUpdates(false);
      }else{
        setOfferUpdates(true);
      }
      if(response.presonalized_recomendations === "0"){
        setPersonalizedRecomendations(false);
      }else{
        setPersonalizedRecomendations(true);
      }
      if(response.rewards_offers === "0"){
        setRewardsOffers(false);
      }else{
        setRewardsOffers(true);
      }
      if(response.general_promotions === "0"){
        setGeneralPromotions(false);
      }else{
        setGeneralPromotions(true);
      }
    })
  }, []);
  return (
    <>
      <h3>General Notifications</h3>
      <section id='general-notifications'>
        {/* Order Updates */}
        <NotificationSetting
          id="order_updates"
          name="order_updates"
          title="Order Updates"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={stepVerification}
          onChange={() => handleStepVerification()}
        />
        <hr />
        <h3>Shopping Updates</h3>
        <hr />
        <NotificationSetting
          title="Item ending"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={itemEnding}
          onChange={() => handleItemEnding()}
        />
        <hr />
        <NotificationSetting
          title="Item updates"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={itemUpdates}
          onChange={() => handleItemUpdates()}
        />
        <hr />
        <NotificationSetting
          title="Auction updates"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={auctionUpdates}
          onChange={() => handleAuctionUpdates()}
        />
        <hr />
        
        <NotificationSetting
          title="Offer updates"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={offerUpdates}
          onChange={() => handleOfferUpdates}
        />
        <hr />
        <NotificationSetting
          title="Cart updates"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={cartUpdates}
          onChange={() => handleCartUpdates()}
        />
        <hr />
        
        <h3>Recomendations and Rewards</h3>
        <hr />
        <NotificationSetting
          title="Presonalized Recomendations"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={personalizedRecomendations}
          onChange={() => handlePersonRecomend()}
        />
        <hr />
        <NotificationSetting
          title="Rewards and offers"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={rewardsOffers}
          onChange={() => handleRewardsOffers()}
        />
        <hr />
        <NotificationSetting
          title="General Promotions"
          description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
          checked={generalPromotions}
          onChange={() => handleGeneralPromotion()}
        />
      </section>
    </>
  );
};

export default GeneralNotifications;
