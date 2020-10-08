
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js');

firebase.initializeApp({
   apiKey: 'AIzaSyAOs-wndIMpwXD_rs2F3iVXdHg5dlAYqhc',
   authDomain: 'thunder-bolt-44c4d.firebaseapp.com',
   databaseURL: 'https://thunder-bolt-44c4d.firebaseio.com',
   projectId: 'thunder-bolt-44c4d',
   storageBucket: 'thunder-bolt-44c4d.appspot.com',
   messagingSenderId: '182784916030',
   appId: '1:182784916030:web:f165f866a5371a7992af6f',
   measurementId: 'G-Q94X5ERBGV'
});

const messaging = firebase.messaging();
