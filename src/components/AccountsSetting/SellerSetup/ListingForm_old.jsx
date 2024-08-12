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
import Home from "../../../services/API/Home"; //~/services/API/Home
import ReturnShipping from "./ReturnShipping"; //~/services/API/Home
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { toast } from "react-toastify";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
const libraries = ['places'];
const ListingForm = (props) => {
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
  const [durations, setDurations] = useState("");
  // const [addresses, setAddress] = useState("");
  const [product, setProduct] = useState({
    images: [],
    condition: "",
    title: "",
    model: "",
    category: "",
    brand: "",
    stockCapacity: 0,
    sizes: [{ size: "Small", quantity: 0, color: "" }],
    availableColors: [],
    description: "",
    sellingNow: false,
    price: 0,
    saleprice: 0,
    minpurchase: 1,
    listing: "",
    auctions: false,
    bids: 0,
    durations: 0,
    auctionListing: "",
    auctionEndListing: "",
    deliverddomestic: false,
    deliverdinternational: false,
    deliverycompany: "",
    tags: [],
    country: "",
    state: "",
    city: "",
    locations: [],
    shippingprice: 0,
    shippingstart: "",
    shippingend: "",
    returnshippingprice: 0,
    returndurationlimit: 0,
    returnshippingpaidby: "",
    returnshippinglocation: "",
    hours:"",
    action: "add",
  });
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDg6Ci3L6yS5YvtKAkWQjnodGUtlNYHw9Y",
      libraries
  });
  let imagesFiles = [];
  const user_id = localStorage.getItem('user_id');

  let product_condition = localStorage.getItem("product_condition");

  // Function to handle the activation of the product
  const handleActivateProduct = (e) => {
    e.preventDefault();
    product.sellingNow = buyNow;
    product.auctions = isToggled1;
    product.price = price;
    product.listing = listing;
    product.buyitnow = isToggled;
    product.deliverddomestic = domestic;
    product.deliverdinternational = international;
    product.deliverycompany = deliverCompany;
    product.city = city;
    product.states = state;
    // product.shippingprice = prices;
    product.shippingstart = shippingStart;
    product.shippingend = shippingEnd;
    product.shippingdurations = shippingEnd;
  };
  const handleShippingStartChange = (e) => {
    product.shippingstart = e.target.value;
    // product.shippingend
    setShippingStart(e.target.value);
  };
  const handleShippingEndChange = (e) => {
    product.shippingend = e.target.value;
    setShippingEnd(e.target.value);
  };
  const handleDomestic = (e) => {
    product.deliverddomestic = true;
    setDomestic(!domestic);
  };
  const handleAddress = (e) => {
    product.address = e.target.value;
    setDomestic(!domestic);
  };
  const handleInternational = (e) => {
    product.deliverdinternational = true;
    setInternational(!international);
  };
  const handleDeliverCompany = (e) => {
    product.deliverycompany = e.target.value;
    setDeliverCompany(e.target.value);
  };
  const handleToggle = (e) => {
    product.sellingNow = e.target.value;
    setIsToggled(!isToggled);
  };
  const handleAuctions = (e) => {
    product.auctions = true;
    product.sellingNow = false;
    setAuctions(!auctions);
    setBuyNow(false);
  };
  const handleBitChange = (e) => {
    product.bids = e.target.value;
    setBids(e.target.value);
  };
  const handleDurationChange = (e) => {
    product.shipingdurations = e.target.value;
    setDuration(e.target.value);
  };
  const handleDurations = (e)=>{
    // durations
    setDurations(e.target.value)
    product.durations = e.target.value;
  }
  const handleHours = (e) =>{
    product.hours = e.target.value;
    setHours(e.target.value);
  }
  const handleAuctionStartDate = (e) => {
    product.auctionListing = e.target.value;
    // product.auctionListing = moment(date).format("DD-MM-YYYY");
    setAuctionStartDate(e.target.value);
  };
  const handleAuctionEndDate = (e) =>{
    product.auctionEndListing = e.target.value;
    // product.auctionEndListing = moment(date).format("DD-MM-YYYY");
    setAuctionEndDate(e.target.value);
  }

  const handleToggle1 = () => {
    setIsToggled1(!isToggled1);
  };
  const handleBuynow = (e) => {
    product.sellingNow = true;
    product.auctioned = false;
    setAuctions(false);
    setBuyNow(!buyNow);
  };
  const handleLisitng = (e) => {
    product.listing = e.target.value;
    setListing(!listing);
  };

  const handleCategory = (e) => {
    const cat = e.target.value;
    product.category = e.target.value;
    setCategory(cat);
  };

  const removeTags = (e, tags) => {
    e.preventDefault();
    product.tags?.map((tag, index) => {
      product.tags.splice(index, 1);
      const updatedTags = [...product.tags];
      setProduct({ ...product, tags: updatedTags });
    });
  };
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

