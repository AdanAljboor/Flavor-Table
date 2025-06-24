const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require ('dotenv')
const path = require('path')


dotenv.config()

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

const homeRoutes = require('./routes/home');
const recipesRoutes = require('./routes/recipes');


app.use('/', homeRoutes);
app.use('/recipes', recipesRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
