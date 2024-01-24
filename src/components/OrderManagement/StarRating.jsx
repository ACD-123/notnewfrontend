import React from 'react';

const StarRating = ({ value }) => {
    const maxValue = 5; // Maximum rating value
    const fullStars = Math.floor(value); // Get the number of full stars
    const hasHalfStar = value % 1 !== 0; // Check for a half star
  
    const stars = [];
    
    // Full stars
    for (let i = 1; i <= fullStars; i++) {
      stars.push(<span key={`full_${i}`}>&#9733;</span>);
    }
  
    // Half star if applicable
    if (hasHalfStar) {
      stars.push(<span key="half">&#9734;&#10029;</span>);
    }
  
    // Empty stars to complete up to the maximum
    const remainingStars = maxValue - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 1; i <= remainingStars; i++) {
      stars.push(<span key={`empty_${i}`}>&#9734;</span>);
    }
  
    return <div>{stars}</div>;
  };
  export default StarRating