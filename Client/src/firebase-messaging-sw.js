
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js');

firebase.initializeApp({
   apiKey: 'undefined',
   authDomain: 'undefined',
   databaseURL: 'undefined',
   projectId: 'undefined',
   storageBucket: 'undefined',
   messagingSenderId: 'undefined',
   appId: 'undefined',
   measurementId: 'undefined'
});

const messaging = firebase.messaging();
