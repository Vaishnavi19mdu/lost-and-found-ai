import { auth, db } from "../../firebase.js";
import { createUserWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const nameInput = document.getElementById("name");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const name = nameInput.value.trim();

  if (!email.endsWith("@abc.net")) {
    alert("Signup restricted to @abc.net emails only.");
    return;
  }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    const userRef = doc(db, "newusers", user.uid);
    await setDoc(userRef, {
      name: name,
      email: email,
      role: "user",
      createdAt: serverTimestamp()   // ✅ Firestore auto-fills server time
    });

    alert("Signup successful! You can now log in.");
    window.location.href = "../login/login.html";

  } catch (err) {
    console.error(err);
    alert("Signup failed: " + err.message);
  }
});
