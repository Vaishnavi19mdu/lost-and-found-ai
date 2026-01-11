import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyD27G59Rzdj2E-uN4MG--d9RonbBGrVK7g",
  authDomain: "lost-and-found-ai-5b9a3.firebaseapp.com",
  projectId: "lost-and-found-ai-5b9a3",
  storageBucket: "lost-and-found-ai-5b9a3.appspot.com",   // ✅ add this line
  appId: "1:269719335424:web:6f7a9a4d4e1d643aaf5ee5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);   // ✅ export storage

console.log("Project ID:", app.options.projectId);
