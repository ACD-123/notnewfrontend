import React, { useEffect } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import { ToastContainer } from "react-toastify";
const App = () => {
	useEffect(() =>{
		const token = localStorage.getItem('access_token');
		const guest_user_id = localStorage.getItem('guest_user_id');
		if(token === null && guest_user_id === null){
			const randomNumber = Math.floor(100000 + Math.random() * 900000)
			localStorage.setItem("guest_user_id" , randomNumber)
		}
	} , [])
	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<PublicRoutes />
		</>
	);
};

export default App;
