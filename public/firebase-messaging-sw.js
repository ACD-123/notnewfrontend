// this file must be in root folder
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js')
import logo from './logo.png'

const firebaseConfig = {
    apiKey: "AIzaSyDtekaev2CZ96eEo4MsktOBJbPqzxpOXU4",
    authDomain: "notnew-f6d6c.firebaseapp.com",
    projectId: "notnew-f6d6c",
    storageBucket: "notnew-f6d6c.appspot.com",
    messagingSenderId: "873006556750",
    appId: "1:873006556750:web:ab6b34fb0fa90d688a851f",
    measurementId: "G-XWGGQ5S7ZH"
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