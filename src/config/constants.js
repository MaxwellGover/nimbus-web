import firebase from 'firebase';

firebase.initializeApp({
   apiKey: "AIzaSyDywXTWrg3zJBqkOqdbTcXF13Xf7bfK56s",
   authDomain: "nimbus-71034.firebaseapp.com",
   databaseURL: "https://nimbus-71034.firebaseio.com",
   projectId: "nimbus-71034",
   storageBucket: "nimbus-71034.appspot.com",
   messagingSenderId: "4523931473"
 });

 const db = firebase.database();
 const firebaseAuth = firebase.auth();
 const storage = firebase.storage();
 const storageRef = storage.ref();
 const audioRef = storageRef.child('audio');

 export { db, firebaseAuth, storageRef }
