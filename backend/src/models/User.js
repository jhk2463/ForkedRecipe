const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  displayName: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String },
  myRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
  refreshToken: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
