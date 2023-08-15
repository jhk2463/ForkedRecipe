const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const router = express.Router();

//Register new user
router.post("/users", async (req, res) => {
  const { displayName, email, password } = req.body;

  //Check if user already exists
  const user = await User.findOne({ email: email });
  if (user) {
    return res.json({ message: "User already exists!" });
  }

  //Create user in database
  const hashedPassword = await bcrypt.hash(password, 10);
  User.create({
    displayName: displayName,
    email: email,
    password: hashedPassword,
  });

  res.json({ message: "User registered successfully" });
});

//Login a user
router.post("/session", async (req, res) => {
  const { email, password } = req.body;

  //Check if user does not exist
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.json({ message: "User does not exist!" });
  }

  //Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Username or Password is incorrect" });
  }

  //Create user token for authentication
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
  res.json({ token, userId: user._id });
});

module.exports = router;
