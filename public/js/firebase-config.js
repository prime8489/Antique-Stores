import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAYShpNcMmwAIOsCbgm4GrHeuYAN6TqJUs",
  authDomain: "test-store-214d2.firebaseapp.com",
  projectId: "test-store-214d2",
  storageBucket: "test-store-214d2.appspot.com",
  messagingSenderId: "36486114033",
  appId: "1:36486114033:web:aa87eb9ddfa0b5d10a5750"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
