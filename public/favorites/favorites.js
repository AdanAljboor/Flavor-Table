window.addEventListener("DOMContentLoaded", async () => {
  const alertBox = document.getElementById("alertBox");
  const list = document.getElementById("favoritesList");
  const token = localStorage.getItem("token");

  if (!token) {
    showAlert("Please log in to view your favorites.", "warning");
    return;
  }

  showAlert("Loading your favorite recipes...", "info");

  try {
    const res = await fetch("/api/recipes/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      if (data.favorites.length === 0) {
        showAlert("You have no favorite recipes yet.", "warning");
        return;
      }

      hideAlert();

      data.favorites.forEach((recipe) => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.title}">
          <h3>${recipe.title}</h3>
          <p>${recipe.summary || "No summary available."}</p>
          <div class="button-group">
            <button onclick="deleteFavorite(${recipe.id})">Remove</button>
            <button onclick="viewDetails(${recipe.id})">View</button>
          </div>
        `;
        list.appendChild(card);
      });
    } else {
      showAlert(data.message || "Failed to load favorites.", "error");
    }
  } catch (err) {
    showAlert("Error fetching favorites.", "error");
  }
});

function viewDetails(id) {
  window.location.href = `../details/details.html?id=${id}`;
}

async function deleteFavorite(recipeId) {
  const alertBox = document.getElementById("alertBox");
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`/api/recipes/favorites/${recipeId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      showAlert("Recipe removed from favorites.", "success");
      setTimeout(() => location.reload(), 1000);
    } else {
      showAlert(data.message || "Failed to remove recipe.", "error");
    }
  } catch (err) {
    showAlert("Error removing favorite.", "error");
  }
}

function showAlert(message, type) {
  const alertBox = document.getElementById("alertBox");
  alertBox.className = `alert ${type}`;
  alertBox.textContent = message;
  alertBox.style.display = "block";
}

function hideAlert() {
  const alertBox = document.getElementById("alertBox");
  alertBox.style.display = "none";
}
