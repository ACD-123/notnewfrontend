import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect } from 'react';


var firebaseConfig = {
  apiKey: "AIzaSyDtekaev2CZ96eEo4MsktOBJbPqzxpOXU4",
  authDomain: "notnew-f6d6c.firebaseapp.com",
  projectId: "notnew-f6d6c",
  storageBucket: "notnew-f6d6c.appspot.com",
  messagingSenderId: "873006556750",
  appId: "1:873006556750:web:ab6b34fb0fa90d688a851f",
  measurementId: "G-XWGGQ5S7ZH"
};



const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging };

export const getTokenn = (setTokenFound , setFcmToken) => {
    return getToken(messaging, {vapidKey: 'BBErgfLoa5J8YWS24h7UsSOr1Q-laL99-D_1AFR6IhdL3kaoN3cS4oaHzlKeBBLzUcZ6jt_UQrhWhuz7w-ky1HA'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        setFcmToken(currentToken)
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }

