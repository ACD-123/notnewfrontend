import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import underConstruction from "../assets/Images/under-construction.png"

const NotFound = ({cartFullResponse , notificationCount}) => {
	return (
		<>
			<Header cartFullResponse={cartFullResponse} notificationCount={notificationCount}/>
			<div>
				<center>
					<img src={underConstruction} />
					<h2>Page is Under Construction!</h2>
				</center>
			</div>

			<Footer />

		</>
	);
};

export default NotFound;
