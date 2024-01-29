import React, { useState, useEffect } from "react";
import Objection from "../../../assets/Images/objection.png";
import Down from "../../../assets/Images/down.png";
import Checkimg from "../../../assets/Images/Auction/check.png";
import { Link } from "react-router-dom";
import ProductServices from "../../../services/API/ProductServices"; //~/services/API/ProductServices
import Category from "../../../services/API/Category"; //~/services/API/Category
import CountryServices from "../../../services/API/CountryServices"; //~/services/API/CountryServices
import State from "../../../services/API/State"; //~/services/API/State
import City from "../../../services/API/City"; //~/services/API/City
import { toast } from "react-toastify";
import {
  setUserDetails,
  isLoggedin,
  getUserDetails,
} from "../../../services/Auth"; // ~/services/Auth

const ListingForm = () => {
  // Popup
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup
  // Shipping duration
  const [shippingStart, setShippingStart] = useState("");
  const [shippingEnd, setShippingEnd] = useState("");
  const [isToggled, setIsToggled] = useState(true);
  const [isToggled1, setIsToggled1] = useState(isToggled);
  const [buyNow, setBuyNow] = useState(false);
  const [listing, setListing] = useState(false);
  const [domestic, setDomestic] = useState(false);
  const [international, setInternational] = useState("");
  const [deliverCompany, setDeliverCompany] = useState("");
  const [price, setPrice] = useState("");
  const [prices, setPrices] = useState("");
  const [refund, setRefund] = useState("");
  const [returnLimit, setreturnLimit] = useState("");
  const [returnpaidby, setReturnPaidBy] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [showContents, setShowContents] = useState(false);
  const [country, setCountry] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [categories, setCategories] = useState({});
  const [category, setCategory] = useState({});
  const [product, setProduct] = useState({
    images: [],
    title: "",
    model: "",
    category: "",
    brand: "",
    stockCapacity: 0,
    sizes: [{ size: 0, quantity: 0 }],
    availableColors: [],
    description: "",
    sellingNow: false,
    auctions: false,
    price: 0,
    listing: false,
    sale: false,
    buyitnow: false,
    listing: false,
    deliverddomestic: false,
    deliverdinternational: false,
    deliverycompany: "",
    country: "",
    locations: [],
    shippingprice: 0,
    shippingstart: "",
    shippingend: "",
    returnshippingprice: 0,
    returndurationlimit: 0,
    returnshippingpaidby: "",
    returnshippinglocation: "",
  });

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
    product.shippingprice = prices;
    product.shippingstart = shippingStart;
    product.shippingend = shippingEnd;
    product.shippingdurations = shippingEnd;

    // Your existing code for handling the product activation goes here
    console.log("Submitted product:", product);

    // Show the popup after activating the product
    // setShowPopup(true);
  };
  const handleShippingStartChange = (e) => {
    setShippingStart(e.target.value);
  };
  const handleShippingEndChange = (e) => {
    setShippingEnd(e.target.value);
  };
  const handleDomestic = () => {
    setDomestic(!domestic);
  };
  const handleInternational = () => {
    setInternational(!international);
  };
  const handleDeliverCompany = (e) => {
    setDeliverCompany(e.target.value);
  };
  // const handleCountry = (e) =>{
  //   setCountry(e.target.value)
  // };
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  const handleToggle1 = () => {
    setIsToggled1(!isToggled1);
  };
  const handleBuynow = () => {
    setBuyNow(!buyNow);
  };
  const handleLisitng = () => {
    setListing(!listing);
  };

  const handleCategory = (e) => {
    const cat = e.target.value;
    setCategory(cat);
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "size" || name === "quantity") {
      const updatedSizes = [...product.sizes];
      updatedSizes[index][name] = value;
      setProduct({ ...product, sizes: updatedSizes });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    const updatedColors = [...product.availableColors, color];
    setProduct({ ...product, availableColors: updatedColors });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setProduct({ ...product, images: imageUrls });
  };

  const handleAddSize = () => {
    setProduct({
      ...product,
      sizes: [...product.sizes, { size: 0, quantity: 0 }],
    });
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
    if (!product.model) {
      newErrors.model = "Model is required";
    }
    if (!category) {
      newErrors.category = "Category is required";
    }
    if (!product.brand) {
      newErrors.brand = "Brand is required";
    }
    if(!product.stockCapacity || product.stockCapacity === 0){
      newErrors.stockCapacity = "Stock Capacity is required";
    }
    if(!product.description){
      newErrors.description = "Description is required";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {

        product.sellingNow = buyNow;
        product.auctions = isToggled1;
        product.price = price;
        product.listing = listing;
        product.buyitnow = isToggled;
        product.deliverddomestic = domestic;
        product.deliverdinternational = international;
        product.deliverycompany = deliverCompany;
        product.shippingprice = prices;
        product.shippingstart = shippingStart;
        product.shippingend = shippingEnd;
        product.category = category;
        product.condition = localStorage.getItem("product_condition");
      setIsLoading(true);
      setEnabled(true);
      ProductServices.save(product)
        .then((response) => {
          toast.success(response);
          setIsLoading(false);
          setEnabled(false);
        })
        .then(() => {
          setIsLoading(false);
          setEnabled(false);
        });
    }
    // console.log("Submitted product:", product);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handlePriceChanges = (e) => {
    setPrices(e.target.value);
  };
  const handleRefundprice = (e) => {
    setRefund(e.target.value);
  };
  const handleReturnLimit = (e) => {
    setreturnLimit(e.target.value);
  };
  const handleReturnPaidBy = (e) =>{
    product.returnshippingpaidby = e.target.value;
    setReturnPaidBy(e.target.value);
  }

  // Static simulation of states and cities data
  const statesData = [
    { id: "state1", name: "State 1" },
    { id: "state2", name: "State 2" },
    // Add more states as needed
  ];

  const deliveryCompany = [
    { id: "fedex", name: "Fedex" },
    { id: "usps", name: "USPS" },
    { id: "americancourier", name: "AMERICAN COURIER" },
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
      .catch((e) => {
        toast.error(e.message);
      });
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
    product.states = e.target.value;
    City.get(e.target.value)
      .then((response) => {
        setCities(response);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  useEffect(() => {
    fetchCategory();
    fetchCountries();
  }, []);
  return (
    <section id="listing-creating-form">
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "90%", margin: "0 auto", overflow: "hidden" }}
      >
        <h3 style={{ color: "#000" }}>Describe Your Product</h3>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
        <div className="imgegallry">
          {product.images.map((imageUrl, index) => (
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
          ))}
        </div>
        <p className="notify-images">
          <img src={Objection} /> Add a minimum of 5 images covering all angles
          of the item that describe it well.
        </p>
        <h4>ITEM SPECIFICS</h4>
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
          <div>Select Category</div>
          <div>
            <select value={category} onChange={handleCategory}>
              <option value="">All Category</option>
              {categories.length > 0 ? (
                <>
                  {categories?.map((cat) => {
                    return (
                      <>
                        <option value={cat.id}>{cat.name}</option>
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
        <div className="stockcapa" style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Brand"
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
          />
          {errors.brand && <p className="error">{errors.brand}</p>}
        </div>
        <div className="stockcapa">
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
          {errors.stockCapacity && <p className="error">{errors.stockCapacity}</p>}
        </div>
        {product.sizes.map((size, index) => (
          <div className="sizequntycolr" key={index}>
            <label>Size</label>
            <input
              type="number"
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
            <input className="colr" type="color" onChange={handleColorChange} />
          </div>
        ))}
        <div className="sizeaddmre">
          <button type="button" onClick={handleAddSize}>
            Add Size
          </button>
        </div>
        <textarea
          placeholder="Description"
          name="description"
          value={product.description}
          onChange={handleInputChange}
        />
        {errors.description && <p className="error">{errors.description}</p>}
        <div className="pricing">
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
                      type="checkbox"
                      checked={buyNow}
                      value={buyNow}
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
                      type="checkbox"
                      checked={isToggled1}
                      onChange={handleToggle1}
                    />
                    <span className="slider1 round1"></span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="set-price">
          <div>Set Price</div>
          <div>
            <input
              type="text"
              placeholder="$"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
        </div>
        <div className="listschedule">
          <div>Schedule your Listing</div>
          <div>
            <label className="switch2">
              <input
                type="checkbox"
                checked={listing}
                onChange={handleLisitng}
              />
              <span className="slider2 round2"></span>
            </label>
          </div>
        </div>
        <div className="listschedule1">
          <div>Buy it now</div>
          <div>
            <label className="switch3">
              <input
                type="checkbox"
                value={buyNow}
                checked={buyNow}
                onChange={handleBuynow}
              />
              <span className="slider3 round3"></span>
            </label>
          </div>
        </div>

        <div className="pricing">
          <h4>SHIPPING</h4>
          <li onClick={() => setShowContents(!showContents)}>
            Deliver Domestically <img src={Down} />
          </li>
          {showContents && (
            <div className="main-pricng-switcher">
              <div className="firstswitcher">
                <div>Deliver Domestically</div>
                <div>
                  <label className="switch1">
                    <input
                      type="checkbox"
                      checked={domestic}
                      onChange={handleDomestic}
                    />
                    <span className="slider1 round1"></span>
                  </label>
                </div>
              </div>
              <div className="firstswitcher">
                <div>Deliver Internationally</div>
                <div>
                  <label className="switch1">
                    <input
                      type="checkbox"
                      checked={international}
                      onChange={handleInternational}
                    />
                    <span className="slider1 round1"></span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="delivery-company">
          <div>Select Delivery Company</div>
          <div>
            <select
              checked={deliverCompany}
              value={deliverCompany}
              onChange={handleDeliverCompany}
            >
              <option value="">Select Delivery Company</option>
              {deliveryCompany?.map((company) => (
                <option key={company.id}>{company.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="delivery-company">
          <div>Select Country</div>
          <div>
            <select value={product.country} onChange={handleCountryChange}>
              <option>All Countries</option>
              {country.length > 0 ? (
                <>
                  {country.map((c) => {
                    return (
                      <>
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
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
        {locations.map((location, index) => (
          <div className="row" key={index}>
            <div className="col-lg-6">
              <div className="delivery-company">
                <div>Select States</div>
                <div>
                  <select onChange={(e) => handleStateChange(e)}>
                    <option>Select a States</option>
                    {state.length > 0 ? (
                      <>
                        {state?.map((state) => {
                          return (
                            <option key={state.id} value={state.id}>
                              {state.name}
                            </option>
                          );
                        })}
                      </>
                    ) : (
                      // <option value="2">State 2</option>
                      ""
                    )}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="delivery-company">
                <div>Select City</div>
                <div>
                  <select onChange={(e) => handleCity(e.target.value)}>
                    <option>Select a City</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="row">
          <button
            className="addmrelcati"
            type="button"
            onClick={addMoreLocation}
          >
            Add More Location
          </button>
        </div>
        <div className="set-price">
          <div>Shipping Price</div>
          <div>
            <input
              type="text"
              placeholder="$"
              value={prices}
              onChange={handlePriceChanges}
            />
          </div>
        </div>
        {/* Add the Shipping Duration inputs */}
        <div className="shipping-duration">
          <div>Shipping Duration</div>
          <div className="dyss">
            <div>
              <input
                type="text"
                placeholder="From"
                value={shippingStart}
                onChange={handleShippingStartChange}
              />
            </div>
            <div>
              <span>-</span>
            </div>
            <div>
              <input
                type="text"
                placeholder="To"
                value={shippingEnd}
                onChange={handleShippingEndChange}
              />
            </div>
            <div>
              <span>Days</span>
            </div>
          </div>
        </div>
        <div className="set-price">
          <div>Return Shipping Price</div>
          <div>
            <input
              type="text"
              placeholder="$"
              value={refund}
              onChange={handleRefundprice}
            />
          </div>
        </div>
        <div className="set-price">
          <div>Return Duration limit</div>
          <div>
            <input
              type="text"
              placeholder="0 Days"
              value={returnLimit}
              onChange={handleReturnLimit}
            />
          </div>
        </div>
        <div className="delivery-company">
          <div>Return shipping price paid by</div>
          <div>
            <select
              value={product.returnshippingpaidby}
              onChange={handleReturnPaidBy}
            >
              <option value="">Select Paid By</option>
              {paidBy.map((paid) => (
                <option key={paid.id} value={paid.id}>
                  {paid.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="delivery-company">
          <div>Return Shipping Location</div>
          <div>
            <select>
              <option>All Countries</option>
              {country.length > 0 ? (
                <>
                  {country.map((country) => (
                    <option key={country.id}>{country.name}</option>
                  ))}
                </>
              ) : (
                ""
              )}
            </select>
          </div>
        </div>
        <div className="row actvtebuttns">
          <div className="col-lg-6">
            <Link to="/singleproduct" style={{ textDecoration: "none" }}>
              <button
                className="btn1"
                type="button"
                style={{ marginTop: "10px" }}
              >
                Preview Product
              </button>
            </Link>
          </div>
          <div className="col-lg-6">
            {/* <button className="btn2" onClick={handleActivateProduct} type="submit" style={{ marginTop: "10px" }}>
         Activate Product
          </button> */}
            <button
              type="submit"
              className="btn2"
              style={{ marginTop: "10px" }}
            >
              Activate Product
            </button>
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
      </form>
    </section>
  );
};

export default ListingForm;
