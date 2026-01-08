import { db } from "../firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function loadItems() {
  const container = document.getElementById("items");

  const querySnapshot = await getDocs(collection(db, "lost_items"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const div = document.createElement("div");
    div.className = "item-card";

    const time = data.timestamp?.toDate
      ? data.timestamp.toDate().toLocaleString()
      : "Just now";

    div.innerHTML = `
      <h3>${data.title}</h3>
      <span class="category">${data.category}</span>
      <p class="description">${data.description}</p>
      <div class="time">Reported: ${time}</div>
    `;

    container.appendChild(div);
  });
}

loadItems();
