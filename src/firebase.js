import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";


var firebaseConfig = {
    apiKey: "AIzaSyDhwdb-bBqsEJ_sDcHvDxGdUt6lxAiew4M",
    authDomain: "notnew-c6db4.firebaseapp.com",
    projectId: "notnew-c6db4",
    storageBucket: "notnew-c6db4.appspot.com",
    messagingSenderId: "849403615950",
    appId: "1:849403615950:web:0731572dafcf00d07a0e9f",
    measurementId: "G-8QCG9RKC92"
};



const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getTokenn = (setTokenFound) => {
    return getToken(messaging, {vapidKey: 'BAb_mhZYBljErQxQ7d0-AP0XrccPsvYpjumUJpK4x-NesoNyoaTDtWWJuB_y3x5EGLIuFZO6Mpx3cTwDW1-Nq6o'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
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