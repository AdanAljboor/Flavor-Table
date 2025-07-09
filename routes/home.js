const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const db = require("../db");

router.get("/", (req, res) => {
  res.send("Welcome to the Flavor Table API");
});

router.get("/custom", authenticate, async (req, res) => {
  const userId = req.userId;
  try {
    const result = await db.query(
      "SELECT * FROM custom_recipes WHERE user_id = $1",
      [userId]
    );
    res.json({ recipes: result.rows });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch custom recipes." });
  }
});

router.post("/custom", authenticate, async (req, res) => {
  const { title, image, instructions, ingredients, readyInMinutes } = req.body;
  const userId = req.userId;
  try {
    const result = await db.query(
      `INSERT INTO custom_recipes 
      (user_id, title, image, instructions, ingredients, ready_in_minutes)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [userId, title, image, instructions, ingredients, readyInMinutes]
    );
    res.status(201).json({ recipe: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: "Failed to add custom recipe." });
  }
});

module.exports = router;
