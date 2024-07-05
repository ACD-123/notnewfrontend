import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductServices from "../../services/API/ProductServices";
import UserServices from "../../services/API/UserServices";
import { Spinner } from "react-bootstrap";
import LoadingComponents from "../Shared/LoadingComponents";
import NoDataFound from "../Shared/NoDataFound";

const Watchlist = () => {
  const [user, setUser] = useState({});
  const [watchlistInstock, setWatchlistInstock] = useState([]);
  const [watchlistOutstock, setWatchlistOutstock] = useState([]);
  const [watchlistAll, setWatchlistAll] = useState([]);
  const [selectedTab, setSelectedTab] = useState("inStock");
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading state as true

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await UserServices.detail();
        setUser(response);
        localStorage.setItem('user_details', JSON.stringify(response));
        setIsLoading(false); // Set isLoading to false when data is fetched

      } catch (error) {
        console.log('error', error);
        setIsLoading(false); // Set isLoading to false even if there's an error
        // Handle error
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const getWishlist = async () => {
      try {
        const response = await ProductServices.getWishList(user.id);
        setWatchlistAll(response.data);
        setWatchlistInstock(response.data.in_stock_products);
        console.log(response.data.in_stock_products);
        setWatchlistOutstock(response.data.out_of_stock_products);
      } catch (error) {
        console.log('error', error);
        // Handle error
      }
    };

    if (user.id) {
      getWishlist();
    }
  }, [user.id]);


  return (
    <section id="wishlist-dashboard">
      <div className="wishlist-dashboard-one">
        <div className="row">
          <div className="col-lg-6">
            {/* <div className="deleted-button">
            <button onClick={deleteSelectedProducts}>Delete Selected</button>
          </div> */}
            <h3>Watchlistt</h3>
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
      </div>
      <div className="wishlist-categories-list">
        <ul>
          {/* <li className="allcategory">
            <button onClick={() => setSelectedTab("allProducts")}>
              All Categories
            </button>
          </li> */}
          <li className={selectedTab === 'inStock' && 'allcategory'}>
            <button
              onClick={() => setSelectedTab("inStock")}
            >
              In Stock
            </button>
          </li>
          <li className={selectedTab === 'outOfStock' && 'allcategory'}>
            <button
              onClick={() => setSelectedTab("outOfStock")}
            >
              Out Of Stock
            </button>
          </li>
          {/* Add more categories here */}
        </ul>
      </div>
      {/* <div className="tabs">
        <button onClick={() => setSelectedTab("inStock")}>In Stock</button>
        <button onClick={() => setSelectedTab("outOfStock")}>Out of Stock</button>
      </div> */}
      {selectedTab === "inStock" && (
        <div className="wishlist">
          {isLoading ? ( // Render loader if isLoading is true
            <LoadingComponents />
          ) : (
            <>
              {watchlistInstock.length > 0 ? (
                <>
                  {watchlistInstock.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))}
                </>
              ) : (
                <NoDataFound title={'No watchlist Found'} />
              )}
            </>
          )}
        </div>
      )}
      {selectedTab === "outOfStock" && (
        <div className="wishlist">
          {isLoading ? ( // Render loader if isLoading is true
            <div className="loader-container text-center">
              <Spinner animation="border" role="status">
                {/* <span className="sr-only">Loading...</span> */}
              </Spinner>
            </div>
          ) : (
            <>
              {watchlistOutstock.length === 0 ? (
                <div>
                  No Products Available in Out of stock
                </div>
              ) : (
                <>
                  {watchlistOutstock.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      )}
      {/* {selectedTab === "allProducts" && (
        <div className="wishlist">
          {watchlistAll.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )} */}
    </section>
  );
};

const ProductItem = ({ product }) => {
  const [showNote, setShowNote] = useState(false);
  const toggleNote = () => {
    setShowNote(!showNote);
  };

  return (
    <div key={product.id} className="product">
      {/* START ROW */}
      <div className="row">
        <div className="col-lg-7">
          <div className="wishlistproduct-detail">
            <div>
              <input
                type="checkbox"
                checked={product.selected}
              // onChange={() => toggleProductSelection(product.id)}
              />
            </div>
            <div>
              <img
                src={`${product.media[0].name}`}
                alt={product.media[0].name}
              />
            </div>
            <div>
              <h3>{product.name}</h3>
              <p>
                <b>Size:</b> {product.size}, Color: {product.available_colors}{" "}
              </p>

              <p><b>Quantity:</b> {product.stockcapacity},</p>
              <p><b>Description:</b> {product.description},</p>
              {/* <p className="shipingname">{product.shippingname}</p> */}
            </div>
          </div>
        </div>

        <div className="col-lg-2">
          <div className="wishlistprice-detials">
            <h3>US ${product.price}</h3>
            <p>+US ${product.shipping_price}</p>
            <p>Shipping cost 10% off {product.shippingprice}</p>
          </div>
        </div>

        <div className="col-lg-3 wishlist-buttonss">
          <Link to={`/checkout-buynow/${product.guid}`}>
            <button
              className="buynow-wishlist"
            >
              Buy It Now
            </button>
          </Link>
          <button className="offer">
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
    </div>
  );
};

export default Watchlist;
