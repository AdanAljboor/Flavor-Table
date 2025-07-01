# Flavor Table

This is a simple recipe search application built using Node.js, Express, and the Spoonacular API.

## What the project does:

- Search for recipes by ingredients
- Get a random recipe suggestion
- Save favorite recipes using local storage
- View detailed information for selected recipes

## How to run the project:

1. Open the terminal
2. Run:
npm install
3. Add your Spoonacular API key to a `.env` file:
4. Run the server:
 npm start
5. Open your browser at:
http://localhost:3000

## Technologies used:

- Node.js
- Express
- HTML
- CSS
- JavaScript
- Spoonacular API


# Flavor Table Part 2 - Database Integration

## What the project does:
- Search for recipes by ingredients (API)
- Get random recipe suggestion (API)
- Store, update, delete favorite recipes using PostgreSQL database
- View favorite recipes on the page

## How to run the project:
1. Run PostgreSQL server
2. Create database `flavor_table`
3. Create table `recipes` as described in the lab
4. Fill in `.env` file with database credentials
5. In terminal:
```
npm install
node server.js
```
6. Open `index.html` to interact with the app

## Time to complete:
- Around 5-6 hours including setup and testing

## Challenges:
- Connecting frontend to database
- Testing API with Postman
- Handling JSON data properly

## Notes:
- Axios is used to interact with the database via API
- Favorite recipes are now stored in the database instead of localStorage
- Basic edit and delete functionality is implemented
