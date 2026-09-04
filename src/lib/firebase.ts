import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, getFirestore } from "firebase/firestore";
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

// ignoreUndefinedProperties: without this, Firestore throws whenever a
// write includes a field set to `undefined` (e.g. an optional form field
// left blank) — easy to hit accidentally, and the failure happens before
// security rules are even evaluated. This makes it silently drop those
// fields instead, which is what every write in this app actually wants.
// The try/catch handles hot-reload in dev, where Firestore may already
// have been initialized for this app instance — initializeFirestore
// throws in that case, so we just fall back to the existing instance.
let dbInstance;
try {
  dbInstance = initializeFirestore(app, { ignoreUndefinedProperties: true });
} catch {
  dbInstance = getFirestore(app);
}
export const db = dbInstance;
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
