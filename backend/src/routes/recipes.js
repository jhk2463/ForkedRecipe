const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Recipe = require("../models/Recipe");
const User = require("../models/User");

//Get all recipes
router.get("/recipes", async (req, res) => {
  try {
    const data = await Recipe.find({});
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

//Create a recipe
router.post("/recipes", async (req, res) => {
  const recipe = req.body;
  console.log(recipe);
  try {
    const user = await User.findById(recipe.owner);
    const newRecipe = new Recipe(recipe);
    const data = await newRecipe.save();
    user.myRecipes.push(data._id);
    await user.save();
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

//Get my recipes
router.get("/recipes/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const myRecipes = await Recipe.find({
      _id: { $in: user.myRecipes },
    });
    console.log(myRecipes);
    res.json({ myRecipes: myRecipes });
  } catch (err) {
    res.json(err);
  }
});

//Save a recipe
// router.put("/recipes", async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.body.recipeId);
//     const user = await User.findById(req.body.userId);
//     user.savedRecipes.push(recipe);
//     await user.save();
//     res.json({ savedRecipes: user.savedRecipes });
//   } catch (err) {
//     res.json(err);
//   }
// });

//Get saved recipes

//Edit a recipe

module.exports = router;
