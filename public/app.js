const searchBtn = document.getElementById('searchBtn');
const ingredientsInput = document.getElementById('ingredientsInput');
const resultsDiv = document.getElementById('results');
const randomBtn = document.getElementById('randomBtn');
const randomResult = document.getElementById('randomResult');
const favoritesList = document.getElementById('favoritesList');

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const ingredients = ingredientsInput.value;
        if (ingredients.trim() === '') return;
        fetch(`/recipes/search?ingredients=${ingredients}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data);
            });
    });
}

function displayResults(recipes) {
    resultsDiv.innerHTML = '';
    if (recipes.length === 0) return;
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
    fetch('/recipes/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: recipe.title,
            image: recipe.image,
            instructions: recipe.instructions || '',
            ingredients: recipe.ingredients || [],
            readyIn: recipe.readyInMinutes || 0
        })
    });
}

function viewDetails(recipe) {
    localStorage.setItem('selectedRecipe', JSON.stringify(recipe));
    window.location.href = 'details.html';
}

function displayFavorites() {
    if (!favoritesList) return;
    fetch('/recipes/all')
        .then(response => response.json())
        .then(favorites => {
            favoritesList.innerHTML = '';
            if (favorites.length === 0) return;
            favorites.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.classList.add('recipe-card');
                recipeCard.innerHTML = `
                    <h3>${recipe.title}</h3>
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <div class="button-group">
                        <button data-id="${recipe.id}">Delete</button>
                    </div>
                `;
                favoritesList.appendChild(recipeCard);
                const removeButton = recipeCard.querySelector('button');
                removeButton.addEventListener('click', () => {
                    removeFavorite(recipe.id);
                });
            });
        });
}

if (favoritesList) {
    displayFavorites();
}

function removeFavorite(id) {
    fetch(`/recipes/${id}`, { method: 'DELETE' })
        .then(() => {
            displayFavorites();
        });
}
