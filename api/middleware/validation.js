const jwt = require("jsonwebtoken");
require("dotenv/config")

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("ACCESS DENIED");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).send("Invalid credentials");
  }
};