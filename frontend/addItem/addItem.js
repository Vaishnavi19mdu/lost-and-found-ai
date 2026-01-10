import { db } from "../firebase.js";
import { collection, addDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("addForm");
const goToListBtn = document.getElementById("goToList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();
  const isPrivate = document.getElementById("isPrivate").checked;
  const file = document.getElementById("itemImage").files[0];

  if (!title || !category) {
    alert("Title and category are required!");
    return;
  }

  let base64Image = null;

  if (file) {
    const reader = new FileReader();
    reader.onload = async () => {
      base64Image = reader.result.split(",")[1];
      await saveItem();
    };
    reader.readAsDataURL(file);
  } else {
    await saveItem();
  }

  async function saveItem() {
    await addDoc(collection(db, "lost_items"), {
      title,
      category,
      description,
      image: base64Image,
      isPrivate,
      timestamp: serverTimestamp()
    });

    alert("Item added successfully!");
    window.location.href = "../listItems/listItems.html";
 // ✅ redirect
  }
});

// View Lost Items button (always works)
goToListBtn.addEventListener("click", () => {
  window.location.href = "../listItems/listItems.html";
});
