const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes");
const homeRoutes = require("./routes/home");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api", homeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
