import React, { useState, useEffect, useRef } from "react";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import "react-datepicker/dist/react-datepicker.css";
const libraries = ['places'];
const ReturnShipping = (props) => {
  const inputRef = useRef();
  const [country, setCountry] = useState("Country");
  const [state, setState] = useState("State");
  const [city, setCity] = useState("City");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [zip, setZip] = useState("Zip");
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDg6Ci3L6yS5YvtKAkWQjnodGUtlNYHw9Y",
    libraries
  });
  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      setAddress(place.formatted_address)
      setLatitude(place.geometry.location.lat())
      setLongitude(place.geometry.location.lng())
      for (var i = 0; i < place.address_components.length; i++) {
        for (var j = 0; j < place.address_components[i].types.length; j++) {
          if (place.address_components[i].types[j] == "postal_code") {
            setZip(place.address_components[i].long_name)
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

  useEffect(() => {

  }, []);
  return (
    <div>
      {isLoaded
        &&
        <StandaloneSearchBox
          onLoad={ref => inputRef.current = ref}
          onPlacesChanged={handlePlaceChanged}
        >

          <input
            type="text"
          />
        </StandaloneSearchBox>}
    </div>


  )
};


export default ReturnShipping;
