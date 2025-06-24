const searchBtn = document.getElementById('searchBtn');
const ingredientsInput = document.getElementById('ingredientsInput');
const resultsDiv = document.getElementById('results');
const randomBtn = document.getElementById('randomBtn');
const randomResult = document.getElementById('randomResult');
const favoritesList = document.getElementById('favoritesList');

if (searchBtn) {
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
}

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
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="button-group">
                <button>Add to Favorites</button>
                <button>View Details</button>
            </div>
        `;

        resultsDiv.appendChild(recipeCard);

        const addButton = recipeCard.querySelector('button:first-of-type');
        const detailsButton = recipeCard.querySelector('button:last-of-type');

        addButton.addEventListener('click', () => {
            addToFavorites(recipe);
        });

        detailsButton.addEventListener('click', () => {
            viewDetails(recipe);
        });
    });
}

if (randomBtn) {
    randomBtn.addEventListener('click', () => {
        fetch('/recipes/random')
            .then(response => response.json())
            .then(data => {
                displayRandomRecipe(data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to fetch random recipe.');
            });
    });
}

function displayRandomRecipe(data) {
    const recipe = data.recipes[0];

    randomResult.innerHTML = '';

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');

    recipeCard.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}">
        <div class="button-group">
            <button>Add to Favorites</button>
            <button>View Details</button>
        </div>
    `;

    randomResult.appendChild(recipeCard);

    const addButton = recipeCard.querySelector('button:first-of-type');
    const detailsButton = recipeCard.querySelector('button:last-of-type');

    addButton.addEventListener('click', () => {
        addToFavorites(recipe);
    });

    detailsButton.addEventListener('click', () => {
        viewDetails(recipe);
    });
}

function addToFavorites(recipe) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(recipe);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Recipe added to favorites!');
}

function viewDetails(recipe) {
    localStorage.setItem('selectedRecipe', JSON.stringify(recipe));
    window.location.href = 'details.html';
}

function displayFavorites() {
    if (!favoritesList) return;

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p>No favorite recipes saved.</p>';
        return;
    }

    favorites.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        recipeCard.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="button-group">
                <button data-index="${index}">Remove</button>
            </div>
        `;

        favoritesList.appendChild(recipeCard);

        const removeButton = recipeCard.querySelector('button');
        removeButton.addEventListener('click', () => {
            removeFavorite(index);
        });
    });
}

if (favoritesList) {
    displayFavorites();
}

function removeFavorite(index) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}
