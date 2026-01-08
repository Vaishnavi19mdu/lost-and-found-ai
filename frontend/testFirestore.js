import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

async function testAdd() {
  await addDoc(collection(db, "lost_items"), {
    title,
  category,
  description,
  image: base64Image,
  isPrivate,            // 👈 NEW FIELD
  timestamp: serverTimestamp()
  });

  alert("Firestore working!");
}

testAdd();
