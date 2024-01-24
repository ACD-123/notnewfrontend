import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import Footerlogo from "../assets/Images/footerlogo.png";

const Footer = () => {
	return (
		<>
			<footer>
				<div className="footer-widgets">
					<div className="container">
						<div className="row">
							<div className="col">
								<div className="footerlogo">
									<Link to="/"><img src={Footerlogo} alt="Footer Logo" /></Link>
								</div>
								<div className="intro-footer">
									<p>We are passionate about what we do, and we take pride in the work we deliver.</p>
								</div>
							</div>
							<div className="col">
								<div className="nav-links-footer">
									<h6>Buy</h6>
									<ul>
										<li><Link to="/signup">Registration</Link></li>
										<li><Link to="#">Auction Help</Link></li>
										<li><Link to="#">Stores</Link></li>
									</ul>
								</div>
							</div>
							<div className="col">
								<div className="nav-links-footer">
									<h6>Sell</h6>
									<ul>
										<li><Link to="signup">Start selling</Link></li>
										<li><Link to="#">learn to sell</Link></li>
										<li><Link to="#">Refund Policy</Link></li>
									</ul>
								</div>
							</div>
							<div className="col">
								<div className="nav-links-footer">
									<h6>Useful Links</h6>
									<ul>
										<li><Link to="/">Home</Link></li>
										<li><Link to="#">About Us</Link></li>
										<li><Link to="#">Services</Link></li>
										<li><Link to="#">Portfolio</Link></li>
										<li><Link to="#">Contact</Link></li>
									</ul>
								</div>
							</div>
							<div className="col">
								<div className="nav-links-footer">
									<h6>About NotNew</h6>
									<ul>
										<li><Link to="/">Terms & Condition</Link></li>
										<li><Link to="#">Privacy Policy</Link></li>
										<li><Link to="#">Refund Policy</Link></li>
										<li><Link to="#">Site Map</Link></li>
									</ul>
								</div>
							</div>
							<div className="col">
								<div className="nav-links-footer">
									<h6>Contact Us</h6>
									<ul>
										<li><span>Phone :</span> <a href="tel:123457777"><em>(123) 123-0123</em></a></li>
										<li><span>Email :</span> <a href="mailto:info@notnew.com"><em>Dummymail@gmail.com</em></a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="copyright">
					<p>@2023 NotNew.com. All Right Reserved.</p>
				</div>
			</footer>
		</>
	);
};

export default Footer;
