import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

const createUserDocument = async (user) => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const { displayName, email } = user;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
};

export const signInWithGooglePopup = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  await createUserDocument(user);
  return user;
};

export { auth, analytics, db };
