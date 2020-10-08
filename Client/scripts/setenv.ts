const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// require('dotenv').load();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;
const firebaseMessagingSwPath = `./src/firebase-messaging-sw.js`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: '${isProduction}',
   apiUrl: '${process.env.API_URL}',
    firebaseConfig : {
     apiKey: '${process.env.CLIENT_API_KEY}',
     authDomain: '${process.env.CLIENT_AUTHDOMAIN}',
     databaseURL: '${process.env.CLIENT_DATABASE_URL}',
     projectId: '${process.env.CLIENT_PROJECT_ID}',
     storageBucket: '${process.env.CLIENT_STORAGE_BUCKET}',
     messagingSenderId: '${process.env.CLIENT_MESSAGING_SENDER_ID}',
     appId: '${process.env.CLIENT_APP_ID}',
     measurementId: '${process.env.CLIENT_MEASUREMENT_ID}'
   }
 };
`;

const firebaseMessagingSwContent = `
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js');

firebase.initializeApp({
   apiKey: '${process.env.CLIENT_API_KEY}',
   authDomain: '${process.env.CLIENT_AUTHDOMAIN}',
   databaseURL: '${process.env.CLIENT_DATABASE_URL}',
   projectId: '${process.env.CLIENT_PROJECT_ID}',
   storageBucket: '${process.env.CLIENT_STORAGE_BUCKET}',
   messagingSenderId: '${process.env.CLIENT_MESSAGING_SENDER_ID}',
   appId: '${process.env.CLIENT_APP_ID}',
   measurementId: '${process.env.CLIENT_MEASUREMENT_ID}'
});

const messaging = firebase.messaging();
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, (err) =>  {
   if (err) {
      console.log(err);
   }
   console.log(`Wrote variables to ${targetPath}`);
});

writeFile(firebaseMessagingSwPath, firebaseMessagingSwContent, (err) =>  {
   if (err) {
      console.log(err);
   }
   console.log(`Wrote variables to ${firebaseMessagingSwPath}`);
});
