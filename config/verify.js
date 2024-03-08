const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json("Token not found");
  }

  jwt.verify(token, "rommel", (err, user) => {
    if (err) {
      res.status(403).json("Token is not valid!");
    }
    req.user = user;
    next()
  });
};

const verifyStaff = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "Staff") {
      next();
    } else {
      return res.status(403).json("You are not authorized");
    }
  });
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
    if (req.user.role === "Admin") {
      next();
    } else {
      return res.status(403).json("You are not authorized");
    }
  });
};

module.exports = {
  verifyToken: verifyToken,
  verifyStaff: verifyStaff,
  verifyAdmin: verifyAdmin,
};
