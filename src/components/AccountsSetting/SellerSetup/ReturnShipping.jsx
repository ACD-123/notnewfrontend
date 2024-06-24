import React, { useState, useEffect,useRef } from "react";
import Objection from "../../../assets/Images/objection.png";
import Down from "../../../assets/Images/down.png";
import Checkimg from "../../../assets/Images/Auction/check.png";
import { Link, useAsyncError } from "react-router-dom";
import DatePicker from "react-datepicker";
import ProductServices from "../../../services/API/ProductServices"; //~/services/API/ProductServices
import Category from "../../../services/API/Category"; //~/services/API/Category
import CountryServices from "../../../services/API/CountryServices"; //~/services/API/CountryServices
import State from "../../../services/API/State"; //~/services/API/State
import City from "../../../services/API/City"; //~/services/API/City
import SellerServices from "../../../services/API/SellerServices"; //~/services/API/SellerServices
import HomeService from "../../../services/API/HomeService"; //~/services/API/Home
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { toast } from "react-toastify";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
const libraries = ['places'];
const ReturnShipping = (props) => {
  const inputRef = useRef();
  const [editaddress, setEditAddress] = useState(true);
  const [showPopup, setShowPopup] = useState(false); 
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [shippingStart, setShippingStart] = useState("");
  const [shippingEnd, setShippingEnd] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [isToggled1, setIsToggled1] = useState(isToggled);
  const [buyNow, setBuyNow] = useState(false);
  const [listing, setListing] = useState(false);
  const [scheduled, setScheduled] = useState(false);
  const [domestic, setDomestic] = useState(false);
  const [tags, setTags] = useState([]);
  const [international, setInternational] = useState("");
  const [deliverCompany, setDeliverCompany] = useState("");
  const [price, setPrice] = useState(0);
  const [salesprice, setSalesPrice] = useState(0);
  const [miniumpurchase, setMiniumPurchase] = useState(0);
  const [bids, setBids] = useState(0);
  const [duration, setDuration] = useState("");
  const [auctionstartDate, setAuctionStartDate] = useState("");
  const [auctionEndDate, setAuctionEndDate] = useState("");
  const [shippingprices, setShippingPrices] = useState("");
  const [refund, setRefund] = useState("");
  const [returnLimit, setreturnLimit] = useState("");
  const [returnpaidby, setReturnPaidBy] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [showContents, setShowContents] = useState(false);
  const [country, setCountry] = useState("Country");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [states, setStates] = useState("State");
  const [state, setState] = useState("State");
  const [cities, setCities] = useState("City");
  const [city, setCity] = useState("City");
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [categories, setCategories] = useState({});
  const [category, setCategory] = useState({});
  const [auctions, setAuctions] = useState(false);
  const [shops, setShops] = useState({});
  const [shop, setShop] = useState({});
  const [editproduct, setEditProduct] = useState(false);
  const [shippingLocation, setShippingLocation] = useState("");
  const [conditions, setCondition] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [blobURL, setBlobURL] = useState(null);
  const [files, setFiles] = useState([]);
  const [deliveryCompany, setdeliveryCompany] = useState({});
  const [blobs, setBolbs] = useState([]);
  const [editBlobs, setEditBolbs] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [zip, setZip] = useState("Zip");
  const [hours, setHours] = useState("");
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDg6Ci3L6yS5YvtKAkWQjnodGUtlNYHw9Y",
      libraries
  });
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
              
            
)};


export default ReturnShipping;
