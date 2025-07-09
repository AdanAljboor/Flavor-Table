# Flavor Table 🍽️

https://flavor-table-xh1b.onrender.com

A simple full-stack recipe app built using Node.js, Express, PostgreSQL, and the Spoonacular API.

---

## 🌟 Features

-  Search for recipes by ingredients
-  Get random recipe suggestions
-  Save favorite recipes (with database support)
-  View detailed recipe info
-  Edit and delete saved recipes
-  User registration & login with JWT

---

## 🚀 How to Run the Project

### Part 1 (Basic Functionality)
1. Clone the repository.
2. In the terminal, run:
   ```bash
   npm install
   ```
3. Create a `.env` file and add:
   ```
   SPOONACULAR_API_KEY=your_api_key
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   node server.js
   ```
5. Open your browser at:
   ```
   http://localhost:3000
   ```

---

### Part 2 (Database Integration)

1. Start your PostgreSQL server.
2. Create a database:
   ```sql
   CREATE DATABASE flavor_table;
   ```
3. Create a `favorites` table:
   ```sql
   CREATE TABLE favorites (
     id SERIAL PRIMARY KEY,
     user_id INTEGER NOT NULL,
     recipe_id INTEGER NOT NULL,
     UNIQUE (user_id, recipe_id)
   );
   ```
4. Fill in `.env` with your DB URL:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/flavor_table
   ```
5. In terminal, run:
   ```bash
   node server.js
   ```
6. Open `index.html` to interact with the app

---

##  Technologies Used

- Node.js
- Express.js
- PostgreSQL
- HTML / CSS / JavaScript
- Spoonacular API

---

##  Challenges Faced

- Connecting frontend to the database
- Testing APIs with Postman
- Handling async/await and JSON responses

---

##  Time to Complete

- ~5–6 hours (including setup and testing)

---

##  Notes

- Axios is used for all API calls
- Favorite recipes are now stored in the database instead of localStorage
- Alerts used for feedback (success, error, warning, info)
