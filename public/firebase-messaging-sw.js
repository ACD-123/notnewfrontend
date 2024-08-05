// this file must be in root folder
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js')

const firebaseConfig = {
    apiKey: "AIzaSyDhwdb-bBqsEJ_sDcHvDxGdUt6lxAiew4M",
    authDomain: "notnew-c6db4.firebaseapp.com",
    projectId: "notnew-c6db4",
    storageBucket: "notnew-c6db4.appspot.com",
    messagingSenderId: "849403615950",
    appId: "1:849403615950:web:0731572dafcf00d07a0e9f",
    measurementId: "G-8QCG9RKC92"
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
            icon: payload.data.icon,
            image: payload.data.image
        }
        self.registration.showNotification(notificationTitle, notificationOptions);
        self.addEventListener('notificationclick', function (event) {
            const clickedNotification = event.notification
            clickedNotification.close();
            event.waitUntil(
                clients.openWindow(payload.data.click_action)
            )
        })
    }
})