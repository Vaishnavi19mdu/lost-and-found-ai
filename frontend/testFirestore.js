import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

async function testAdd() {
  await addDoc(collection(db, "lost_items"), {
    title: "Black ID Card",
    description: "Lost near library",
    category: "ID Card",
    location: "Main Library",
    status: "open",
    createdAt: serverTimestamp()
  });

  alert("Firestore working!");
}

testAdd();
