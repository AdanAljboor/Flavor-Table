const form = document.getElementById('editForm');
const titleInput = document.getElementById('title');
const imageInput = document.getElementById('image');
const instructionsInput = document.getElementById('instructions');
const ingredientsInput = document.getElementById('ingredients');
const readyInInput = document.getElementById('readyIn');

const params = new URLSearchParams(window.location.search);
const recipeId = params.get('id');

const token = getToken();

fetch(`/recipes/all`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
    .then(response => response.json())
    .then(recipes => {
        const recipe = recipes.find(r => r.id == recipeId);
        if (recipe) {
            titleInput.value = recipe.title;
            imageInput.value = recipe.image;
            instructionsInput.value = recipe.instructions;
            ingredientsInput.value = Array.isArray(recipe.ingredients) ? recipe.ingredients.join(',') : recipe.ingredients;
            readyInInput.value = recipe.readyIn;
        }
    });

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const updatedRecipe = {
        title: titleInput.value,
        image: imageInput.value,
        instructions: instructionsInput.value,
        ingredients: ingredientsInput.value.split(',').map(i => i.trim()),
        readyIn: parseInt(readyInInput.value) || 0
    };

    fetch(`/recipes/${recipeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedRecipe)
    })
        .then(response => response.json())
        .then(data => {
            alert('Recipe updated successfully');
            window.location.href = 'favorites.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to update recipe.');
        });
});
