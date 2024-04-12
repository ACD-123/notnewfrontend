import React, { useState, useEffect } from "react";
import ProductServices from "../../../services/API/ProductServices"; //~/services/API/ProductServices

const SizeToggle = (props) => {
  const [showSizes, setShowSizes] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizes, setSizes] = useState([]);

  const toggleSizes = () => {
    setShowSizes(!showSizes);
    setSelectedSize(''); // Reset selected size when toggling the sizes
  };
  const getSizes = () =>{
    ProductServices.getSizes()
    .then((response) => {
      setSizes(response.data);
    }).catch(error => console.log(error))
  }
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    props.parentCallback(size)
  };
  useEffect(() => {
    getSizes();
  }, []);
  // ['Small', 'Medium', 'Large', 'Extra Large']
  return (
    <div className='main-size'>
      <label htmlFor="size-dropdown"><h4>Size</h4></label>
      <select id="size-dropdown" onClick={toggleSizes}>
        <option value="toggle"></option>
      </select>
      {sizes && (
        <div className='sizes-list'>
          {sizes.map((size) => ( 
           
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
          )
          )}
        </div>
      )}
    </div>
  );
};

export default SizeToggle;
