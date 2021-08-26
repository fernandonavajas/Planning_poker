// configure Firebase
const firebase = require('firebase/app');

// Add the Firebase products that you want to use
require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyAOdCob6OdwIiJ-2W4GD24Sx39FV3poIxk",
  authDomain: "fresh-entity-321713.firebaseapp.com",
  projectId: "fresh-entity-321713",
  databaseURL: "https://fresh-entity-321713-default-rtdb.firebaseio.com",
  storageBucket: "fresh-entity-321713.appspot.com",
  messagingSenderId: "433426133062",
  appId: "1:433426133062:web:d5a00750f43ef6b6395a47",
  measurementId: "G-V6DQDVYGBC"
};

firebase.initializeApp(firebaseConfig);
// Get a reference to the database service

exports.db = firebase.database();