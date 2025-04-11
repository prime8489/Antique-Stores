
// Firebase imports (add these to your HTML first)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAYShpNcMmwAIOsCbgm4GrHeuYAN6TqJUs",
  authDomain: "test-store-214d2.firebaseapp.com",
  projectId: "test-store-214d2",
  storageBucket: "test-store-214d2.appspot.com",
  messagingSenderId: "36486114033",
  appId: "1:36486114033:web:aa87eb9ddfa0b5d10a5750"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Sign-In
window.googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    window.location.href = '/';
  } catch (error) {
    console.error("Google sign-in error:", error);
    alert(`Login failed: ${error.message}`);
  }
};

// Logout
window.logout = () => {
  signOut(auth).then(() => {
    window.location.href = '/login';
  });
};

// Auth State Listener
onAuthStateChanged(auth, (user) => {
  const authSection = document.getElementById('auth-section');
  const userSection = document.getElementById('user-section');
  
  if (user) {
    authSection.style.display = 'none';
    userSection.style.display = 'block';
    document.getElementById('user-name').textContent = user.displayName || 'User';
  } else {
    authSection.style.display = 'block';
    userSection.style.display = 'none';
  }
});
