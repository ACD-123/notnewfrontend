import React, { useState, useEffect, useRef } from "react";
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
import ReturnShipping from "./ReturnShipping"; //~/services/API/Home
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { toast } from "react-toastify";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { PRODUCT_ID } from "../../../services/Constant";
import { Spinner } from "react-bootstrap";
import Select from 'react-select';
import { MdDelete } from "react-icons/md";

const libraries = ["places"];

const ListingForm = ({ setSubmitted, props }) => {

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
  const [attributes, setAttribnutes] = useState([]);
  // const [addresses, setAddress] = useState("");
  const [product, setProduct] = useState({
    images: [],
    condition: "",
    title: "",
    model: "",
    category: "",
    brand: "",
    stockCapacity: 0,
    attributes: [],
    tags: [{ tag: "" }],
    availableColors: [],
    description: "",
    sellingNow: false,
    price: '',
    saleprice: '',
    minpurchase: 1,
    listing: "",
    auctions: false,
    bids: '',
    durations: '1',
    auctionListing: "",
    auctionEndListing: "",
    deliverddomestic: false,
    deliverdinternational: false,
    deliverycompany: "",
    // tags: [],
    country: "",
    state: "",
    city: "",
    locations: [],
    shippingprice: "",
    shippingstart: "",
    shippingend: "",
    returnshippingprice: "",
    returndurationlimit: "",
    returnshippingpaidby: "",
    returnshippinglocation: "",
    hours: "",
    action: "add",
  });
  let imagesFiles = [];
  let loggedInUser = localStorage.getItem("user_details");
  const loggedInUsers = JSON.parse(loggedInUser);

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

    // Your existing code for handling the product activation goes here
    console.log("Submitted product:", product);

    // Show the popup after activating the product
    // setShowPopup(true);
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

  const handleDurations = (e) => {
    // durations
    setDurations(e.target.value);
    product.durations = e.target.value;
  };

  const handleHours = (e) => {
    product.hours = e.target.value;
    setHours(e.target.value);
  };

  const handleAuctionStartDate = (e) => {
    product.auctionListing = e.target.value;
    // product.auctionListing = moment(date).format("DD-MM-YYYY");
    setAuctionStartDate(e.target.value);
  };

  const handleAuctionEndDate = (e) => {
    product.auctionEndListing = e.target.value;
    // product.auctionEndListing = moment(date).format("DD-MM-YYYY");
    setAuctionEndDate(e.target.value);
  };

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
    let attribute = localStorage.getItem("attributes");
    localStorage.setItem("attributes", null);
    localStorage.setItem(
      "attributes",
      JSON.stringify([{ attributes: "set Attribute" }])
    );
    localStorage.removeItem("selectedColors");
    localStorage.removeItem("radiogrp");
    localStorage.removeItem("selected");
    localStorage.removeItem("chkgrp");

    product.category = e.target.value;
    setCategory(cat);
    Category.productAttributes(e.target.value)
      .then((res) => {
        setAttribnutes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShop = (e) => {
    product.store = e.target.value;
    setShop(e.target.value);
  };

  const removeAttributes = (e, color) => {
    e.preventDefault();
    product.sizes?.map((attr, index) => {
      if (color === attr.color) {
        product.sizes.splice(index, 1);
        const updatedSizes = [...product.sizes];
        setProduct({ ...product, sizes: updatedSizes });
      } else {
        console.log("color not exists");
      }
      console.log("product.sizes", product.sizes);
    });
  };



  const handleAddAddress = () => {
    setEditAddress(false);
    product.address = address;
  };
  const handleBrands = (e) => {
    setBrand(e.target.value);
    product.brand = e.target.value;
  };
  const handleTagChange = (e, index) => {
    const { name, value } = e.target;
    const newErrors = {};
    if (name === "tag") {
      const updatedTags = [...product.tags];
      updatedTags[index][name] = value;
      setProduct({ ...product, tags: updatedTags });
    }
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newErrors = {};
    setProduct({ ...product, [name]: value });
  };

  const handleRadioChange = (e, index) => {
    const { name, value } = e.target;
    let getItems = JSON.parse(localStorage.getItem("attributes"));
    if (getItems) {
      var i = getItems.length;
      while (i--) {
        if (getItems[i] && getItems[i].hasOwnProperty("radio")) {
          getItems.splice(i, 1);
        }
      }
      let arrayObj = {};
      arrayObj = {
        radio: value,
      };
      let finalArray = [];
      if (getItems) {
        finalArray = getItems;
      }
      finalArray.push(arrayObj);
      localStorage.setItem("attributes", JSON.stringify(finalArray));
    }
  };
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    let getItems = JSON.parse(localStorage.getItem("attributes"));
    if (getItems) {
      var i = getItems.length;
      while (i--) {
        if (getItems[i] && getItems[i].hasOwnProperty("text")) {
          getItems.splice(i, 1);
        }
      }
      let arrayObj = {};
      arrayObj = {
        text: value,
      };
      let finalArray = [];
      if (getItems) {
        finalArray = getItems;
      }
      finalArray.push(arrayObj);
      localStorage.setItem("attributes", JSON.stringify(finalArray));
    }
  };
  const handleColorChange = (e) => {
    const { name, value } = e.target;
    let getColors = JSON.parse(localStorage.getItem("selectedColors"));
    let colors = [];
    if (getColors) {
      colors = getColors;
    }
    colors.push(value);
    localStorage.setItem("selectedColors", JSON.stringify(colors));
    let getFinalColors = JSON.parse(localStorage.getItem("selectedColors"));
    let getAttributes = JSON.parse(localStorage.getItem("attributes"));
    if (getAttributes) {
      var i = getAttributes.length;
      while (i--) {
        if (getAttributes[i] && getAttributes[i].hasOwnProperty("colors")) {
          getAttributes.splice(i, 1);
        }
      }
      let colorObj = {};
      colorObj = {
        colors: getFinalColors,
      };
      let finalArray = [];
      if (getAttributes) {
        finalArray = getAttributes;
      }
      finalArray.push(colorObj);
      localStorage.setItem("attributes", JSON.stringify(finalArray));
    }
  };
  const handleFileChange = (e) => { };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    if (e.target.checked === true) {
      let getItems = JSON.parse(localStorage.getItem("attributes"));
      if (getItems) {
        var i = getItems.length;
        while (i--) {
          if (getItems[i] && getItems[i].hasOwnProperty("checkbox")) {
            getItems.splice(i, 1);
          }
        }
        let arrayObj = {};
        arrayObj = {
          checkbox: value,
        };
        let finalArray = [];
        if (getItems) {
          finalArray = getItems;
        }
        finalArray.push(arrayObj);
        localStorage.setItem("attributes", JSON.stringify(finalArray));
      }
    } else {
      let getItems = JSON.parse(localStorage.getItem("attributes"));
      if (getItems) {
        var i = getItems.length;
        while (i--) {
          if (getItems[i] && getItems[i].hasOwnProperty("checkbox")) {
            getItems.splice(i, 1);
          }
        }
        localStorage.setItem("attributes", JSON.stringify(getItems));
      }
    }
  };
  const handleCheckboxGrpChange = (e) => {
    const { name, value } = e.target;
    let getChkGrp = JSON.parse(localStorage.getItem("chkgrp"));
    let chkgrp = [];
    if (getChkGrp) {
      chkgrp = getChkGrp;
    }
    chkgrp.push(value);
    let chkgrped = chkgrp.filter(
      (value, index) => chkgrp.indexOf(value) === index
    );
    localStorage.setItem("chkgrp", JSON.stringify(chkgrped));
    let getFinalChkGrp = JSON.parse(localStorage.getItem("chkgrp"));
    let getAttributes = JSON.parse(localStorage.getItem("attributes"));
    if (getAttributes) {
      var i = getAttributes.length;
      while (i--) {
        if (
          getAttributes[i] &&
          getAttributes[i].hasOwnProperty("checkboxgroup")
        ) {
          getAttributes.splice(i, 1);
        }
      }
      let chkgrpObj = {};
      chkgrpObj = {
        checkboxgroup: getFinalChkGrp,
      };
      let finalArray = [];
      if (getAttributes) {
        finalArray = getAttributes;
      }
      finalArray.push(chkgrpObj);

      localStorage.setItem("attributes", JSON.stringify(finalArray));
    }
  };
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    let getSelected = JSON.parse(localStorage.getItem("selected"));
    let select = [];
    if (getSelected) {
      select = getSelected;
    }
    select.push(value);
    let selected = select.filter(
      (value, index) => select.indexOf(value) === index
    );
    localStorage.setItem("selected", JSON.stringify(selected));
    let getFinalSelect = JSON.parse(localStorage.getItem("selected"));
    let getAttributes = JSON.parse(localStorage.getItem("attributes"));
    if (getAttributes) {
      var i = getAttributes.length;
      while (i--) {
        if (getAttributes[i] && getAttributes[i].hasOwnProperty("selected")) {
          getAttributes.splice(i, 1);
        }
      }
      let selectObj = {};
      selectObj = {
        select: getFinalSelect,
      };
      let finalArray = [];
      if (getAttributes) {
        finalArray = getAttributes;
      }
      finalArray.push(selectObj);
      localStorage.setItem("attributes", JSON.stringify(finalArray));
    }
  };
  const handleRadioGrpChange = (e) => {
    const { name, value } = e.target;
    let getRadioGrp = JSON.parse(localStorage.getItem("radiogrp"));
    let radiogrp = [];
    if (getRadioGrp) {
      radiogrp = getRadioGrp;
    }
    radiogrp.push(value);
    let radiogrped = radiogrp.filter(
      (value, index) => radiogrp.indexOf(value) === index
    );
    localStorage.setItem("radiogrp", JSON.stringify(radiogrped));
    let getFinalRadiogGrp = JSON.parse(localStorage.getItem("radiogrp"));
    let getAttributes = JSON.parse(localStorage.getItem("attributes"));
    if (getAttributes) {
      var i = getAttributes.length;
      while (i--) {
        if (getAttributes[i] && getAttributes[i].hasOwnProperty("radiogrp")) {
          getAttributes.splice(i, 1);
        }
      }
      let radiogrpObj = {};
      radiogrpObj = {
        radiogrp: getFinalRadiogGrp,
      };
      let finalArray = [];
      if (getAttributes) {
        finalArray = getAttributes;
      }
      finalArray.push(radiogrpObj);
      localStorage.setItem("attributes", JSON.stringify(finalArray));
    }
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
      newErrors.editimages = "You can not upload more than 5 images";
      setErrors(newErrors);
    } else {
      const newBlob = URL.createObjectURL(e.target.files[0]);
      const updatedEditBlobs = [...editBlobs];
      updatedEditBlobs[ImageBitmapRenderingContext] = newBlob; // Replace the image at the specified index
      setEditBolbs(updatedEditBlobs);
    }
    if (files.length > 4) {
      //
    } else {
      setFiles([...files, e.target.files]);
    }
  };
  const handleImageUpload = (e) => {
    const newBlobs = [];
    const newFiles = [];

    // Loop through each uploaded file
    for (let i = 0; i < e.target.files.length; i++) {
      // Check if the total number of images exceeds the limit
      if (blobs.length + newBlobs.length >= 5) {
        const newErrors = {};
        newErrors.images = "You can not upload more than 5 images";
        setErrors(newErrors);
        break; // Exit loop if the limit is reached
      } else {
        // Add the new blob and file to their respective arrays
        newBlobs.push(URL.createObjectURL(e.target.files[i]));
        newFiles.push(e.target.files[i]);
      }
    }

    // Update state with the new blobs and files
    setBolbs([...blobs, ...newBlobs]);
    setFiles([...files, ...newFiles]);
  };
  const handleAddTags = () => {
    setProduct({
      ...product,
      tags: [...product.tags, { tag: "" }],
    });
    return;
  };
  const removeTags = (e, index) => {
    e.preventDefault();
    const updatedTags = [...product.tags];
    updatedTags.splice(index, 1);
    setProduct({ ...product, tags: updatedTags });
  };
  const handleCountryChange = (e) => {
    product.country = e.target.value;
    State.get(e.target.value)
      .then((response) => {
        setState(response);
      })
      .catch((e) => {
        toast.error(e.message);
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
    if (!product.description) {
      newErrors.description = "Description is required";
    }
    if (!product.deliverycompany) {
      newErrors.deliverycompany = "Deliver Company is required";
    }
    if (!product.shippingprice) {
      newErrors.shippingprice = "Shipping Price is required";
    }
    if (!product.returnshippingpaidby) {
      newErrors.returnshippingpaidby = "Shipping Paid By is required";
    }
    if (!product.tags || product.tags.length == 0) {
      newErrors.tags = "Please Enter Tags";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setEnabled(true);
      if (props?.guid) {
        product.country = country;
        product.city = city;
        product.state = state;
        product.brand = brand;
        product.zip = zip;
        // console.log('product', product)
        const fD = new FormData();
        fD.append("title", product.title);
        fD.append("condition", localStorage.getItem("product_condition"));
        fD.append("model", product.model);
        fD.append("category", product.category);
        fD.append("brand_id", product.brand);
        fD.append("stockCapacity", product.stockCapacity);
        fD.append("sizes", JSON.stringify(product.sizes));
        fD.append("availableColors", product.availableColors);
        fD.append("description", product.description);
        fD.append("sellingNow", product.sellingNow);
        fD.append("price", product.price);
        fD.append("saleprice", product.saleprice);
        fD.append("minpurchase", product.minpurchase);
        fD.append("listing", product.listing);
        fD.append("auctioned", product.auctions);
        fD.append("bids", product.bids);
        fD.append("shipingdurations", product.shipingdurations);
        fD.append("durations", product.shipingdurations);
        fD.append("hours", product.hours);
        fD.append("auctionListing", product.auctionListing);
        fD.append("auctionEndListing", product.auctionEndListing);
        fD.append("deliverddomestic", product.deliverddomestic);
        fD.append("tags", JSON.stringify(product.tags));
        fD.append("deliverdinternational", product.deliverdinternational);
        fD.append("deliverycompany", product.deliverycompany);
        fD.append("country", product.country);
        fD.append("city", product.city);
        fD.append("state", product.state);
        fD.append("zip", product.zip);
        fD.append("address", address);
        fD.append("shippingprice", product.shippingprice);
        fD.append("shippingstart", product.shippingstart);
        fD.append("shippingend", product.shippingend);
        fD.append("returnshippingprice", product.returnshippingprice);
        fD.append("returndurationlimit", product.returndurationlimit);
        fD.append("returnshippingpaidby", product.returnshippingpaidby);
        fD.append("termsdescription", "termsdescription");
        let getAttributes = localStorage.getItem("attributes");
        if (getAttributes) {
          fD.append("attributes", localStorage.getItem("attributes"));
        } else {
          fD.append(
            "attributes",
            JSON.stringify([{ attributes: "No Atributes" }])
          );
        }
        fD.append("returnshippinglocation", product.returnshippinglocation);
        /**
         * For Images Uploads Start
         */
        files.forEach((image_file) => {
          fD.append("file[]", image_file);
        });
        for (let pair of fD.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        };
        axios
          .post(`http://localhost:8000/api/products/${props?.guid}`, fD, config)
          .then((response) => {
            setShowEditPopup(true);
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
            console.log(error);
          });
      } else {
        product.country = country;
        product.city = city;
        product.state = state;
        product.brand = brand;
        product.zip = zip;
        // console.log('product', product)
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
        formData.append("auctioned", product.auctions);
        formData.append("bids", product.bids);
        formData.append("shipingdurations", product.shipingdurations);
        formData.append("durations", product.shipingdurations);
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
        formData.append("zip", product.zip);
        formData.append("address", address);
        formData.append("shippingprice", product.shippingprice);
        formData.append("shippingstart", product.shippingstart);
        formData.append("shippingend", product.shippingend);
        formData.append("returnshippingprice", product.returnshippingprice);
        formData.append("returndurationlimit", product.returndurationlimit);
        formData.append("returnshippingpaidby", product.returnshippingpaidby);
        formData.append("termsdescription", "termsdescription");
        let getAttributes = localStorage.getItem("attributes");
        if (getAttributes) {
          formData.append("attributes", localStorage.getItem("attributes"));
        } else {
          formData.append(
            "attributes",
            JSON.stringify([{ attributes: "No Atributes" }])
          );
        }
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
        for (let pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        };
        axios
          .post("http://localhost:8000/api/products/add", formData, config)
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
            console.log(error);
          });
      }
    }
    // console.log("Submitted product:", product);
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

  const paidBy = [
    { id: "buyer", name: "Buyer" },
    { id: "seller", name: "Seller" },
    { id: "admin", name: "Admin" },
  ];

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

  const fetchCountries = () => {
    CountryServices.all()
      .then((response) => {
        setCountry(response);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  const handleStateChange = (e) => {
    product.state = e.target.value;
    City.get(e.target.value)
      .then((response) => {
        setCities(response);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  const fetchStores = () => {
    SellerServices.getStore(loggedInUsers?.id)
      .then((response) => {
        if (response.status) {
          setShops(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getProduct = () => {
    if (props?.guid) {
      product.action = "edit";
    }
    setEditProduct(true);
    setIsLoading(true);
    ProductServices.get(props?.guid).then((response) => {
      // console.log("edit product", response);
      setCategory(response.category_id);
      let productData = {
        store: response.shop_id,
        shopid: response.shop_id,
        images: [],
        scheduled: false,
        condition: response.condition,
        title: response.name,
        model: response.model,
        category: response.category_id,
        brand: response.brand_id,
        stockCapacity: response.stockcapacity ? response.stockcapacity : 0,
        sizes: JSON.parse(response.attributes),
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
        bids: response.bids,
        duration: response.durations,
        minpurchase: response.min_purchase,
        shipingdurations: response.shiping_durations,
        action: "edit",
      };
      localStorage.setItem("product_condition", response.condition);
      setAddress(response.postal_address);
      setState(response.state);
      setCity(response.city);
      setZip(response.zip);
      setBrand(response.brand_id);
      setProduct(productData);
      setIsLoading(false);
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
      setDeliverCompany(response.delivery_company);
      // setAuctionStartDate(moment(response.auction_listing).format("YYYY-MM-DD"))
      setShippingLocation(response.return_ship_location);
      let startDate = moment(response.shipping_start).format("YYYY-MM-DD");
      let endDate = moment(response.shipping_end).format("YYYY-MM-DD");
      setShippingStart(startDate);
      setShippingEnd(endDate);
      setCondition(response.condition);
      // State.get(response.country_id).then((response) => {
      //   setState(response);
      // });
      // City.get(response.state_id).then((response) => {
      //   setCity(response);
      // });
      if (response.media) {
        setBolbs(response.media);
      }
    });
  };

  const removeThumbnail = (e, val) => {
    e.preventDefault();
    const index = blobs.indexOf(val);
    if (index > -1) {
      blobs.splice(index, 1);
    }
    setBolbs([...blobs]);
  };
  const getCompany = () => {
    HomeService.getCompanies()
      .then((res) => {
        if (res.status) {
          setdeliveryCompany(res.data);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    // fetchCategory();
    // fetchCountries();
    // fetchStores();
    getCompany();
    // getBrands();
    // fetchCompanies();
    if (props?.guid) {
      getProduct();
    }
  }, []);

  // Ali monis

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inputError, setInputError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categorieAddons, setCategorieAddons] = useState([]);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDg6Ci3L6yS5YvtKAkWQjnodGUtlNYHw9Y",
    libraries,
  });
  const productCondition = [
    { id: "BrandNew", name: "BrandNew" },
    { id: "Used", name: "Used" },
    { id: "Refurbished", name: "Refurbished" },
    { id: "Vintage", name: "Vintage" },
  ];

  const [productManagment, setProductManagments] = useState({
    file: [],
    condition: "",
    attributes: [],
    termsdescription: "",
    title: "",
    category: null,
    stockCapacity: "",
    brand_id: null,
    model: "",
    description: "",
    tags: ['girls', 'boys'],
    saleprice: "",
    sellingNow: false,
    listing: "",
    price: "",
    minpurchase: "",
    auctioned: false,
    bids: "",
    durations: 0,
    hours: "",
    auctionListing: "",
    end_listing: "",
    deliverddomestic: false,
    deliverdinternational: false,
    deliverycompany: "asd",
    address: "",
    latitude: "",
    longitude: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    shippingprice: "",
    shipingdurations: "",
    returnshippingprice: "",
    returndurationlimit: "",
    returnshippingpaidby: "",
    returnshippinglocation: "asds",
    returncountry: "asdasd",
    returnstate: "returnstate",
    returncity: "dsasd",
    returnzip: "000",
    weight: "12.0",
    height: "200.0",
    length: "2",
    width: "1.00"
  })



  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageFileChange = (e) => {
    const maxAllowedFiles = 5;
    const selectedFiles = Array.from(e.target.files);

    setProductManagments(prev => ({ ...prev, file: [...prev.file, ...selectedFiles] }));
  };

  const handleDeleteImage = (index) => {
    const updatedFiles = [...productManagment.file];
    updatedFiles.splice(index, 1);
    setProductManagments(prev => ({ ...prev, file: updatedFiles }));
  };

  const fetchCategory = () => {
    Category.all()
      .then((response) => {
        console.log(response, 'category');
        let tempCategoryArray = []
        for (let i = 0; i < response.length; i++) {
          tempCategoryArray.push({ value: response[i].id, label: response[i].name })
        }
        setCategories(tempCategoryArray);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const getBrands = () => {
    HomeService.getbrands()
      .then((response) => {
        console.log(response, 'category');
        let tempCategoryArray = []
        for (let i = 0; i < response.length; i++) {
          tempCategoryArray.push({ value: response[i].id, label: response[i].name })
        }
        setBrands(tempCategoryArray);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const handelCategoryChange = (data) => {
    setProductManagments({ ...productManagment, category: data, selectToSend: [] }); // Initialize selectToSend as an empty array
    Category.productAttributes(data.value)
      .then((res) => {
        console.log(res?.data?.length, 'setAttribnutes');
        if (res?.data?.length > 0) {
          const categoryAddons = res?.data?.map(category => ({
            name: category.key,
            selected: null,
            options: category.options.map((option, index) => ({
              value: index + 1,
              label: option
            })),
            selectToSend: [] // Initialize selectToSend inside categoryAddons as an empty array
          }));
          setProductManagments(prev => ({ ...prev, attributes: categoryAddons }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handelAddonsChange = (e, data, index) => {
    console.log(e, data);
    const updatedArray = [...productManagment.attributes];
    // Create an array of e.label values
    const labelsArray = e.map(option => option.label);

    updatedArray[index] = {
      name: data.name,
      selected: e,
      options: data?.options,
      selectToSend: labelsArray // Array of e.label values
    };

    setProductManagments(prev => ({ ...prev, attributes: updatedArray }));
    // setCategorieAddons(updatedArray)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(checked, 'checked');
    if (type === 'checkbox') {
      setProductManagments(prev => ({ ...prev, [name]: checked }));
    } else {
      setProductManagments(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      setProductManagments(prev => ({
        ...prev,
        address: place.formatted_address,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      }));
      let political, administrative_area_level_1, postalCode;

      for (let i = 0; i < place.address_components.length; i++) {
        const component = place.address_components[i];
        for (let j = 0; j < component.types.length; j++) {
          if (component.types[j] === 'country') {
            political = component.long_name;
          } else if (component.types[j] === 'administrative_area_level_1') {
            administrative_area_level_1 = component.long_name;
          } else if (component.types[j] === 'postal_code') {
            postalCode = component.long_name;
          }
        }
      }
      setProductManagments(prev => ({
        ...prev,
        country: political,
        state: administrative_area_level_1,
        city: place.name,
        zip: postalCode,
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setInputError(true)
    console.log(productManagment, 'productManagment');
    if (productManagment.file.length === 0 || productManagment.condition === "" || productManagment.attributes.length === 0 ||
      productManagment.category === null || productManagment.stockCapacity === "" || productManagment.brand_id === null ||
      productManagment.model === "" || productManagment.description === "" || productManagment.address === "" ||
      productManagment.latitude === "" || productManagment.longitude === "" || productManagment.country === "" ||
      productManagment.state === "" || productManagment.city === "" || productManagment.zip === "" ||
      productManagment.shippingprice === "" || productManagment.shippingprice === 0 || productManagment.shipingdurations === "" ||
      productManagment.shipingdurations === 0 || productManagment.returnshippingprice === "" || productManagment.returnshippingprice === 0 ||
      productManagment.returndurationlimit === "" || productManagment.returndurationlimit === 0 || productManagment.returnshippingpaidby === "" ||
      productManagment.returnshippingpaidby === 0) {
      return false;
    }

    // SellingNow specific validations
    if (productManagment.sellingNow) {
      if (productManagment.saleprice === "" || productManagment.saleprice === 0 || productManagment.saleprice < 0 ||
        productManagment.price === "" || productManagment.price === 0 || productManagment.price < 0 ||
        productManagment.minpurchase === "" || productManagment.minpurchase === 0 || productManagment.minpurchase < 0 ||
        productManagment.listing === "") {
        return false;
      }
    }

    // Auctioned specific validations
    if (productManagment.auctioned) {
      if (productManagment.bids === "" || productManagment.bids === 0 || productManagment.bids < 0 ||
        productManagment.durations === "" || productManagment.durations === 0 || productManagment.durations < 0 ||
        productManagment.hours === "" || productManagment.hours === 0 || productManagment.hours < 0 ||
        productManagment.auctionListing === "" || productManagment.end_listing === "") {
        return false;
      }
    }


    // deliverddomestic: false,
    // deliverdinternational: false,


    const formData = new FormData();
    productManagment.file.forEach((image_file) => {
      formData.append("file[]", image_file);
    });
    formData.append("condition", productManagment.condition);
    if (productManagment?.attributes?.length > 0) {
      let attributes = [];
      for (let i = 0; i < productManagment?.attributes?.length; i++) {
        for (let j = 0; j < productManagment.attributes[i].selectToSend.length; j++) {
          attributes.push({ key: productManagment.attributes[i].name, value: productManagment.attributes[i].selectToSend[j] })
        }
      }
      formData.append('attributes', JSON.stringify(attributes));
    }
    formData.append("termsdescription", productManagment.termsdescription);
    formData.append("title", productManagment.title);
    formData.append("category", productManagment?.category?.value);
    formData.append("stockCapacity", productManagment.stockCapacity);
    formData.append("brand_id", productManagment.brand_id?.value);
    formData.append("model", productManagment.model);
    formData.append("description", productManagment.description);
    formData.append("tags", JSON.stringify(productManagment.tags));
    formData.append("saleprice", productManagment.saleprice);
    formData.append("sellingNow", productManagment.sellingNow);
    formData.append("listing", productManagment.listing);
    formData.append("price", productManagment.price);
    formData.append("minpurchase", productManagment.minpurchase);
    formData.append("auctioned", productManagment.auctioned);
    formData.append("bids", productManagment.bids);
    formData.append("durations", productManagment.durations);
    formData.append("hours", productManagment.hours);
    formData.append("auctionListing", productManagment.auctionListing);
    formData.append("end_listing", productManagment.end_listing);
    formData.append("deliverddomestic", productManagment.deliverddomestic);
    formData.append("deliverdinternational", productManagment.deliverdinternational);
    formData.append("deliverycompany", productManagment.deliverycompany);
    formData.append("address", productManagment.address);
    formData.append("latitude", productManagment.latitude);
    formData.append("longitude", productManagment.longitude);
    formData.append("country", productManagment.country);
    formData.append("state", productManagment.state);
    formData.append("city", productManagment.city);
    formData.append("zip", productManagment.zip);
    formData.append("shippingprice", productManagment.shippingprice);
    formData.append("shipingdurations", productManagment.shipingdurations);
    formData.append("returnshippingprice", productManagment.returnshippingprice);
    formData.append("returndurationlimit", productManagment.returndurationlimit);
    formData.append("returnshippingpaidby", productManagment.returnshippingpaidby);
    formData.append("returnshippinglocation", productManagment.returnshippinglocation);
    formData.append("returncountry", productManagment.returncountry);
    formData.append("returnstate", productManagment.returnstate);
    formData.append("returncity", productManagment.returncity);
    formData.append("returnzip", productManagment.returnzip);
    formData.append("weight", productManagment.weight);
    formData.append("height", productManagment.height);
    formData.append("length", productManagment.length);
    formData.append("width", productManagment.width);

    ProductServices.createSellerProduct(formData)
      .then((res) => {
        console.log(res, 'setAttribnutes');
        setSubmitted()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchCategory()
    getBrands()
  }, [])


  return (
    <section id="listing-creating-form">
      {isLoading ? (
        <div className="loader-container text-center">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : (
        <>
          <form onSubmit={handleFormSubmit} className="p-m-f">
            <div className="t-p-m">
              Describe Your Product
            </div>
            <div className="p-m-p-c">
              <h3>Select condition of your item</h3>
              <h4>This book is a treatise on the theory of ethics, very popular during the Renaissance. </h4>
              <ul>
                {productCondition?.map((data, index) => {
                  return (
                    <li key={index} onClick={() => { setProductManagments((prev) => ({ ...prev, condition: data.id })) }}>
                      <div className={`check ${productManagment?.condition === data.name ? 'active' : ''}`}>
                        <div className="check-wrap"></div>
                      </div>
                      <p className={`${productManagment?.condition === data.name ? 'active' : ''}`}>{data.name}</p>
                    </li>
                  )
                })}
              </ul>
              {inputError && productManagment.condition === '' && <div className="error-input">condition is required</div>}

            </div>
            <div className="p-m-i-u">
              <div className="p-m-i-u-wrap">
                <div className="upload-box" onClick={handleUploadClick}>
                  <svg width="96" height="97" viewBox="0 0 96 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.8004 48.4615H66.1696M47.985 66.6462V30.2769M47.985 93.9231C72.9888 93.9231 93.4465 73.4654 93.4465 48.4615C93.4465 23.4577 72.9888 3 47.985 3C22.9811 3 2.52344 23.4577 2.52344 48.4615C2.52344 73.4654 22.9811 93.9231 47.985 93.9231Z" stroke="#BBBBBB" stroke-width="4.54615" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span>Click here to upload images</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageFileChange}
                    multiple  // Enable multiple file selection
                  />
                </div>
              </div>
              {productManagment.file.length === 0 && inputError && <div className="error-input">Atleast  one image is required</div>}
              <p>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.39744 6.53134H10.2635V4.66524H8.39744M9.33048 16.7949C5.21574 16.7949 1.8661 13.4452 1.8661 9.33048C1.8661 5.21574 5.21574 1.8661 9.33048 1.8661C13.4452 1.8661 16.7949 5.21574 16.7949 9.33048C16.7949 13.4452 13.4452 16.7949 9.33048 16.7949ZM9.33048 0C8.10519 0 6.89189 0.24134 5.75986 0.710241C4.62784 1.17914 3.59925 1.86642 2.73284 2.73284C0.98303 4.48264 0 6.85589 0 9.33048C0 11.8051 0.98303 14.1783 2.73284 15.9281C3.59925 16.7945 4.62784 17.4818 5.75986 17.9507C6.89189 18.4196 8.10519 18.661 9.33048 18.661C11.8051 18.661 14.1783 17.6779 15.9281 15.9281C17.6779 14.1783 18.661 11.8051 18.661 9.33048C18.661 8.10519 18.4196 6.89189 17.9507 5.75986C17.4818 4.62784 16.7945 3.59925 15.9281 2.73284C15.0617 1.86642 14.0331 1.17914 12.9011 0.710241C11.7691 0.24134 10.5558 0 9.33048 0ZM8.39744 13.9957H10.2635V8.39744H8.39744V13.9957Z" fill="#989595" />
                </svg>
                Add minimum 5 images covering all angles of the item that describes well
              </p>
              {productManagment.file.length > 0 ?
                <div className="selected-images">
                  <div className="row">
                    {productManagment.file.map((image, index) => {
                      return (
                        <div className="col-lg-2">
                          <div className="selected-images-box" key={index}>
                            <img src={URL.createObjectURL(image)} alt="" />
                            <span onClick={() => { handleDeleteImage(index) }}><MdDelete /></span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                : null}

            </div>
            <div className="p-m-i-s">
              <div className="title-line">
                <h2>Product specifics</h2>
                <div></div>
              </div>
              <div className="two-field">
                <div className="two-field-left">
                  <label>Product title</label>
                  <input type="text" name="title" value={productManagment?.title} onChange={handleChange} placeholder="Enter product title" />
                  {productManagment.title === '' && inputError &&
                    <div className="error-input">Product title is required</div>
                  }
                </div>
                <div className="two-field-left">
                  <label>Category</label>
                  <Select
                    defaultValue={productManagment?.category}
                    onChange={handelCategoryChange}
                    options={categories}
                    placeholder={'Select category'}
                  />
                  {productManagment.category === null && inputError &&
                    <div className="error-input">Category is required</div>
                  }
                </div>
              </div>
              {productManagment?.attributes?.length > 0 ?
                <div className="two-field">
                  {productManagment?.attributes?.map((data, index) => {
                    return (
                      <>
                        <div className="two-field-left">
                          <label htmlFor="Price">{data?.name}</label>
                          <Select
                            defaultValue={data?.selected}
                            onChange={(e) => { handelAddonsChange(e, data, index) }}
                            options={data?.options}
                            placeholder={`Select ${data?.name}`}
                            isMulti={true}
                          />
                          {productManagment?.attributes?.[index]?.selectToSend?.length === 0 && inputError &&
                            <div className="error-input">{data?.name} is required</div>
                          }
                        </div>
                      </>
                    )
                  })}
                </div>
                : null}
              <div className="two-field">
                <div className="two-field-left">
                  <label>Brand</label>
                  <Select
                    defaultValue={productManagment.brand_id}
                    onChange={(e) => { setProductManagments({ ...productManagment, brand_id: e }) }}
                    options={brands}
                    placeholder={'Select brand'}
                  />
                  {productManagment.brand_id === null && inputError &&
                    <div className="error-input">Brand is required</div>
                  }
                </div>
                <div className="two-field-left">
                  <label>Stock capacity (Quantity)</label>
                  <input type="number" name="stockCapacity" value={productManagment?.stockCapacity} onChange={handleChange} placeholder="Enter quantity" />
                  {productManagment.stockCapacity === "" && inputError &&
                    <div className="error-input">Stock capacity is required</div>
                  }
                </div>
              </div>
              <div className="two-field">
                <div className="two-field-left">
                  <label>Item model</label>
                  <input type="text" name="model" value={productManagment?.model} onChange={handleChange} placeholder="Enter item model" />
                  {productManagment.model === "" && inputError &&
                    <div className="error-input">Item model is required</div>
                  }
                </div>
                <div className="two-field-left">
                </div>
              </div>
              <div className="two-field">
                <div className="two-field-left">
                  <label>Description</label>
                  <textarea type="text" name="description" value={productManagment?.description} onChange={handleChange} placeholder="Enter description" />
                  {productManagment.description === "" && inputError &&
                    <div className="error-input">Description is required</div>
                  }
                </div>
              </div>
            </div>
            <div className="p-m-i-s">
              <div className="title-line"><h2>Product pricings</h2><div></div></div>
              <div className="two-field">
                {productManagment?.auctioned === false &&
                  <div className="two-field-left-left">
                    <div className="two-field-left" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <label style={{ margin: '0px' }}>Sell it now</label>
                      <div className="custom-switch">
                        <label className="switch3">
                          <input
                            type="radio"
                            value={productManagment.sellingNow}
                            checked={productManagment.sellingNow}
                            onClick={() => {
                              if (productManagment.sellingNow) {
                                setProductManagments(prev => ({ ...prev, sellingNow: false }))
                              } else {
                                setProductManagments(prev => ({ ...prev, sellingNow: true }))
                              }
                            }}
                          />
                          <span className="slider3 round3"></span>
                        </label>
                      </div>
                    </div>
                    {!productManagment.auctioned && !productManagment.sellingNow && inputError &&
                      <div className="error-input">Select Sell it now or Auction is required</div>
                    }
                  </div>
                }
                {productManagment?.sellingNow === false &&
                  <div className="two-field-left-left">
                    <div className="two-field-left" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <label style={{ margin: '0px' }}>Auction</label>
                      <div className="custom-switch">
                        <label className="switch3">
                          <input
                            type="radio"
                            value={productManagment.auctioned}
                            checked={productManagment.auctioned}
                            onClick={() => {
                              if (productManagment.auctioned) {
                                setProductManagments(prev => ({ ...prev, auctioned: false }))
                              } else {
                                setProductManagments(prev => ({ ...prev, auctioned: true }))
                              }
                            }}
                          />
                          <span className="slider3 round3"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                }
              </div>

              {productManagment?.sellingNow === true &&
                <>
                  <div className="two-field">
                    <div className="two-field-left">
                      <label>Price</label>
                      <input type="number" name="price" value={productManagment?.price} onChange={handleChange} placeholder="Enter price" />
                      {(productManagment.price === "" && inputError && productManagment.sellingNow) &&
                        <div className="error-input">Price is required</div>
                      }
                    </div>
                    <div className="two-field-left">
                      <label>Sale price</label>
                      <input type="number" name="saleprice" value={productManagment?.saleprice} onChange={handleChange} placeholder="Enter sale price" />
                      {(productManagment.saleprice === "" && inputError && productManagment.sellingNow) &&
                        <div className="error-input">Sale price is required</div>
                      }
                    </div>
                  </div>
                  <div className="two-field">
                    <div className="two-field-left">
                      <label>Min purchase</label>
                      <input type="number" name="minpurchase" value={productManagment?.minpurchase} onChange={handleChange} placeholder="Enter min purchase" />
                      {(productManagment.minpurchase === "" && inputError && productManagment.sellingNow) &&
                        <div className="error-input">Min purchase is required</div>
                      }
                    </div>
                    <div className="two-field-left">
                      <label>Schedule Your Listing</label>
                      <input type="date" name="listing" value={productManagment?.listing} onChange={handleChange} />
                      {(productManagment.listing === "" && inputError && productManagment.sellingNow) &&
                        <div className="error-input">Schedule your listing is required</div>
                      }
                    </div>
                  </div>
                </>
              }
              {productManagment?.auctioned === true &&
                <>
                  <div className="two-field">
                    <div className="two-field-left">
                      <label>Starting Bid</label>
                      <input type="number" name="bids" value={productManagment?.bids} onChange={handleChange} placeholder="Enter bid" />
                      {(productManagment.bids === "" && inputError && productManagment.auctioned) &&
                        <div className="error-input">Starting bid is required</div>
                      }
                    </div>
                    <div className="two-field-left">
                      <label>Duration</label>
                      <input type="number" name="durations" value={productManagment?.durations} onChange={handleChange} placeholder="Enter duration" />
                      {(productManagment.durations === "" && inputError && productManagment.auctioned) &&
                        <div className="error-input">Duration is required</div>
                      }
                    </div>
                  </div>
                  <div className="two-field">
                    <div className="two-field-left">
                      <label>Hours</label>
                      <input type="number" name="hours" value={productManagment?.hours} onChange={handleChange} placeholder="min hours" />
                      {(productManagment.hours === "" && inputError && productManagment.auctioned) &&
                        <div className="error-input">Hours is required</div>
                      }
                    </div>
                    <div className="two-field-left">
                      <label>Schedule Your Listing</label>
                      <input type="date" name="auctionListing" value={productManagment?.auctionListing} onChange={handleChange} />
                      {(productManagment.auctionListing === "" && inputError && productManagment.auctioned) &&
                        <div className="error-input">Schedule your listing is required</div>
                      }
                    </div>
                  </div>
                  <div className="two-field">
                    <div className="two-field-left">
                      <label>Schedule End Listing</label>
                      <input type="date" name="end_listing" value={productManagment?.end_listing} onChange={handleChange} />
                      {(productManagment.end_listing === "" && inputError && productManagment.auctioned) &&
                        <div className="error-input">Schedule end listing is required</div>
                      }
                    </div>
                    <div className="two-field-left">
                    </div>
                  </div>
                </>
              }
            </div>
            <div className="p-m-i-s">
              <div className="title-line">
                <h2>Delivery setup</h2>
                <div></div>
              </div>
              <div className="two-field">
                <div className="two-field-left" style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1' }}>
                  <label style={{ margin: '0px' }}>Deliver domestically</label>
                  <div className="custom-switch">
                    <label className="switch3">
                      <input
                        type="radio"
                        value={productManagment.deliverddomestic}
                        checked={productManagment.deliverddomestic}
                        onClick={() => {
                          if (productManagment.deliverddomestic) {
                            setProductManagments(prev => ({ ...prev, deliverddomestic: false }))
                          } else {
                            setProductManagments(prev => ({ ...prev, deliverddomestic: true }))
                          }
                        }}
                      />
                      <span className="slider3 round3"></span>
                    </label>
                  </div>
                </div>
                <div className="two-field-left" style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1' }}>
                  <label style={{ margin: '0px' }}>Deliver International</label>
                  <div className="custom-switch">
                    <label className="switch3">
                      <input
                        type="radio"
                        value={productManagment.deliverdinternational}
                        checked={productManagment.deliverdinternational}
                        onClick={() => {
                          if (productManagment.deliverdinternational) {
                            setProductManagments(prev => ({ ...prev, deliverdinternational: false }))
                          } else {
                            setProductManagments(prev => ({ ...prev, deliverdinternational: true }))
                          }
                        }}
                      />
                      <span className="slider3 round3"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="two-field">
                <div className="two-field-left">
                  <label>Address</label>
                  <>
                    {isLoaded && (
                      <StandaloneSearchBox
                        style={{ width: '100%' }}
                        onLoad={(ref) => (inputRef.current = ref)}
                        onPlacesChanged={handlePlaceChanged}
                      >
                        <input type="text" placeholder="Enter your street Address" />
                      </StandaloneSearchBox>
                    )}
                  </>
                  {productManagment.address === "" && inputError &&
                    <div className="error-input">Address is required</div>
                  }
                  {/* <input type="text" name="stockCapacity" value={productManagment?.returnshippingpaidby} onChange={handleChange} placeholder="Enter address" /> */}
                </div>
                <div className="two-field-left">
                  <label>Country</label>
                  <input type="text" name="stockCapacity" value={productManagment?.country} onChange={handleChange} placeholder="Enter country" />
                  {productManagment.country === "" && inputError &&
                    <div className="error-input">Country is required</div>
                  }
                </div>
              </div>
              <div className="two-field">
                <div className="two-field-left">
                  <label>State</label>
                  <input type="text" name="stockCapacity" value={productManagment?.state} onChange={handleChange} placeholder="Enter state" />
                  {productManagment.state === "" && inputError &&
                    <div className="error-input">State is required</div>
                  }
                </div>
                <div className="two-field-left">
                  <label>City</label>
                  <input type="text" name="stockCapacity" value={productManagment?.city} onChange={handleChange} placeholder="Enter city" />
                  {productManagment.city === "" && inputError &&
                    <div className="error-input">City is required</div>
                  }
                </div>
              </div>
              <div className="two-field">
                <div className="two-field-left">
                  <label>Shipping price</label>
                  <input type="number" name="shippingprice" value={productManagment?.shippingprice} onChange={handleChange} placeholder="Enter shipping price" />
                  {productManagment.shippingprice === "" && inputError &&
                    <div className="error-input">Shipping price is required</div>
                  }
                </div>
                <div className="two-field-left">
                  <label>Shipping duration</label>
                  <input type="number" name="shipingdurations" value={productManagment?.shipingdurations} onChange={handleChange} placeholder="Enter shipping duration" />
                  {productManagment.shipingdurations === "" && inputError &&
                    <div className="error-input">Shipping duration is required</div>
                  }
                </div>
              </div>
              <div className="two-field">
                <div className="two-field-left">
                  <label >Return shipping price</label>
                  <input type="number" name="returnshippingprice" value={productManagment?.returnshippingprice} onChange={handleChange} placeholder="Enter return shipping price" />
                  {productManagment.returnshippingprice === "" && inputError &&
                    <div className="error-input">Return shipping price is required</div>
                  }

                </div>
                <div className="two-field-left">
                  <label>Return duration limit</label>
                  <input type="number" name="returndurationlimit" value={productManagment?.returndurationlimit} onChange={handleChange} placeholder="Enter return duration limit" />
                  {(productManagment.returndurationlimit === "" && inputError) &&
                    <div className="error-input">Return duration limit paid by is required</div>}
                </div>
              </div>
              <div className="two-field">
                <div className="two-field-left">
                  <label>Return shipping price paid by</label>
                  <input type="number" name="returnshippingpaidby" value={productManagment?.returnshippingpaidby} onChange={handleChange} placeholder="Enter return shipping price paid by" />
                  {(productManagment.returnshippingpaidby === "" && inputError) &&
                    <div className="error-input">Return shipping price paid by is required</div>}
                </div>
                <div className="two-field-left">
                </div>
              </div>
            </div>
            <div className="p-m-s-b">
              <button
                className="btn2"
                style={{ marginTop: "10px" }}
                disabled={enabled}
                type="submit"
              >
                {isLoading ? "loading.." : "Preview Product"}
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
};

export default ListingForm;
