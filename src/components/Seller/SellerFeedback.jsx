import React, { useEffect, useState } from 'react';
import Profileimage from '../../assets/Images/Seller/profileimage.png'
import Profileimage1 from '../../assets/Images/Seller/1.png'
import Profileimage2 from '../../assets/Images/Seller/2.png'
import blankuser from '../../assets/Images/User/blankuser.jpg'
import SellerServices from '../../services/API/SellerServices';
import { BASE_URL } from '../../services/Constant';
import OrderServices from '../../services/API/OrderServices';

const SellerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sellerShopId, setSellerShopId] = useState(null); // Changed initial state to null
  const { pathname } = window.location;
  const shopId = pathname.split("/").pop();

  useEffect(() => {
    getUserOffersCount(); // Fetch seller shop ID first
  }, []);

  useEffect(() => {
      getFeedbacks();
  }, []); // Run useEffect whenever sellerShopId changes

  const getUserOffersCount = () => {
    OrderServices.getuserbidscount()
      .then((res) => {
        setIsLoading(false);
        setSellerShopId(res.data.seller_guid); 
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e.message);
      });
  };

  const getFeedbacks = () => {
    const shopId = pathname.split("/").pop();

    SellerServices.getShopDetailFeedback(shopId)
      .then((res) => {
        setIsLoading(false);
        setFeedbacks(res.data.feedback);
        console.log(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="seller-feedback">
      <h2>Seller Feedback</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="feedback-container">
          {feedbacks.length === 0 ? (
            <>
            <div>Feedbacks Not Found</div>
            </>
          ) : (
            <>
            {feedbacks.map((feedback) => (
              <div className="feedback-item" key={feedback.id}>
                {feedback.user.profile_image === null ? (
                  <img src={blankuser} alt='NULL' />
                ) : (
                  <img src={`${BASE_URL}/${feedback.user.profile_image}`} alt={feedback.title} />
                )}
                <div className="feedback-content">
                  <h3>{feedback.user.name}</h3>
                  <p>{feedback.comments}</p>
                </div>
              </div>
            ))}
            </>
          )}
          </div>
        </>
      )}
    </div>
  );
};

export default SellerFeedback;

