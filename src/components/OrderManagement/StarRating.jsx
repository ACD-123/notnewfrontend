import React from 'react';

const StarRating = ({ value }) => {
    const maxValue = 5;
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 !== 0;
  
    const stars = [];
    
    for (let i = 1; i <= fullStars; i++) {
      stars.push(<span key={`full_${i}`}>&#9733;</span>);
    }
  
    if (hasHalfStar) {
      stars.push(<span key="half">&#9734;&#10029;</span>);
    }
  
    const remainingStars = maxValue - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 1; i <= remainingStars; i++) {
      stars.push(<span key={`empty_${i}`}>&#9734;</span>);
    }
  
    return <div>{stars}</div>;
  };
  export default StarRating