const searchBtn = document.getElementById('searchBtn');
const ingredientsInput = document.getElementById('ingredientsInput');
const resultsDiv = document.getElementById('results');


searchBtn.addEventListener('click', () => {
    const ingredients = ingredientsInput.value;

    if (ingredients.trim() === '') {
        alert('Please enter some ingredients.');
        return;
    }

    fetch(`/recipes/search?ingredients=${ingredients}`)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch recipes.');
        });
});


function displayResults(recipes) {
    resultsDiv.innerHTML = '';

    if (recipes.length === 0) {
        resultsDiv.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        recipeCard.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" width="200">
        `;

        resultsDiv.appendChild(recipeCard);
    });
}
