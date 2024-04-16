import React, { useState, useRef, useEffect } from 'react';
import map from '../../../assets/Images/map.png';
import UserServices from "../../../services/API/UserServices"; //~/services/API/UserServices
import { toast } from "react-toastify";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
const libraries = ['places'];
const Addresses = () => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "ng" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["establishment"]
   };
   const [editaddress, setEditAddress] = useState(false);
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
  const [zip, setZip] = useState("Zip");
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDg6Ci3L6yS5YvtKAkWQjnodGUtlNYHw9Y",
      libraries
  });
  const togglePopup = () => {
    setShowPopup(!showPopup);
    setEditAddress(false)
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
        self();
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
  const handlePlaceChanged = () => { 
    const [ place ] = inputRef.current.getPlaces();
    if(place) { 
        setAddress(place.formatted_address)
        setLatitude(place.geometry.location.lat())
        setLongitude(place.geometry.location.lng())
        for (var i = 0; i < place.address_components.length; i++) {
          for (var j = 0; j < place.address_components[i].types.length; j++) {
            if (place.address_components[i].types[j] == "postal_code") {
                setZip(place.address_components[i].long_name)
            // document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
            }
            if (place.address_components[i].types[0] == "locality") {
                  setCity(place.address_components[i].long_name);
                }
            if (place.address_components[i].types[0] == "administrative_area_level_1") {
                  setState(place.address_components[i].long_name);
                }
            if (place.address_components[i].types[0] == "country") {
                  setCountry(place.address_components[i].long_name);
              }
          }
        }
    } 
}
const self =()=>{
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
    setIsLoading(false); // Set loading state to false after fetching user data
  }).catch((e) => {
    console.log(e);
    setIsLoading(false); // Set loading state to false on error
  });
}
const handleAddAddress =()=>{
  setEditAddress(true)
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
    self();
   }, []);
  return (
    <>
    {isLoading && <div>Loading...</div>}
    {!isLoading && (
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
                  {/* <th>
                    SNo
                  </th> */}
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
                {/* <td>
                1.
                </td> */}
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
                  {editaddress ? (
                    <>
                     {isLoaded
                      &&
                      <StandaloneSearchBox
                        onLoad={ref => inputRef.current = ref}
                        onPlacesChanged={handlePlaceChanged}
                      >
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your street address"
                        />
                    </StandaloneSearchBox>}

                    </>
                  ):(<>
                      {/* <input type="text" id="address" value={address} onChange={handleAddress} name="address" placeholder='Street Address' ref={inputRef} required /> */}
                      <label
                      className="form-control">
                        {address}
                      </label>
                  </>)}
                  <br />
                  <a href='#' onClick={handleAddAddress}>Edit Address</a>
                  <br /><br />
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
    )}
    </>
  );
};

export default Addresses;
