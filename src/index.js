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
root.render(
    <GoogleOAuthProvider clientId="76718945981-4cdd4pm2q2f3qjc6u095e9kufsvud8sj.apps.googleusercontent.com">
          <Provider store={store}>
            <App />
          </Provider>
    </GoogleOAuthProvider>
);
reportWebVitals();
