const express = require('express')

const router = express.Router()

const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()

const apiKey = process.env.API_KEY;


router.get('/random', async (req, res) => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/random`, {
            params: {
                apiKey: apiKey,
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch random recipe' });
    }
});

router.get('/search', async (req, res) => {
    const ingredients = req.query.ingredients;

    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
            params: {
                apiKey: apiKey,
                ingredients: ingredients,
                number: 10 
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to search recipes' });
    }
});

module.exports = router;

