const jwt = require("jsonwebtoken");

//Authenticate token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; //Getting token portion from "Bearer TOKEN"
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) return res.sendStatus(403); //Invalid token
    req.user = decodedToken.userId; //Adds userId to requests that uses this middleware
    next();
  });
};

module.exports = verifyToken;
