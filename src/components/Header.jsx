import React, { useState } from "react";
import Logo from "../assets/Images/logo.png";
import SearchwithCategories from "./Elements/SearchwithCategories";
import Avatar from "../assets/Images/Elements/avatar.png";
import Cart from "../assets/Images/Elements/cart.png";
import NavBar from "./Elements/NavBar";
import { Link } from "react-router-dom";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleDropdownItemClick = (componentName) => {
    // Here, you can navigate to the 'Activity' component and pass the selected component name as a query parameter or state
    // For example, using query parameter
    window.location.href = `/customerdashboard?component=${componentName}`;
  };

  return (
    <>
      <header id="desktop-header">
        <div className="header-top">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-4">
                <div className="logo">
                  <Link to="/">
                    <img src={Logo} width="20%" height="100%" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <SearchwithCategories />
              </div>
              <div className="col-lg-2">
                <div className="cart-user">
                  <div className="cart">
                    <Link to="/shoppingcart">
                      <img src={Cart} />
                    </Link>
                  </div>
                  <div className="user">
                    <div className="avatar-container" onClick={toggleDropdown}>
                      <img src={Avatar} alt="User Avatar" />
                    </div>
                    {showDropdown && (
                      <div className="dropdown-content">
						<ul>
                        <li onClick={() => handleDropdownItemClick('component')}>Dashboard</li>
						<li onClick={() => handleDropdownItemClick('componentA')}>Recently viewed</li>
						<li onClick={() => handleDropdownItemClick('componentB')}>Bids/Offers</li>
						<li onClick={() => handleDropdownItemClick('componentC')}>Wishlist</li>
						<li onClick={() => handleDropdownItemClick('componentD')}>purchase history</li>
						<li onClick={() => handleDropdownItemClick('componentE')}>buy again</li>
						<li onClick={() => handleDropdownItemClick('componentF')}>selling Hub</li>
						<li onClick={() => handleDropdownItemClick('componentG')}>saved searches </li>
						<li onClick={() => handleDropdownItemClick('componentH')}>saved sellers</li>
						<li onClick={() => handleDropdownItemClick('componentI')}>messages</li>
						<li><Link to="/signin">Signout</Link></li>
						</ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nav-bar">
          <NavBar />
        </div>
      </header>
      {/* MOBILE HEADER */}
      <header id="mobile-header">
        <div className="header-top">
          <div className="container">
            <div className="row align-items-center"
            style={{paddingTop: "20px"}}
            >
              <div className="col-md-2 col-sm-2 col">
              <div className="logo">
                  <Link to="/">
                    <img src={Logo} width="100%" height="100%" />
                  </Link>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 col">
                <div className="cart-user">
                  <div className="cart">
                    <Link to="/shoppingcart">
                      <img src={Cart} />
                    </Link>
                  </div>
                  <div className="user">
                    <div className="avatar-container" onClick={toggleDropdown}>
                      <img src={Avatar} alt="User Avatar" />
                    </div>
                    {showDropdown && (
                      <div className="dropdown-content">
						<ul>
                        <li onClick={() => handleDropdownItemClick('component')}>Dashboard</li>
						<li onClick={() => handleDropdownItemClick('componentA')}>Recently viewed</li>
						<li onClick={() => handleDropdownItemClick('componentB')}>Bids/Offers</li>
						<li onClick={() => handleDropdownItemClick('componentC')}>Wishlist</li>
						<li onClick={() => handleDropdownItemClick('componentD')}>purchase history</li>
						<li onClick={() => handleDropdownItemClick('componentE')}>buy again</li>
						<li onClick={() => handleDropdownItemClick('componentF')}>selling Hub</li>
						<li onClick={() => handleDropdownItemClick('componentG')}>saved searches </li>
						<li onClick={() => handleDropdownItemClick('componentH')}>saved sellers</li>
						<li onClick={() => handleDropdownItemClick('componentI')}>messages</li>
						<li><Link to="/signin">Signout</Link></li>
						</ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-4 col">
              <div className="nav-bar">
          <NavBar />
        </div>
              </div>

            </div>

            <div className="row"
            style={{padding: "20px 20px"}}
            >
                <SearchwithCategories />
              </div>
          </div>
        </div>
      </header>
      {/* MOBILE HEADER END */}
    </>
  );
};

export default Header;
