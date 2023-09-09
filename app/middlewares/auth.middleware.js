const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../services/config.service");
const User = require("../models/user.model");

module.exports = (role) => async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ").pop();
  if (!token) {
    return res.status(401).message({ message: "Unauthorized!" });
  }
  jwt.decode(token, tokenSecret, async (err, decoded) => {
    if (err) {
      return res.status(401).message({ message: "Unauthorized!" });
    }
    const user = decoded.user;
    if (!user) {
      return res.status(401).message({ message: "Unauthorized!" });
    }
    const userDoc = await User.findById(user).select("-password");
    if (userDoc && userDoc.role === role) {
      req.user = userDoc;
      return next();
    }
    return res.status(401).message({ message: "Unauthorized!" });
  });
};
