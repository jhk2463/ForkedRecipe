const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
var cookies = require("cookie-parser");

const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());
const whitelist = [
  "http://localhost:3000",
  "https://forkedrecipebackend.onrender.com/",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors());
app.use(cookies());

const recipeRoutes = require("./routes/recipes");
const userRoutes = require("./routes/users");

app.use("/", userRoutes);
app.use("/", recipeRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
