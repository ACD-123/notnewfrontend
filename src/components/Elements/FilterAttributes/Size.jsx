import React, { useState } from 'react';

const SizeToggle = () => {
  const [showSizes, setShowSizes] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');

  const toggleSizes = () => {
    setShowSizes(!showSizes);
    setSelectedSize(''); // Reset selected size when toggling the sizes
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className='main-size'>
      <label htmlFor="size-dropdown"><h4>Size</h4></label>
      <select id="size-dropdown" onClick={toggleSizes}>
        <option value="toggle"></option>
      </select>
      {showSizes && (
        <div className='sizes-list'>
          {['Small', 'Medium', 'Large', 'Extra Large'].map((size) => (
            <label key={size}>
              <input
                type="radio"
                name="size"
                value={size}
                checked={selectedSize === size}
                onChange={() => handleSizeSelect(size)}
              />
              {size}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default SizeToggle;
