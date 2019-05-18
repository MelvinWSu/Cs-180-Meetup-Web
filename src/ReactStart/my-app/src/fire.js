import firebase from 'firebase'
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBiAKB1Wt-wz7QVaw0xNBKo5P6EkJ2iNGg",
    authDomain: "cs-180-untitled-meetup-web.firebaseapp.com",
    databaseURL: "https://cs-180-untitled-meetup-web.firebaseio.com",
    projectId: "cs-180-untitled-meetup-web",
    storageBucket: "cs-180-untitled-meetup-web.appspot.com",
    messagingSenderId: "634943030996"
  };
  var fire = firebase.initializeApp(config);
  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export default fire;