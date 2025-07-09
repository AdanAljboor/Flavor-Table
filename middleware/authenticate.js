const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key");

    req.user = { id: decoded.userId };

    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = authenticate;
