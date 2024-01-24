import React from "react";
import PublicRoutes from "./routes/PublicRoutes";
import { ToastContainer } from "react-toastify";
const App = () => {
	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={5000}
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
