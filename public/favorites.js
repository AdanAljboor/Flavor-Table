const favoritesList = document.getElementById('favoritesList');

function fetchFavorites() {
    const token = getToken();

    fetch('/recipes/all', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            displayFavorites(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch favorite recipes.');
        });
}

function displayFavorites(recipes) {
    favoritesList.innerHTML = '';

    if (recipes.length === 0) {
        favoritesList.innerHTML = '<p>No favorite recipes found.</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        recipeCard.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p>${recipe.instructions}</p>
            <div class="button-group">
                <button class="delete-btn" data-id="${recipe.id}">Delete</button>
                <button class="edit-btn" data-id="${recipe.id}">Edit</button>
            </div>
        `;

        favoritesList.appendChild(recipeCard);

        const deleteBtn = recipeCard.querySelector('.delete-btn');
        const editBtn = recipeCard.querySelector('.edit-btn');

        deleteBtn.addEventListener('click', () => {
            deleteRecipe(recipe.id);
        });

        editBtn.addEventListener('click', () => {
            window.location.href = `editRecipe.html?id=${recipe.id}`;
        });
    });
}

function deleteRecipe(id) {
    const token = getToken();

    fetch(`/recipes/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchFavorites();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to delete recipe.');
        });
}

fetchFavorites();
