window.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const recipeId = params.get("id");
  const token = localStorage.getItem("token");
  const alertBox = document.getElementById("alertBox");

  if (!token || !recipeId) {
    alertBox.className = "alert error";
    alertBox.textContent = "Missing token or recipe ID.";
    alertBox.style.display = "block";
    return;
  }

  try {
    const res = await fetch(`/api/recipes/details/${recipeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (res.ok) {
      const recipe = data.recipe;
      document.getElementById("title").value = recipe.title;
      document.getElementById("image").value = recipe.image;
      document.getElementById("instructions").value = recipe.instructions;
      document.getElementById("ingredients").value = recipe.ingredients;
      document.getElementById("readyIn").value = recipe.readyInMinutes;
    } else {
      alertBox.className = "alert error";
      alertBox.textContent = data.message || "Failed to load recipe.";
      alertBox.style.display = "block";
    }
  } catch (err) {
    alertBox.className = "alert error";
    alertBox.textContent = "Error loading recipe details.";
    alertBox.style.display = "block";
  }
});

document.getElementById("editForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const params = new URLSearchParams(window.location.search);
  const recipeId = params.get("id");
  const token = localStorage.getItem("token");

  const title = document.getElementById("title").value.trim();
  const image = document.getElementById("image").value.trim();
  const instructions = document.getElementById("instructions").value.trim();
  const ingredients = document.getElementById("ingredients").value.trim();
  const readyInMinutes = document.getElementById("readyIn").value.trim();

  const alertBox = document.getElementById("alertBox");

  try {
    const res = await fetch(`/api/recipes/edit/${recipeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        image,
        instructions,
        ingredients,
        readyInMinutes
      })
    });

    const data = await res.json();

    if (res.ok) {
      alertBox.className = "alert success";
      alertBox.textContent = "Recipe updated successfully.";
      alertBox.style.display = "block";
      setTimeout(() => {
        window.location.href = "../favorites/favorites.html";
      }, 1500);
    } else {
      alertBox.className = "alert error";
      alertBox.textContent = data.message || "Failed to update recipe.";
      alertBox.style.display = "block";
    }
  } catch (err) {
    alertBox.className = "alert error";
    alertBox.textContent = "Error updating recipe.";
    alertBox.style.display = "block";
  }
});
