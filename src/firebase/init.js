import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDu6-IUAUYAbkMKl9kX6n3XJuVerUq-RVI",
  authDomain: "recipes-vue-b7981.firebaseapp.com",
  databaseURL: "https://recipes-vue-b7981.firebaseio.com",
  projectId: "recipes-vue-b7981",
  storageBucket: "recipes-vue-b7981.appspot.com",
  messagingSenderId: "319487414807",
  appId: "1:319487414807:web:d815ac19bbc5eff56b4252",
  measurementId: "G-VP2Y49WSZB"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

firebase.analytics();

export default firebaseApp.firestore()