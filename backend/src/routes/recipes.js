const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Recipe = require("../models/Recipe");
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");

//Get all recipes
router.get("/recipes", async (req, res) => {
  try {
    const data = await Recipe.find({});
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

//Get a recipe by its id
router.get("/recipes/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    res.json({ recipe: recipe });
  } catch (err) {
    res.json(err);
  }
});

//Get my recipes
router.get("/myrecipes/:userId", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const myRecipes = await Recipe.find({
      _id: { $in: user.myRecipes },
    });
    res.json({ myRecipes: myRecipes });
  } catch (err) {
    res.json(err);
  }
});

//Create a recipe
router.post("/myrecipes", verifyToken, async (req, res) => {
  const recipe = req.body;
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

//Edit my recipe
router.put("/myrecipes/:recipeId", verifyToken, async (req, res) => {
  const recipe = req.body;
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      recipe,
      { new: true }
    );
    res.json(updatedRecipe);
  } catch (err) {
    res.json(err);
  }
});

//Delete my recipe
router.put("/myrecipes/delete", verifyToken, async (req, res) => {
  const { recipeId, userId } = req.body;
  try {
    //Delete the recipe
    await Recipe.findByIdAndDelete(recipeId);

    //Remove recipe from user's myRecipes array
    const user = await User.findById(userId);
    const idx = user.myRecipes.indexOf(recipeId);
    user.myRecipes.splice(idx, 1);
    await user.save();

    //Return recipe objects
    const myRecipes = await Recipe.find({
      _id: { $in: user.myRecipes },
    });
    res.json({ myRecipes: myRecipes });
  } catch (err) {
    res.json(err);
  }
});

//Save a recipe
router.put("/savedrecipes", verifyToken, async (req, res) => {
  const { recipeId, userId } = req.body;
  try {
    const recipe = await Recipe.findById(recipeId);
    const user = await User.findById(userId);
    user.savedRecipes.push(recipeId);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

//Get saved recipes (whole recipe objects)
router.get("/savedrecipes/:userId", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const savedRecipes = await Recipe.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes: savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

//Get saved recipes (just ids for reference)
router.get("/savedrecipes/ids/:userId", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

//Remove a saved recipe
router.put("/savedrecipes/remove", verifyToken, async (req, res) => {
  const { recipeId, userId } = req.body;
  try {
    //Remove recipe from user's savedRecipes array
    const user = await User.findById(userId);
    const idx = user.savedRecipes.indexOf(recipeId);
    user.savedRecipes.splice(idx, 1);
    await user.save();

    //Return recipe objects
    const savedRecipes = await Recipe.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes: savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
