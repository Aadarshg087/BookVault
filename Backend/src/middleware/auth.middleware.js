const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(400).json({ message: "Unavailable Token" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid Token" });
  }
  next();
}

module.exports = { checkToken };
