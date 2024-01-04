import React, { useState } from "react";
import Wishlistimage1 from "../../assets/Images/Categorylisting/1.png";
import Wishlistimage2 from "../../assets/Images/Categorylisting/2.png";
import Wishlistimage3 from "../../assets/Images/Categorylisting/3.png";
import Wishlistimage4 from "../../assets/Images/Categorylisting/4.png";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const initialProducts = [
    {
      id: 1,
      image: Wishlistimage1,
      title: "adidas Adizero SL Running Shoes Mens",
      size: "M",
      price: "221.1",
      saleprice: "219.99",
      color: "Red",
      quantity: 1,
      shipping: "Free",
      selected: false,
      showDropdown: false,
      category: "Laptops & Netbooks",
      shippingname: "International Shipping from United Kingdom",
      shippingprice: "663.12",
    },
    {
      id: 2,
      image: Wishlistimage2,
      title: "adidas Adizero SL Running Shoes Mens",
      size: "L",
      price: "621.2",
      saleprice: "229.99",
      color: "Yellow",
      quantity: 2,
      shipping: "Standard",
      selected: false,
      showDropdown: false,
      category: "Fitness, Running & Yoga",
      shippingname: "International Shipping from United Kingdom",
      shippingprice: "123.12",
    },
    {
      id: 3,
      image: Wishlistimage3,
      title: "adidas Adizero SL Running Shoes Mens",
      size: "S",
      price: "322.3",
      saleprice: "269.99",
      color: "White",
      quantity: 3,
      shipping: "Express",
      selected: false,
      showDropdown: false,
      category: "Laptops & Netbooks",
      shippingname: "International Shipping from United Kingdom",
      shippingprice: "423.12",
    },
    {
      id: 4,
      image: Wishlistimage4,
      title: "adidas Adizero SL Running Shoes Mens",
      size: "XL",
      price: "112.1",
      saleprice: "269.99",
      color: "Black",
      quantity: 1,
      shipping: "Free",
      selected: false,
      showDropdown: false,
      category: "Laptops & Netbooks",
      shippingname: "International Shipping from United Kingdom",
      shippingprice: "6643.12",
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [showNote, setShowNote] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const toggleNote = () => {
    setShowNote(!showNote);
  };

  const toggleProductSelection = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, selected: !product.selected }
        : product
    );
    setProducts(updatedProducts);
  };

  const deleteSelectedProducts = () => {
    const updatedProducts = products.filter((product) => !product.selected);
    setProducts(updatedProducts);
  };

  const buyNow = (productId) => {
    // Logic for 'Buy Now' functionality
    console.log(`Buy Now: Product ID ${productId}`);
  };

  const makeOffer = (productId) => {
    // Logic for 'Make Offer' functionality
    console.log(`Make Offer: Product ID ${productId}`);
  };

  const moreActions = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, showDropdown: !product.showDropdown }
        : { ...product, showDropdown: false }
    );
    setProducts(updatedProducts);
  };

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
    let filteredProducts = initialProducts;
    if (category !== "All Categories") {
      filteredProducts = initialProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    setProducts(filteredProducts);
  };

  return (
    <section id="wishlist-dashboard">
      <h3>Wishlist</h3>
      <div className="row wishlist align-items-center">
        <div className="col-lg-6">
          <div className="deleted-button">
            <button onClick={deleteSelectedProducts}>Delete Selected</button>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="sort-wishlist">
            <div className="status">
              <h4>
                Status:{" "}
                <select>
                  <option>All</option>
                  <option>All 1</option>
                  <option>All 2</option>
                </select>
              </h4>
            </div>
            <div className="timeleft">
              <h4>
                Time Left:{" "}
                <select>
                  <option>Ending soonest</option>
                  <option>Recent Added</option>
                </select>
              </h4>
            </div>
          </div>
        </div>
        <hr style={{ marginTop: "20px" }} />
      </div>
      <div className="wishlist-categories-list">
        <ul>
          <li className="allcategory">
            <button onClick={() => filterProductsByCategory("All Categories")}>
              All Categories
            </button>
          </li>
          <li>
            <button
              onClick={() => filterProductsByCategory("Laptops & Netbooks")}
            >
              Laptops & Netbooks (1)
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                filterProductsByCategory("Fitness, Running & Yoga")
              }
            >
              Fitness, Running & Yoga (1)
            </button>
          </li>
          {/* Add more categories here */}
        </ul>
      </div>
      <div className="wishlist">
        {products.map((product) => (
          <div key={product.id} className="product">
            {/* START ROW */}
            <div className="row">
              <div className="col-lg-7">
                <div className="wishlistproduct-detail">
                  <div>
                    <input
                      type="checkbox"
                      checked={product.selected}
                      onChange={() => toggleProductSelection(product.id)}
                    />
                  </div>
                  <div>
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div>
                    <h3>{product.title}</h3>
                    <p>
                      Size: {product.size}, Color: {product.color}{" "}
                    </p>

                    <p>Quantity: {product.quantity}</p>
                    <p>Shipping: {product.shipping}</p>
                    <p className="shipingname">{product.shippingname}</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-2">
                <div className="wishlistprice-detials">
                  <h3>US ${product.price}</h3>
                  <p>+US ${product.saleprice}</p>
                  <p>Shipping cost 10% off {product.shippingprice}</p>
                </div>
              </div>

              <div className="col-lg-3 wishlist-buttonss">
                <Link to="/checkout">
                  <button
                    className="buynow-wishlist"
                    onClick={() => buyNow(product.id)}
                  >
                    Buy It Now
                  </button>
                </Link>
                <button className="offer" onClick={() => makeOffer(product.id)}>
                  Make Best Offer
                </button>
                <select className="offer">
                  <option>More actions</option>
                  <option>View Similar Items</option>
                  <option>Contact Seller</option>
                </select>
                <button className="addntee" onClick={toggleNote}>
                  Add Note
                </button>
                {showNote && (
                  <div className="note">
                    <textarea placeholder="Write your note here..." />
                  </div>
                )}
              </div>
              <hr />
            </div>
            {/* END ROW */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Wishlist;
