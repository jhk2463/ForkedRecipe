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

//Log in a user
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
    { expiresIn: "15m" }
  );

  //Create a refresh token for user
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  //Save refresh token in users database
  user.refreshToken = refreshToken;
  await user.save();

  //Send refresh token as an http only cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, //Not available to javascript (bit more secure)
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000, //1 day
  });

  //Send access token as json
  res.json({
    accessToken: accessToken,
    userId: user._id,
    displayName: user.displayName,
  });
});

//Log out a user
router.put("/session", async (req, res) => {
  //Check if cookie contains refresh token
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(204); //No content
  const refreshToken = cookies.refreshToken;

  //Check if there is user with matching refresh token
  const user = await User.findOne({ refreshToken: refreshToken });
  if (!user) {
    //Simply clear cookie if there is no matching user
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }

  //Delete refresh token in the database & clear cookie
  user.refreshToken = "";
  await user.save();
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  res.sendStatus(204);
});

//Refresh expired access token
router.get("/token", async (req, res) => {
  //Check if cookie contains refresh token
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(401);
  const refreshToken = cookies.refreshToken;

  //Check if there is user with matching refresh token
  const user = await User.findOne({ refreshToken: refreshToken });
  if (!user) return res.sendStatus(403);

  //Verify the refresh token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decodedToken) => {
      if (err || JSON.stringify(user._id) !== `"` + decodedToken.userId + `"`)
        return res.sendStatus(403); //Invalid token
      //Create a new access token for the user
      const accessToken = jwt.sign(
        { userId: decodedToken.userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      res.json({ accessToken: accessToken });
    }
  );
});

module.exports = router;
