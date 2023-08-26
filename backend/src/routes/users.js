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
  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  //Create a refresh token for user
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  res.json({
    accessToken: accessToken,
    refreshToken: refreshToken,
    userId: user._id,
    displayName: user.displayName,
  });
});

router.post("/token", (req, res) => {
  const refreshToken = req.body.token;
});

//Authenticate token
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; //Getting token portion from "Bearer TOKEN"
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userId) => {
    if (err) return res.sendStatus(403);
    req.userId = userId; //Adds userId to requests that uses this middleware
    next();
  });
}

module.exports = { verifyToken, router };
