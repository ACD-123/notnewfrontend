import React, { useState } from 'react';


const PriceRange = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [draggingMin, setDraggingMin] = useState(false);
  const [draggingMax, setDraggingMax] = useState(false);

  const range = maxValue - minValue;

  const handleTouchStart = (dot) => {
    if (dot === 'min') {
      setDraggingMin(true);
    } else if (dot === 'max') {
      setDraggingMax(true);
    }
  };

  const handleTouchMove = (e) => {
    if (draggingMin) {
      const newValue = calculateNewValue(e.touches[0].clientX, 'min');
      setMinValue(newValue);
    } else if (draggingMax) {
      const newValue = calculateNewValue(e.touches[0].clientX, 'max');
      setMaxValue(newValue);
    }
  };

  const handleTouchEnd = () => {
    setDraggingMin(false);
    setDraggingMax(false);
  };

  const calculateNewValue = (clientX, dot) => {
    const progressBar = document.getElementById('progress-bar');
    const progressBarRect = progressBar.getBoundingClientRect();
    const progressBarWidth = progressBarRect.width;
    const positionX = clientX - progressBarRect.left;
    let newValue = (positionX / progressBarWidth) * 100;

    if (dot === 'min') {
      newValue = Math.min(newValue, maxValue);
    } else if (dot === 'max') {
      newValue = Math.max(newValue, minValue);
    }

    return Math.round((newValue / 100) * 100);
  };

  const handlePriceSelection = (priceRange) => {
    // Handle radio button selection and set the values accordingly
    switch (priceRange) {
      case '26-40':
        setMinValue(26);
        setMaxValue(40);
        break;
      case '41-81':
        setMinValue(41);
        setMaxValue(81);
        break;
      case '90-100':
        setMinValue(90);
        setMaxValue(100);
        break;
      default:
        break;
    }
  };

  return (
    <div className="range-filter-container" onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <h4>Price</h4>
      
      <div className='progress-dots'>
        <div id="progress-bar" className="progress-bar" onTouchStart={() => handleTouchStart('min')}>
          <div className="progress-value" style={{ width: `${(range / 100) * 100}%` }}>
            <div className="range-dot min-dot" style={{ left: `${(minValue / 100) * 100}%` }} onTouchStart={() => handleTouchStart('min')}></div>
            <div className="range-dot max-dot" style={{ left: `${(maxValue / 100) * 100}%` }} onTouchStart={() => handleTouchStart('max')}></div>
          </div>
        </div>
      </div>
      <div className='radio-buttons'>
        <label>
        <input type="radio" name="price" onClick={() => handlePriceSelection('26-40')} />
          $26 to $40
        </label>
        <label>
        <input type="radio" name="price" onClick={() => handlePriceSelection('41-81')} />
          $41 to $81
          
        </label>
        <label>
        <input type="radio" name="price" onClick={() => handlePriceSelection('90-100')} />
          $90 to $100
          
        </label>
      </div>
      <div className='min-max-box'>
        <input type="number" value={minValue} onChange={(e) => setMinValue(parseInt(e.target.value))} className="range-input" />
        <input type="number" value={maxValue} onChange={(e) => setMaxValue(parseInt(e.target.value))} className="range-input" />
      </div>
      <br />
      <p className="selected-range">Selected Range: {minValue} - {maxValue}</p>
    </div>
  );
};

export default PriceRange;
