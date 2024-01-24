import React, { useState } from 'react';
import map from '../../../assets/Images/map.png';

const Addresses = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <section id='addresses-personal'>
        <div className='row'>
          <div className='addadrs'>
            <div>
              <h3>Addresses</h3>
            </div>
            <div>
              <button onClick={togglePopup}>+ Add Another</button>
            </div>
          </div>
        </div>
        <div className='addresselected'>
          <img style={{ width: '100%' }} src={map} alt="Map" />
          <ul>
            <li>
              <span>Street Location</span>{' '}
              <em>14500 Juanita Drive NEKenmore WA 98028-4966USA</em>
            </li>
            <li>
              <span>City</span> <em>Kenmore</em>
            </li>
            <li>
              <span>Label</span> <em>Home</em>
            </li>
          </ul>
        </div>
      </section>

      {showPopup && (
        <div className="popup-address">
            <div className='form-sec-address'>
                <img style={{width: "100%"}} src={map} />
                <h3>Add Address</h3>
          <form>
            
            <input type="text" id="city" name="city" placeholder='City' required />
            <br />
            <input type="text" id="address" name="address" placeholder='Street Address' required />
            <br />
            <input type="text" id="label" name="label" placeholder='Label' required />
            <br />
            <button type="submit">Save</button>
          </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Addresses;
