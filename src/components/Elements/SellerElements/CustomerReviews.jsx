import React from 'react';

const CustomerReviews = () => {
  const ratings = [
    { name: 'Positive reviews', rating: 3.9 },
    { name: 'Negative reviews', rating: 0.8 },
    { name: 'Reply timing', rating: 2.8 },
    { name: 'Customer care', rating: 3.3 },
  ];

  const renderReviews = () => {
    return ratings.map((item, index) => (
      <div key={index}>
        <div className='main-div'>
            <p> <div className='item'>{item.name}</div> <div className='rating'>{item.rating}</div></p>
            <div className="progress-bar">
          <div className="progress" style={{ width: `${(item.rating / 5) * 100}%` }}></div>
        </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="review-section">
      {renderReviews()}
    </div>
    
  );
};

export default CustomerReviews;
