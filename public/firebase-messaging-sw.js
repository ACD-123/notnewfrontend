// this file must be in root folder
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js')
import logo from './logo.png'

const firebaseConfig = {
    apiKey: "AIzaSyBQneFmYicGtLWBBEqAEUCjOs7ytqDAqng",
    authDomain: "notnew-9f938.firebaseapp.com",
    projectId: "notnew-9f938",
    storageBucket: "notnew-9f938.appspot.com",
    messagingSenderId: "937173650105",
    appId: "1:937173650105:web:922d81b9168f6ce6fc2968",
    measurementId: "G-Z5LVP4PZVB"
};

// receiving messages in background
const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

// get this type of message in background
messaging.onBackgroundMessage(function (payload) {
    if (!payload.hasOwnProperty('notification')) {
        const notificationTitle = payload.data.title
        const notificationOptions = {
            body: payload.data.body,
            icon: 'https://themerchantinc.com/assets/images/logo.png',
            image: 'https://themerchantinc.com/assets/images/logo.png',
            click_action : payload.data.click_action
        }
        self.registration.showNotification(notificationTitle, notificationOptions);
        self.addEventListener('notificationclick', function (event) {
            const clickedNotification = event.notification
            console.log(payload.data , 'payload.data');
            
            clickedNotification.close();
            event.waitUntil(
                clients.openWindow(payload.data.click_action)
            )
        })
    }
})