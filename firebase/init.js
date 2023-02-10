import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCDhqHwXN4ubo7n_FL-J88wRiPRhNGiLxM",
    authDomain: "tsl-stream.firebaseapp.com",
    databaseURL: "https://tsl-stream-default-rtdb.firebaseio.com",
    projectId: "tsl-stream",
    storageBucket: "tsl-stream.appspot.com",
    messagingSenderId: "579356611529",
    appId: "1:579356611529:web:be56c18888a9ab5ad84e18"
  };

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// getFirestore.settings({ experimentalForceLongPolling: true });

export const db = getFirestore(firebaseApp);