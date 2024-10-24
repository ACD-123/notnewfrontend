import React, { useEffect, useState } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import { toast, ToastContainer } from "react-toastify";
import { getTokenn, messaging } from "./firebase";
import HomeService from "./services/API/HomeService";
import { onMessage } from "firebase/messaging";

const App = () => {
	const [isTokenFound, setTokenFound] = useState(false);
	const [fcmToken, setFcmToken] = useState('');
	getTokenn(setTokenFound, setFcmToken);

	useEffect(() => {
		const token = localStorage.getItem('access_token');
		const guest_user_id = localStorage.getItem('guest_user_id');
		if (token === null && guest_user_id === null) {
			const randomNumber = Math.floor(100000 + Math.random() * 900000)
			localStorage.setItem("guest_user_id", randomNumber)
		}
	}, [])

	const access_token = localStorage.getItem('access_token')
	const fcm_token = localStorage.getItem('fcm_token')
	const updateFcmToken = () => {
		if (access_token != null) {
			if (fcmToken != fcm_token && fcmToken != '') {
				HomeService.updateFcmToken({ fcm_token: fcmToken })
					.then((response) => {
						localStorage.setItem('fcm_token', fcmToken)
					})
					.catch((error) => {
						toast.error(error?.response?.data?.message)
					});
			}
		}
	}

	useEffect(() =>{
		updateFcmToken()
	} , [access_token , fcm_token , fcmToken])

	useEffect(() => {
		const unsubscribe = onMessage(messaging, (payload) => {
			// Handle the message as needed, e.g., show a notification or update state
		});
	
		return () => unsubscribe();
	}, []);

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
