const express = require("express");
const router = express.Router();
const db = require("../db");
const authenticate = require("../middleware/authenticate");
const axios = require("axios");

router.get("/search", async (req, res) => {
  const { ingredients } = req.query;
  console.log("Ingredients received:", ingredients);

  if (!ingredients) {
    return res.status(400).json({ message: "Missing ingredients" });
  }

  try {
    const apiKey = process.env.SPOONACULAR_API_KEY;
    console.log("Using API Key:", apiKey);

    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients`,
      {
        params: {
          ingredients,
          number: 10,
          apiKey,
        },
      }
    );
    res.json({ recipes: response.data });
  } catch (err) {
    console.error("Spoonacular error:", err.response?.data || err.message);
    res.status(500).json({ message: "Failed to search recipes." });
  }
});

router.get("/details/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information`,
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );
    const recipe = response.data;
    res.json({
      recipe: {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        instructions: recipe.instructions,
        readyInMinutes: recipe.readyInMinutes,
        summary: recipe.summary,
        ingredients: recipe.extendedIngredients.map((i) => i.original).join(", ")
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to get recipe details." });
  }
});

router.get("/random", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random`,
      {
        params: {
          number: 1,
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );
    res.json({ recipe: response.data.recipes[0] });
  } catch (err) {
    res.status(500).json({ message: "Failed to get random recipe." });
  }
});

router.post("/favorites", authenticate, async (req, res) => {
  const { recipeId } = req.body;
  const userId = req.user.id;

  try {
    await db.query(
      "INSERT INTO favorites (user_id, recipe_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [userId, recipeId]
    );
    res.json({ message: "Recipe added to favorites." });
  } catch (err) {
    console.error("Add to favorites error:", err.message);
    res.status(500).json({ message: "Failed to add to favorites." });
  }
});

router.get("/favorites", authenticate, async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await db.query(
      "SELECT * FROM favorites WHERE user_id = $1",
      [userId]
    );

    const recipeDetails = await Promise.all(
      result.rows.map(async (row) => {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${row.recipe_id}/information`,
          {
            params: { apiKey: process.env.SPOONACULAR_API_KEY },
          }
        );
        return {
          id: response.data.id,
          title: response.data.title,
          image: response.data.image,
          summary: response.data.summary,
        };
      })
    );

    res.json({ favorites: recipeDetails });
  } catch (err) {
    res.status(500).json({ message: "Failed to get favorites." });
  }
});

router.delete("/favorites/:id", authenticate, async (req, res) => {
  const userId = req.user.id;
  const recipeId = req.params.id;
  try {
    await db.query(
      "DELETE FROM favorites WHERE user_id = $1 AND recipe_id = $2",
      [userId, recipeId]
    );
    res.json({ message: "Recipe removed from favorites." });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove favorite." });
  }
});

router.put("/edit/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, image, instructions, ingredients, readyInMinutes } = req.body;

  try {
    await db.query(
      `UPDATE custom_recipes
       SET title = $1, image = $2, instructions = $3, ingredients = $4, ready_in_minutes = $5
       WHERE id = $6 AND user_id = $7`,
      [title, image, instructions, ingredients, readyInMinutes, id, req.user.id]
    );
    res.json({ message: "Recipe updated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to update recipe." });
  }
});

module.exports = router;
