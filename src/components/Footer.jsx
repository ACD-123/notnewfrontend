import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import Footerlogo from "../assets/Images/footerlogo.png";

const Footer = () => {
	const token = localStorage.getItem('access_token')
	return (
		<>
			<footer>
				<div className="footer-widgets">
					<div className="container">
						<div className="row">
							<div className="col-lg-3 col-md-12">
								<div className="footerlogo">
									<Link to="/"><img src={Footerlogo} alt="Footer Logo" /></Link>
								</div>
								<div className="intro-footer">
									<p>We are passionate about what we do, and we take pride in the work we deliver.</p>
								</div>
							</div>
							<div className="col-lg-2 col-md-6 col-sm-6 col-12">
								<div className="nav-links-footer">
									<h6>Sell / Buy</h6>
									<ul>
										{token == null ?
										<li><Link to="/signup">Registration</Link></li>
										:
										<li><Link to="/my-seller-account?tab=dashboard">Dashbaord</Link></li>
										}
										<li><Link to="/notfound">Stores</Link></li>
										<li><Link to="/notfound">Start selling</Link></li>
									</ul>
								</div>
							</div>
							<div className="col-lg-2 col-md-6 col-sm-6 col-12">
								<div className="nav-links-footer">
									<h6>Useful Links</h6>
									<ul>
										<li><Link to="/">Home</Link></li>
										<li><Link to="/notfound">About Us</Link></li>
										<li><Link to="/notfound">Services</Link></li>
										<li><Link to="/notfound">Contact</Link></li>
									</ul>
								</div>
							</div>
							<div className="col-lg-2 col-md-6 col-sm-6 col-12">
								<div className="nav-links-footer">
									<h6>About NotNew</h6>
									<ul>
										<li><Link to="/notfound">Terms & Condition</Link></li>
										<li><Link to="/notfound">Privacy Policy</Link></li>
										<li><Link to="/notfound">Refund Policy</Link></li>
									</ul>
								</div>
							</div>
							<div className="col-lg-3 col-md-6 col-sm-6 col-12">
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
