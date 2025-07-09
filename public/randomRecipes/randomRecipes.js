document.addEventListener("DOMContentLoaded", () => {
  const randomBtn = document.getElementById("randomBtn");
  const resultDiv = document.getElementById("randomResult");

  randomBtn.addEventListener("click", async () => {
    try {
      const response = await fetch("/api/recipes/random");
      const data = await response.json();

      if (response.ok) {
        const recipe = data.recipe;
        resultDiv.innerHTML = `
          <div class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.title}" />
            <h3>${recipe.title}</h3>
            <p>${recipe.summary || "No summary available."}</p>
            <div class="button-group">
              <button onclick="viewDetails(${recipe.id})">View Details</button>
            </div>
          </div>
        `;
      } else {
        resultDiv.innerHTML = `<p class="alert error">${data.message || "Failed to get recipe."}</p>`;
      }
    } catch (err) {
      resultDiv.innerHTML = `<p class="alert error">Error fetching recipe.</p>`;
    }
  });
});

function viewDetails(id) {
  window.location.href = `../details/details.html?id=${id}`;
}
