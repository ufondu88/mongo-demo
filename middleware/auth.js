const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  console.log(query)
  const token = req.query.synapse;
  if (!token) return res.status(401).send("Access Denied. No token provided");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
