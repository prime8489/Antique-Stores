// Firebase Auth Functions
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(() => window.location.reload())
    .catch(err => console.error("Login error:", err));
}

function logout() {
  firebase.auth().signOut()
    .then(() => window.location.href = '/');
}

// Auth State Listener
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    document.getElementById('login-btn').style.display = 'none';
    document.getElementById('user-profile').style.display = 'block';
  } else {
    document.getElementById('login-btn').style.display = 'block';
    document.getElementById('user-profile').style.display = 'none';
  }
});
