import React from "react";
import Logo from "../assets/Images/logo.png";
import SearchwithCategories from "./Elements/SearchwithCategories"
import Avatar from "../assets/Images/Elements/avatar.png"
import Cart from "../assets/Images/Elements/cart.png"
import NavBar from "./Elements/NavBar"
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<>
			<header>
				<div className="header-top">
				<div className="container">
					<div className="row align-items-center">
					<div className="col-lg-4">
						<div className="logo">
						<Link to="/"><img src={Logo} width="20%" height="100%" /></Link>
						</div>
					</div>
					<div className="col-lg-6">
					<SearchwithCategories />
					</div>
					<div className="col-lg-2">
						<div className="cart-user">
							<div className="cart">
								<Link to="/shoppingcart"><img src={Cart} /></Link>
							</div>
							<div className="user">
							<Link to="/signin"><img src={Avatar} /></Link>
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
			
		</>
	);
};

export default Header;
