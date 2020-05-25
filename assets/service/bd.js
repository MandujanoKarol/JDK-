// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAQx6xtPF0v7aU_2XoRoG20IkyUBoovjKQ",
    authDomain: "jdk-pigmento.firebaseapp.com",
    databaseURL: "https://jdk-pigmento.firebaseio.com",
    projectId: "jdk-pigmento",
    storageBucket: "jdk-pigmento.appspot.com",
    messagingSenderId: "489237332925",
    appId: "1:489237332925:web:9f4221ce0e3b410f51c8d4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth(); 
  const db = firebase.firestore(); 