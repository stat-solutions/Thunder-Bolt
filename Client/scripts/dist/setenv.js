var writeFile = require('fs').writeFile;
var argv = require('yargs').argv;
// read environment variables from .env file
require('dotenv').config();
// require('dotenv').load();
// read the command line arguments passed with yargs
var environment = argv.environment;
var isProduction = environment === 'prod';
var targetPath = isProduction
    ? "./src/environments/environment.prod.ts"
    : "./src/environments/environment.ts";
var firebaseMessagingSwPath = "./src/firebase-messaging-sw.js";
// we have access to our environment variables
// in the process.env object thanks to dotenv
var environmentFileContent = "\nexport const environment = {\n   production: '" + isProduction + "',\n   apiUrl: '" + process.env.API_URL + "',\n    firebaseConfig : {\n     apiKey: '" + process.env.CLIENT_API_KEY + "',\n     authDomain: '" + process.env.CLIENT_AUTHDOMAIN + "',\n     databaseURL: '" + process.env.CLIENT_DATABASE_URL + "',\n     projectId: '" + process.env.CLIENT_PROJECT_ID + "',\n     storageBucket: '" + process.env.CLIENT_STORAGE_BUCKET + "',\n     messagingSenderId: '" + process.env.CLIENT_MESSAGING_SENDER_ID + "',\n     appId: '" + process.env.CLIENT_APP_ID + "',\n     measurementId: '" + process.env.CLIENT_MEASUREMENT_ID + "'\n   }\n };\n";
var firebaseMessagingSwContent = "\nimportScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-app.js');\nimportScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-messaging.js');\n\nfirebase.initializeApp({\n   apiKey: '" + process.env.CLIENT_API_KEY + "',\n   authDomain: '" + process.env.CLIENT_AUTHDOMAIN + "',\n   databaseURL: '" + process.env.CLIENT_DATABASE_URL + "',\n   projectId: '" + process.env.CLIENT_PROJECT_ID + "',\n   storageBucket: '" + process.env.CLIENT_STORAGE_BUCKET + "',\n   messagingSenderId: '" + process.env.CLIENT_MESSAGING_SENDER_ID + "',\n   appId: '" + process.env.CLIENT_APP_ID + "',\n   measurementId: '" + process.env.CLIENT_MEASUREMENT_ID + "'\n});\n\nconst messaging = firebase.messaging();\n";
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
        console.log(err);
    }
    console.log("Wrote variables to " + targetPath);
});
writeFile(firebaseMessagingSwPath, firebaseMessagingSwContent, function (err) {
    if (err) {
        console.log(err);
    }
    console.log("Wrote variables to " + firebaseMessagingSwPath);
});
