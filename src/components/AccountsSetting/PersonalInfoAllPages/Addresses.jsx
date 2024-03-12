import React, { useState, useRef, useEffect } from 'react';
import map from '../../../assets/Images/map.png';
import UserServices from "../../../services/API/UserServices"; //~/services/API/UserServices
import { toast } from "react-toastify";

const Addresses = () => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "ng" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["establishment"]
   };

  const [showPopup, setShowPopup] = useState(false);
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [user, setUser] = useState({});
  const [btn, setBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const handleSubmit = (e) =>{
    e.preventDefault();
    setIsLoading(true);
    setEnabled(true);
    let data ={
      "country_id": country,
      "state_id": state,
      "city_id": city,
      "address": address,
      "latitute": latitude,
      "longitude": longitude,
    }
    UserServices.updateAddress(data)
    .then((response) => {
      if(response.status){
        toast.success(response.message);
        setIsLoading(false);
        setEnabled(false);
        togglePopup(false);
      }
    }).catch((e) => {
      toast.error(e);
      setIsLoading(true);
      setEnabled(true);
    });
  }
  const handleAddress=(e)=>{
    setAddress(e.target.value)
  }
  const handleCountry =(e)=>{
    setCountry(e.target.value)
  }
  const handleLatitude =(e)=>{
    setLatitude(e.target.value)
  }
  const handleLongitude =(e)=>{
    setLongitude(e.target.value)
  }
  const handleCity =(e)=>{
    setCity(e.target.value)
  }
  const handleState =(e)=>{
    setState(e.target.value)
  }
  useEffect(() => {
    // autoCompleteRef.current = new window.google.maps.places.Autocomplete(
    //  inputRef.current,
    //  options
    // );
    // autoCompleteRef.current.addListener("place_changed", async function () {
    //   const place = await autoCompleteRef.current.getPlace();
    //   console.log('places',{ place });
    //  });
     UserServices.self()
     .then((response) => {
      setUser(response);
      setAddress(response.address)
      setCountry(response.country_id)
      setState(response.state_id)
      setCity(response.city_id)
      setLatitude(response.latitute);
      setLongitude(response.longitude);
        if(response.address){
          setBtn(true)
        }
      }).catch((e) => {
        console.log(e);
      });
   }, []);
  return (
    <>
      <section id='addresses-personal'>
        <div className='row'>
          <div className='addadrs'>
            <div>
              <h3>Addresses</h3>
            </div>
            {/* <div>
              <button onClick={togglePopup}>+ Add Another</button>
            </div> */}
          </div>
        </div>
        <div className='addresselected'>
          <img style={{ width: '100%' }} src={map} alt="Map" />
          {/* <ul>
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
          </ul> */}
          <table style={{ width: "100%"}}>
            <thead>
                <tr>
                  <th>
                    SNo
                  </th>
                  <th>
                    Street Location
                  </th>
                  <th>
                    City
                  </th>
                  <th>
                    State
                  </th>
                  <th>
                    Actions
                  </th>
                </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                1.
                </td>
                <td>
                {user.address}
                </td>
                <td>
                {user.city_id}
                </td>
                <td>
                {user.state_id}
                </td>
                <td>
                  <a href="#" style={{ textDecoration : "none", color: "gray"}} onClick={togglePopup}>{btn ? (<>Edit</>):(<>Add</>)}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {showPopup && (
        <div className="popup-address">
            <div className='form-sec-address'>
              <a href='#' style={{float : "right", textDecoration: "none", color: "gray"}} onClick={togglePopup}>X</a>
                <img style={{width: "100%"}} src={map} />
                <h3>Add Address</h3>
                <form onSubmit={handleSubmit}>
                  <input type="text" id="address" value={address} onChange={handleAddress} name="address" placeholder='Street Address' ref={inputRef} required />
                  <br />
                  <input type="text" id="country" value={country} onChange={handleCountry} name="country" placeholder='Country' required />
                  <br />
                  <input type="text" id="state" value={state} name="state" onChange={handleState} placeholder='State' required />
                  <br />
                  <input type="text" id="city" value={city} name="city" placeholder='City' onChange={handleCity} required />
                  <br />
                  <input type="text" id="latitude" value={latitude} name="latitude" placeholder='Latitude' onChange={handleLatitude} required />
                  <br />
                  <input type="text" id="longitude" value={longitude} name="longitude" placeholder='Longitude' onChange={handleLongitude} required />
                  <br />
                  <button  disabled={enabled} type="submit">
                    {isLoading ? "loading.." : "Update"}
                </button>
                </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Addresses;
