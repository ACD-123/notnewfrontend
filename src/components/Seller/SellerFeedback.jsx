import React, { useEffect, useState } from 'react';
import Profileimage from '../../assets/Images/Seller/profileimage.png'
import Profileimage1 from '../../assets/Images/Seller/1.png'
import Profileimage2 from '../../assets/Images/Seller/2.png'
import blankuser from '../../assets/Images/User/blankuser.jpg'
import SellerServices from '../../services/API/SellerServices';

const SellerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Sample data for seller feedback
  const feedbackData = [
    {
      id: 1,
      title: 'Great Service!',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit...',
      imageUrl: Profileimage,
    },
    {
      id: 2,
      title: 'Excellent Communication',
      comment: 'Vivamus imperdiet, felis sit amet vehicula rhoncus, quam velit euismod...',
      imageUrl: Profileimage1,
    },

    {
        id: 3,
        title: 'Good Service!',
        comment: 'Vivamus imperdiet, felis sit amet vehicula rhoncus, quam velit euismod...',
        imageUrl: Profileimage2,
      },


      {
        id: 4,
        title: 'Wow Great Seller',
        comment: 'Vivamus imperdiet, felis sit amet vehicula rhoncus, quam velit euismod...',
        imageUrl: Profileimage,
      },

      {
        id: 5,
        title: 'Always Best',
        comment: 'Vivamus imperdiet, felis sit amet vehicula rhoncus, quam velit euismod...',
        imageUrl: Profileimage2,
      },
      {
        id: 6,
        title: 'Good Experience',
        comment: 'Vivamus imperdiet, felis sit amet vehicula rhoncus, quam velit euismod...',
        imageUrl: Profileimage1,
      },
      {
        id: 7,
        title: 'Weldone Services',
        comment: 'Vivamus imperdiet, felis sit amet vehicula rhoncus, quam velit euismod...',
        imageUrl: Profileimage,
      },
    // Add more feedback items here...
  ];

  const itemsPerPage = 4; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedbacks.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const { pathname } = window.location;
  const id = pathname.split("/").pop();


  const getFeedbacks = () => {
    SellerServices.getShopDetailFeedback(id)
      .then((res) => {
        console.log('Feedbacks',res.data.feedback);
        setFeedbacks(res.data.feedback);
        setIsLoading(false);
        // let tags = JSON.parse(res.data.tags);
        // let allTags = [];
        // {
        //   tags.map((tag, index) => allTags.push(tag.tag));
        // }
        // setTags(allTags);
      })
      .finally(() => {
        // Set isLoading to false once data fetching is complete
        setIsLoading(false);
      });
  };
  // Mock data for products (replace this with your actual data)
  useEffect(() => {
    getFeedbacks();
    // getTrending();
  }, []);
  return (
    <div className="seller-feedback">
      <h2>Seller Feedback</h2>
      <div className="feedback-container">
        {currentItems.map((feedback) => (
          <div className="feedback-item">
            {feedback.user.profile_image === null ? (
              <img src={blankuser} alt='NULL' />
            ) : (
              <img src={feedback.user.profile_image} alt={feedback.title} />
            )
            }
            <div className="feedback-content">
              <h3>{feedback.user.name}</h3>
              <p>{feedback.comments}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => changePage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SellerFeedback;
