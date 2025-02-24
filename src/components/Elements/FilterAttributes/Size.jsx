import React, { useState, useEffect } from "react";
import ProductServices from "../../../services/API/ProductServices";
import { toast } from "react-toastify";

const SizeToggle = (props) => {
  const [showSizes, setShowSizes] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizes, setSizes] = useState([]);

  const toggleSizes = () => {
    setShowSizes(!showSizes);
    setSelectedSize('');
  };
  const getSizes = () =>{
    ProductServices.getSizes()
    .then((response) => {
      setSizes(response.data);
    }).catch(error => {
      toast.error(error?.response?.data?.message)
    })
  }
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    props.parentCallback(size)
  };
  useEffect(() => {
    getSizes();
  }, []);
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
