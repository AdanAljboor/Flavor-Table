const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');

searchBtn.addEventListener('click', async () => {
  const ingredientsInput = document.getElementById('ingredientsInput').value;

  try {
    const token = getToken();

    const response = await fetch(`/recipes/search?ingredients=${ingredientsInput}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    resultsDiv.innerHTML = '';
    data.forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'recipe-card';
      card.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <button class="saveBtn">Save to Favorites</button>
      `;

      const saveBtn = card.querySelector('.saveBtn');
      saveBtn.addEventListener('click', async () => {
        try {
          const saveResponse = await fetch('/recipes/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              title: recipe.title,
              image: recipe.image,
              instructions: 'No instructions provided',
              ingredients: [],
              readyIn: 0
            })
          });

          const saveResult = await saveResponse.json();
          alert('Recipe saved successfully!');
        } catch (err) {
          alert('Failed to save recipe.');
        }
      });

      resultsDiv.appendChild(card);
    });

  } catch (err) {
    resultsDiv.innerHTML = 'Error fetching recipes.';
  }
});
