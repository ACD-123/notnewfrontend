import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import store from './store'
const root = ReactDOM.createRoot(document.getElementById('root'));
// check if window is close or not:
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   e.returnValue = '';
// });
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="564932564531-b9uchkvfldj3u1drt0fvf3l4e6ce8hu1.apps.googleusercontent.com">
          <Provider store={store}>
            <App />
          </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
