import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDoaLYXTe7Lc9vM_SmgNv2H5cBY8UWuzok",
    authDomain: "imessage-clone-4537d.firebaseapp.com",
    projectId: "imessage-clone-4537d",
    storageBucket: "imessage-clone-4537d.appspot.com",
    messagingSenderId: "362122968360",
    appId: "1:362122968360:web:d6efba2eae2c47d6da241d",
    measurementId: "G-58SLW5XDK6"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export {auth, provider}
  export default db