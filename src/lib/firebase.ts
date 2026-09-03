import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// This is the standard public web config for the shared hae-vuma-92fca
// Firebase project (also used by Ekhaya Connect). It is safe to expose
// client-side — access is controlled by Firestore security rules, not
// by keeping this config secret.
const firebaseConfig = {
  apiKey: "AIzaSyArT-MPWtz1HpvtFh4CKy6_1fG3yLcuA9k",
  authDomain: "hae-vuma-92fca.firebaseapp.com",
  projectId: "hae-vuma-92fca",
  storageBucket: "hae-vuma-92fca.firebasestorage.app",
  messagingSenderId: "1052424261313",
  appId: "1:1052424261313:web:79c6f30dbc23140ffa0e40",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
