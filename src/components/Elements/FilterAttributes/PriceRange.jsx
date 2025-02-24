import React, { useState, useEffect } from "react";
import ProductServices from "../../../services/API/ProductServices";
import { toast } from "react-toastify";


const PriceRange = (props) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [draggingMin, setDraggingMin] = useState(false);
  const [draggingMax, setDraggingMax] = useState(false);
  const [rangeVal, setrangeVal] = useState(0);


  const handleTouchStart = (dot) => {
    if (dot === 'min') {
      setDraggingMin(true);
    } else if (dot === 'max') {
      setDraggingMax(true);
    }
  };
  const chunkIntoN = (arr, n) => {
    const size = Math.ceil(arr.length / n);
    return Array.from({ length: n }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  }
  const getPrices = () =>{
    let array = [];
    for (let i = minValue; i <= maxValue; i++) {
      array.push(i);
    }
    let finalArray =chunkIntoN(array, 4);
    return(
      <>{finalArray?.length > 0 ?(
        <>
          <ul style={{ listStyle: "none", marginTop: "10px"}}>
            {finalArray.map((arr, index) => {
              let first = arr.at(0);
              let last= arr.at(arr?.length - 1);
              return(
                <>
                <li key={index}>
                <label>
                  <input type="radio" name="price" onClick={() => handlePriceSelection(`${first}-${last}`)} />
                    $ {first} to $ {last}
                </label>
                </li>
                </>
              )
            })}
          </ul>
        </>
      ):('')}
      </>
    )
  }
  const getMin =() =>{
    ProductServices.min()
    .then((response) => {
      setMinValue(response.data);
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message)
    });
  }
  const getMax =() =>{
    ProductServices.max()
    .then((response) => {
      setMaxValue(response.data);
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message)
    });
  }
  const handlePriceChange  = (e) =>{
    e.preventDefault();
    setrangeVal(e.target.value);
    props.parentCallback(e.target.value)
  }

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
    var range = priceRange.split("-");
      props.parentCallback(range);
  };
  useEffect(() => {
    getMin();
    getMax();
    getPrices();
  }, []);
  return (
    <div className="range-filter-container" onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <h4>Price</h4>
      
      <div className='progress-dots'>
        <div id="progress-bar" className="progress-bar" onTouchStart={() => handleTouchStart('min')}>
        <input type="range"  onChange={handlePriceChange} min={minValue} max={maxValue} />
        </div>
        <p style={{ float:"left"}}>$ {minValue}</p>
        <p style={{ float:"right"}}>$ {maxValue}</p>
      </div>

      <div className='radio-buttons'>
        {getPrices()}
      </div>
    </div>
  );
};

export default PriceRange;
