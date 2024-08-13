// this file must be in root folder
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js')
import logo from './logo.png'

const firebaseConfig = {
    apiKey: "AIzaSyDabamDXQWktkbaIjZIWbHSfQsUmVs96uA",
    authDomain: "notnew-2fd71.firebaseapp.com",
    projectId: "notnew-2fd71",
    storageBucket: "notnew-2fd71.appspot.com",
    messagingSenderId: "967971865445",
    appId: "1:967971865445:web:9910e8df867325bdde178c",
    measurementId: "G-Q1Q469FGFE"
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