window.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const recipeId = params.get("id");
  const alertBox = document.getElementById("alertBox");
  const container = document.getElementById("detailsContainer");

  if (!recipeId) {
    alertBox.className = "alert error";
    alertBox.textContent = "Invalid recipe ID.";
    alertBox.style.display = "block";
    return;
  }

  alertBox.className = "alert info";
  alertBox.textContent = "Loading recipe details...";
  alertBox.style.display = "block";

  try {
    const res = await fetch(`/api/recipes/details/${recipeId}`);
    const data = await res.json();

    if (res.ok) {
      const recipe = data.recipe;
      container.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" />
        <h3>${recipe.title}</h3>
        <p><strong>Ready In:</strong> ${recipe.readyInMinutes} minutes</p>
        <p>${recipe.instructions || "No instructions available."}</p>
      `;
      alertBox.style.display = "none";
    } else {
      alertBox.className = "alert error";
      alertBox.textContent = data.message || "Failed to load recipe.";
    }
  } catch (err) {
    alertBox.className = "alert error";
    alertBox.textContent = "Error loading recipe details.";
  }
});
