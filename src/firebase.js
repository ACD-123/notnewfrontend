import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect } from 'react';


var firebaseConfig = {
  apiKey: "AIzaSyDabamDXQWktkbaIjZIWbHSfQsUmVs96uA",
    authDomain: "notnew-2fd71.firebaseapp.com",
    projectId: "notnew-2fd71",
    storageBucket: "notnew-2fd71.appspot.com",
    messagingSenderId: "967971865445",
    appId: "1:967971865445:web:9910e8df867325bdde178c",
    measurementId: "G-Q1Q469FGFE"
};



const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging };

export const getTokenn = (setTokenFound , setFcmToken) => {
    return getToken(messaging, {vapidKey: 'BO985_9xZLIW-r1kN2-vTdfmg7LnDuq0S8-qUMSX4GikoITwdOByALoJ1SlDF-IugGjE-gARegNLuEWkr1wMVH0'}).then((currentToken) => {
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

