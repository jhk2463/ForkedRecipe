const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(cors());

const recipeRoutes = require("./routes/recipes");
const userRoutes = require("./routes/users");

app.use("/", userRoutes);
app.use("/", recipeRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
