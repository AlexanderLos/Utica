// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSP2E84C2IZ0ZGhP1E72QRXNOthWkiV8w",
  authDomain: "utica-faa05.firebaseapp.com",
  projectId: "utica-faa05",
  storageBucket: "utica-faa05.appspot.com",
  messagingSenderId: "687679840771",
  appId: "1:687679840771:web:540189c10faf74a58b6436",
  measurementId: "G-XR028RG03K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Auth Provider
const provider = new GoogleAuthProvider();

// Select Account
provider.setCustomParameters({
    prompt : 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


