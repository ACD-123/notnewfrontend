import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect } from 'react';


var firebaseConfig = {
  apiKey: "AIzaSyBQneFmYicGtLWBBEqAEUCjOs7ytqDAqng",
  authDomain: "notnew-9f938.firebaseapp.com",
  projectId: "notnew-9f938",
  storageBucket: "notnew-9f938.appspot.com",
  messagingSenderId: "937173650105",
  appId: "1:937173650105:web:922d81b9168f6ce6fc2968",
  measurementId: "G-Z5LVP4PZVB"
};



const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging };

export const getTokenn = (setTokenFound , setFcmToken) => {
    return getToken(messaging, {vapidKey: 'BEuIDgKRn_rOIg_8fq-EwLbxef5DcTd9jV51hQTakfeD8Y1lH4-8HJ48V1ygI-pR2e_-0jMn1_pjUsNNzRg0XRs'}).then((currentToken) => {
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

