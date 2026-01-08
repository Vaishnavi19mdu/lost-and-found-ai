import { db } from "../firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById("submitBtn").addEventListener("click", async () => {
  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value.trim();
  const description = document.getElementById("description").value.trim();
  const isPrivate = document.getElementById("isPrivate").checked;
  


  if (!title || !category) {
    alert("Title and category are required!");
    return;
  }

  try {
    await addDoc(collection(db, "lost_items"), {
      title,
      category,
      description,
      isPrivate: isPrivate,
      timestamp: new Date()
    });

    alert("Item added successfully!");

    // optional: clear form
    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";

  } catch (error) {
    console.error("Error adding item:", error);
    alert("Failed to add item.");
  }
});
