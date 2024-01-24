import React, { useState, useEffect } from "react";
import Objection from "../../../assets/Images/objection.png";
import Down from "../../../assets/Images/down.png";
import Checkimg from '../../../assets/Images/Auction/check.png'
import { Link } from "react-router-dom";
const ListingForm = () => {
  // Popup
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup

  // Function to handle the activation of the product
  const handleActivateProduct = (e) => {
    e.preventDefault();
    // Your existing code for handling the product activation goes here

    // Show the popup after activating the product
    setShowPopup(true);
  };
  // Shipping duration
  const [shippingStart, setShippingStart] = useState("");
  const [shippingEnd, setShippingEnd] = useState("");

  const handleShippingStartChange = (e) => {
    setShippingStart(e.target.value);
  };

  const handleShippingEndChange = (e) => {
    setShippingEnd(e.target.value);
  };

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const [isToggled, setIsToggled] = useState(false);
  const [isToggled1, setIsToggled1] = useState(false);
  const [buyNow, setBuyNow] = useState(false);
  const [listing, setListing] = useState(false);
  const [domestic, setDomestic] = useState(false);
  const [international, setInternational] = useState(false);

  const handleDomestic = () => {
    setDomestic(!domestic);
  };

  const handleInternational = () => {
    setInternational(!international);
  };

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
  const [showContent, setShowContent] = useState(false);
  const [showContents, setShowContents] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    model: "",
    category: "",
    brand: "",
    stockCapacity: 0,
    availableColors: [],
    sizes: [{ size: "", quantity: 0 }],
    description: "",
    images: [],
    sale: false, // Toggle state for Sale
    auction: false, // Toggle state for Auction
  });

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
      sizes: [...product.sizes, { size: "", quantity: 0 }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted product:", product);
    // Handle further actions, like sending data to an API
  };

  const [price, setPrice] = useState("");
  const [prices, setPrices] = useState("");
  const [refund, setRefund] = useState("");
  const [returnLimit, setreturnLimit] = useState("");

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

  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Static simulation of states and cities data
  const statesData = [
    { id: "state1", name: "State 1" },
    { id: "state2", name: "State 2" },
    // Add more states as needed
  ];

  const citiesData = {
    state1: ["City 1", "City 2", "City 3"],
    state2: ["City A", "City B", "City C"],
    // Add more cities for each state as needed
  };

  // Function to update states based on the selected country (simulated for demonstration)
  const fetchStates = (countryCode) => {
    setTimeout(() => {
      setSelectedCountryCode(countryCode);
      setStates(statesData);
    }, 500);
  };

  // Function to update cities based on the selected state (simulated for demonstration)
  const fetchCities = (stateId) => {
    setTimeout(() => {
      setCities(citiesData[stateId]);
    }, 500);
  };

  // Within the select elements:
  const [locations, setLocations] = useState([
    { country: "", state: "", city: "" },
  ]);

  // Function to add more location fields
  const addMoreLocation = () => {
    setLocations([...locations, { country: "", state: "", city: "" }]);
  };
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
        <input
          type="text"
          placeholder="Item Model"
          name="model"
          value={product.model}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Category"
          name="category"
          value={product.category}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Brand"
          name="brand"
          value={product.brand}
          onChange={handleInputChange}
        />
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
        </div>
        {product.sizes.map((size, index) => (
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
                      checked={isToggled}
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
              <input type="checkbox" checked={buyNow} onChange={handleBuynow} />
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
            <select>
              <option>FEDX</option>
              <option>USPS</option>
              <option>AMERICAN COURIER</option>
            </select>
          </div>
        </div>
        <div className="delivery-company">
          <div>Select Country</div>
          <div>
            <select>
              <option>All Countries</option>
              {countries.map((country) => (
                <option key={country.name.common}>{country.name.common}</option>
              ))}
            </select>
          </div>
        </div>
        {locations.map((location, index) => (
          <div className="row" key={index}>
            <div className="col-lg-6">
              <div className="delivery-company">
                <div>Select States</div>
                <div>
                  <select onChange={(e) => fetchStates(e.target.value)}>
                    <option>Select a States</option>
                    {countries.map((country) => (
                      <option key={country.name.common} value={country.cca2}>
                        {country.name.common}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="delivery-company">
                <div>Select City</div>
                <div>
                  <select onChange={(e) => fetchCities(e.target.value)}>
                    <option>Select a City</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
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
            <select>
              <option>Buyer</option>
              <option>Seller</option>
              <option>Admin</option>
            </select>
          </div>
        </div>
        <div className="delivery-company">
          <div>Return Shipping Location</div>
          <div>
            <select>
              <option>All Countries</option>
              {countries.map((country) => (
                <option key={country.name.common}>{country.name.common}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row actvtebuttns">
         <div className="col-lg-6">
         <Link to="/singleproduct" style={{ textDecoration: 'none' }}>
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
         <button className="btn2" onClick={handleActivateProduct} type="submit" style={{ marginTop: "10px" }}>
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