const handleAddAddress =()=>{
  setEditAddress(false)
  product.address = address;
}
  const handleBrands =(e)=>{
    setBrand(e.target.value)
    product.brand = e.target.value;
  }
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newErrors = {};
    if (name === "size" || name === "quantity" || name === "color") {
      const updatedSizes = [...product.sizes];
      updatedSizes[index][name] = value;
      setProduct({ ...product, sizes: updatedSizes });
    }else {
      setProduct({ ...product, [name]: value });
    }
    if (name === "color") {
      const updatedColors = [value];
      setProduct({ ...product, availableColors: updatedColors });
    }
    if (name === "tags") {
      const updatedTags = [value];
      setProduct({ ...product, tags: updatedTags });
    }
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    const updatedColors = [...product.availableColors, color];
    setProduct({ ...product, availableColors: updatedColors });
  };

  const handleCondition = (e) => {
    e.preventDefault();
    setCondition(e.target.value);
    localStorage.setItem("product_condition", e.target.value);
  };
  const handleEditImageUpload = (e) => {
    let totalBlobs = blobs.length + editBlobs.length;
    if (totalBlobs > 4) {
      const newErrors = {};
      newErrors.editimages = "You can not upload more then 5 images";
      setErrors(newErrors);
    } else {
      setEditBolbs([...editBlobs, URL.createObjectURL(e.target.files[0])]);
    }
    if (files.length > 4) {
      //
    } else {
      setFiles([...files, e.target.files]);
    }
  }
  const handleImageUpload = (e) => {
    if (blobs.length > 4) {
      const newErrors = {};
      newErrors.images = "You can not upload more then 5 images";
      setErrors(newErrors);
    } else {
      setBolbs([...blobs, URL.createObjectURL(e.target.files[0])]);
    }
    if (files.length > 4) {
      //
    } else {
      setFiles([...files, e.target.files[0]]);
    }
  };

  const handleAddSize = () => {
    setProduct({
      ...product,
      sizes: [...product.sizes, { size: "", quantity: 0 }],
    });
    return;
  };

  const handleAddTags = (e) => {
    setProduct({
      ...product,
      tags: [...product.tags, ""],
    });
    return;
  };

  const handleCountryChange = (e) => {
    product.country = e.target.value;
    State.get(e.target.value)
      .then((response) => {
        setState(response);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!product.title) {
      newErrors.title = "Title is required";
    }
    if (!product.category) {
      newErrors.category = "Category is required";
    }
    if (!product.brand) {
      newErrors.brand = "Brand is required";
    }
    // if (!product.stockCapacity || product.stockCapacity === 0) {
    //   newErrors.stockCapacity = "Stock Capacity is required";
    // }
    if (!product.description) {
      newErrors.description = "Description is required";
    }
    // if (!product.sellingNow || !product.auctions) {
    //   newErrors.sellingNow = "Buy it Now is required";
    // }
    // if (!product.price) {
    //   newErrors.price = "Price is required";
    // }
    // if (!product.listing) {
    //   newErrors.listing = "Listing is required";
    // }
    // if (!isToggled) {
    //   newErrors.buyitnow = "Buy it Now is required";
    // }
    if (!product.deliverycompany) {
      newErrors.deliverycompany = "Deliver Company is required";
    }
    // if (!product.deliverddomestic || !product.deliverdinternational) {
    //   newErrors.deliverdomestically = "Deliver is required";
    // }
    // if(!product.country){
    //   newErrors.country = "Country is required";
    // }
    // if(!product.states){
    //   newErrors.states = "States is required";
    // }
    // if(!product.city){
    //   newErrors.city = "City is required";
    // }
    if (!product.shippingprice) {
      newErrors.shippingprice = "Shipping Price is required";
    }

    // if (!product.shippingstart && !product.shippingstart) {
    //   newErrors.shippingstartend = "Shipping Start and End is required";
    // }
    // if (!product.durations && !product.durations) {
    //   newErrors.durations = "Shipping Start and End is required";
    // }

    if (!product.returnshippingpaidby) {
      newErrors.returnshippingpaidby = "Shipping Paid By is required";
    }
    if (!product.tags || product.tags.length == 0) {
      newErrors.tags = "Please Enter Tags";
    }
    // if(!shippingLocation){
    //   newErrors.returnshippinglocation = "Shipping Locations is required";
    // }
    // if(!product.returndurationlimit){
    //   newErrors.returndurationlimit = "Shipping Duration Limit is required";
    // }
    // if(!product.shippingLocation){
    //   newErrors.returnshippingprice = "Shipping Price is required";
    // }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setEnabled(true);
      if (props.guid) {
        product.category = product.category ? product.category : category;
        product.sizes = product.sizes;
        product.sellingNow = isToggled;
        product.shippingstart = shippingStart;
        product.shippingend = shippingEnd;
       
        ProductServices.update(props.guid, product)
          .then((response) => {
            // toast.success(response.message);
            setShowEditPopup(true);
            setIsLoading(false);
            setEnabled(false);
            // localStorage.removeItem('product_condition');
            setTimeout(() => {
              props.parentCallback(null);
            }, 4000);
          })
          .then(() => {
            setIsLoading(false);
            setEnabled(false);
          });
      } else {
        product.country= country;
        product.city= city;
        product.state= state;
        const formData = new FormData();
        product.condition = localStorage.getItem("product_condition");
        formData.append("title", product.title);
        formData.append("condition", localStorage.getItem("product_condition"));
        formData.append("model", product.model);
        formData.append("category", product.category);
        formData.append("brand_id", product.brand);
        formData.append("stockCapacity", product.stockCapacity);
        formData.append("sizes", JSON.stringify(product.sizes));
        formData.append("availableColors", product.availableColors);
        formData.append("description", product.description);
        formData.append("sellingNow", product.sellingNow);
        formData.append("price", product.price);
        formData.append("saleprice", product.saleprice);
        formData.append("minpurchase", product.minpurchase);
        formData.append("listing", product.listing);
        formData.append("auctions", product.auctions);
        formData.append("bids", product.bids);
        formData.append("shipingdurations", product.durations);
        formData.append("durations", product.durations);
        formData.append("hours", product.hours);
        formData.append("auctionListing", product.auctionListing);
        formData.append("auctionEndListing", product.auctionEndListing);
        formData.append("deliverddomestic", product.deliverddomestic);
        formData.append("tags", JSON.stringify(product.tags));
        formData.append("deliverdinternational", product.deliverdinternational);
        formData.append("deliverycompany", product.deliverycompany);
        formData.append("country", product.country);
        formData.append("city", product.city);
        formData.append("state", product.state);
        formData.append("shippingprice", product.shippingprice);
        formData.append("shippingstart", product.shippingstart);
        formData.append("shippingend", product.shippingend);
        formData.append("returnshippingprice", product.returnshippingprice);
        formData.append("returndurationlimit", product.returndurationlimit);
        formData.append("returnshippingpaidby", product.returnshippingpaidby);
        formData.append("termsdescription","termsdescription")
        formData.append(
          "returnshippinglocation",
          product.returnshippinglocation
        );
        /**
         * For Images Uploads Start
         */
        files.forEach((image_file) => {
          formData.append("file[]", image_file);
        });
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        };
        axios
          .post("https://notnewbackendv1.testingwebsitelink.com/api/products/add", formData, config)
          .then((response) => {
            setShowPopup(true);
            setIsLoading(false);
            setEnabled(false);
            localStorage.removeItem("product_condition");
            setTimeout(() => {
              props.parentCallback(null);
            }, 4000);
          })
          .then(() => {
            setIsLoading(false);
            setEnabled(false);
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message)
          });
      }
    }
  };

  const handlePriceChange = (e) => {
    product.price = e.target.value;
    setPrice(e.target.value);
  };
  const handleSalePriceChange = (e) => {
    product.saleprice = e.target.value;
    setSalesPrice(e.target.value);
  };
  const handleMinPurchaseChange = (e) => {
    product.minpurchase = e.target.value;
    setMiniumPurchase(e.target.value);
  };
  const handleStartDate = (date) => {
    product.listing = moment(date).format("DD-MM-YYYY");
    setStartDate(date);
  };
  const handleShippingPriceChanges = (e) => {
    product.shippingprice = e.target.value;
    setShippingPrices(e.target.value);
  };
  const handleRefundprice = (e) => {
    product.returnshippingprice = e.target.value;
    setRefund(e.target.value);
  };
  const handleReturnLimit = (e) => {
    product.returndurationlimit = e.target.value;
    setreturnLimit(e.target.value);
  };
  const handleReturnPaidBy = (e) => {
    product.returnshippingpaidby = e.target.value;
    setReturnPaidBy(e.target.value);
  };
  const handleShippingLocation = (e) => {
    product.returnshippinglocation = e.target.value;
    setShippingLocation(e.target.value);
  };
  //
  // Static simulation of states and cities data
  const statesData = [
    { id: "state1", name: "State 1" },
    { id: "state2", name: "State 2" },
    // Add more states as needed
  ];

  // const deliveryCompany = [
  //   { id: "fedex", name: "Fedex" },
  //   { id: "usps", name: "USPS" },
  //   { id: "americancourier", name: "AMERICAN COURIER" },
  // ];

  const paidBy = [
    { id: "buyer", name: "Buyer" },
    { id: "seller", name: "Seller" },
    { id: "admin", name: "Admin" },
  ];

  // const durations = [
  //   { id: "1", name: "1" },
  //   { id: "2", name: "2" },
  //   { id: "3", name: "3" },
  //   { id: "4", name: "4" },
  //   { id: "5", name: "5" },
  //   { id: "6", name: "6" },
  //   { id: "7", name: "7" },
  //   { id: "8", name: "8" },
  //   { id: "9", name: "9" },
  //   { id: "10", name: "10" },
  //   { id: "11", name: "11" },
  //   { id: "12", name: "12" },
  // ];
  const citiesData = [
    { id: "city1", name: "City 1" },
    { id: "city2", name: "City 2" },
  ];

  const handleState = (val) => {
    setState(val);
  };
  const handleCity = (val) => {
    product.city = val;
    setCity(val);
  };
  // Function to update states based on the selected country (simulated for demonstration)
  const fetchStates = (countryCode) => {
    setTimeout(() => {
      setSelectedCountryCode(countryCode);
      setStates(statesData);
    }, 500);
  };

  // Function to update cities based on the selected state (simulated for demonstration)
  // const fetchCities = (stateId) => {
  //   setTimeout(() => {
  //     setCities(citiesData[stateId]);
  //   }, 500);
  // };
  const fetchCities = () => {
    setCities(citiesData);
  };

  // Within the select elements:
  const [locations, setLocations] = useState([
    { country: "", state: "", city: "" },
  ]);

  // Function to add more location fields
  const addMoreLocation = () => {
    setLocations([...locations, { country: "", state: "", city: "" }]);
  };
  const fetchCategory = () => {
    Category.all()
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };
  const fetchCountries = () => {
    CountryServices.all()
      .then((response) => {
        setCountry(response);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };
  const handleStateChange = (e) => {
    product.state = e.target.value;
    City.get(e.target.value)
      .then((response) => {
        setCities(response);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };
  const fetchStores = () => {
    SellerServices.getStore(user_id)
      .then((response) => {
        if (response.status) {
          setShops(response.data);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message)
      });
  };
  const getProduct = () => {
    if (props.guid) {
      product.action = "edit";
    }
    setEditProduct(true);
    ProductServices.get(props.guid).then((response) => {
      setCategory(response.category_id);
      let productData = {
        store: response.shop_id,
        shopid: response.shop_id,
        images: [],
        scheduled: false,
        title: response.name,
        model: response.model,
        category: category,
        brand: response.brand,
        stockCapacity: response.stockcapacity ? response.stockcapacity : 0,
        sizes:  JSON.parse(response.attributes),
        availableColors: [],
        description: response.description,
        sellingNow: response.selling_now,
        auctions: response.auctioned,
        price: response.price,
        listing: response.listing,
        tags: JSON.parse(JSON.parse(response.tags)),
        // "sale": false,
        buyitnow: response.buyitnow,
        deliverddomestic: response.deliverd_domestic,
        deliverdinternational: response.deliverd_international,
        deliverycompany: response.delivery_company,
        country: response.country,
        locations: response.locations,
        shippingprice: response.shipping_price,
        shippingstart: response.shipping_start,
        shippingend: response.shipping_end,
        returnshippingprice: response.return_shipping_price,
        returndurationlimit: response.return_ship_duration_limt,
        returnshippingpaidby: response.return_ship_paid_by,
        returnshippinglocation: response.return_ship_location,
        bids:response.bids,
        duration:response.durations,
        action: "edit",
      };
      setProduct(productData);
      if (response.selling_now == "1") {
        setBuyNow(true);
      } else {
        setBuyNow(false);
      }
      setDeliverCompany(response.company);
      if (response.company == "1") {
        setListing(true);
      } else {
        setListing(false);
      }
      if (response.listing == "1") {
        setListing(true);
      } else {
        setListing(false);
      }
      if (response.auctioned == "1") {
        setAuctions(true);
      } else {
        setAuctions(false);
      }
      if (response.deliverd_domestic == "1") {
        setDomestic(true);
      } else {
        setDomestic(false);
      }      
      if (response.deliverd_international == "1") {
        setInternational(true);
      } else {
        setInternational(false);
      }      
      setDeliverCompany(response.delivery_company)
      // setAuctionStartDate(moment(response.auction_listing).format("YYYY-MM-DD"))
      setShippingLocation(response.return_ship_location);
      let startDate = moment(response.shipping_start).format("YYYY-MM-DD");
      let endDate = moment(response.shipping_end).format("YYYY-MM-DD");
      setShippingStart(startDate);
      setShippingEnd(endDate);
      setCondition(response.condition);
      State.get(response.country_id).then((response) => {
        setState(response);
      });
      City.get(response.state_id).then((response) => {
        setCity(response);
      });
      if(response.media){
        setBolbs(response.media);
      }
    });
  };
  const productCondition = [
    { id: "BrandNew", name: "BrandNew" },
    { id: "Used", name: "Used" },
    { id: "Refurbished", name: "Refurbished" },
    { id: "Vintage", name: "Vintage" },
  ];
  const removeThumbnail = (e, val) =>{
    e.preventDefault();
      const index = blobs.indexOf(val);
      if (index > -1) {
        blobs.splice(index, 1);
      }
      setBolbs([...blobs]);
  }
  // const fetchCompanies = () =>{
  //   
  // }
  const getCompany = () =>{
    Home.getCompanies()
      .then((res) => {
      if (res.status) {
        setdeliveryCompany(res.data);
      }
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message)
    });
  }
  const getBrands = () =>{
    Home.getbrands()
      .then((res) => {
        setBrands(res)        // if (res.status) {
      //   // setdeliveryCompany(res.data);
      // }
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message)
    });
  }
  useEffect(() => {
    fetchCategory();
    // fetchCountries();
    fetchStores();
    getCompany();
    getBrands();
    // fetchCompanies();
    if (props.guid) {
      getProduct();
    }
  }, []);
  return (
    <section id="listing-creating-form">
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        style={{ maxWidth: "90%", margin: "0 auto", overflow: "hidden" }}
      >
        {editproduct ? (
          <>
            <h3 style={{ color: "#000" }}>Edit Your Product</h3>
          </>
        ) : (
          <>
            <h3 style={{ color: "#000" }}>Describe Your Product</h3>
          </>
        )}
        {props.edit ? (
          <>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleEditImageUpload}
            />
             <div className="imgegallry">
          {blobs.length > 0 ? (
            <>
              {blobs.map((blob, index) => {
                return (
                  <>
                    <img
                      key={index}
                      src={`https://notnewbackendv1.testingwebsitelink.com/image/product/${blob.name}`}
                      alt={`Product ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        margin: "5px",
                      }}
                    />
                    <a href="#" 
                      onClick={(e) =>
                        removeThumbnail(e,blob)
                      }>X</a>
                    </>
                );
              })}
            </>
          ) : (
            ""
          )}
          {editBlobs.length > 0 ?(
            <>
            {editBlobs.map((blob, index) => {
              return (
                <>
                  <img
                    key={index}
                    src={blob}
                    alt={`Product ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      margin: "5px",
                    }}
                  />
                  <a href="#" 
                    onClick={(e) =>
                      removeThumbnail(e,blob)
                    }>X</a>
                  </>
              );
            })}
          </>
          ):('')}
          {errors.editimages && <p className="error">{errors.editimages}</p>}
          {product.images.length > 0 ? (
            <>
              {product.images.map((imageUrl, index) => {
                return (
                  <>
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Product ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        margin: "5px",
                      }}
                    />
                  </>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
          </>
        ):(
          <>
                      <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
             <div className="imgegallry">
          {blobs.length > 0 ? (
            <>
              {blobs.map((blob, index) => {
                return (
                  <>
                  {blob ? (<>
                    <img
                      key={index}
                      src={blob}
                      alt={`Product ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        margin: "5px",
                      }}
                    />
                  </>):('')}
                    <a href="#" 
                    onClick={(e) =>
                      removeThumbnail(e,blob)
                    }>X</a>
                  </>
                );
              })}
            </>
          ) : (
            ""
          )}
          {errors.images && <p className="error">{errors.images}</p>}

          {product.images.length > 0 ? (
            <>
              {product.images.map((imageUrl, index) => {
                return (
                  <>
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Product ${index + 1}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        margin: "5px",
                      }}
                    />
                  </>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
          </>
        )}
        
       
        <p className="notify-images">
          <img src={Objection} /> Add a minimum of 5 images covering all angles
          of the item that describe it well.
        </p>
        <h4>ITEM SPECIFICS</h4>
        {props.edit ? (
          <>
            <h5>Product Condition</h5>
            <ul style={{ padding: "0px", margin: "0px", listStyle: "none" }}>
              {productCondition?.map((condition , index) => {
                return (
                  <>
                    <li key={index}>
                      {conditions == condition.name ? (
                        <>
                          <input
                            type="radio"
                            name="condition"
                            onChange={handleCondition}
                            style={{ width: "20px" }}
                            checked="true"
                            value={condition.id}
                          />{" "}
                          {condition.name}
                        </>
                      ) : (
                        <>
                          <input
                            type="radio"
                            name="condition"
                            onChange={handleCondition}
                            style={{ width: "20px" }}
                            value={condition.id}
                          />{" "}
                          {condition.name}
                        </>
                      )}
                    </li>
                  </>
                );
              })}
            </ul>
          </>
        ) : (
          <>
            <h5>Product Condition</h5>
            {/* <div className="productCondition">
            {product_condition}            
           </div> */}
            <ul style={{ padding: "0px", margin: "0px", listStyle: "none" }}>
              {productCondition?.map((condition , index) => {
                return (
                  <>
                    <li key={index}>
                      {product_condition == condition.name ? (
                        <>
                          <input
                            type="radio"
                            name="condition"
                            onChange={handleCondition}
                            style={{ width: "20px" }}
                            checked="true"
                            value={condition.id}
                          />{" "}
                          {condition.name}
                        </>
                      ) : (
                        <>
                          <input
                            type="radio"
                            name="condition"
                            onChange={handleCondition}
                            style={{ width: "20px" }}
                            value={condition.id}
                          />{" "}
                          {condition.name}
                        </>
                      )}
                    </li>
                  </>
                );
              })}
            </ul>
          </>
        )}
        {/* <div className="listschedule1">
          <div>Scheduled</div>
          <div>
            <label className="switch3">
              <input
                type="checkbox"
                value={product.scheduled}
                checked={product.scheduled}
                onChange={handleScheduled}
              />
              <span className="slider3 round3"></span>
            </label>
          </div>
        </div> */}
        {/* <div className="delivery-company">
          <div>Store</div>
          <div>
            <select style={{ width: "150px" }} value={product.store} name={product.store} onChange={handleShop}>
              {shops ? (
                  <>
                    <option value={shops.id} selected="true">{shops.fullname}</option>
                  </>
              ) : (
                ""
              )}
            </select>
          </div>
        </div> */}
        {/* {errors.store && <p className="error">{errors.store}</p>} */}
        <input
          type="text"
          placeholder="Product Title"
          name="title"
          value={product.title}
          onChange={handleInputChange}
        />
        {errors.title && <p className="error">{errors.title}</p>}
        <input
          type="text"
          placeholder="Item Model"
          name="model"
          value={product.model}
          onChange={handleInputChange}
        />
        {errors.model && <p className="error">{errors.model}</p>}
        <div className="delivery-company">
          <div>Select Brand</div>
          <div>
            <select value={brand} onChange={handleBrands}>
            <option>Select Brands</option>
            {brands.length > 0 ? (
                <>
                  {brands?.map((brand , index) => {
                    return (
                      <>
                        <option value={brand.id} key={index}>{brand.name}</option>
                      </>
                    );
                  })}
                </>
              ) : (
                ""
              )}
            </select>
          </div>
          {errors.brand && <p className="error">{errors.brand}</p>}
        </div>
        <div className="delivery-company">
          <div>Select Category</div>
          <div>
            <select value={category} onChange={handleCategory}>
              <option value="">All Category</option>
              {categories.length > 0 ? (
                <>
                  {categories?.map((cat , index) => {
                    return (
                      <>
                        <option value={cat.id} key={index}>{cat.name}</option>
                      </>
                    );
                  })}
                </>
              ) : (
                ""
              )}
            </select>
          </div>
        </div>
        {errors.category && <p className="error">{errors.category}</p>}
       
        {/* <div className="stockcapa">
          <label>
            Stock Capacity
            <input
              type="number"
              placeholder="Stock Capacity"
              name="stockCapacity"
              value={product.stockCapacity}
              onChange={handleInputChange}
            />
          </label>
          {errors.stockCapacity && (
            <p className="error">{errors.stockCapacity}</p>
          )}
        </div> */}
        {/* {props.guid ? (
          <>
            <table style={{ width: "100%"}}>
          <thead>
            <tr>
              <th>
                Size
              </th>
              <th>
                Quanity
              </th>
              <th>
                Color
              </th>
              <th>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {product.sizes ? (
              <>
              {product.sizes?.map((attr) => {
                return(
                  <>
                   <tr>
                  <td>{attr.size} meter</td>
                  <td>{attr.quantity} pcs</td>
                  <td>< div style={{ background: attr.color}}>&nbsp;</div></td>
                  <td><a href="#" onClick={(e)=>removeAttributes(e,attr.color)}>Delete</a></td>
                </tr>
                  </>
                )
              })}
              </>
            ):(<></>)}
           
          </tbody>
        </table>
          </>
        ):('')} */}
        {/* {product?.sizes.map((size, index) => (
          <div className="sizequntycolr" key={index}>
            <label>Size</label>
            <input
              type="text"
              name="size"
              value={size.size}
              onChange={(e) => handleInputChange(e, index)}
            />
            <label>Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              name="quantity"
              value={size.quantity}
              onChange={(e) => handleInputChange(e, index)}
            />
            <label>Color</label>
            <input
              className="colr"
              value={size.color}
              type="color"
              name="color"
              onChange={(e) => handleInputChange(e, index)}
            />
            {size.color ? (
              <>
                <a href="#" onClick={(e) => removeAttributes(e, size.color)}>
                  Delete
                </a>
              </>
            ) : (
              ""
            )}
          </div>
        ))} */}
        {/* <div className="sizeaddmre">
          <button type="button" onClick={handleAddSize}>
            Add Size
          </button>
          {errors.quantity && <p className="error">{errors.quantity}</p>}
        </div> */}
        <textarea
          placeholder="Description"
          name="description"
          value={product.description}
          onChange={handleInputChange}
        />
        {errors.description && <p className="error">{errors.description}</p>}
        {/* <div className="pricing">
          <h4>Pricings</h4>
          <li onClick={() => setShowContent(!showContent)}>
            Buy it now <img src={Down} />
          </li>
          {showContent && (
            <div className="main-pricng-switcher">
              <div className="firstswitcher">
                <div>Selling Now</div>
                <div>
                  <label className="switch1">
                    <input
                      type="radio"
                      value={isToggled}
                      checked={isToggled}
                      name="sellingAution"
                      onChange={handleToggle}
                    />
                    <span className="slider1 round1"></span>
                  </label>
                </div>
              </div>
              <div className="firstswitcher">
                <div>Auction</div>
                <div>
                  <label className="switch1">
                    <input
                      type="radio"
                      name="sellingAution"
                      value={auctions}
                      onChange={handleAuctions}
                    />
                    <span className="slider1 round1"></span>
                  </label>
                </div>
              </div>
            </div>
          )}
          {errors.buyitnow && <p className="error">{errors.buyitnow}</p>}
        </div> */}
        <div className="listschedule1">
          <div>Sell it Now</div>
          <div>
            <label className="switch3">
              <input
                type="radio"
                value={product.sellingNow}
                checked={buyNow}
                name="sellingAution"
                onChange={handleBuynow}
              />
              <span className="slider3 round3"></span>
            </label>
          </div>
        </div>

        <div className="listschedule1">
          <div>Auction</div>
          <div>
            <label className="switch3">
              <input
                type="radio"
                name="sellingAution"
                value={auctions}
                checked={auctions}
                onChange={handleAuctions}
              />
              <span className="slider3 round3"></span>
            </label>
          </div>
        </div>
        {auctions ? (
          <>
            <div className="set-price">
              <div>Starting Bit</div>
              <div>
                <input
                  type="number"
                  min="1"
                  placeholder="$"
                  name={bids}
                  value={product.bids}
                  onChange={handleBitChange}
                />
              </div>
            </div>
            <div className="delivery-company">
              <div>Durations</div>
              <div>
                <input
                    type="number"
                    min="1"
                    placeholder="$"
                    name={durations}
                    value={product.durations}
                    onChange={handleDurations}
                  />
              </div>
            </div>
            <div className="delivery-company">
              <div>Hours</div>
              <div>
              <select
                  name={product.hours}
                  value={product.hours}
                  onChange={handleHours}
                >
                  <option value="0">Select Hours</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="1">12</option>
                </select>
              </div>
            </div>
            {/* <div className="set-price">
              <div>Schedule your Listing Start Time</div>
              <div>
              <input
                  type="datetime-local"
                  name={product.auctionListing}
                  value={auctionstartDate}
                  onChange={(e) =>
                    handleAuctionStartDate(e)
                  }
                /> */}
                {/* <DatePicker
                  selected={auctionstartDate}
                  minDate={new Date()}
                  onChange={(date) => handleAuctionStartDate(date)}
                /> */}
                {/* <label className="switch2">
              <input
                type="checkbox"
                checked={listing}
                value={listing}
                onChange={handleLisitng}
              />
              <span className="slider2 round2"></span>
            </label> */}
              {/* </div>
            </div> */}
            {/* {errors.listing && <p className="error">{errors.listing}</p>} */}
            {/* <div className="set-price">
              <div>Schedule your Listing End Time</div>
              <div>
                <input
                  type="datetime-local"
                  name={product.auctionEndListing}
                  value={auctionEndDate}
                  onChange={(e) =>
                    handleAuctionEndDate(e)
                  }
                />
              </div>
            </div>
            {errors.duration && <p className="error">{errors.duration}</p>} */}

          </>
        ) : (
          ""
        )}
        {buyNow ? (
          <>
            <div className="set-price">
              <div>Set Price</div>
              <div>
                <input
                  type="text"
                  placeholder="$"
                  name={product.price}
                  value={product.price}
                  onChange={handlePriceChange}
                />
              </div>
            </div>
            {errors.price && <p className="error">{errors.price}</p>}
            {/* <div className="set-price">
              <div>Set Sales Price</div>
              <div>
                <input
                  type="text"
                  placeholder="$"
                  name={salesprice}
                  value={product.saleprice}
                  onChange={handleSalePriceChange}
                />
              </div>
            </div>
            {errors.saleprice && <p className="error">{errors.saleprice}</p>} */}
            <div className="set-price">
              <div>Minimum Purchase</div>
              <div>
                <input
                  type="text"
                  placeholder="$"
                  name={product.minpurchase}
                  value={product.minpurchase}
                  onChange={handleMinPurchaseChange}
                />
              </div>
            </div>
            {errors.saleprice && <p className="error">{errors.saleprice}</p>}
            <div className="listschedule">
              <div>Schedule your Listing</div>
              <div>
                <DatePicker
                  selected={startDate}
                  minDate={new Date()}
                  onChange={(date) => handleStartDate(date)}
                />
                {/* <label className="switch2">
                <input
                  type="checkbox"
                  checked={listing}
                  value={listing}
                  onChange={handleLisitng}
                />
                <span className="slider2 round2"></span>
              </label> */}
              </div>
            </div>
            {errors.listing && <p className="error">{errors.listing}</p>}
          </>
        ) : (
          ""
        )}
        <h4>TAGS</h4>
        {product?.tags.length > 0 ? (
          <>
            {product?.tags.map((tag, index) => {
              return (
                <>
                  <div className="sizequntycolr" key={index}>
                    <input
                      type="text"
                      name="tags"
                      value={tag}
                      placeholder="Tags"
                      onChange={(e) => handleInputChange(e, index)}
                    />
                    <>
                      <a href="#" onClick={(e) => removeTags(e, tag)}>
                        Delete
                      </a>
                    </>
                  </div>
                </>
              );
            })}
          </>
        ) : (
          ""
        )}
        <div className="sizeaddmre">
          <button type="button" onClick={handleAddTags}>
            Add Tags
          </button>
          {errors.tags && <p className="error">{errors.tags}</p>}
        </div>
        {/* <div className="stockcapa">
          <label>
            <input
              type="text"
              placeholder="Tags"
              name={product.tags}
              value={product.tags}
              onChange={handleTagChange}
            />
          </label>
          <div className="sizeaddmre">
              <button type="button" onClick={handleAddSize}>
                Add tags
              </button>
            </div>
        </div> */}
        {/* {errors.buyitnow && <p className="error">{errors.buyitnow}</p>} */}
        <div className="pricing">
          <h4>SHIPPING</h4>
          <div className="listschedule1">
            <div>Deliver Domestically</div>
            <div>
              <label className="switch3">
                <input
                  type="radio"
                  value={product.deliverddomestic}
                  checked={domestic}
                  name="deliver"
                  onChange={handleDomestic}
                />
                <span className="slider3 round3"></span>
              </label>
            </div>
          </div>
          <div className="listschedule1">
            <div>Deliver Internationally</div>
            <label className="switch3">
              <input
                type="radio"
                name="deliver"
                value={product.deliverdinternational}
                checked={international}
                onChange={handleInternational}
              />
              <span className="slider3 round3"></span>
            </label>
          </div>
        </div>
        {errors.deliverdomestically && (
          <p className="error">{errors.deliverdomestically}</p>
        )}
        <div className="delivery-company">
          <div>Select Delivery Company</div>
          <div>
            <select
              name={deliverCompany}
              checked={deliverCompany}
              value={product.deliverycompany}
              onChange={handleDeliverCompany}
            >
              <option value="">Select Delivery Company</option>
              {deliveryCompany.length > 0 ?(<>
                {deliveryCompany.map((company , index) => (
                  <option key={index} value={company.name}>{company.name}</option>
                ))}
              </>):(
                <></>
              )}
            </select>
          </div>
        </div>
        {errors.deliverycompany && (
          <p className="error">{errors.deliverycompany}</p>
        )}
        
        <div className="delivery-company">
        <label>
            Enter your street Address
            {props.guid ? (<>
              {editaddress ? (<>
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
                  </>)
                    :(<>
                      <lable className="form-control" style={{ height: "150px"}}>
                      {address}
                      </lable>
                      

                    </>)}  <a href="#" onClick={handleAddAddress}>Edit Address</a></>):(<>{isLoaded
                      &&
                      <StandaloneSearchBox
                        onLoad={ref => inputRef.current = ref}
                        onPlacesChanged={handlePlaceChanged}
                      >
                       
                        <input
                            type="text"
                        />
                    </StandaloneSearchBox>}</>)}
            
          </label>
        
                     
        </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="delivery-company">
                <label className="switch3">
                  {state}
                </label>
              </div>
              {errors.states && <p className="error">{errors.states}</p>}
            </div>
            <div className="col-lg-4">
              <div className="delivery-company">
                <label className="switch3">
                {city}
                </label>
              </div>
              {errors.city && <p className="error">{errors.city}</p>}
            </div>
            <div className="col-lg-4">
              <div className="delivery-company">
                {zip}
              </div>
              {errors.city && <p className="error">{errors.city}</p>}
            </div>
          </div>
       
        <div className="set-price">
          <div>Shipping Price</div>
          <div>
            <input
              type="text"
              placeholder="$"
              name={shippingprices}
              value={product.shippingprice}
              onChange={handleShippingPriceChanges}
            />
          </div>
        </div>
        {errors.shippingprice && (
          <p className="error">{errors.shippingprice}</p>
        )}
        {/* Add the Shipping Duration inputs */}
        <div className="delivery-company">
          <div>Shipping Duration</div>
            <select
              name={product.shipingdurations}
              value={product.shipingdurations}
              onChange={handleDurationChange}
              >
              <option>Select Duration</option>
              <option value="7-10 Days">7-10 Days</option>
            </select>
            
            {/* <div>
              <input
                type="date"
                placeholder="From"
                value={shippingStart}
                onChange={handleShippingStartChange}
              />
            </div> */}
            {/* <div>
              <span>-</span>
            </div> */}
            {/* <div>
              <input
                type="date"
                placeholder="To"
                value={shippingEnd}
                onChange={handleShippingEndChange}
              />
            </div> */}
        </div>
        {errors.durations && (
          <p className="error">{errors.durations}</p>
        )}
        
        <div className="set-price">
          <div>Return Shipping Price</div>
          <div>
            <input
              type="text"
              placeholder="$"
              value={product.returnshippingprice}
              onChange={handleRefundprice}
            />
          </div>
        </div>
        {errors.returnshippingprice && (
          <p className="error">{errors.returnshippingprice}</p>
        )}
        <div className="set-price">
          <div>Return Duration limit</div>
          <div>
            <input
              type="text"
              placeholder="0 Days"
              value={product.returndurationlimit}
              onChange={handleReturnLimit}
            />
          </div>
        </div>
        {errors.returndurationlimit && (
          <p className="error">{errors.returndurationlimit}</p>
        )}
        <div className="delivery-company">
          <div>Return shipping price paid by</div>
          <div>
            <select
              value={product.returnshippingpaidby}
              onChange={handleReturnPaidBy}
            >
              <option value="">Select Paid By</option>
              {paidBy.map((paid ,index) => (
                <option key={index} value={paid.id}>
                  {paid.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {errors.returnshippingpaidby && (
          <p className="error">{errors.returnshippingpaidby}</p>
        )}
        {/* <div className="delivery-company">
          <div>Return Shipping Location</div>
          <div>
          
            
          </div>
        </div> */}
        {/* {errors.returnshippinglocation && (
          <p className="error">{errors.returnshippinglocation}</p>
        )} */}
        <div className="row actvtebuttns">
          <div className="col-lg-6">
            {props.guid ? (
              <>
                <Link
                  to={`/singleproduct/${props.guid}`}
                  style={{ textDecoration: "none" }}
                >
                  <button
                    className="btn1"
                    type="button"
                    style={{ marginTop: "10px" }}
                  >
                    Preview Product
                  </button>
                </Link>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="col-lg-6">
            {/* <button className="btn2" onClick={handleActivateProduct} type="submit" style={{ marginTop: "10px" }}>
         Activate Product
          </button> */}
            {/* <button
              type="submit"
              className="btn2"
              style={{ marginTop: "10px" }}
            >
              Activate Product
            </button> */}
            {props.guid ? (
              <>
                <input
                  type="hidden"
                  name={product.action}
                  id="action"
                  value="edit"
                />
                {/* <button className="btn2" style={{ marginTop: "10px" }}  type="submit">
                  Update Product
                </button> */}
                <button
                  className="btn2"
                  style={{ marginTop: "10px" }}
                  disabled={enabled}
                  type="submit"
                >
                  {isLoading ? "loading.." : "Update Product"}
                </button>
              </>
            ) : (
              <>
                <input
                  type="hidden"
                  s
                  name={product.action}
                  id="action"
                  value="add"
                />
                {/* <button className="btn2" style={{ marginTop: "10px" }}  type="submit">
                  Activate Product
                </button> */}
                <button
                  className="btn2"
                  style={{ marginTop: "10px" }}
                  disabled={enabled}
                  type="submit"
                >
                  {isLoading ? "loading.." : "Activate Product"}
                </button>
              </>
            )}
          </div>
        </div>
        <div className="popup">
          {/* Popup for successful product activation */}
          {showPopup && (
            <div className="listing-activated">
              <div className="innerlisting-activated">
                <img src={Checkimg} />
                <h2>Product Listed Successfully</h2>
                <p>We hope you enjoy selling on our platform</p>
                <button onClick={() => setShowPopup(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
        <div className="popup">
          {/* Popup for successful product activation */}
          {showEditPopup && (
            <div className="listing-activated">
              <div className="innerlisting-activated">
                <img src={Checkimg} />
                <h2>Product Updated Successfully</h2>
                <p>We hope you enjoy selling on our platform</p>
                <button onClick={() => setShowPopup(false)}>Close</button>
              </div>
            </div>
          )}
        </div>
      </form>
    </section>
  );
};

export default ListingForm;
