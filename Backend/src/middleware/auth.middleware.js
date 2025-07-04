const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(400).json({ message: "Unavailable Token" });

  try {
    // console.log("details: ", token);
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decode: ", decode);
    if (!decode) {
      return res
        .status(401)
        .json({ message: "Error in getting the details from token" });
    }
    req.userEmail = decode.email;
    req.userId = decode._id;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    console.log(error);
    return res.status(401).json({ message: "Invalid Token!" });
  }
  next();
}

module.exports = { checkToken };
