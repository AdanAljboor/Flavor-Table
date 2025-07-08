const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { Pool } = require('pg');
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect()
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Database connection error', err));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const homeRoutes = require('./routes/home');
const recipesRoutes = require('./routes/recipes');
const authRoutes = require('./routes/auth');

app.use('/', homeRoutes);
app.use('/recipes', recipesRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
