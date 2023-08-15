const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  ingredients: [{ type: String, require: true }],
  instructions: { type: String, require: true },
  imageUrl: { type: String, require: true },
  cookingTime: { type: Number, require: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
