import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const container = document.getElementById("items");

async function loadItems() {
  const q = query(collection(db, "lost_items"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const data = doc.data();
    const blurClass = data.isPrivate ? "blur" : "";

    const time = data.timestamp?.toDate
      ? data.timestamp.toDate().toLocaleString()
      : "Just now";

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      ${data.isPrivate ? `<span class="private-label">Private</span>` : ""}

      <img class="${blurClass}"
        src="${data.image
          ? `data:image/jpeg;base64,${data.image}`
          : "https://via.placeholder.com/300x180?text=No+Image"}" />

      <span class="tag">${data.category}</span>
      <h3>${data.title}</h3>
      <p class="${blurClass}">
        ${data.description || "No description"}
      </p>

      <div class="time">Reported: ${time}</div>
    `;

    container.appendChild(card);
  });
}

loadItems();
