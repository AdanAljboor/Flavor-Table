document.getElementById("searchBtn").addEventListener("click", async () => {
  const ingredients = document.getElementById("ingredientsInput").value.trim();
  const alertBox = document.getElementById("alertBox");
  const results = document.getElementById("results");

  results.innerHTML = "";
  alertBox.className = "alert info";
  alertBox.textContent = "Searching for recipes...";
  alertBox.style.display = "block";

  try {
    const res = await fetch(`/api/recipes/search?ingredients=${ingredients}`);
    const data = await res.json();

    if (res.ok) {
      if (data.recipes.length === 0) {
        alertBox.className = "alert warning";
        alertBox.textContent = "No recipes found. Try different ingredients.";
        return;
      }

      alertBox.className = "alert success";
      alertBox.textContent = `${data.recipes.length} recipes found.`;

      data.recipes.forEach((recipe) => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.title}">
          <h3>${recipe.title}</h3>
          <p>${recipe.summary || "No summary available."}</p>
          <div class="button-group">
            <button onclick="viewDetails(${recipe.id})">View Details</button>
            <button onclick="addToFavorites(${recipe.id})">Add to Favorites</button>
          </div>
        `;
        results.appendChild(card);
      });
    } else {
      alertBox.className = "alert error";
      alertBox.textContent = data.message || "Search failed.";
    }
  } catch (err) {
    alertBox.className = "alert error";
    alertBox.textContent = "An error occurred during search.";
  }

  alertBox.style.display = "block";
});

function viewDetails(id) {
  window.location.href = `details/details.html?id=${id}`;
}

async function addToFavorites(recipeId) {
  const token = localStorage.getItem("token");
  const alertBox = document.getElementById("alertBox");

  if (!token) {
    alertBox.className = "alert warning";
    alertBox.textContent = "Please log in to add recipes to favorites.";
    alertBox.style.display = "block";
    return;
  }

  try {
    const res = await fetch("/api/recipes/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ recipeId }),
    });

    const data = await res.json();

    if (res.ok) {
      alertBox.className = "alert success";
      alertBox.textContent = "Recipe added to favorites.";
    } else {
      alertBox.className = "alert error";
      alertBox.textContent = data.message || "Failed to add to favorites.";
    }
  } catch (err) {
    alertBox.className = "alert error";
    alertBox.textContent = "Error adding recipe to favorites.";
  }

  alertBox.style.display = "block";
}
