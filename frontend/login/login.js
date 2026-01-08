import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from 
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful");
    window.location.href = "read.html";
  } catch (error) {
    alert(error.message);
  }
});
