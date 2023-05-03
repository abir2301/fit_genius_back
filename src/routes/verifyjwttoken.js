const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.headers.authorization?.replace(/^Bearer /, "");
  if (!token) {
    console.log("No authorization token provided");
    return res.status(401).send("No authorization token provided");
  }
  try {
    const decodeToken = jwt.verify(token, "privateKey");
    req.user = decodeToken.id;
    next();
  } catch (e) {
    return res.status(400).send("Unauthenticated.");
  }
};
