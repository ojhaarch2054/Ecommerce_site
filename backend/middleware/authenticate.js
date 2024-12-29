const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const tokenBlacklist = require("../utility/tokenBlacklist")

dotenv.config();
//function to authenticate the token
const authenticateToken = (req, res, next) => {
  //get authorization header from the request
  const authHeader = req.headers["authorization"];
  //extract the token from the authorization header
  const token = authHeader && authHeader.split(" ")[1];

  //if no token is provided, return a 401 Unauthorized response
  if (!token) return res.sendStatus(401);

  //check if the token is in the blacklist
  if (tokenBlacklist.has(token)) {
    //if the token is blacklisted respond with a 403
    return res.status(403).json({ message: "Token is blacklisted" });
  }

  //verify the token using the secret key
  jwt.verify(token, process.env.your_jwt_secret, (err, user) => {
    //if the token is invalid or expired, return a 403 Forbidden response
    if (err) return res.sendStatus(403);
    //if the token is valid, attach the user information to the request object
    req.user = user;
    //proceed to the next middleware or route handler
    next();
  });
};

module.exports = authenticateToken;
