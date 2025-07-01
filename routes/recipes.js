const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const apiKey = process.env.API_KEY;

router.get('/random', async (req, res) => {
    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/random', {
            params: { apiKey }
        });
        res.json(response.data);
    } catch {
        res.status(500).json({ error: 'Failed to fetch random recipe' });
    }
});

router.get('/search', async (req, res) => {
    const ingredients = req.query.ingredients;
    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
            params: { apiKey, ingredients, number: 10 }
        });
        res.json(response.data);
    } catch {
        res.status(500).json({ error: 'Failed to search recipes' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM recipes');
        res.json(result.rows);
    } catch {
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});

router.post('/add', async (req, res) => {
    const { title, image, instructions, ingredients, readyIn } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO recipes (title, image, instructions, ingredients, readyIn) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, image, instructions, ingredients, readyIn]
        );
        res.status(201).json(result.rows[0]);
    } catch {
        res.status(500).json({ error: 'Failed to add recipe' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM recipes WHERE id = $1', [id]);
        res.json({ message: 'Recipe deleted successfully' });
    } catch {
        res.status(500).json({ error: 'Failed to delete recipe' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, image, instructions, ingredients, readyIn } = req.body;
    try {
        const result = await pool.query(
            'UPDATE recipes SET title=$1, image=$2, instructions=$3, ingredients=$4, readyIn=$5 WHERE id=$6 RETURNING *',
            [title, image, instructions, ingredients, readyIn, id]
        );
        res.json(result.rows[0]);
    } catch {
        res.status(500).json({ error: 'Failed to update recipe' });
    }
});

module.exports = router;
